import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION(
    $id: String!
    $text: String
    $complexity: Int
    $isSecret: Boolean
  ) {
    updateNote(
      id: $id
      text: $text
      complexity: $complexity
      isSecret: $isSecret
    ) {
      id
      text
      next
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

const Complexity = styled.div`
  select,
  option {
    width: 80%;
    border-radius: 5px;
    margin-top: 3%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
    margin-bottom: 10px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateNote = (props) => {
  const [text, setText] = useState(props.text);
  const [show, setShow] = useState(false);
  const [isSecret, setIsSecret] = useState(props.isSecret);

  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );

  const getText = (d) => setText(d);

  const { id, lessonID } = props;
  return (
    <>
      <Container>
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
          <select
            defaultValue={isSecret}
            onChange={(e) => setIsSecret(e.target.value == "true")}
          >
            <option value={"true"}>Секретный</option>
            <option value={"false"}>Открытый</option>
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
        <button onClick={(e) => setShow(!show)}>
          {show ? "Закрыть" : "Открыть редактор"}
        </button>
        {show && <DynamicLoadedEditor getEditorText={getText} value={text} />}
        <Mutation
          mutation={UPDATE_NOTE_MUTATION}
          variables={{
            id,
            text,
            complexity,
            isSecret,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateNote, { loading, error }) => (
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateNote();
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

export default UpdateNote;
