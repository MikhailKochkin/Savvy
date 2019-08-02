import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import { SubmitButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";

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
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  .first {
    grid-area: first;
    text-align: center;
  }

  grid-template-areas: "first second";
  input {
    height: 50%;
    width: 80%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
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

  handleNumber = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = Math.round(value);
    this.setState({ [name]: val });
  };

  render() {
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Width>
            <h2>Составьте свой редактор документа</h2>
            <Label className="name" htmlFor="name">
              <p className="first">Количество ошибок или рисков в документе</p>
              <input
                type="number"
                id="totalMistakes"
                name="totalMistakes"
                placeholder="Количество ошибок..."
                value={this.state.totalMistakes}
                onChange={this.handleNumber}
              />
            </Label>
            <DynamicLoadedEditor getEditorText={this.myCallback} />

            <Mutation
              mutation={CREATE_TEXTEDITOR_MUTATION}
              variables={{
                lessonID: id,
                ...this.state
              }}
            >
              {(createTextEditor, { loading, error }) => (
                <SubmitButton
                  onClick={async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createTextEditor();
                    Router.push({
                      pathname: "/lesson",
                      query: { id: id }
                    });
                  }}
                >
                  Отправить на страницу курса
                </SubmitButton>
              )}
            </Mutation>
          </Width>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
