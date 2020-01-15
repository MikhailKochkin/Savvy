import React, { Component } from "react";
import styled, { consolidateStreamedStyles } from "styled-components";
import renderHTML from "react-render-html";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $revealed: [Json]
    $lessonID: ID
    $textEditorID: ID
  ) {
    createTextEditorResult(
      attempts: $attempts
      revealed: $revealed
      lessonID: $lessonID
      textEditorID: $textEditorID
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
  margin: 0 2% 0 0%;
  background: white;
  top: 20px;
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
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none"
  }
})(Button);

class SingleTextEditor extends Component {
  state = {
    shown: false,
    mistakesShown: false,
    answer: "",
    correct_option: "",
    wrong_option: "",
    show: false,
    revealed: [],
    attempts: 0,
    answers: [],
    total: this.props.textEditor.totalMistakes,
    text: this.props.textEditor.text
  };

  onCheck = e => {
    let a = {
      wrong_variant: this.state.wrong_option,
      student_variant: this.state.answer,
      correct_variant: this.state.correct_option
    };
    this.setState(prevState => ({
      show: !prevState.show,
      answers: [...prevState.answers, this.state.answer],
      revealed: [...prevState.revealed, a]
    }));
  };

  onTest = e => {
    this.setState(prevState => ({
      attempts: prevState.attempts + 1
    }));
  };

  onMouseClick = e => {
    if (this.state.total !== null && this.state.total > 0) {
      e.target.style.backgroundColor = "#FDF3C8";
      e.target.style.padding = "0.8%";
      e.target.style.borderRadius = "8px";
    }
    this.setState({
      shown: true,
      show: false,
      correct_option: e.target.getAttribute("data"),
      wrong_option: e.target.innerHTML
    });
  };

  onConceal = e => {
    this.setState({
      shown: false,
      show: false
    });
    e.currentTarget.style.textDecorationLine = null;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onShow = () => {
    const mistakes = document.querySelectorAll("#id");
    this.setState(prevState => ({ mistakesShown: !prevState.mistakesShown }));
    if (!this.state.mistakesShown) {
      mistakes.forEach(mistake => (mistake.style.backgroundColor = "#F0C40F"));
      mistakes.forEach(mistake => (mistake.style.padding = "0.8%"));
      mistakes.forEach(mistake => (mistake.style.borderRadius = "8px"));
    } else if (this.state.mistakesShown) {
      mistakes.forEach(mistake => (mistake.style = null));
    }
  };
  componentDidMount() {
    const elements = document.querySelectorAll("#id");
    elements.forEach(element =>
      element.addEventListener("click", this.onMouseClick)
    );
  }
  render() {
    const { textEditor, me, userData } = this.props;
    const data = userData
      .filter(result => result.textEditor.id === textEditor.id)
      .filter(result => result.student.id === me.id);
    return (
      <>
        <TextBar>
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
                {(this.state.total === 0 || this.state.total === null) &&
                  this.state.correct_option}
              </div>
              {this.state.total > 0 && (
                <button onClick={this.onCheck}>Ответить</button>
              )}
              <button onClick={this.onConceal}>Скрыть подсказку</button>
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
          {data.length === 0 && this.state.total > 0 && (
            <Mutation
              mutation={CREATE_TEXTEDITORRESULT_MUTATION}
              variables={{
                lessonID: this.props.lessonID,
                attempts: this.state.attempts,
                revealed: this.state.revealed,
                textEditorID: this.props.textEditor.id
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: this.props.lessonID }
                },
                {
                  query: CURRENT_USER_QUERY
                }
              ]}
            >
              {(createTextEditorResult, { loading, error }) => (
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={async e => {
                    e.preventDefault();
                    this.onShow();
                    const res = await createTextEditorResult();
                  }}
                >
                  {this.state.mistakesShown ? "Скрыть ошибки" : " Сохранить"}
                </StyledButton>
              )}
            </Mutation>
          )}
          {data.length > 0 && (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={this.onShow}
            >
              {this.state.mistakesShown ? "Скрыть ошибки" : "Проверить"}
            </StyledButton>
          )}
          {me && me.id === textEditor.user.id ? (
            <DeleteSingleTextEditor
              id={this.props.textEditor.id}
              lessonID={this.props.lessonID}
            />
          ) : null}
        </Buttons>
      </>
    );
  }
}

export default SingleTextEditor;
