import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $wrong: String!
    $correct: String!
    $guess: String!
    $lesson: ID
    $textEditor: ID
    $result: Boolean
  ) {
    createTextEditorResult(
      attempts: $attempts
      wrong: $wrong
      correct: $correct
      guess: $guess
      lesson: $lesson
      textEditor: $textEditor
      result: $result
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  width: 98%;
  font-size: 1.6rem;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.4rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
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
`;

const EditText = styled.div`
  /* font-family: Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif;  */
`;

const Hint = styled.div`
  position: -webkit-sticky;
  position: sticky;
  padding: 1.5% 3%;
  margin: 20px 2% 0 0%;
  background: white;
  top: 20px;
  z-index: 3;
  border: 1px solid #c0d6df;
  border-radius: 10px;
  width: 100%;
  button {
    background: none;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0;
    margin: 0;
    margin-right: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const Input = styled.input`
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #edefed;
  outline: 0;
  font-size: 1.6rem;
  font-family: Montserrat;
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
    show: false,
    attempts: 0,
    total: this.props.textEditor.totalMistakes,
    text: this.props.textEditor.text,
    update: false,
    recieved: [],
  };

  check = async () => {
    let data = {
      sentence1: this.state.answer.toLowerCase(),
      sentence2: this.state.correct_option.toLowerCase(),
    };
    const r = await fetch("https://dry-plains-91452.herokuapp.com/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res > 0.59) {
          this.setState({
            result: true,
            inputColor: "rgba(50, 172, 102, 0.5)",
          });
        } else {
          this.setState({
            result: false,
            inputColor: "rgba(222, 107, 72, 0.5)",
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
    if (e.target.className === this.props.textEditor.id) {
      // if (this.state.total !== null && this.state.total > 0) {
      e.target.style.backgroundColor = "#FDF3C8";
      e.target.style.padding = "0.8%";
      e.target.style.borderRadius = "8px";
      // }
      // console.log(this.props.textEditor.text, !this.state.shown);
      this.setState({
        shown: true,
        show: false,
        answer: "",
        correct_option: e.target.getAttribute("data"),
        wrong_option: e.target.innerHTML,
      });
    }
  };

  onConceal = (e) => {
    this.setState({
      shown: false,
      show: false,
    });
    e.currentTarget.style.textDecorationLine = null;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onShow = () => {
    const mistakes = document
      .getElementById(this.props.textEditor.id)
      .querySelectorAll("#id");
    this.setState((prevState) => ({ mistakesShown: !prevState.mistakesShown }));
    if (!this.state.mistakesShown) {
      mistakes.forEach(
        (mistake) => (mistake.style.backgroundColor = "#F0C40F")
      );
      mistakes.forEach((mistake) => (mistake.style.padding = "0.8%"));
      mistakes.forEach((mistake) => (mistake.style.borderRadius = "8px"));
    } else if (this.state.mistakesShown) {
      mistakes.forEach((mistake) => (mistake.style = null));
    }
  };
  componentDidMount() {
    const elements = document
      .getElementById(this.props.textEditor.id + 1)
      .querySelectorAll("#id");
    elements.forEach(
      (element) => (
        (element.className = this.props.textEditor.id),
        element.addEventListener("click", this.onMouseClick)
      )
    );
  }
  render() {
    const { textEditor, me, userData, lesson, story } = this.props;
    let data;
    me
      ? (data = userData
          .filter((result) => result.textEditor.id === textEditor.id)
          .filter((result) => result.student.id === me.id))
      : (data = [""]);
    return (
      <div id={textEditor.id + 1}>
        {!this.state.update && (
          <>
            <TextBar id={textEditor.id}>
              {this.state.shown && (
                <Hint>
                  <div>
                    {this.state.total > 0 && (
                      <>
                        {!this.state.show && (
                          <>
                            Ваш вариант:
                            <Input
                              type="text"
                              name="answer"
                              required
                              onChange={this.handleChange}
                            />
                          </>
                        )}
                        {this.state.show && (
                          <span>
                            Правильный ответ:{" "}
                            {this.state.show && this.state.correct_option}
                          </span>
                        )}
                      </>
                    )}
                    {(this.state.total === 0 ||
                      this.state.total === undefined ||
                      this.state.total === null) &&
                      this.state.correct_option}
                  </div>

                  {this.state.total > 0 && (
                    <Mutation
                      mutation={CREATE_TEXTEDITORRESULT_MUTATION}
                      variables={{
                        lesson: this.props.lessonID,
                        textEditor: this.props.textEditor.id,
                        attempts: this.state.attempts,
                        correct: this.state.correct_option,
                        wrong: this.state.wrong_option,
                        guess: this.state.answer,
                        result: this.state.result,
                      }}
                      refetchQueries={() => [
                        {
                          query: CURRENT_USER_QUERY,
                        },
                      ]}
                    >
                      {(createTextEditorResult, { loading, error }) => (
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            this.state.answer !== ""
                              ? this.setState((prevState) => ({
                                  show: !prevState.show,
                                }))
                              : alert("Дайте свой вариант!");
                            console.log(1);
                            const res0 = await this.check();
                            if (
                              data.length === 0 &&
                              !this.state.recieved.includes(this.state.answer)
                            ) {
                              console.log(2);
                              const res = await createTextEditorResult();
                            }
                            this.setState((prevState) => ({
                              recieved: [
                                ...prevState.recieved,
                                this.state.answer.toLowerCase(),
                              ],
                            }));
                            console.log(3);
                          }}
                        >
                          Ответить
                        </button>
                      )}
                    </Mutation>
                  )}
                  <button onClick={this.onConceal}>Скрыть</button>
                </Hint>
              )}
              <EditText>
                <div onClick={this.onTest}>{renderHTML(this.state.text)}</div>
                {this.state.total === this.state.revealed ? (
                  <Right>Задание выполнено!</Right>
                ) : null}
              </EditText>
            </TextBar>
            <Buttons>
              {/* {this.state.total > 1 && ( */}
              <StyledButton
                onClick={this.onShow}
                variant="contained"
                color="primary"
              >
                {this.state.mistakesShown ? "Скрыть ошибки" : "Проверить"}
              </StyledButton>
              {/* )} */}
              {me && me.id === textEditor.user.id && !story ? (
                <DeleteSingleTextEditor
                  id={this.props.textEditor.id}
                  lessonID={this.props.lessonID}
                />
              ) : null}
              {me && me.id === textEditor.user.id && !story && (
                <StyledButton
                  onClick={(e) =>
                    this.setState((prev) => ({ update: !prev.update }))
                  }
                >
                  Изменить
                </StyledButton>
              )}
            </Buttons>
          </>
        )}
        {this.state.update && (
          <UpdateTextEditor
            lessonID={this.props.lessonID}
            id={this.props.textEditor.id}
            text={this.state.text}
            totalMistakes={this.state.total}
          />
        )}
      </div>
    );
  }
}

SingleTextEditor.propTypes = {
  lessonID: PropTypes.string.isRequired,
  textEditor: PropTypes.object.isRequired,
  // id: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};

export default SingleTextEditor;
