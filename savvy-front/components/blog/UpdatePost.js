import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { POSTS_QUERY } from "./Blog";

const Styles = styled.div`
  width: 540px;
  input,
  textarea {
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    outline: 0;
    font-family: Montserrat;
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

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin: 3% 0;
`;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION(
    $id: String!
    $title: String
    $text: String
    $summary: String
    $image: String
    $tags: [String]
  ) {
    updatePost(
      id: $id
      text: $text
      summary: $summary
      image: $image
      title: $title
      tags: $tags
    ) {
      id
      text
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdatePost = (props) => {
  const [text, setText] = useState(props.text);
  const [title, setTitle] = useState(props.title);
  const [summary, setSummary] = useState(props.summary);
  const [image, setImage] = useState(props.image);
  const [tags, setTags] = useState(props.tags);
  const [upload, setUpload] = useState(false);
  const getText = (d) => setText(d);
  const { id } = props;

  const uploadFile = async (e) => {
    setUpload(true);
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
    setImage(file.secure_url);
    setUpload(false);
  };

  return (
    <Styles>
      <input
        type="text"
        id="title"
        placeholder="Название поста"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        id="summary"
        placeholder="Описание поста"
        defaultValue={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        className="second"
        type="file"
        id="file"
        name="file"
        placeholder="Загрузите изображение..."
        onChange={uploadFile}
      />
      <input
        className="second"
        type="text"
        placeholder="Запишите теги, через запятую без пробелов: тег1,тег2,тег3"
        required
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Img src={image} alt="Upload Preview" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <DynamicLoadedEditor
        getEditorText={getText}
        previousText={text}
        value={text}
      />

      <Mutation
        mutation={UPDATE_POST_MUTATION}
        variables={{
          id: id,
          text: text,
          title: title,
          summary: summary,
          image: image,
          tags: tags,
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
    </Styles>
  );
};

export default UpdatePost;
