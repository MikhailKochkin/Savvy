import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PAGE_LESSONS_QUERY } from "../course/CoursePage";
import { NavButton, SubmitButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      name
      number
      text
      video
    }
  }
`;

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: ID!
    $number: Int
    $name: String
    $text: String
    $video: String
  ) {
    updateLesson(
      id: $id
      number: $number
      name: $name
      text: $text
      video: $video
    ) {
      id
      number
      name
      text
      video
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const Container = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  width: 60%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
  .video {
    grid-area: first;
  }
  grid-template-areas:
    "explain"
    "first   ";
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  .first {
    grid-area: first;
  }

  grid-template-areas: "first second";
  input {
    height: 50%;
    width: 80%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class UpdateLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleName = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
    this.handleNumber = e => {
      e.preventDefault();
      const { name, value } = e.target;
      const val = Math.round(value);
      this.setState({ [name]: val });
    };
    this.handleChange = e => {
      const { name, type, value } = e.target;
      if (value.includes("embed")) {
        this.setState({ video: value });
      } else {
        const newUrl =
          "https://www.youtube.com/embed/" +
          value.slice(value.indexOf("=") + 1);
        this.setState({ video: newUrl });
      }
    };
  }

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  render() {
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Query
            query={SINGLE_LESSON_QUERY}
            variables={{
              id: this.props.id
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.lesson)
                return <p>No Course Page Found for ID {this.props.id}</p>;
              return (
                <>
                  <Link
                    href={{
                      pathname: "/lesson",
                      query: { id }
                    }}
                  >
                    <a>
                      <NavButton>Вернуться к уроку</NavButton>
                    </a>
                  </Link>
                  <DynamicLoadedEditor
                    getEditorText={this.myCallback}
                    previousText={data.lesson.text}
                  />
                  <Width>
                    <Container>
                      <h4 className="explain">
                        {" "}
                        Напишите название и номер урока
                      </h4>
                      <Label className="name" htmlFor="name">
                        <p className="first">Название урока</p>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Название урока"
                          defaultValue={data.lesson.name}
                          onChange={this.handleName}
                        />
                      </Label>
                      <Label className="name" htmlFor="name">
                        <p className="first">Номер урока</p>
                        <input
                          type="text"
                          id="number"
                          name="number"
                          placeholder="Номер урока"
                          defaultValue={data.lesson.number}
                          onChange={this.handleNumber}
                        />
                      </Label>
                    </Container>
                  </Width>
                  <Width>
                    <Container>
                      <h4 className="explain">
                        {" "}
                        Добавьте видео, если в этом есть необходимость:
                      </h4>
                      <Label className="video" htmlFor="video">
                        <p className="first">Видео</p>
                        <input
                          type="text"
                          id="video"
                          name="video"
                          placeholder="Вставьте ссылку на видео..."
                          defaultValue={data.lesson.video}
                          onChange={this.handleChange}
                        />
                      </Label>
                      <p>
                        Обратите внимание. Пока на сайт можно добавлять только
                        видео с Youtube. Для этого скопируйте ссылку в пустое
                        поле выше. Она автоматически преобразуется в тот вид, в
                        котором она сможет использоваться на сайте. Пожалуйста,
                        не пытайтесь исправить ссылку после преобразования.
                      </p>
                    </Container>
                    <Mutation
                      mutation={UPDATE_LESSON_MUTATION}
                      variables={{
                        id,
                        ...this.state
                      }}
                      refetchQueries={() => [
                        {
                          query: PAGE_LESSONS_QUERY,
                          variables: { id }
                        }
                      ]}
                    >
                      {(updateLesson, { loading, error }) => (
                        <SubmitButton
                          onClick={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await updateLesson();
                            // change the page to the single case page
                            Router.push({
                              pathname: "/lesson",
                              query: { id: id }
                            });
                          }}
                        >
                          Отправить на страницу курса
                        </SubmitButton>
                      )}
                    </Mutation>
                  </Width>
                </>
              );
            }}
          </Query>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
