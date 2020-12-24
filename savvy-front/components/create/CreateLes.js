import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CURRENT_USER_QUERY } from "../User";

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $name: String!
    $number: Int
    $text: String!
    $description: String!
    $coursePageID: String!
  ) {
    createLesson(
      name: $name
      number: $number
      text: $text
      description: $description
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2%;
  div {
    font-weight: bold;
    color: #112a62;
    margin-left: 15px;
    padding: 10px;
    cursor: pointer;
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

const Frame = styled.div`
  height: 60%;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin-left: 0.6%;
  }
`;

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const CreateLes = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");

  const [createLesson, { data, loading, error }] = useMutation(
    CREATE_LESSON_MUTATION
  );

  const myCallback2 = (dataFromChild, name) => {
    setDescription(dataFromChild);
  };

  return (
    <>
      <div id="root"></div>
      <>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          id="number"
          name="number"
          placeholder="Номер"
          onChange={(e) => setNumber(e.target.value)}
        />

        <Frame>
          <DynamicHoverEditor
            index={1}
            name="description"
            getEditorText={myCallback2}
            placeholder="Описание"
          />
        </Frame>
        <Buttons>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const res = await createLesson({
                variables: {
                  coursePageID: props.id,
                  name: name,
                  description: description,
                  number: parseInt(number),
                  text: "Введение",
                },
                refetchQueries: [{ query: CURRENT_USER_QUERY }],
              });
              console.log(res);
              Router.push({
                pathname: "/lesson",
                query: {
                  id: res.data.createLesson.id,
                  type: "regular",
                },
              });
            }}
          >
            {loading ? "Сохраняем..." : "Cохранить"}
          </Button>
          <Link
            href={{
              pathname: "/coursePage",
              query: { id: props.id },
            }}
          >
            <div>Вернуться на страницу урока</div>
          </Link>
        </Buttons>
      </>
    </>
  );
};

export default CreateLes;
