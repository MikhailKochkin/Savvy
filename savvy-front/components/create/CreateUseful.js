import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";

const CREATE_USEFUL_MUTATION = gql`
  mutation CREATE_USEFUL_MUTATION(
    $header: String!
    $link: String!
    $buttonText: String!
    $image: String!
    $tags: [String]
  ) {
    createUseful(
      header: $header
      link: $link
      buttonText: $buttonText
      image: $image
      tags: $tags
    ) {
      id
    }
  }
`;

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin: 3% 0;
`;

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 60%;
  margin: 3% 0;
  input {
    height: 40px;
    width: 90%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 1%;
    margin-left: 2%;
    margin-bottom: 2%;
    font-size: 1.4rem;
    outline: 0;
  }
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
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

const CreateUseful = () => {
  const [header, setHeader] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false);
  const [tags, setTags] = useState();
  const [pros, setPros] = useState([]);

  const [id, setId] = useState();

  const [createUseful, { data, loading, error }] = useMutation(
    CREATE_USEFUL_MUTATION
  );

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
      <Container>
        <input
          className="second"
          type="text"
          placeholder="Заголовок"
          required
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <br />
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
        <input
          className="second"
          type="text"
          placeholder="Запишите теги, через запятую без пробелов: тег1,тег2,тег3"
          required
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <br />
        <input
          className="second"
          type="file"
          id="file"
          name="file"
          placeholder="Загрузите фотографию в формате WebP..."
          onChange={uploadFile}
        />
        {upload && "Загружаем.."}
        <Img src={image} alt="Upload Preview" />
        <br />
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            const res = await createUseful({
              variables: {
                header,
                link,
                image,
                buttonText,
                tags: tags.split(","),
                // pros: pros.split(","),
              },
            });
            console.log("res", res);
            setId(res.data.createUseful.id);
          }}
        >
          {loading ? "Сохраняем..." : "Cохранить"}
        </ButtonTwo>
        {id && (
          <div>
            <a
              href={`besavvy.app/useful?id=${id}`}
              target="_blank"
            >{`besavvy.app/useful?id=${id}`}</a>
          </div>
        )}
      </Container>
    </Styles>
  );
};

export default CreateUseful;
