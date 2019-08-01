import React, { Component } from "react";
import SingleTest from "./SingleTest";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import { CURRENT_USER_QUERY } from "../User";

const Button = styled.button`
  padding: 1% 2%;
  background: #f79101;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  &:hover {
    background: #f26915;
  }
`;

const Advice = styled.p`
  font-size: 1.8rem;
  margin: 1% 4%;
  background: #fefae9;
  border-left: 6px solid #f0c40f;
  padding: 2% 4%;
`;

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION($answer: String, $lessonID: ID) {
    createTestResult(answer: $answer, lessonID: $lessonID) {
      id
    }
  }
`;

class TestGroup extends Component {
  state = {
    tests: this.props.tests,
    completed: 0,
    handIn: false
  };

  myCallback = async e => {
    const res = await this.setState(prevState => ({
      completed: prevState.completed + 1
    }));
    if (this.state.tests.length === this.state.completed) {
    }
  };

  render() {
    let arr;
    const userData = this.props.testResults.filter(
      result => result.student.id === this.props.me.id
    );
    return (
      <>
        <Advice>
          <b>Совет</b>: чтобы преподаватель увидел, что вы выполнили задания,
          вам нужно сделать следущее. Ответьте правильно на все вопросы,
          самостоятельно или с помощью подсказок. После этого в самом низу
          страницы появится кнопка "Сохранить". Только после того, как вы на нее
          нажмете, преподаватель получит информацию, что вы выполнили все
          задания этого типа.
        </Advice>
        {this.state.tests.map((test, index) => (
          <>
            {(arr = Array(test.correct.length).fill(false))}
            <SingleTest
              question={test.question}
              num={index + 1}
              answers={test.answers}
              true={test.correct}
              length={arr}
              user={test.user.id}
              me={this.props.me}
              testId={test.id}
              lessonId={this.props.lessonId}
              getTestData={this.myCallback}
            />
          </>
        ))}
        <Mutation
          mutation={CREATE_TESTRESULT_MUTATION}
          variables={{
            lessonID: this.props.lessonId,
            answer: "Completed"
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: this.props.lessonId }
            },
            {
              query: CURRENT_USER_QUERY
            }
          ]}
        >
          {(createTestResult, { loading, error }) => (
            <>
              {this.state.tests.length === this.state.completed &&
                userData.length === 0 && (
                  <Button
                    onClick={async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createTestResult();
                      const res2 = await this.setState({ handIn: true });
                      // change the page to the single case page
                    }}
                  >
                    {!this.state.handIn ? "Сохранить" : "Готово!"}
                  </Button>
                )}
              {userData.length > 0 ? <p>Тесты этого урока сданы!</p> : null}
            </>
          )}
        </Mutation>
      </>
    );
  }
}

export default TestGroup;
