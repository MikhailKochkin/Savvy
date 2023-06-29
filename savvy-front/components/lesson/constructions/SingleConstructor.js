import { useState, useEffect } from "react";
import _ from "lodash";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import parse from 'html-react-parser';

import DeleteSingleConstructor from "../../delete/DeleteSingleConstructor";
import UpdateConstruction from "./UpdateConstruction";
import { CURRENT_USER_QUERY } from "../../User";
import Box from "./Box";
import Article from "./Article";

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
  width: ${(props) => (props.story ? "85vw" : "100%")};
  max-width: 1350px;
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
    padding-right: 0%;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  margin-top: 55px;
  overflow: auto;
  max-height: 200vh;
  padding: 1%;
  @media (max-width: 800px) {
    max-height: 100%;
    padding: 3%;
  }
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
    margin: 20px 2% 20px 2%;
    flex-basis: 0%;
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
  font-weight: 500;

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

const Number_Input = styled.input`
  padding: 2%;
  width: 12%;
  border-bottom: 1px solid grey;
  border: 1px dashed;
  border-color: ${(props) => props.article_status};
  white-space: nowrap;
  font-family: Montserrat;
  font-size: 1.4rem;
  line-height: 1.8;
  margin-bottom: 10px;
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
  const [status, setStatus] = useState(
    new Array(props.construction.answer.length).fill(false)
  );

  const [answerState, setAnswerState] = useState("");
  const [type, setType] = useState(props.construction.type);
  const [attempts, setAttempts] = useState(1);
  const [inputs, setInputs] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [answerReveal, setAnswerReveal] = useState(false);
  const [update, setUpdate] = useState(false);

  const { t } = useTranslation("lesson");

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
    const { value } = e.target;
    // 2. Get the number of the article
    const article_number = e.target.getAttribute("data");
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
    const elements = document
      .getElementById(props.construction.id)
      .getElementsByClassName("l");
    setAttempts(attempts + 1);
  };

  const showRight = () => {
    const elements = document
      .getElementById(props.construction.id)
      .getElementsByClassName("l");

    setAnswerState("right");
    setAnswered(true);
    const texts = document.querySelectorAll("#text");
    let inputs = [];
    const results = document.querySelectorAll(".article");
    results.forEach((element) => {
      inputs.push(element.innerHTML);
    });
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
          props.getResults(2);
          showRight();
        } else {
          showWrong();
        }
      }
    } else if (type === "equal") {
      // 3. Check if all the correct variants are included into the answer, order does matter
      let status_arr = status;
      answer.map((an, i) => {
        if (an == received[i]) {
          status_arr[i] = true;
        }
      });

      if (JSON.stringify(answer) == JSON.stringify(received)) {
        props.getResults(2);
        setAnswerState("right");
        showRight();
      } else {
        setAnswerState("wrong");
        showWrong();
      }
    }
  };

  useEffect(() => {
    const vars = shuffle([...props.variants]);
    setVariants(vars);
  }, []);

  const { me, lessonID, construction, story, complexity } = props;
  return (
    <>
      {me.id === construction.user.id && !story && (
        <StyledButton onClick={(e) => setUpdate(!update)}>
          {!update ? t("update") : t("back")}
        </StyledButton>
      )}
      {!update && (
        <Styles id={construction.id} story={story}>
          <Answers className="answer" id="answers">
            <Title>{construction.name}</Title>
            {!answerReveal && (
              <>
                {received.map((option, index) => {
                  let article_status;
                  if (answerState == "") {
                    article_status = "#c4c4c4";
                  } else if (answerState == "right") {
                    article_status = "#84BC9C";
                  } else if (answerState == "wrong" && status[index]) {
                    article_status = "#84BC9C";
                  } else if (answerState == "wrong" && !status[index]) {
                    article_status = "#DE6B48";
                  }
                  return (
                    <Label
                      className="Var"
                      key={index + 1}
                      data={received[index] !== ""}
                      correct={status[index]}
                    >
                      <Number_Input
                        className="l"
                        data={index + 1}
                        type="number"
                        correct={status[index]}
                        onChange={(e) => handleSteps(e)}
                        article_status={article_status}
                      />
                      <Article option={option} />
                    </Label>
                  );
                })}
              </>
            )}
            {answerReveal && (
              <ol>
                {answer.map((el) => (
                  <li className="next">{parse(el)}</li>
                ))}
              </ol>
            )}
            <Mutation
              mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
              variables={{
                lessonId: lessonID,
                attempts: attempts,
                constructionId: construction.id,
                inputs: received,
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
                    }}
                  >
                    {t("check")}
                  </StyledButton>
                </Buttons>
              )}
            </Mutation>
            {answerState === "wrong" ? (
              <>
                <StyledButton onClick={(e) => setAnswerReveal(!answerReveal)}>
                  {answerReveal ? t("back") : t("show")}
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
            {variants.map((option, index) => {
              return (
                <Box
                  used={received.includes(option)}
                  index={index}
                  option={option}
                  id={construction.id}
                />
              );
            })}
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
          complexity={complexity}
          lessonID={lessonID}
        />
      )}
    </>
  );
};

export default SingleConstructor;
