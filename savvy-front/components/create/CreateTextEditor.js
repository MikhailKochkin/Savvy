import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NavButton, SubmitButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
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
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 25%;
  margin-bottom: 1%;
  @media (max-width: 800px) {
    width: 60%;
  }
`;

const Input = styled.input`
  width: 20%;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3.5px;
  padding: 2%;
  font-size: 1.4rem;
  margin: 2% 0;
  text-align: center;
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
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Width>
            <Link
              href={{
                pathname: "/lesson",
                query: { id: this.props.id }
              }}
            >
              <a>
                <NavButton>К уроку</NavButton>
              </a>
            </Link>
            <h2>Составьте свой редактор документа</h2>
            <Label>
              <p>Всего ошибок / рисков: </p>
              <Input
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
                lessonID: id,
                totalMistakes: parseInt(this.state.totalMistakes),
                text: this.state.text,
                name: this.state.name
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id }
                }
              ]}
              awaitRefetchQueries={true}
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
