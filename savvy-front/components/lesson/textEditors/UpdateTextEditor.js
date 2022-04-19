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
    $complexity: Int
  ) {
    updateTextEditor(
      id: $id
      name: $name
      text: $text
      totalMistakes: $totalMistakes
      complexity: $complexity
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
    /* font-weight: 700; */
  }
  p > a:hover {
    /* text-decoration: underline; */
  }
  textarea {
    height: 200px;
    margin: 40px 0;
    width: 90%;
    font-family: "Courier New", Courier, monospace;
    padding: 1%;
  }
  button {
    width: 150px;
    margin: 20px 0;
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

const Complexity = styled.div`
  select,
  option {
    width: 80%;
    border-radius: 5px;
    margin: 3% 0;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateTextEditor = (props) => {
  const [text, setText] = useState(props.text);
  const [mistakes, setMistakes] = useState(props.totalMistakes);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
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
        <Complexity>
          <select
            value={complexity}
            onChange={(e) => setComplexity(parseInt(e.target.value))}
          >
            <option value={0}>Выберите сложность</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </Complexity>
        <textarea onChange={(e) => setText(e.target.value)}>{text}</textarea>
        <button>
          <a
            href="https://codebeautify.org/html-table-generator"
            target="_blank"
          >
            Создать таблицу
          </a>
        </button>
        <DynamicLoadedEditor getEditorText={getText} value={text} />
        <Mutation
          mutation={UPDATE_TEXTEDITOR_MUTATION}
          variables={{
            id: id,
            text: text,
            complexity,
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
                const res = await updateTextEditor();
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
