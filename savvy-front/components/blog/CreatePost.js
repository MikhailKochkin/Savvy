import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { POSTS_QUERY } from "./Blog";

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $text: String!
    $title: String!
    $summary: String
    $image: String
  ) {
    createPost(text: $text, title: $title, summary: $summary, image: $image) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 100px;
  width: 50%;
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
  @media (max-width: 900px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 400px;
  object-fit: cover;
  margin: 3% 0;
`;

const Editor = styled.div`
  margin-top: 1%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const CreatePost = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false);

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
          summary: summary,
          image: image,
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
            <textarea
              type="text"
              id="summary"
              placeholder="Описание поста"
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
            {upload && "Загружаем.."}
            <Img src={image} alt="Upload Preview" />
            <Editor>
              <DynamicLoadedEditor getEditorText={myCallback} />
            </Editor>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createPost();
                alert("Сохранили!");
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
