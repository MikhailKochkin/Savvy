import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import User from "../User";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      id
      title
      description
      image
      audience
      result
      batch
      tariffs
      methods
      video
      news
      user {
        id
      }
    }
  }
`;

const UPDATE_COURSEPAGE_MUTATION = gql`
  mutation UPDATE_COURSEPAGE_MUTATION(
    $id: ID!
    $title: String
    $news: String
    $description: String
    $audience: String
    $result: String
    $tariffs: String
    $methods: String
    $batch: String
    $image: String
    $video: String
  ) {
    updateCoursePage(
      id: $id
      news: $news
      title: $title
      description: $description
      audience: $audience
      result: $result
      tariffs: $tariffs
      methods: $methods
      batch: $batch
      image: $image
      video: $video
    ) {
      id
      title
      description
      image
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 50%;
  padding: 2% 2% 0 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin: 2% 0;
  @media (max-width: 800px) {
    width: 95%;
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
    height: 100px;
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
  padding: 1% 2%;
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

const Title = styled.div`
  padding: 0 2%;
  font-size: 2.2rem;
  font-weight: 600;
`;

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin-top: 3%;
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
    margin: 0.8%;
    margin-left: 0.6%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

class UpdateCoursePage extends Component {
  state = {
    upload: false,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateCoursePage = async (e, updateCoursePage) => {
    e.preventDefault();
    const res = await updateCoursePage({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
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

  myCallback = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild,
    });
  };

  render() {
    return (
      <Width>
        <div id="root"></div>
        <User>
          {({ data: { me } }) => (
            <Query
              query={SINGLE_COURSEPAGE_QUERY}
              variables={{
                id: this.props.id,
              }}
            >
              {({ data, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (!data.coursePage)
                  return <p>No Course Page Found for ID {this.props.id}</p>;
                const coursePage = data.coursePage;
                return (
                  <>
                    {me !== null &&
                    (me.id === data.coursePage.user.id ||
                      me.permissions.includes("ADMIN")) ? (
                      <Mutation
                        mutation={UPDATE_COURSEPAGE_MUTATION}
                        variables={this.state}
                      >
                        {(updateCoursePage, { loading, error }) => (
                          <Form
                            onSubmit={(e) =>
                              this.updateCoursePage(e, updateCoursePage)
                            }
                          >
                            <Title>
                              Внесите изменения в информацию о курсе
                            </Title>
                            <Fieldset disabled={loading} aria-busy={loading}>
                              <input
                                className="second"
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Новое название курса"
                                defaultValue={coursePage.title}
                                required
                                onChange={this.handleChange}
                              />

                              <input
                                className="second"
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Новое описание"
                                required
                                defaultValue={coursePage.description}
                                onChange={this.handleChange}
                              />

                              <input
                                className="second"
                                type="text"
                                id="video"
                                name="video"
                                placeholder="Видео курса"
                                defaultValue={coursePage.video}
                                onChange={this.handleChange}
                              />

                              <textarea
                                type="text"
                                id="news"
                                name="news"
                                placeholder="Новости курса"
                                defaultValue={coursePage.news}
                                onChange={this.handleChange}
                              />

                              <Frame>
                                <DynamicLoadedEditor
                                  index={1}
                                  name="result"
                                  getEditorText={this.myCallback}
                                  value={coursePage.result}
                                  placeholder="Результаты студентов по итогам курса..."
                                />
                              </Frame>
                              <Frame>
                                <DynamicLoadedEditor
                                  index={1}
                                  name="methods"
                                  getEditorText={this.myCallback}
                                  value={coursePage.methods}
                                  placeholder="Об авторе курса и методиках преподавания..."
                                />
                              </Frame>
                              <Frame>
                                <DynamicLoadedEditor
                                  index={1}
                                  name="audience"
                                  getEditorText={this.myCallback}
                                  value={coursePage.audience}
                                  placeholder="Для кого этот курс..."
                                />
                              </Frame>
                              <Frame>
                                <DynamicLoadedEditor
                                  index={1}
                                  name="tariffs"
                                  getEditorText={this.myCallback}
                                  value={coursePage.tariffs}
                                  placeholder="Как работают тарифы на курсе..."
                                />
                              </Frame>
                              <Frame>
                                <DynamicLoadedEditor
                                  index={1}
                                  name="batch"
                                  getEditorText={this.myCallback}
                                  value={coursePage.batch}
                                  placeholder="Информация о следующем потоке"
                                />
                              </Frame>
                              <label for="file">
                                <div className="upload">
                                  {this.state.upload === false
                                    ? "Загрузите новый логотип курса"
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
                                placeholder="Загрузите новый логотип курса..."
                                onChange={this.uploadFile}
                              />

                              {/* {this.state.image && ( */}
                              <>
                                <Img
                                  src={
                                    this.state.image
                                      ? this.state.image
                                      : coursePage.image
                                  }
                                  alt="Upload Preview"
                                />
                              </>
                              {/* )} */}
                              <Buttons>
                                <Button type="submit">
                                  {loading ? "Меняем..." : "Изменить"}
                                </Button>
                                <Link
                                  href={{
                                    pathname: "/coursePage",
                                    query: { id: coursePage.id },
                                  }}
                                >
                                  <div>Вернуться на страницу урока</div>
                                </Link>
                              </Buttons>
                            </Fieldset>
                          </Form>
                        )}
                      </Mutation>
                    ) : (
                      "У вас нет полномочий для работы с этой страницей."
                    )}
                  </>
                );
              }}
            </Query>
          )}
        </User>
      </Width>
    );
  }
}

export default UpdateCoursePage;
