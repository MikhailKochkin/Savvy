import React, { Component } from "react";
import SingleQuiz from "./SingleQuiz";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 5%;
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
      <Styles>
        {this.props.quizes.map((quiz, index) => (
          <>
            <SingleQuiz
              id={quiz.id}
              question={quiz.question}
              answer={quiz.answer}
              type={quiz.type}
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
      </Styles>
    );
  }
}

export default QuizGroup;
