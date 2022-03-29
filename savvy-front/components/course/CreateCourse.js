import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Error from "../ErrorMessage";
import Router from "next/router";
import _ from "lodash";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    # $audience: String
    # $result: String
    # $tariffs: String
    # $methods: String
    $courseType: String
    $published: Boolean # $uniID: ID
  ) {
    createCoursePage(
      title: $title
      description: $description
      image: $image
      # audience: $audience
      # result: $result
      # tariffs: $tariffs
      # methods: $methods
      courseType: $courseType
      published: $published # uniID: $uniID
    ) {
      id
    }
  }
`;

const Form = styled.form`
  width: 50%;
  padding: 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin: 2% 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  select {
    width: 30%;
    font-size: 1.6rem;
  }
  .input {
    height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  textarea {
    min-height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  .upload {
    border: 1px dashed #e5e5e5;
    padding: 1% 2%;
    border-radius: 3.5px;
    cursor: pointer;
    &:hover {
      border: 1px dashed #112a62;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 2%;
  padding: 3%;
  border-top: solid 1px #f0f0f0;
`;

const Buttons2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3%;
  button {
    margin-right: 15px;
    border: none;
    background: none;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Img = styled.img`
  width: 300px;
  object-fit: cover;
  margin-top: 3%;
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 20%;
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
  @media (max-width: 800px) {
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

const Comment = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2%;
`;

const Option = styled.div`
  margin-bottom: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    font-size: 2rem;
    flex-basis: 5%;
    /* background: yellow; */
  }
  input {
    flex-basis: 95%;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 1%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateCourse = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("PRIVATE");
  // const [uniID, setUniID] = useState(props.me ? props.me.uni.id : null);
  const [pending, setPending] = useState(false);
  const [image, setImage] = useState("");
  const uploadFile = async (e) => {
    setPending(true);
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
    setPending(false);
  };

  const { me } = props;
  return (
    <>
      <div id="root"></div>
      <>
        <Mutation
          mutation={CREATE_COURSE_MUTATION}
          variables={{
            title,
            description,
            image,
            courseType,
            published: false,
          }}
        >
          {(createCoursePage, { loading, error }) => (
            <Form>
              <Error error={error} />
              <Title>Давайте разработаем ваш курс вместе</Title>
              <Fieldset>
                <input
                  className="input"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Название курса"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Его краткое описание"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label for="file">
                  <div className="upload">
                    {!pending && "Загрузите картинку курса"}
                    {pending && "Идет Loading..."}
                  </div>
                </label>
                <input
                  style={{ display: "none" }}
                  className="second"
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Загрузите логотип курса..."
                  onChange={uploadFile}
                />
                {image && (
                  <>
                    <Img src={image} alt="Upload Preview" />
                  </>
                )}
                <Buttons>
                  <Button
                    onClick={async (e) => {
                      // Stop the form from submitting
                      e.preventDefault();
                      const res2 = await createCoursePage();
                      Router.push({
                        pathname: "/course",
                        query: { id: res2.data.createCoursePage.id },
                      });
                    }}
                  >
                    Создать
                  </Button>
                </Buttons>
              </Fieldset>
            </Form>
          )}
        </Mutation>
      </>
    </>
  );
};

export default CreateCourse;
