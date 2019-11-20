import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import { PAGE_LESSONS_QUERY } from "../course/CoursePage";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import StoryUpdate from "./StoryUpdate";

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
    $description: String
  ) {
    updateLesson(
      id: $id
      number: $number
      name: $name
      text: $text
      description: $description
    ) {
      id
      number
      name
      text
      description
    }
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 5% 0;
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
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.4rem;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 1.5%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
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

const Frame = styled.div`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    /* margin: 0.8%; */
    margin-left: 0.6%;
  }
`;

const Map = styled.div``;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
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

  myCallback2 = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild
    });
  };

  render() {
    const { lessonID, description, lesson } = this.props;
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
              if (!data) return <p>No lesson Found for ID {lessonID}</p>;
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
                    <Frame>
                      <DynamicHoverEditor
                        index={1}
                        name="description"
                        getEditorText={this.myCallback2}
                        placeholder="Описание"
                        value={description}
                      />
                    </Frame>
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
          <StoryUpdate lesson={lesson} />
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
