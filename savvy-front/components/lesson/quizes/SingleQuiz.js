import React, { Component } from "react";
import styled from "styled-components";
import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-bottom: 3%;
  button {
    width: 30%;
    padding: 2%;
    margin-top: 5%;
  }
  @media (max-width: 800px) {
    padding: 0%;
    margin-bottom: 5%;
    button {
      width: 50%;
      padding: 3%;
    }
  }
`;

const Textarea = styled.textarea`
  height: 150px;
  width: 90%;
  border: 1px solid;
  border-color: ${props => props.inputColor};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 2%;
  font-size: 1.6rem;
  margin-top: 3%;
  @media (max-width: 800px) {
    width: 100%;
    height: 100px;
  }
`;

const Answer = styled.div`
  border: 1px solid #84bc9c;
  border-color: ${props => props.inputColor};
  border-radius: 5px;
  width: 90%;
  padding: 2%;
  color: black;
  padding: 2%;
  height: 150px;
  display: ${props => (props.display ? "none" : "block")};
  @media (max-width: 800px) {
    width: 100%;
    height: 100px;
  }
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${props => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

class SingleQuiz extends Component {
  state = {
    hidden: true,
    testFormat: false,
    answer: "",
    correct: "",
    color: "#c4c4c4"
  };

  showWrong = () => {
    const element = document.querySelector(".answer");
    console.log(element);
    this.setState({ color: "#DE6B48" });
    // element.style.border = "1px solid #DE6B48";
  };

  showRight = () => {
    const element = document.querySelector(".answer");
    console.log(element);
    // element.style.border = "1px solid #84BC9C";
    this.setState({ color: "#32AC66" });
    // setTimeout(function() {
    //   this.setState({ color: "#c4c4c4" });
    // }, 3000);
  };

  onShow = () => {
    this.setState(prevState => ({ hidden: false }));
  };

  onAnswer = e => {
    this.onShow();

    let s1 = this.props.answer.toLowerCase();
    let s2 = this.state.answer.toLowerCase();
    console.log(s1);
    console.log(s2);
    let s1Parts = s1.split(" ").filter(item => item !== "");
    let s2Parts = s2.split(" ").filter(item => item !== "");
    console.log(s1Parts);
    console.log(s2Parts);
    let score = 0;

    for (var i = 0; i < s1Parts.length; i++) {
      if (s1Parts[i] === s2Parts[i]) score++;
    }
    console.log(score);
    if (score == s1Parts.length) {
      this.setState({ correct: "true" });
      this.props.getQuizData("+1");
      this.showRight();
    } else {
      this.setState({ correct: "false" });
      this.showWrong();
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { me, user } = this.props;
    return (
      <>
        <Styles>
          <Question>
            Вопрос {this.props.num}. {this.props.question}
            <Textarea
              inputColor={this.state.color}
              type="text"
              className="answer"
              name="answer"
              required
              onChange={this.handleChange}
              placeholder="Ответ на вопрос..."
            />
          </Question>

          <Answer display={this.state.hidden}>{this.props.answer}</Answer>
          <Button onClick={this.onAnswer}>Проверить</Button>
          {me && me.id === user ? (
            <DeleteSingleQuiz
              id={me.id}
              quizID={this.props.quizID}
              lessonID={this.props.lessonID}
            />
          ) : null}
        </Styles>
      </>
    );
  }
}

export default SingleQuiz;
