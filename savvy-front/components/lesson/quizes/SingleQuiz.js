import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";

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
  width: ${props => (props.story ? "100%" : "95%")};
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
  margin-top: ${props => (props.story ? "2%" : "0%")};
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
  width: 100%;
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
  width: 100%;
  color: black;
  padding: 2%;
  min-height: 150px;
  display: ${props => (props.display === "true" ? "none" : "block")};
  margin-bottom: 3%;
  @media (max-width: 800px) {
    width: 100%;
    height: 100px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 0.5%;
  div {
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  #but1 {
    flex: 50%;
    text-align: center;
  }
  #but2 {
    flex: 50%;
    text-align: center;
    border-left: 1px solid #c4c4c4;
  }
`;

const Dots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 90px;
  .group {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    margin-top: 5%;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: #c4c4c4;
    border-radius: 50%;
  }
`;

const Progress = styled.div`
  display: ${props => (props.display === "true" ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 0 0 2% 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none"
  }
})(Button);

const Block = styled.div`
  display: ${props => (props.display === "true" ? "block" : "none")};
  #comment {
    margin-bottom: 2%;
  }
`;

class SingleQuiz extends Component {
  state = {
    hidden: true,
    testFormat: false,
    answer: "",
    correct: "",
    inputColor: "#c4c4c4",
    update: false,
    sent: false,
    move: false,
    progress: "false"
  };

  onShow = e => {
    if (this.state.correct !== "") {
      this.setState(prevState => ({ hidden: !prevState.hidden }));
    } else {
      alert("Сначала дайте свой ответ!");
    }
  };

  onSend = async () => {
    document.querySelector(".button").disabled = true;
  };

  onAnswer = async e => {
    this.setState({ progress: "true" });
    let data1 = {
      sentence1: this.props.answer.toLowerCase(),
      sentence2: this.state.answer.toLowerCase()
    };
    const r = await fetch("https://dry-plains-91452.herokuapp.com", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data1)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res > 0.59) {
          this.setState({ correct: "true", inputColor: "#32AC66" });
          this.move("true");
        } else {
          this.setState({ correct: "false", inputColor: "#DE6B48" });
          this.move("false");
        }
      })
      .catch(err => console.log(err));
    this.setState({ progress: "false" });
  };

  move = result => {
    // 1. if the data is sent for the first time
    if (!this.state.sent) {
      // 2. and if we get the right answer
      if (result === "true") {
        // 3. and if this quiz is a part of an exam
        if (this.props.exam) {
          // 4. we transfer the "true" data to the exam component
          this.props.getData(
            this.props.next ? this.props.next.true : { finish: 0 },
            "true"
          );
        }
        // 2. and if we get the wrong answer
      } else if (result === "false") {
        // 3. and if this quiz is a part of an exam
        if (this.props.exam) {
          // 4. we transfer the "false" data to the exam component
          this.props.getData(
            this.props.next ? this.props.next.false : { finish: 0 },
            "false"
          );
        }
      }
    }
    this.setState({ sent: true });
  };

  switch = () => {
    this.setState(prev => ({ update: !prev.update }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { me, user, userData, exam, story } = this.props;
    const data = userData
      .filter(el => el.quiz.id === this.props.id)
      .filter(el => el.student.id === me.id);
    return (
      <Styles story={story}>
        {!this.state.update && (
          <>
            <Question story={story}>
              {this.props.question}
              <Textarea
                inputColor={this.state.inputColor}
                type="text"
                className="answer"
                name="answer"
                required
                onChange={this.handleChange}
                placeholder="Ответ на вопрос..."
              />
            </Question>
            <Progress display={this.state.progress}>
              <CircularProgress />
            </Progress>
            <Group>
              <Mutation
                mutation={CREATE_QUIZRESULT_MUTATION}
                variables={{
                  quiz: this.props.quizID,
                  lessonID: this.props.lessonID,
                  answer: this.state.answer
                }}
              >
                {(createQuizResult, { loading, error }) => (
                  <div
                    id="but1"
                    className="button"
                    onClick={async e => {
                      e.preventDefault();
                      if (this.props.type === "FORM") {
                        const res1 = await this.onSend();
                      } else {
                        const res = await this.onAnswer();
                      }
                      if (data.length === 0) {
                        const res0 = await createQuizResult();
                      }
                    }}
                  >
                    {this.props.type === "FORM" ? "Ответить" : "Проверить"}
                  </div>
                )}
              </Mutation>
              {this.props.type !== "FORM" && (
                <div onClick={this.onShow} id="but2">
                  {this.state.hidden === true
                    ? "Открыть ответ"
                    : "Скрыть ответ"}
                </div>
              )}
            </Group>
            <Answer
              display={this.state.hidden.toString()}
              inputColor={this.state.inputColor}
            >
              {this.props.answer}
            </Answer>
            {this.props.exam && (
              <Block display={this.state.move.toString()}>
                <div id="comment">Ваш ответ совпадает с нашим?</div>
                <Group className="move">
                  <div id="but1" onClick={this.move} name="true">
                    Да ✅
                  </div>
                  <div id="but2" onClick={this.move} name="false">
                    Нет ⛔️
                  </div>
                </Group>
              </Block>
            )}
          </>
        )}
        {this.state.update && (
          <UpdateQuiz
            quizID={this.props.quizID}
            lessonID={this.props.lessonID}
            answer={this.props.answer}
            question={this.props.question}
            notes={this.props.notes}
            quizes={this.props.quizes.filter(q => q.id !== this.props.quizID)}
            tests={this.props.tests}
          />
        )}
        <Buttons>
          {!exam && !story && (
            <StyledButton onClick={this.switch}>Настройки</StyledButton>
          )}
          {me && me.id === user && !this.props.exam && !this.props.story ? (
            <DeleteSingleQuiz
              id={me.id}
              quizID={this.props.quizID}
              lessonID={this.props.lessonID}
            />
          ) : null}
        </Buttons>
        {this.props.exam && (
          <Dots>
            <div className="group">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </Dots>
        )}
      </Styles>
    );
  }
}

export default SingleQuiz;
