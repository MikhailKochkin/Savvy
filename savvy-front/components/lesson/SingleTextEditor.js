import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import DeleteSingleTextEditor from "../delete/DeleteSingleTextEditor";
import Right from "./Right";

import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import { CURRENT_USER_QUERY } from "../User";

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

const Center = styled.div`
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBar = styled.div`
  width: 80%;
  font-size: 1.8rem;
  padding: 0 2%;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const EditText = styled.div`
  font-family: Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua,
    Georgia, serif;
`;

const Hint = styled.div`
  position: -webkit-sticky;
  position: sticky;
  padding: 0 2%;
  margin: 0 2% 0 0%;
  background: white;
  top: 20px;
  border: 1px solid #c0d6df;
  border-radius: 10px;
  width: 100%;
  div {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
`;

const Button = styled.button`
  padding: 1% 2%;
  background: #f79101;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2%;
  width: 40%;
  cursor: pointer;
  &:hover {
    background: #f26915;
  }
  @media (max-width: 750px) {
    margin: 2%;
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
      // console.log(e.target.innerHTML);
      e.target.style.backgroundColor = "#ffa64d";
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
    // console.log(this.props);
    const { textEditor, me, userData } = this.props;
    const data = userData.filter(
      result => result.textEditor.id === textEditor.id
    );
    // console.log(this.state.total > 0 && this.state.tital !== null);
    return (
      <Center>
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
        {this.state.total > 0 && this.state.total !== null && (
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
                  <button
                    onClick={async e => {
                      e.preventDefault();
                      this.onShow;
                      const res = await createTextEditorResult();
                      // console.log("Ответ сохранен!");
                    }}
                  >
                    Показать все ошибки/риски
                  </button>
                )}
              </Mutation>
            )}
            {data.length > 0 && (
              <button onClick={this.onShow}>Показать все ошибки/риски</button>
            )}
          </>
        )}
        <br />

        {me && me.id === textEditor.user.id ? (
          <DeleteSingleTextEditor id={this.props.textEditor.id} />
        ) : null}
      </Center>
    );
  }
}

export default SingleTextEditor;
