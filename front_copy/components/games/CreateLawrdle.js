import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

const CREATE_LAWRDLE_MUTATION = gql`
  mutation CREATE_LAWRDLE_MUTATION(
    $word: String
    $story: String
    $buttonText: String
    $link: String
    $authorId: String
    $coursePageId: String
    $active: Boolean
    $tags: [String]
  ) {
    createLawrdle(
      word: $word
      story: $story
      buttonText: $buttonText
      link: $link
      authorId: $authorId
      coursePageId: $coursePageId
      tags: $tags
      active: $active
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 500px;
  margin-left: 50px;
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
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateLawrdle = (props) => {
  const [word, setWord] = useState("");
  const [story, setStory] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [coursePageId, setCoursePageId] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState();
  const [id, setId] = useState();

  const [createLawrdle, { data, loading, error }] = useMutation(
    CREATE_LAWRDLE_MUTATION
  );

  const myCallback2 = (dataFromChild, name) => {
    setStory(dataFromChild);
  };

  return (
    <Styles>
      <div id="root"></div>
      <>
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Frame>
          <DynamicHoverEditor
            index={1}
            name="story"
            getEditorText={myCallback2}
            placeholder="История автора"
          />
        </Frame>
        <input
          className="second"
          type="text"
          placeholder="Текст на кнопке"
          required
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
        <br />
        <input
          className="second"
          type="text"
          placeholder="Ссылка"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <input
          className="model"
          onChange={(e) => setAuthorId(e.target.value)}
          value={authorId}
          placeholder="authorId"
        />
        <br />
        <input
          className="model"
          onChange={(e) => setCoursePageId(e.target.value)}
          value={coursePageId}
          placeholder="coursePageId"
        />
        <br />
        <input
          className="second"
          type="text"
          placeholder="Запишите теги, через запятую без пробелов: тег1,тег2,тег3"
          required
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Buttons>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const res = await createLawrdle({
                variables: {
                  word: word,
                  story: story,
                  link: link,
                  buttonText: buttonText,
                  authorId: authorId,
                  tags: tags.split(","),
                  coursePageId: coursePageId,
                  active: false,
                },
              });
              setId(res.data.createLawrdle.id);
            }}
          >
            {loading ? "Создаем..," : "Создать"}
          </Button>
          {id && <div>{`besavvy.app/game?id=${id}`}</div>}
        </Buttons>
      </>
    </Styles>
  );
};

export default CreateLawrdle;
