import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MaterialPerPage } from "../../config";
import { NavButton, SubmitButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $name: String!
    $number: Int
    $text: String!
    $coursePageID: ID!
  ) {
    createLesson(
      name: $name
      number: $number
      text: $text
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    lessons(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
      id
      name
      number
      text
      user {
          id
      }
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
  width: 90%;
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

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class CreateLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: "",
      number: 0,
      published: false
    };
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
          <Link
            href={{
              pathname: "/coursePage",
              query: { id }
            }}
          >
            <a>
              <NavButton>Вернуться на страницу курса</NavButton>
            </a>
          </Link>
          <Width>
            <Container>
              {/* <h4 className="explain"> Напишите название и номер урока</h4> */}
              <Label className="name" htmlFor="name">
                <p className="first">Название урока</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Название урока"
                  value={this.state.name}
                  onChange={this.handleName}
                />
              </Label>
              <Label className="name" htmlFor="name">
                <p className="first">Номер урока</p>
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Номер урока"
                  value={this.state.number}
                  onChange={this.handleNumber}
                />
              </Label>
            </Container>
          </Width>

          <DynamicLoadedEditor getEditorText={this.myCallback} />

          <Width>
            <Mutation
              mutation={CREATE_LESSON_MUTATION}
              variables={{
                coursePageID: id,
                ...this.state
              }}
              refetchQueries={() => [
                {
                  query: PAGE_LESSONS_QUERY,
                  variables: { id: this.props.id }
                }
              ]}
              awaitRefetchQueries={true}
            >
              {(createLesson, { loading, error }) => (
                <SubmitButton
                  onClick={async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createLesson();
                    console.log("Придумали!");
                    // change the page to the single case page
                    Router.push({
                      pathname: "/lesson",
                      query: { id: res.data.createLesson.id }
                    });
                  }}
                >
                  {loading ? "Готовим урок..." : "Отправить на страницу курса"}
                </SubmitButton>
              )}
            </Mutation>
          </Width>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
