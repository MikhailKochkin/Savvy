import React, { Component } from "react";
import SingleTest from "./SingleTest";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

const Button = styled.button`
  padding: 1% 2%;
  background: #84bc9c;
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
`;

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.4rem;
  }
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
      console.log("Reached!");
    }
  };

  render() {
    let arr;
    console.log(this.props);
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
                      console.log("успех!");
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
