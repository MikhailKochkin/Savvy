import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_NOTE_MUTATION = gql`
  mutation CREATE_NOTE_MUTATION($text: String!, $lessonID: ID!) {
    createNote(text: $text, lessonID: $lessonID) {
      id
    }
  }
`;

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

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 23%;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 850px) {
    width: 40%;
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

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
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
        <Advice>
          Напишите новый лонгрид. Количество лонгридов внутри одного урока не
          ограничено. В лонгрид можно добавлять текст, картинки, таблицы и
          видео. Картинки и видео добавляются только по ссылкам!
        </Advice>
        <Title>Новый лонгрид</Title>
        <Editor>
          <DynamicLoadedEditor getEditorText={this.myCallback} />
        </Editor>
        <Mutation
          mutation={CREATE_NOTE_MUTATION}
          variables={{
            lessonID: lessonID,
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
            <Button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createNote();
                document.getElementById("Message").style.display = "block";
                setTimeout(function () {
                  document.getElementById("Message")
                    ? (document.getElementById("Message").style.display =
                        "none")
                    : "none";
                }, 1500);
              }}
            >
              {loading ? "Сохраняем..." : "Cохранить"}
            </Button>
          )}
        </Mutation>
        <Message id="Message">Вы создали новую заметку!</Message>
      </Container>
    );
  }
}
