import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $revealed: [String!]
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
  width: 80%;
  font-size: 1.6rem;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
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
  /* div {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  } */
  button {
    background: none;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0;
    margin: 0;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  padding: 1.5% 2%;
  background: ${props => props.theme.green};
  width: 35%;
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
    width: 50%;
  }
`;

class SingleTextEditor extends Component {
  state = {
    shown: false,
    mistakesShown: false,
    answer: "",
    revealed: [],
    attempts: 0,
    total: this.props.textEditor.totalMistakes,
    text: this.props.textEditor.text
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
      if (e.target.title !== "Здесь все вроде бы в порядке..") {
        if (!this.state.revealed.includes(e.target.innerHTML)) {
          this.setState(prevState => ({
            revealed: [...prevState.revealed, e.target.innerHTML]
          }));
        }
      }
    }
    this.setState({
      shown: true,
      answer: e.target.title
    });
  };

  onConceal = e => {
    this.setState({
      shown: false
    });
    e.currentTarget.style.textDecorationLine = null;
  };

  onShow = () => {
    const mistakes = document.querySelectorAll("#id");
    this.setState(prevState => ({ mistakesShown: !prevState.mistakesShown }));
    console.log(this.state.mistakesShown);
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
    console.log(data);
    return (
      <>
        <TextBar>
          {this.state.shown && (
            <Hint>
              <div>{this.state.answer}</div>
              <button onClick={this.onConceal}>Скрыть подсказку</button>
            </Hint>
          )}
          <EditText>
            <div onClick={this.onTest}>{renderHTML(this.state.text)}</div>
            {/* {this.state.total !== 0 && <p><strong>Всего рисков/ошибок:</strong> {this.state.total} </p>} */}
            {this.state.total === this.state.revealed ? (
              <Right>Задание выполнено!</Right>
            ) : null}
          </EditText>
        </TextBar>
        <>
          {data.length === 0 && (
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
                <Button
                  onClick={async e => {
                    e.preventDefault();
                    this.onShow();
                    const res = await createTextEditorResult();
                    console.log("Ответ сохранен!");
                  }}
                >
                  {this.state.mistakesShown
                    ? "Скрыть ошибки"
                    : "Показать ошибки"}
                </Button>
              )}
            </Mutation>
          )}
          {data.length > 0 && (
            <Button onClick={this.onShow}>
              {this.state.mistakesShown ? "Скрыть ошибки" : "Показать ошибки"}
            </Button>
          )}
        </>
        {me && me.id === textEditor.user.id ? (
          <DeleteSingleTextEditor
            id={this.props.textEditor.id}
            lessonID={this.props.lessonID}
          />
        ) : null}
      </>
    );
  }
}

export default SingleTextEditor;
