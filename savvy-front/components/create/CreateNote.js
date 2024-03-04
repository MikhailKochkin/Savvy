import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const CREATE_NOTE_MUTATION = gql`
  mutation CREATE_NOTE_MUTATION(
    $text: String!
    $name: String
    $lessonId: String!
  ) {
    createNote(text: $text, name: $name, lessonId: $lessonId) {
      id
      link_clicks
      complexity
      isSecret
      text
      name
      next
      user {
        id
      }
    }
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 3% 0;
  /* input {
    height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #c4c4c4;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
  } */
  .image {
    /* height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #c4c4c4;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0; */
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

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateSingleNote = (props) => {
  const [name, setName] = useState();
  const [text, setText] = useState(
    props.initial_data?.content?.text ? props.initial_data.content.text : ""
  );
  const { t } = useTranslation("lesson");

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const { lessonID } = props;
  return (
    <Container>
      <NameInput
        onChange={(e) => setName(e.target.value)}
        defaultValue={name}
        placeholder="Untitled"
      />
      <Editor>
        <DynamicLoadedEditor
          value={text}
          getEditorText={myCallback}
          simple={true}
        />
      </Editor>
      <Mutation
        mutation={CREATE_NOTE_MUTATION}
        variables={{
          lessonId: lessonID,
          text,
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
              // document.getElementById("Message").style.display = "block";
              props.getResult(res);
            }}
          >
            {loading ? t("saving") : t("save")}
          </ButtonTwo>
        )}
      </Mutation>
      {/* <Message id="Message">Готово</Message> */}
    </Container>
  );
};

export default CreateSingleNote;
