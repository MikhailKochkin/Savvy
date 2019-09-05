import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import AnswerOption from "./AnswerOption";
import DeleteSingleTest from "../../delete/DeleteSingleTest";

const Question = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const TextBar = styled.div`
  width: 85%;
  font-size: 1.6rem;
  border-left: 2px solid white;
  padding-top: 2%;
  padding-left: 25px;
  padding-bottom: 2%;
  border-left: 2px solid;
  border-left-color: ${props => props.inputColor || "white"};
  ul {
    list-style-type: none;
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 3%;
  color: #fffdf7;
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
`;

class SingleTest extends Component {
  state = {
    answers: this.props.answers,
    true: this.props.true,
    answerState: "think",
    answerOptions: this.props.length,
    answer: "",
    attempts: 0,
    color: "white"
  };

  answerState = "";

  handleAnswerSelected = e => {
    let answerVar = this.state.answerOptions;
    let int = parseInt(e.target.getAttribute("number"));
    answerVar[int] = !answerVar[int];
    this.setState({ answerOptions: answerVar });
  };

  showRight = () => {
    this.setState({ color: "#84BC9C" });
    setTimeout(() => {
      this.setState({ color: "white" });
    }, 3000);
  };

  showWrong = () => {
    this.setState({ color: "#DE6B48" });
    setTimeout(() => {
      this.setState({ color: "white" });
    }, 3000);
  };

  onCheck = async () => {
    const res1 = await this.setState(prevState => ({
      attempts: prevState.attempts + 1
    }));
    const res = () => {
      if (
        JSON.stringify(this.state.answerOptions) ==
        JSON.stringify(this.state.true)
      ) {
        this.showRight();
        this.setState({ answerState: "right" });
        this.props.getTestData("+1");
      } else {
        this.showWrong();
        this.setState({ answerState: "wrong" });
      }
    };
    const res2 = await res();
  };

  nextQuestion = () => {
    this.props.getQuestionInfo(true);
  };

  render() {
    const mes = _.zip(this.state.answers, this.state.true);
    return (
      <>
        <TextBar inputColor={this.state.color}>
          <Question>
            {this.props.num}. {this.props.question}
          </Question>
          {mes.map((answer, index) => (
            <ul>
              <AnswerOption
                key={index}
                question={answer[0]}
                correct={answer[1]}
                number={index}
                onAnswerSelected={this.handleAnswerSelected}
              />
            </ul>
          ))}
          {this.state.answerState !== "right" && (
            <Button onClick={this.onCheck}>Проверить</Button>
          )}
          {this.props.me && this.props.me.id === this.props.user ? (
            <DeleteSingleTest
              id={this.props.me.id}
              testId={this.props.testId}
              lessonId={this.props.lessonId}
            />
          ) : null}
        </TextBar>
      </>
    );
  }
}

export default SingleTest;
