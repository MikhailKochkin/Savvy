import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_NOTE_MUTATION = gql`
  mutation CREATE_NOTE_MUTATION($text: String!, $lessonId: String!) {
    createNote(text: $text, lessonId: $lessonId) {
      id
      link_clicks
      complexity
      isSecret
      text
      next
      user {
        id
      }
    }
  }
`;

const Explainer = styled.div``;

const Container = styled.div`
  width: 95%;
  margin: 3% 0;
  input {
    height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #c4c4c4;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
  }
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`;

const Editor = styled.div`
  margin-top: 1%;
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default class CreateSingleNote extends Component {
  state = {
    text: "",
  };

  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };

  render() {
    const { lessonID } = this.props;
    return (
      <Container>
        <Explainer></Explainer>
        <Editor>
          <DynamicLoadedEditor getEditorText={this.myCallback} simple={true} />
        </Editor>
        <Mutation
          mutation={CREATE_NOTE_MUTATION}
          variables={{
            lessonId: lessonID,
            ...this.state,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
          awaitRefetchQueries={true}
        >
          {(createNote, { loading, error }) => (
            <ButtonTwo
              onClick={async (e) => {
                e.preventDefault();
                const res = await createNote();
                document.getElementById("Message").style.display = "block";
                this.props.getResult(res);
              }}
            >
              {loading ? "Сохраняем..." : "Cохранить"}
            </ButtonTwo>
          )}
        </Mutation>
        <Message id="Message">Готово</Message>
      </Container>
    );
  }
}
