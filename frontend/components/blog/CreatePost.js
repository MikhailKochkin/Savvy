import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { POSTS_QUERY } from "./Blog";

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($text: String!, $title: String!) {
    createPost(text: $text, title: $title) {
      id
    }
  }
`;

const Styles = styled.div`
  input {
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.4rem;
  }
  .new {
    font-size: 1.8rem;
    margin-bottom: 3%;
    font-weight: bold;
    margin-top: 5%;
  }
`;

const Editor = styled.div`
  margin-top: 1%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const CreatePost = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };
  return (
    <Styles>
      <Mutation
        mutation={CREATE_POST_MUTATION}
        variables={{
          text: text,
          title: title,
        }}
        refetchQueries={() => [
          {
            query: POSTS_QUERY,
          },
        ]}
      >
        {(createPost, { loading, error }) => (
          <>
            <div className="new">Новый блог</div>
            <input
              type="text"
              id="title"
              placeholder="Название поста"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Editor>
              <DynamicLoadedEditor getEditorText={myCallback} />
            </Editor>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createPost();
                console.log(1);
              }}
            >
              Отправить
            </button>
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreatePost;
