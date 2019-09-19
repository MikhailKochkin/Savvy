import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: ID
    $lessonID: ID
  ) {
    createQuizResult(answer: $answer, quiz: $quiz, lessonID: $lessonID) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3% 0;
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
  width: 30%;
  border-radius: 5px;
  color: white;
  font-weight: 600;
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
  };

  showRight = () => {
    const element = document.querySelector(".answer");
    this.setState({ color: "#32AC66" });
  };

  onShow = () => {
    this.setState(prevState => ({ hidden: false }));
  };

  onAnswer = e => {
    this.onShow();

    let s1 = this.props.answer.toLowerCase();
    let s2 = this.state.answer.toLowerCase();
    let s1Parts = s1.split(" ").filter(item => item !== "");
    let s2Parts = s2.split(" ").filter(item => item !== "");
    let score = 0;
    for (var i = 0; i < s1Parts.length; i++) {
      if (s1Parts[i] === s2Parts[i]) score++;
    }
    if (score == s1Parts.length) {
      this.setState({ correct: "true" });
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
    const { me, user, userData } = this.props;
    const data = userData
      .filter(el => el.student.id === me.id)
      .filter(el => el.quiz.id === this.props.id);
    return (
      <Styles>
        <Question>
          {this.props.question}
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
        <Mutation
          mutation={CREATE_QUIZRESULT_MUTATION}
          variables={{
            quiz: this.props.quizID,
            lessonID: this.props.lessonID,
            answer: this.state.answer
          }}
        >
          {(createQuizResult, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await this.onAnswer();
                if (data.length === 0) {
                  const res0 = await createQuizResult();
                  console.log("Успех!");
                }
              }}
            >
              Проверить
            </Button>
          )}
        </Mutation>
        {me && me.id === user ? (
          <DeleteSingleQuiz
            id={me.id}
            quizID={this.props.quizID}
            lessonID={this.props.lessonID}
          />
        ) : null}
      </Styles>
    );
  }
}

export default SingleQuiz;
