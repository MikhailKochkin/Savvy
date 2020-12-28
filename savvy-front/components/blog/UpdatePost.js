import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { POSTS_QUERY } from "./Blog";

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $text: String) {
    updatePost(id: $id, text: $text) {
      id
      text
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const UpdatePost = (props) => {
  const [text, setText] = useState(props.text);
  const getText = (d) => setText(d);
  const { id } = props;

  return (
    <div>
      <DynamicLoadedEditor getEditorText={getText} previousText={text} />
      <Mutation
        mutation={UPDATE_POST_MUTATION}
        variables={{
          id: id,
          text: text,
        }}
        refetchQueries={() => [
          {
            query: POSTS_QUERY,
          },
        ]}
      >
        {(updatePost, { loading, error }) => (
          <button
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await updatePost();
            }}
          >
            {loading ? "Сохраняем..." : "Сохранить"}
          </button>
        )}
      </Mutation>
    </div>
  );
};

export default UpdatePost;
