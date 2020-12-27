import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_COURSEPAGE_QUERY } from "./CoursePage";

const Button = styled.button`
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Title = styled.div`
  font-size: 2rem;
  margin: 30px 0;
`;

const CREATE_EXAM_QUESTION_MUTATION = gql`
  mutation CREATE_EXAM_QUESTION_MUTATION(
    $question: String!
    $coursePageID: ID!
  ) {
    createExamQuestion(question: $question, coursePageID: $coursePageID) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

class ExamQuestion extends Component {
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
      <>
        <Title>
          Составьте практическое задание для студентов вашего курса!
        </Title>
        <DynamicLoadedEditor getEditorText={this.myCallback} />
        <Mutation
          mutation={CREATE_EXAM_QUESTION_MUTATION}
          variables={{
            coursePageID: this.props.id,
            question: this.state.text,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_COURSEPAGE_QUERY,
              variables: { id: this.props.id },
            },
          ]}
        >
          {(createExamQuestion, { loading, error }) => (
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await createExamQuestion();
                // change the page to the single case page
              }}
            >
              {loading ? "Сохраняем вопрос..." : "Сохранить вопрос"}
            </Button>
          )}
        </Mutation>
      </>
    );
  }
}

export default ExamQuestion;
