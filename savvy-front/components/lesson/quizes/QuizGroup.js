import React, { Component } from "react";
import styled from "styled-components";
import SingleQuiz from "./SingleQuiz";

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 85%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

class QuizGroup extends Component {
  state = {
    tests: this.props.quizes,
    completed: 0,
    handIn: false
  };

  myCallback = () => {
    this.setState(prevState => ({ completed: prevState.completed + 1 }));
  };
  render() {
    return (
      <>
        {/* <Advice>
          <b>Совет</b>: чтобы преподаватель увидел, что вы выполнили задания,
          вам нужно сделать следущее. Ответьте правильно на все вопросы,
          самостоятельно или с помощью подсказок. После этого в самом низу
          страницы появится кнопка "Сохранить". Только после того, как вы на нее
          нажмете, преподаватель получит информацию, что вы выполнили все
          задания этого типа.
        </Advice> */}
        {this.props.quizes.map((quiz, index) => (
          <>
            <SingleQuiz
              id={quiz.id}
              question={quiz.question}
              answer={quiz.answer}
              num={index + 1}
              getQuizData={this.myCallback}
              me={this.props.me}
              lessonID={this.props.lessonID}
              quizID={quiz.id}
              user={quiz.user.id}
              userData={this.props.quizResults}
            />
          </>
        ))}
      </>
    );
  }
}

export default QuizGroup;
