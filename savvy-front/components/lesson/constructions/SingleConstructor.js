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
import Box from "./Box";

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
  width: 75vw;
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
      .getElementsByClassName("l");
    console.log(elements);
    for (let element of elements) {
      element.style.border = "1px solid #DE6B48";
    }
    this.setState({ answerState: "wrong" });
    this.setState((prevState) => ({
      attempts: prevState.attempts + 1,
    }));
    setTimeout(function () {
      for (let element of elements) {
        element.style.border = "none";
        element.style.borderBottom = "1px solid grey ";
      }
    }, 3000);
  };

  showRight = () => {
    const elements = document
      .getElementById(this.props.construction.id)
      .getElementsByClassName("l");
    for (let element of elements) {
      element.style.border = "1px solid #84BC9C";
    }
    this.setState({ answerState: "right", answered: true });

    const texts = document.querySelectorAll("#text");
    let inputs = [];

    const results = document.querySelectorAll(".Var");

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
            <Answers className="answer">
              <Title>{construction.name}</Title>
              {!this.state.answerReveal && (
                <>
                  {this.state.received.map((option, index) => (
                    <Label
                      className="Var"
                      key={index + 1}
                      data={this.state.received[index] !== ""}
                    >
                      <input
                        className="l"
                        data={index + 1}
                        type="number"
                        onChange={this.handleSteps}
                      />
                      {renderHTML(this.state.received[index])}
                    </Label>
                  ))}
                </>
              )}
              {this.state.answerReveal && (
                <ol>
                  {this.state.answer.map((el) => (
                    <li className="next">{renderHTML(el)}</li>
                  ))}
                </ol>
              )}
              <Mutation
                mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
                variables={{
                  lessonID,
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
            <Variants>
              {this.state.variants.map((option, index) => (
                <Box index={index} option={option} id={construction.id} />
              ))}
            </Variants>
          </Styles>
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
