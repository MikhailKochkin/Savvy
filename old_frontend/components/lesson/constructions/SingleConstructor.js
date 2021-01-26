import { useState, useEffect } from "react";
import _ from "lodash";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleConstructor from "../../delete/DeleteSingleConstructor";
import UpdateConstruction from "./UpdateConstruction";
import { CURRENT_USER_QUERY } from "../../User";
import Box from "./Box";
import Article from "./Article";
import { withTranslation } from "../../../i18n";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonId: String
    $constructionId: String
    $inputs: [String]
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonId: $lessonId
      constructionId: $constructionId
      inputs: $inputs
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: ${(props) => (props.story ? "75vw" : "100%")};
  padding-right: 4%;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    flex-direction: column;
  }
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  margin-top: 55px;
  overflow: auto;
  max-height: 95vh;
`;

const Answers = styled.div`
  flex-basis: 65%;
  display: flex;
  flex-direction: column;
  align-items: left;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  padding: 3% 5%;
  margin: 55px 5% 45px 2%;
  .next {
    margin-bottom: 5px;
  }
  @media (max-width: 800px) {
    margin-bottom: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  pointer-events: ${(props) => (props.blocked ? "none" : "auto")};
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  border: ${(props) => (props.data ? "none" : "1px dashed #c4c4c4")};
  padding: ${(props) => (props.data ? 0 : "4%")};
  border-radius: 10px;
  margin-top: ${(props) => (props.data ? 0 : "2%")};
  margin-bottom: ${(props) => (props.data ? 0 : "6%")};

  input.l {
    padding: 2%;
    width: 12%;
    border: none;
    border-bottom: 1px solid grey;
    white-space: nowrap;
    font-family: Montserrat;
    font-size: 1.4rem;
  }

  input#text {
    padding: 2%;
    width: 50%;
    border: none;
    border-bottom: 1px solid grey;
    white-space: nowrap;
    font-family: Montserrat;
    font-size: 1.4rem;
  }
  input:focus {
    outline: none;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
    width: "50%",
  },
})(Button);

