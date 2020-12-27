import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Error from "../ErrorMessage";
import Router from "next/router";
import { useUser } from "../User";
import HowTo from "./HowTo";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $courseType: CourseType
    $published: Boolean
    $uniID: ID
  ) {
    createCoursePage(
      title: $title
      description: $description
      image: $image
      courseType: $courseType
      published: $published
      uniID: $uniID
    ) {
      id
    }
  }
`;

const UPDATE_UNI_MUTATION = gql`
  mutation UPDATE_UNI_MUTATION($id: ID!, $capacity: Int!) {
    updateUni(id: $id, capacity: $capacity) {
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
  padding: 0;
  margin-top: 2%;
  select {
    width: 30%;
    font-size: 1.6rem;
  }
  input {
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
  padding: 3% 0 0 3%;
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
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

const Img = styled.img`
  width: 300px;
  object-fit: cover;
  margin-top: 3%;
`;

export default class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    courseType: "PUBLIC",
    uniID: "",
    published: false,
    upload: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async (e) => {
    this.setState({
      upload: "pending",
      image: "",
    });
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
    this.setState({
      image: file.secure_url,
      upload: true,
    });
  };

  render() {
    return (
      <>
        <HowTo />
        <User>
          {({ data: { me } }) => (
            <>
              <Mutation
                mutation={CREATE_COURSE_MUTATION}
                variables={this.state}
              >
                {(createCoursePage, { loading, error }) => (
                  <Mutation
                    mutation={UPDATE_UNI_MUTATION}
                    variables={{
                      id: me.uni.id,
                      capacity: me.uni.capacity - 1,
                    }}
                  >
                    {(updateUni, { loading, error }) => (
                      <Form
                        onSubmit={async (e) => {
                          // Stop the form from submitting
                          e.preventDefault();
                          this.setState({ courseType: "PRIVATE" });
                          const res1 = await this.setState({
                            uniID: me.uni.id,
                          });
                          const res2 = await createCoursePage();
                          const res3 = await updateUni();
                          Router.push({
                            pathname: "/coursePage",
                            query: { id: res2.data.createCoursePage.id },
                          });
                        }}
                      >
                        <Error error={error} />
                        <Title>Новый курс:</Title>
                        <Fieldset disabled={loading} aria-busy={loading}>
                          <input
                            className="second"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Название курса"
                            value={this.state.title}
                            required
                            onChange={this.handleChange}
                          />
                          <input
                            className="second"
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Его краткое описание"
                            required
                            value={this.state.description}
                            onChange={this.handleChange}
                          />
                          <label for="file">
                            <div className="upload">
                              {this.state.upload === false
                                ? "Загрузите картинку курса"
                                : null}
                              {this.state.upload === "pending"
                                ? "Идет загрузка..."
                                : null}
                              {this.state.upload === true
                                ? "Загрузка прошла успешно!"
                                : null}
                            </div>
                          </label>
                          <input
                            style={{ display: "none" }}
                            className="second"
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Загрузите логотип курса..."
                            onChange={this.uploadFile}
                          />
                          {this.state.image && (
                            <>
                              <Img
                                src={this.state.image}
                                alt="Upload Preview"
                              />
                            </>
                          )}
                          <Buttons>
                            <Button type="submit">Создать</Button>
                          </Buttons>
                        </Fieldset>
                      </Form>
                    )}
                  </Mutation>
                )}
              </Mutation>
            </>
          )}
        </User>
        <div id="root"></div>
      </>
    );
  }
}
