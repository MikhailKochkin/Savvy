import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { GET_RESULTS } from "./LessonData";

const CREATE_FEEDBACK_MUTATION = gql`
  mutation CREATE_FEEDBACK_MUTATION(
    $text: String!
    $lessonId: String!
    $studentId: String!
  ) {
    createFeedback(text: $text, lessonId: $lessonId, studentId: $studentId) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 1%;
`;

const TextBox = styled.div`
  font-size: 1.6rem;
  width: 65%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Button = styled.button`
  padding: 1%;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 3% 0;
  width: 7%;
  color: #fffdf7;
  text-align: center;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

class CreateFeedback extends Component {
  state = {
    text: "",
  };

  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };

  render() {
    const { lesson, student } = this.props;
    return (
      <Styles>
        <TextBox>
          <DynamicLoadedEditor getEditorText={this.myCallback} name="text" />
        </TextBox>
        <Mutation
          mutation={CREATE_FEEDBACK_MUTATION}
          variables={{
            lessonId: lesson,
            studentId: student,
            text: this.state.text,
          }}
          refetchQueries={() => [
            {
              query: GET_RESULTS,
              variables: { lessonId: lesson, userId: student },
            },
          ]}
        >
          {(createFeedback, { loading, error }) => (
            <Button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createFeedback();
              }}
            >
              {loading ? "..." : "Send"}
            </Button>
          )}
        </Mutation>
      </Styles>
    );
  }
}

export default CreateFeedback;
