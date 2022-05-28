import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { htmlToText } from "html-to-text";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import { CURRENT_USER_QUERY } from "../../User";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { v4 as uuidv4 } from "uuid";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $wrong: String!
    $correct: String!
    $guess: String!
    $lessonId: String
    $textEditorId: String
    $result: Boolean
  ) {
    createTextEditorResult(
      attempts: $attempts
      wrong: $wrong
      correct: $correct
      guess: $guess
      lessonId: $lessonId
      textEditorId: $textEditorId
      result: $result
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-bottom: 20px;
  width: ${(props) => (props.width ? "95vw" : "100%")};
  /* width: 95vw; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  background: #f8f9fa;
  padding: 2% 0;
`;

const TextBar = styled.div`
  width: 98%;
  font-size: 1.6rem;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.6rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  .flag {
    color: #008489;
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
    }
    th {
      border: 1px solid #edefed;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
    }
  }
  .edit {
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.8;
    font-family: Montserrat;
    border: none;
    outline: 0;
    resize: none;
    color: #393939;
    overflow: hidden;
    height: auto;
    background: #bef1ed;
    padding: 3px 3px;
  }
  .mini_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
  .blocked {
    pointer-events: none;
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
`;

const Window = styled.div`
  top: 15%;
  position: -webkit-sticky;
  position: sticky;
  margin-left: -10px;
  margin-bottom: 20px;
  min-height: 80px;
  border-radius: 10px;
  width: 280px;
  line-height: 1.4;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  .answerBox {
    border-top: 1px solid #dadce0;
    padding: 10px 15px;
    button {
      background-color: rgb(26, 115, 232);
      color: rgb(255, 255, 255);
      border-radius: 4px;
      border: none;
      box-shadow: none;
      box-sizing: border-box;
      font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
        sans-serif;
      font-weight: 500;
      font-size: 14px;
      height: 24px;
      padding: 3px 12px 5px;
      margin-top: 8px;
      cursor: pointer;
      &:hover {
        box-shadow: rgb(66 133 244 / 15%) 0px 1px 3px 1px;
        background-color: rgb(43, 125, 233);
      }
    }
  }
  .questionBox {
    padding: 10px 15px;
    .icon {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .nameBlock {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .name {
      margin-left: 8px;
    }

    .cancelBlock {
      height: 100%;
      transition: 0.5s;
      border-radius: 50%;
      padding: 1%;
      cursor: pointer;
      &:hover {
        background: #ecf5fe;
      }
    }
    .cancel {
      margin: 5px;
      height: 15px;
      width: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  margin: 5px 0;
`;

const Input = styled.input`
  font-family: Montserrat;
  border: 1px solid;
  border: ${(props) => {
    if (props.color == true || props.color == false) {
      return "2px solid";
    } else {
      return "1px solid";
    }
  }};

  border-radius: 5px;
  outline: 0;
  padding: 5px 7px;
  width: 100%;
  border-color: ${(props) => {
    if (props.color == true) {
      return "rgba(50, 172, 102, 0.75)";
    } else if (props.color == false) {
      return "rgba(222, 107, 72, 0.5)";
    } else {
      return "#dadce0";
    }
  }};
`;

const EditText = styled.div`
  color: rgb(17, 17, 17);
  width: ${(props) => (props.story ? "940px" : "740px")};
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  padding: 5% 8%;
  margin: 55px auto 45px;
  @media (max-width: 1250px) {
    width: 750px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const WindowColumn = styled.div`
  height: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 35%;
`;

const StyledButton = withStyles({
  root: {
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
    maxHeight: "40px",
  },
})(Button);

class SingleTextEditor extends Component {
  state = {
    shown: false,
    mistakesShown: false,
    answer: "",
    correct_option: "",
    wrong_option: "",
    attempts: 0,
    chosenElement: "",
    total: this.props.textEditor.totalMistakes,
    text: this.props.textEditor.text,
    update: false,
    result: false,
    inputColor: "#c0d6df",
    recieved: [],
    showQuiz: false,
    quiz: {
      question: "",
      answer: "",
    },
    quiz_guess: "",
    quiz_result: "no",
    quizAnswered: false,
    showNote: false,
    note: "",
  };

  check = async (e) => {
    e.target.className = "blocked";
    this.setState({ shown: true });
    let answer1 = htmlToText(this.state.correct_option.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    });
    let answer2 = htmlToText(this.state.answer.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    }).replace(/\_/g, "");
    let data = {
      answer1: answer1,
      answer2: answer2,
    };
    // let el = document.querySelectorAll(
    //   `[data-initial='${this.state.correct_option}']`
    // )[0];
    let el = document.getElementById(this.state.chosenElement);
    e.target.innerHTML = "Checking...";
    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (
          !e.target.nextSibling ||
          (e.target.nextSibling && e.target.nextSibling.innerHTML !== "Show")
        ) {
          let button2 = document.createElement("button");
          button2.innerHTML = "Show";
          button2.className = "mini_button";
          button2.addEventListener("click", this.show);
          e.target.after(button2);
        }
        if (parseFloat(res.res) > 69) {
          this.setState({
            result: true,
          });
          this.props.getResults(1);
          el.style.background = "#D9EAD3";
          e.target.innerHTML = "Check";
        } else {
          this.setState({
            result: false,
          });
          el.style.background = "#FCE5CD";
          e.target.innerHTML = "Check";
          e.target.className = "mini_button";
          if (res.comment) {
            alert(res.comment);
          }
          setTimeout(() => (el.style.background = "#bef1ed"), 3000);
        }
      })
      .catch((err) => console.log(err));

    this.setState({ shown: false });
  };

  quizCheck = async (e) => {
    let data = {
      answer1: this.state.quiz.answer,
      answer2: this.state.quiz_guess,
    };
    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (parseFloat(res.res) > 69) {
          this.setState({
            quiz_result: true,
          });
        } else {
          this.setState({
            quiz_result: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onTest = (e) => {
    this.setState((prevState) => ({
      attempts: prevState.attempts + 1,
    }));
  };

  onMouseClick = (e) => {
    let z = document.createElement("span");
    let id = uuidv4();
    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute("data-initial", e.target.getAttribute("data"));
    z.setAttribute("id", id);
    z.addEventListener("input", this.changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);

    let button = document.createElement("button");
    button.innerHTML = "Check";

    button.className = "mini_button";
    button.tabIndex = 0;
    button.addEventListener("click", this.check);
    z.after(button);
    let wrong_option = htmlToText(e.target.innerHTML, {
      wordwrap: false,
      uppercase: false,
    });
    this.setState({
      answer: "",
      correct_option: e.target.getAttribute("data"),
      wrong_option: wrong_option,
      chosenElement: id,
    });
  };

  changeState = (e) => {
    this.setState({ answer: e.target.innerHTML });
  };

  onReveal = (e) => {
    let span = document.createElement("span");
    span.innerHTML = ` (${e.target.getAttribute("data")})`;
    if (
      e.target.nextSibling == null ||
      (e.target.nextSibling &&
        span.innerHTML !== e.target.nextSibling.innerHTML)
    ) {
      e.target.className = "edit";
      e.target.after(span);
      span.className = "edit";
    }
  };

  show = (e) => {
    e.target.previousSibling.previousSibling.innerHTML =
      e.target.previousSibling.previousSibling.getAttribute("data-initial");
    e.target.style.pointerEvents = "none";
    e.target.previousSibling.style.display = "none";
    e.target.style.display = "none";
    e.target.previousSibling.previousSibling.contentEditable = false;
    e.target.previousSibling.previousSibling.style.pointerEvents = "none";
  };

  onShow = () => {
    const elements = document
      .getElementById(this.props.textEditor.id + 1)
      .querySelectorAll("#id");
    if (this.state.mistakesShown) {
      elements.forEach((element) => {
        element.classList.remove("edit");
      });
    } else {
      elements.forEach((element) => {
        element.className = "edit";
      });
    }
    this.setState((prev) => ({ mistakesShown: !prev.mistakesShown }));
  };

  render() {
    const { textEditor, me, lessonID, story, complexity } = this.props;
    return (
      <>
        <Styles id={textEditor.id + 1} width={story}>
          {!this.state.update && (
            <div>
              <TextBar id={textEditor.id}>
                <EditText story={story}>
                  <Mutation
                    mutation={CREATE_TEXTEDITORRESULT_MUTATION}
                    variables={{
                      lessonId: this.props.lessonID,
                      textEditorId: this.props.textEditor.id,
                      attempts: this.state.attempts,
                      correct: this.state.correct_option,
                      wrong: this.state.wrong_option,
                      guess: htmlToText(this.state.answer, {
                        wordwrap: false,
                      }),
                      result: this.state.result,
                    }}
                    refetchQueries={() => [
                      {
                        query: SINGLE_LESSON_QUERY,
                        variables: { id: this.props.lessonID },
                      },
                      {
                        query: CURRENT_USER_QUERY,
                      },
                    ]}
                  >
                    {(createTextEditorResult, { loading, error }) => (
                      <div
                        onClick={async (e) => {
                          const res1 = this.onTest();
                          if (
                            e.target.getAttribute("type") === "quiz" ||
                            e.target.parentElement.getAttribute("type") ===
                              "quiz"
                          ) {
                            e.target.className = "edit";

                            this.setState({
                              showQuiz: true,
                              quiz: {
                                question:
                                  e.target.getAttribute("type") === "quiz"
                                    ? e.target.getAttribute("question")
                                    : e.target.parentElement.getAttribute(
                                        "question"
                                      ),
                                answer:
                                  e.target.getAttribute("type") === "quiz"
                                    ? e.target.getAttribute("answer")
                                    : e.target.parentElement.getAttribute(
                                        "answer"
                                      ),
                                ifRight:
                                  e.target.getAttribute("type") === "quiz"
                                    ? e.target.getAttribute("ifRight")
                                    : e.target.parentElement.getAttribute(
                                        "ifRight"
                                      ),
                                ifWrong:
                                  e.target.getAttribute("type") === "quiz"
                                    ? e.target.getAttribute("ifWrong")
                                    : e.target.parentElement.getAttribute(
                                        "ifWrong"
                                      ),
                              },
                              quiz_result: "no",
                            });
                          }
                          if (
                            e.target.getAttribute("type") === "note" ||
                            e.target.parentElement.getAttribute("type") ===
                              "note"
                          ) {
                            e.target.className = "edit";
                            this.setState({
                              showNote: true,
                              note:
                                e.target.getAttribute("type") === "note"
                                  ? e.target.getAttribute("text")
                                  : e.target.parentElement.getAttribute("text"),
                            });
                          }
                          if (e.target.id === "id") {
                            if (this.state.total > 0) {
                              const res2 = await this.onMouseClick(e);
                            } else if (
                              this.state.total == 0 ||
                              this.state.total == null
                            ) {
                              const res3 = await this.onReveal(e);
                            }
                          }
                          if (this.state.shown) {
                            setTimeout(() => {
                              const res2 = createTextEditorResult();
                            }, 3000);
                          }
                        }}
                      >
                        {renderHTML(this.state.text)}
                      </div>
                    )}
                  </Mutation>
                </EditText>
              </TextBar>
              <Buttons>
                <StyledButton
                  onClick={this.onShow}
                  variant="contained"
                  color="primary"
                >
                  {this.state.mistakesShown ? "Hide mistakes" : "Show mistakes"}
                </StyledButton>
                {me &&
                (me.id === textEditor.user.id ||
                  me.permissions.includes("ADMIN")) &&
                !story ? (
                  <DeleteSingleTextEditor
                    id={this.props.textEditor.id}
                    lessonID={this.props.lessonID}
                  />
                ) : null}
                {me &&
                  (me.id === textEditor.user.id ||
                    me.permissions.includes("ADMIN")) &&
                  !story && (
                    <StyledButton
                      onClick={(e) =>
                        this.setState((prev) => ({ update: !prev.update }))
                      }
                    >
                      Изменить
                    </StyledButton>
                  )}
              </Buttons>
            </div>
          )}
          <WindowColumn>
            {this.state.showNote && (
              <Window>
                <div className="questionBox">
                  <IconBlock>
                    <div className="nameBlock">
                      <img className="icon" src="../../static/hipster.svg" />
                      <div className="name">BeSavvy</div>
                    </div>
                    <div
                      className="cancelBlock"
                      onClick={(e) => this.setState({ showNote: false })}
                    >
                      <img className="cancel" src="../../static/cancel.svg" />
                    </div>
                  </IconBlock>
                </div>
                <div className="answerBox">
                  <Comment>{this.state.note}</Comment>
                </div>
              </Window>
            )}
            {this.state.showQuiz && (
              <Window>
                <div className="questionBox">
                  <IconBlock>
                    <div className="nameBlock">
                      <img className="icon" src="../../static/hipster.svg" />
                      <div className="name">BeSavvy</div>
                    </div>
                    <div
                      className="cancelBlock"
                      onClick={(e) => this.setState({ showQuiz: false })}
                    >
                      <img className="cancel" src="../../static/cancel.svg" />
                    </div>
                  </IconBlock>
                  <div>{this.state.quiz.question}</div>
                </div>
                <div className="answerBox">
                  <Input
                    color={this.state.quiz_result}
                    onChange={(e) => {
                      this.setState({ quiz_guess: e.target.value });
                    }}
                  />
                  <button onClick={this.quizCheck}>Ответить</button>
                  {this.state.quiz_result === false && (
                    <Comment>{this.state.quiz.ifWrong}</Comment>
                  )}
                  {this.state.quiz_result === true && (
                    <Comment>{this.state.quiz.ifRight}</Comment>
                  )}
                </div>
              </Window>
            )}
          </WindowColumn>
        </Styles>
        {this.state.update && (
          <UpdateTextEditor
            lessonID={lessonID}
            id={this.props.textEditor.id}
            text={this.state.text}
            complexity={complexity}
            totalMistakes={this.state.total}
          />
        )}
      </>
    );
  }
}

SingleTextEditor.propTypes = {
  lessonID: PropTypes.string.isRequired,
  textEditor: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};

export default SingleTextEditor;
