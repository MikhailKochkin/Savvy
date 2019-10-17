import React, { Component } from "react";
import SingleTest from "./SingleTest";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 5%;
`;

class TestGroup extends Component {
  state = {
    tests: this.props.tests,
    completed: 0,
    handIn: false
  };

  render() {
    let arr;
    return (
      <Styles>
        {/* <Advice>
          <b>Совет</b>: чтобы преподаватель увидел, что вы выполнили задания,
          вам нужно сделать следущее. Ответьте правильно на все вопросы,
          самостоятельно или с помощью подсказок. После этого в самом низу
          страницы появится кнопка "Сохранить". Только после того, как вы на нее
          нажмете, преподаватель получит информацию, что вы выполнили все
          задания этого типа.
        </Advice> */}
        {this.state.tests.map((test, index) => (
          <>
            {(arr = Array(test.correct.length).fill(false))}
            <SingleTest
              id={test.id}
              question={test.question}
              num={index + 1}
              type={test.type}
              answers={test.answers}
              true={test.correct}
              length={arr}
              user={test.user.id}
              me={this.props.me}
              lessonID={this.props.lessonID}
              userData={this.props.testResults}
            />
          </>
        ))}
      </Styles>
    );
  }
}

export default TestGroup;
