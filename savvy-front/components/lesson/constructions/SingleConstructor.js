import React, { Component } from "react";
import _ from "lodash";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleConstructor from "../../delete/DeleteSingleConstructor";
import UpdateConstruction from "./UpdateConstruction";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonID: ID
    $constructionID: ID
    $inputs: [String]
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonID: $lessonID
      constructionID: $constructionID
      inputs: $inputs
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  padding-right: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;
const Text = styled.div`
  width: 100%;
`;

const Variants = styled.div`
  flex-basis: 45%;
  max-width: 45%;
`;

const Answers = styled.div`
  flex-basis: 45%;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Box = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  /* padding: 0 4%; */
  margin-bottom: 4%;
  /* input {
    pointer-events: none;
  } */
  .box {
    padding: 0 15px;
  }
  .number {
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    background: #edefed;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  border: 1px dashed #c4c4c4;
  padding: 4%;
  border-radius: 10px;
  margin-bottom: 4%;
  input.l {
    padding: 2%;
    width: 22%;
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

const Advice = styled.p`
  font-size: 1.4rem;
  margin: 1% 4%;
  margin-bottom: 20px;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2% 3%;
  margin-top: 30px;
  width: 100%;
`;

const Buttons = styled.div`
  pointer-events: ${(props) => (props.blocked ? "none" : "auto")};
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

class SingleConstructor extends Component {
  state = {
    variants: [],
    answer: this.props.construction.answer,
    received: this.props.arr,
    answerState: "",
    type: this.props.construction.type,
    attempts: 1,
    inputs: [],
    answered: false,
    answerReveal: false,
    update: false,
  };

  answerState = "";

