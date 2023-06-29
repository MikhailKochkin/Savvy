import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION(
    $id: String!
    $text: String
    $complexity: Int
    $isSecret: Boolean
    $type: String
  ) {
    updateNote(
      id: $id
      text: $text
      complexity: $complexity
      isSecret: $isSecret
      type: $type
    ) {
      id
      text
      next
    }
  }
`;

const Container = styled.div`
  width: 600px;
  margin: 1% 0 0 0;
  margin: 5% 0;
  display: flex;
  flex-direction: column;
  .switch_button {
    width: 100px;
    margin-bottom: 10px;
  }
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
    margin: 15px 0;
    width: 90%;
    font-family: "Courier New", Courier, monospace;
    padding: 1%;
  }

  input {
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  width: 150px;
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
  const [type, setType] = useState("longread");
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );

  const getText = (d) => setText(d);
  const { t } = useTranslation("lesson");

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    alert(file.secure_url);
    e.target.value = null;
  };

  const { id, lessonID } = props;
  return (
    <>
      <Container>
        {/* <Complexity> */}
        {/* <select
            value={complexity}
            onChange={(e) => setComplexity(parseInt(e.target.value))}
          >
            <option value={0}>Выберите сложность</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select> */}
        {/* <select
            defaultValue={isSecret}
            onChange={(e) => setIsSecret(e.target.value == "true")}
          >
            <option value={"true"}>Секретный</option>
            <option value={"false"}>Открытый</option>
          </select> */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value={"longread"}>Выберите тип материала</option>
          <option value={"longread"}>Лонгрид</option>
          <option value={"email"}>Имейл</option>
        </select>
        {/* <select
            defaultValue={isSecret}
            onChange={(e) => setIsSecret(e.target.value == "true")}
          >
            <option value={"true"}>Секретный</option>
            <option value={"false"}>Открытый</option>
          </select>
          npx prisma migrate up --experimentalz
        </Complexity>
        {/* <button>
          <a
            href="https://codebeautify.org/html-table-generator"
            target="_blank"
          >
            Создать таблицу
          </a>
        </button> */}
        <button className="switch_button" onClick={(e) => setShow(!show)}>
          {show ? t("close") : t("open")}
        </button>

        {show && <DynamicLoadedEditor getEditorText={getText} value={text} />}
        <h3>HTML</h3>
        <textarea onChange={(e) => setText(e.target.value)}>{text}</textarea>

        <Mutation
          mutation={UPDATE_NOTE_MUTATION}
          variables={{
            id,
            text,
            complexity,
            isSecret,
            type,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateNote, { loading, error }) => (
            <ButtonTwo
              onClick={async (e) => {
                e.preventDefault();
                const res = await updateNote();
                props.getResult(res);
                props.switchUpdate();
                props.passUpdated();
              }}
            >
              {loading ? t("saving") : t("save")}
            </ButtonTwo>
          )}
        </Mutation>
      </Container>
    </>
  );
};

export default UpdateNote;
