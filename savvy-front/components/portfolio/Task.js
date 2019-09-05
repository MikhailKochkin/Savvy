import React, { Component } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";

const Styles = styled.div`
  width: 50%;
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
    border: 2px solid #f4f4f4;
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
`;

const Button = styled.div`
  background: none;
  border: 1px solid #112a62;
  width: 30%;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  color: #112a62;
  margin: 4% 0;
`;

class Task extends Component {
  state = {
    showQuestion: false,
    showAnswer: false
  };

  showQuestion = () => {
    this.setState(prevState => ({
      showQuestion: !prevState.showQuestion
    }));
  };

  showAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  render() {
    const { answer, index } = this.props;
    return (
      <Styles>
        <p>
          {index}. Решение задачи по курсу:{" "}
          {answer.examQuestion.coursePage.title}
        </p>
        <Button onClick={this.showQuestion}>Открыть вопрос</Button>
        {this.state.showQuestion && (
          <p>{renderHTML("Задача: " + answer.examQuestion.question)}</p>
        )}
        <Button onClick={this.showAnswer}>Открыть решение</Button>
        {this.state.showAnswer && (
          <p>{renderHTML("Решение: " + answer.answer)}</p>
        )}
      </Styles>
    );
  }
}

export default Task;
