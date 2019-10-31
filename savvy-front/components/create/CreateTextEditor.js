import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_TEXTEDITOR_MUTATION = gql`
  mutation CREATE_TEXTEDITOR_MUTATION(
    $name: String!
    $text: String!
    $totalMistakes: Int
    $lessonID: ID!
  ) {
    createTextEditor(
      name: $name
      text: $text
      totalMistakes: $totalMistakes
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const Width = styled.div`
  width: 90%;
  margin-bottom: 3%;
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 20%;
  font-weight: 600;
  color: #fffdf7;
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 1%;
  @media (max-width: 800px) {
    width: 70%;
  }
  input {
    width: 60px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 1%;
    font-size: 1.4rem;
    margin: 4% 2%;
    text-align: center;
    @media (max-width: 800px) {
    }
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 2%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/TextEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class CreateTextEditor extends Component {
  state = {
    name: "Test",
    text: "",
    totalMistakes: 0
  };

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { lessonID } = this.props;
    return (
      <Width>
        <Title>Составьте свой редактор документа</Title>
        <Label>
          <p>Всего ошибок / рисков: </p>
          <input
            spellcheck={true}
            id="totalMistakes"
            name="totalMistakes"
            value={this.state.totalMistakes}
            onChange={this.handleChange}
          />
        </Label>
        <DynamicLoadedEditor getEditorText={this.myCallback} />

        <Mutation
          mutation={CREATE_TEXTEDITOR_MUTATION}
          variables={{
            lessonID: lessonID,
            totalMistakes: parseInt(this.state.totalMistakes),
            text: this.state.text,
            name: this.state.name
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID }
            }
          ]}
          awaitRefetchQueries={true}
        >
          {(createTextEditor, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                document.getElementById("Message").style.display = "block";
                setTimeout(() => {
                  document.getElementById("Message")
                    ? (document.getElementById("Message").style.display =
                        "none")
                    : "none";
                }, 3000);
                // call the mutation
                const res = await createTextEditor();
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
        <Message id="Message">Вы создали новый редактор!</Message>
      </Width>
    );
  }
}
