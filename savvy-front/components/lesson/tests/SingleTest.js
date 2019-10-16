import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import AnswerOption from "./AnswerOption";
import DeleteSingleTest from "../../delete/DeleteSingleTest";

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION(
    $answer: String
    $testID: ID
    $lessonID: ID
  ) {
    createTestResult(answer: $answer, testID: $testID, lessonID: $lessonID) {
      id
    }
  }
`;

const Question = styled.p`
  font-size: 1.6rem;
`;

const TextBar = styled.div`
  width: 100%;
  font-size: 1.6rem;
  border-left: 2px solid;
  border-left-color: ${props => props.inputColor};
  padding-top: 2%;
  padding-left: 25px;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-left: 5px;
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
    answerState: "think",
    answerOptions: this.props.length,
    answer: [],
    attempts: 0,
    inputColor: "white"
  };

  answerState = "";

  handleAnswerSelected = async e => {
    let answerVar = this.state.answerOptions;
    let int = parseInt(e.target.getAttribute("number"));
    answerVar[int] = !answerVar[int];
    let answerText = this.state.answer;

    function change() {
      if (!answerText.includes(e.target.getAttribute("answer"))) {
        answerText.push(e.target.getAttribute("answer"));
      } else if (answerText.includes(e.target.getAttribute("answer"))) {
        var index = answerText.indexOf(e.target.getAttribute("answer"));
        answerText.splice(index, 1);
      }
    }
    const res = await change();
    const res1 = await this.setState({
      answerOptions: answerVar,
      answer: answerText
    });
  };

  onCheck = async () => {
    const res1 = await this.setState(prevState => ({
      attempts: prevState.attempts + 1
    }));
    const res = () => {
      if (
        JSON.stringify(this.state.answerOptions) ==
        JSON.stringify(this.props.true)
      ) {
        this.setState({ answerState: "right", inputColor: "#84BC9C" });
      } else {
        this.setState({ answerState: "wrong", inputColor: "#DE6B48" });
      }
    };
    const res2 = await res();
  };
  render() {
    const mes = _.zip(this.props.answers, this.props.true);
    const userData = this.props.userData
      .filter(el => el.testID === this.props.id)
      .filter(el => el.student.id === this.props.me.id);
    return (
      <TextBar className="Test" inputColor={this.state.inputColor}>
        <Question>{this.props.question}</Question>
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
        <Mutation
          mutation={CREATE_TESTRESULT_MUTATION}
          variables={{
            testID: this.props.id,
            lessonID: this.props.lessonID,
            answer: this.state.answer.join(", ")
          }}
        >
          {(createTestResult, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await this.onCheck();
                if (userData.length === 0) {
                  const res0 = await createTestResult();
                }
              }}
            >
              Проверить
            </Button>
          )}
        </Mutation>
        {this.props.me && this.props.me.id === this.props.user ? (
          <DeleteSingleTest
            id={this.props.me.id}
            testId={this.props.id}
            lessonId={this.props.lessonID}
          />
        ) : null}
      </TextBar>
    );
  }
}

export default SingleTest;
