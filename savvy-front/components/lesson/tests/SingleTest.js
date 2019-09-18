import React, { Component } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import AnswerOption from "./AnswerOption";
import DeleteSingleTest from "../../delete/DeleteSingleTest";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

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
  width: 85%;
  font-size: 1.6rem;
  border-left: 2px solid white;
  padding-top: 2%;
  padding-left: 25px;
  padding-bottom: 2%;
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
    attempts: 0
  };

  answerState = "";

  handleAnswerSelected = e => {
    let answerVar = this.state.answerOptions;
    let int = parseInt(e.target.getAttribute("number"));
    answerVar[int] = !answerVar[int];
    this.setState({ answerOptions: answerVar });
  };

  showRight = () => {
    const element = document.querySelector(".Test");
    element.style.borderLeft = "2px solid #84BC9C";
    setTimeout(function() {
      element.style.border = "2px solid white";
    }, 3000);
  };

  showWrong = () => {
    const element = document.querySelector(".Test");
    element.style.borderLeft = "2px solid #DE6B48";
    setTimeout(function() {
      element.style.border = "2px solid white";
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
      } else {
        this.showWrong();
        this.setState({ answerState: "wrong" });
      }
    };
    const res2 = await res();
  };

  render() {
    const mes = _.zip(this.state.answers, this.state.true);
    console.log(this.props.userData);
    const userData = this.props.userData
      .filter(el => el.test.id === this.props.id)
      .filter(el => el.student.id === this.props.me.id);
    console.log(userData);
    return (
      <TextBar className="Test">
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
            answer: "Completed"
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: this.props.lessonID }
            },
            {
              query: CURRENT_USER_QUERY
            }
          ]}
        >
          {(createTestResult, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await this.onCheck();
                if (
                  userData.length === 0 &&
                  this.state.answerState === "right"
                ) {
                  const res0 = await createTestResult();
                  console.log("Успех!");
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
