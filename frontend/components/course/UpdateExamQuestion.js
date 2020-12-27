import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Mutation, Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";

const Container = styled.div`
  width: 90%;
  padding: 3% 0;
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 30%;
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

const SINGLE_EXAM_QUESTION_QUERY = gql`
  query SINGLE_EXAM_QUESTION_QUERY($id: ID!) {
    examQuestions(where: { coursePageID: $id }) {
      id
      question
    }
  }
`;

const UPDATE_EXAM_QUESTION_MUTATION = gql`
  mutation UPDATE_EXAM_QUESTION_MUTATION($id: ID!, $question: String) {
    updateExamQuestion(id: $id, question: $question) {
      id
      question
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

class UpdateExamQuestion extends Component {
  state = {
    text: "",
  };
  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };
  render() {
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Query
            query={SINGLE_EXAM_QUESTION_QUERY}
            variables={{
              id: this.props.id,
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              return (
                <Container>
                  <h2>Внесите изменения в практическое задание</h2>
                  <DynamicLoadedEditor
                    getEditorText={this.myCallback}
                    previousText={data.examQuestions[0].question}
                  />
                  <Mutation
                    mutation={UPDATE_EXAM_QUESTION_MUTATION}
                    variables={{
                      id: data.examQuestions[0].id,
                      question: this.state.text,
                    }}
                  >
                    {(updateExamQuestion, { loading, error }) => (
                      <Button
                        onClick={async (e) => {
                          e.preventDefault();
                          const res = await updateExamQuestion();
                          Router.push({
                            pathname: "/coursePage",
                            query: { id: this.props.id },
                          });
                        }}
                      >
                        {loading ? "Сохраняем вопрос..." : "Сохранить вопрос"}
                      </Button>
                    )}
                  </Mutation>
                </Container>
              );
            }}
          </Query>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}

export default UpdateExamQuestion;