  shuffle = (array) => {
    var m = array.length,
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

  handleSteps = (e) => {
    e.preventDefault();
    // 1. Get the user variant for a particular article
    const { value } = e.target;
    // 2. Get the number of the article
    const article_number = e.target.getAttribute("data");
    // 3. Save to state the user data
    this.setState((state) => {
      const received = state.received.map((item, index) => {
        if (index === article_number - 1) {
          if (this.state.variants[value - 1] === undefined) {
            return (item = "");
          } else {
            return (item = this.state.variants[value - 1]);
          }
        } else {
          return item;
        }
      });
      return { received };
    });
  };

  showWrong = () => {
    const elements = document
      .getElementById(this.props.construction.id)
      .querySelectorAll(".Var");

    elements.forEach((element) => {
      element.style.border = "1px solid #DE6B48";
    });
    this.setState({ answerState: "wrong" });
    this.setState((prevState) => ({
      attempts: prevState.attempts + 1,
    }));
    setTimeout(function () {
      elements.forEach((element) => {
        element.style.border = "1px solid #c4c4c4 ";
      });
    }, 3000);
  };

  showRight = () => {
    const elements = document
      .getElementById(this.props.construction.id)
      .querySelectorAll(".Var");
    elements.forEach((element) => {
      element.style.border = "1px solid #84BC9C";
    });
    this.setState({ answerState: "right", answered: true });

    const texts = document
      .getElementById(this.props.construction.id)
      .querySelectorAll("#text");

    let p;
    let v;
    let space;
    texts.forEach((element) => {
      space = document.createElement("SPAN");
      space.innerHTML = " / ";
      v = document.createElement("SPAN");
      v.innerHTML = element.value;
      v.style.color = "#00008B";
      p = document.createElement("SPAN");
      p.innerHTML = element.getAttribute("name");
      p.style.color = "green";
      element.parentElement.insertBefore(v, element);
      element.parentElement.insertBefore(space, element);
      element.parentElement.insertBefore(p, element);
      element.remove();
    });
    let inputs = [];

    const results = document
      .getElementById(this.props.construction.id)
      .querySelectorAll(".Var");
    let nums = document
      .getElementById(this.props.construction.id)
      .querySelectorAll(".l");
    nums.forEach((el) => el.remove());

    results.forEach((element) => {
      inputs.push(element.innerHTML);
    });
    this.setState({ inputs: inputs });
  };

  check = () => {
    // 0.
    // 1. Find out the rule for checking the answer
    if (this.state.type === "include") {
      let res;
      // 2. Check if all the answers have been given
      if (new Set(this.state.received).size !== this.state.received.length) {
        // If not, show that the answer is wrong
        this.showWrong();
      } else {
        // 3. Check if all the correct variants are included into the answer, order does not matter
        let correct = 0;
        this.state.received.map((item) => {
          if (this.state.answer.includes(item)) {
            correct = correct + 1;
          } else {
            correct = correct;
          }
        });
        if (correct === this.state.answer.length) {
          this.showRight();
        } else {
          this.showWrong();
        }
      }
    } else if (this.state.type === "equal") {
      // 3. Check if all the correct variants are included into the answer, order does matter
      if (
        JSON.stringify(this.state.answer) == JSON.stringify(this.state.received)
      ) {
        this.showRight();
      } else {
        this.showWrong();
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const vars = this.shuffle(this.props.variants);
    this.setState({ variants: vars });
  }

  render() {
    const { me, lessonID, construction, userData, story } = this.props;
    let data;
    me
      ? (data = userData
          .filter((result) => result.construction.id === construction.id)
          .filter((result) => result.student.id === this.props.me.id))
      : (data = [""]);
    return (
      <>
        {me.id === construction.user.id && !story && (
          <StyledButton
            onClick={(e) => this.setState((prev) => ({ update: !prev.update }))}
          >
            {this.state.update ? "К конструктору" : "Изменить"}
          </StyledButton>
        )}
        {!this.state.update && (
          <Styles id={construction.id}>
            <Variants>
              <Title>Конструктор</Title>
              {this.state.variants.map((option, index) => (
                <Box key={index}>
                  <div>
                    <div className="number">{index + 1}. </div>
                    <div className="box">{renderHTML(option)} </div>
                  </div>
                </Box>
              ))}
            </Variants>
            <Answers className="answer">
              <Title>{construction.name}</Title>
              {this.state.received.map((option, index) => (
                <Label className="Var" key={index + 1}>
                  <input
                    className="l"
                    data={index + 1}
                    type="number"
                    onChange={this.handleSteps}
                  />
                  {renderHTML(this.state.received[index])}
                </Label>
              ))}
              <Mutation
                mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
                variables={{
                  lessonID,
                  // answer: "Drafted",
                  attempts: this.state.attempts,
                  constructionID: this.props.construction.id,
                  inputs: this.state.inputs,
                }}
                refetchQueries={() => [
                  {
                    query: CURRENT_USER_QUERY,
                  },
                ]}
              >
                {(createConstructionResult, { loading, error }) => (
                  <Buttons blocked={this.state.answered}>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={async (e) => {
                        e.preventDefault();
                        const res = await this.check();
                        if (data.length == 0) {
                          if (this.state.answerState === "right") {
                            const res2 = await createConstructionResult();
                          }
                        }
                      }}
                    >
                      Проверить
                    </StyledButton>
                  </Buttons>
                )}
              </Mutation>
              {this.state.answerState === "wrong" ? (
                <>
                  <StyledButton
                    onClick={(e) =>
                      this.setState((prev) => ({
                        answerReveal: !prev.answerReveal,
                      }))
                    }
                  >
                    {this.state.answerReveal ? "Скрыть ответ" : "Открыть ответ"}
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
          </Styles>
        )}
        {this.state.answerReveal && (
          <Text>
            <h4>Ответ:</h4>
            <ol>
              {this.state.answer.map((el) => (
                <li>{renderHTML(el)}</li>
              ))}
            </ol>
          </Text>
        )}
        {this.state.answerState === "wrong" && (
          <Advice>
            <b>Подсказка:</b> {renderHTML(construction.hint)}
          </Advice>
        )}
        {this.state.update && (
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
  }
}

export default SingleConstructor;