const SingleConstructor = (props) => {
  const [variants, setVariants] = useState([]);
  const [answer, setAnswer] = useState(props.construction.answer);
  const [received, setReceived] = useState(props.arr);
  const [answerState, setAnswerState] = useState("");
  const [type, setType] = useState(props.construction.type);
  const [attempts, setAttempts] = useState(1);
  const [inputs, setInputs] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [answerReveal, setAnswerReveal] = useState(false);
  const [update, setUpdate] = useState(false);

  // answerState = "";

  // shuffle article options
  const shuffle = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  const handleSteps = (e) => {
    e.preventDefault();
    // 1. Get the user variant for a particular article
    console.log(e.target);
    const { value } = e.target;
    console.log(value);
    // 2. Get the number of the article
    const article_number = e.target.getAttribute("data");
    console.log(article_number);
    // 3. Save to state the user data
    const d = received.map((item, index) => {
      if (index === article_number - 1) {
        if (variants[value - 1] === undefined) {
          return (item = "");
        } else {
          return (item = variants[value - 1]);
        }
      } else {
        return item;
      }
    });
    setReceived(d);
  };

  const showWrong = () => {
    console.log(1);
    const elements = document
      .getElementById(props.construction.id)
      .getElementsByClassName("l");
    console.log(elements);
    for (let element of elements) {
      element.style.border = "1px solid #DE6B48";
    }
    setAnswerState("wrong");
    setAttempts(attempts + 1);
    setTimeout(function () {
      for (let element of elements) {
        element.style.border = "none";
        element.style.borderBottom = "1px solid grey ";
      }
    }, 3000);
  };

  const showRight = () => {
    console.log(2);
    const elements = document
      .getElementById(props.construction.id)
      .getElementsByClassName("l");
    for (let element of elements) {
      element.style.border = "1px solid #84BC9C";
    }
    setAnswerState("right");
    setAnswered(true);
    const texts = document.querySelectorAll("#text");
    let inputs = [];
    const results = document.querySelectorAll(".article");
    results.forEach((element) => {
      inputs.push(element.innerHTML);
    });
    console.log(inputs);
    setInputs(inputs);
  };

  const check = () => {
    // 0.
    // 1. Find out the rule for checking the answer
    if (type === "include") {
      let res;
      // 2. Check if all the answers have been given
      if (new Set(received).size !== received.length) {
        // If not, show that the answer is wrong
        showWrong();
      } else {
        // 3. Check if all the correct variants are included into the answer, order does not matter
        let correct = 0;
        received.map((item) => {
          if (answer.includes(item)) {
            correct = correct + 1;
          } else {
            correct = correct;
          }
        });
        if (correct === answer.length) {
          showRight();
        } else {
          showWrong();
        }
      }
    } else if (type === "equal") {
      // 3. Check if all the correct variants are included into the answer, order does matter
      if (JSON.stringify(answer) == JSON.stringify(received)) {
        showRight();
      } else {
        showWrong();
      }
    }
  };

  useEffect(() => {
    // const vars = shuffle(props.variants);
    const vars = props.variants;

    setVariants(vars);
  }, []);

  const { me, lessonID, construction, userData, story } = props;
  let data;
  me
    ? (data = userData
        .filter((result) => result.construction.id === construction.id)
        .filter((result) => result.student.id === props.me.id))
    : (data = [""]);

  return (
    <>
      {me.id === construction.user.id && !story && (
        <StyledButton onClick={(e) => setUpdate(!update)}>
          {update ? props.t("back") : props.t("update")}
        </StyledButton>
      )}
      {!update && (
        <Styles id={construction.id} story={story}>
          <Answers className="answer" id="answers">
            <Title>{construction.name}</Title>
            {!answerReveal && (
              <>
                {received.map((option, index) => (
                  <Label
                    className="Var"
                    key={index + 1}
                    data={received[index] !== ""}
                  >
                    <input
                      className="l"
                      data={index + 1}
                      type="number"
                      onChange={(e) => handleSteps(e)}
                    />
                    <Article option={option} />
                  </Label>
                ))}
              </>
            )}
            {answerReveal && (
              <ol>
                {answer.map((el) => (
                  <li className="next">{renderHTML(el)}</li>
                ))}
              </ol>
            )}
            <Mutation
              mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
              variables={{
                lessonId: lessonID,
                attempts: attempts,
                constructionId: construction.id,
                inputs: inputs,
              }}
              refetchQueries={() => [
                {
                  query: CURRENT_USER_QUERY,
                },
              ]}
            >
              {(createConstructionResult, { loading, error }) => (
                <Buttons blocked={answered}>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await check();
                      createConstructionResult();
                      console.log("!!!");
                    }}
                  >
                    {props.t("check")}
                  </StyledButton>
                </Buttons>
              )}
            </Mutation>
            {answerState === "wrong" ? (
              <>
                <StyledButton onClick={(e) => setAnswerReveal(!answerReveal)}>
                  {answerReveal ? props.t("close") : props.t("open")}
                </StyledButton>
              </>
            ) : null}
            {me && me.id === construction.user.id && !story ? (
              <DeleteSingleConstructor
                id={construction.id}
                lessonID={lessonID}
              />
            ) : null}
          </Answers>
          <Variants>
            {variants.map((option, index) => (
              <Box index={index} option={option} id={construction.id} />
            ))}
          </Variants>
        </Styles>
      )}
      {update && (
        <UpdateConstruction
          id={construction.id}
          hint={construction.hint}
          name={construction.name}
          type={construction.type}
          variants={construction.variants}
          answer={construction.answer}
          lessonID={lessonID}
        />
      )}
    </>
  );
};

export default withTranslation("tasks")(SingleConstructor);
