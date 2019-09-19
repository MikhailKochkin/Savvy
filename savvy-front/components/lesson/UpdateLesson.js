import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import { PAGE_LESSONS_QUERY } from "../course/CoursePage";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      name
      number
      text
    }
  }
`;

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: ID!
    $number: Int
    $name: String
    $text: String
  ) {
    updateLesson(id: $id, number: $number, name: $name, text: $text) {
      id
      number
      name
      text
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  margin: 5% 0;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
  grid-template-areas:
    "explain"
    "first   ";
  p,
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
  input {
    padding: 0.5%;
    height: 75%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${props => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class UpdateLesson extends Component {
  state = {};
  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleNumber = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = Math.round(value);
    this.setState({ [name]: val });
  };

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  render() {
    const { lessonID } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={lessonID}>
          <Query
            query={SINGLE_LESSON_QUERY}
            variables={{
              id: lessonID
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.lesson)
                return <p>No Course Page Found for ID {lessonID}</p>;
              return (
                <>
                  <Container>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Название урока"
                      defaultValue={data.lesson.name}
                      onChange={this.handleName}
                    />
                    <input
                      type="number"
                      id="number"
                      name="number"
                      placeholder="Номер урока"
                      defaultValue={data.lesson.number}
                      onChange={this.handleNumber}
                    />
                    <DynamicLoadedEditor
                      getEditorText={this.myCallback}
                      previousText={data.lesson.text}
                    />

                    <Mutation
                      mutation={UPDATE_LESSON_MUTATION}
                      variables={{
                        id: lessonID,
                        ...this.state
                      }}
                      refetchQueries={() => [
                        {
                          query: PAGE_LESSONS_QUERY,
                          variables: { id: lessonID }
                        }
                      ]}
                    >
                      {(updateLesson, { loading, error }) => (
                        <Button
                          onClick={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await updateLesson();
                            // change the page to the single case page
                            // Router.push({
                            //   pathname: "/lesson",
                            //   query: { id: lessonID, type: "REGULAR" }
                            // });
                          }}
                        >
                          {loading ? "Сохраняем..." : "Сохранить"}
                        </Button>
                      )}
                    </Mutation>
                  </Container>
                </>
              );
            }}
          </Query>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
