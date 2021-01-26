import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Option from "../Option";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_TEXTEDITOR_MUTATION = gql`
  mutation UPDATE_TEXTEDITOR_MUTATION(
    $id: String!
    $name: String
    $text: String
    $totalMistakes: Int
  ) {
    updateTextEditor(
      id: $id
      name: $name
      text: $text
      totalMistakes: $totalMistakes
    ) {
      id
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  margin: 1% 0 0 0;
  margin-top: 5%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
  grid-template-areas:
    "explain"
    "first   ";
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  input {
    padding: 0.5%;
    height: 75%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  padding: 0.5% 1%;
  background: ${(props) => props.theme.green};
  width: 25%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 2%;
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

const DynamicLoadedEditor = dynamic(import("../../editor/UpdateTextEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const UpdateTextEditor = (props) => {
  const [text, setText] = useState(props.text);
  const [mistakes, setMistakes] = useState(props.totalMistakes);
  const getText = (d) => setText(d);
  const { id, lessonID } = props;
  return (
    <>
      <Container>
        <Title>Исправьте редактор документа</Title>
        <Label>
          <p>Всего ошибок / рисков: </p>
          <input
            type="number"
            spellcheck={true}
            id="totalMistakes"
            name="totalMistakes"
            defaultValue={mistakes}
            onChange={(e) => setMistakes(e.target.value)}
          />
        </Label>
        <DynamicLoadedEditor getEditorText={getText} previousText={text} />
        <Mutation
          mutation={UPDATE_TEXTEDITOR_MUTATION}
          variables={{
            id: id,
            text: text,
            totalMistakes: parseInt(mistakes),
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateTextEditor, { loading, error }) => (
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                console.log("1");
                const res = await updateTextEditor();
                console.log("2");
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
      </Container>
    </>
  );
};

export default UpdateTextEditor;
