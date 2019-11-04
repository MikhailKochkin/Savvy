import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import { PAGE_LESSONS_QUERY } from "../../course/CoursePage";
import AreYouATeacher from "../../auth/AreYouATeacher";
import PleaseSignIn from "../../auth/PleaseSignIn";

const SINGLE_NOTE_QUERY = gql`
  query SINGLE_NOTE_QUERY($id: ID!) {
    note(where: { id: $id }) {
      id
      text
    }
  }
`;

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION($id: ID!, $text: String) {
    updateNote(id: $id, text: $text) {
      id
      text
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  margin: 1% 0 0 0;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
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

const DynamicLoadedEditor = dynamic(import("../../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class UpdateNote extends Component {
  state = {};
  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
            query={SINGLE_NOTE_QUERY}
            variables={{
              id: this.props.note
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.note)
                return <p>No Course Page Found for ID {lessonID}</p>;
              return (
                <>
                  <Container>
                    <DynamicLoadedEditor
                      getEditorText={this.myCallback}
                      previousText={data.note.text}
                    />

                    <Mutation
                      mutation={UPDATE_NOTE_MUTATION}
                      variables={{
                        id: this.props.note,
                        ...this.state
                      }}
                      //   refetchQueries={() => [
                      //     {
                      //       query: PAGE_LESSONS_QUERY,
                      //       variables: { id: lessonID }
                      //     }
                      //   ]}
                    >
                      {(updateNote, { loading, error }) => (
                        <Button
                          onClick={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await updateNote();
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
