import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SubmitButton, NavButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION($text: String!, $lessonID: ID!) {
    createProblem(text: $text, lessonID: $lessonID) {
      id
    }
  }
`;

const Message = styled.p`
  background-color: #00ff7f;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  width: 30%;
  display: none;
`;

const DynamicLoadedEditor = dynamic(import("../editor/ProblemEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

class CreateProblem extends Component {
  state = {
    text: localStorage.getItem("text") || ""
  };
  puzzleStage = "";

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  render() {
    const { id } = this.props.query;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={id}>
          <Link
            href={{
              pathname: "/lesson",
              query: { id }
            }}
          >
            <a>
              <NavButton>К уроку</NavButton>
            </a>
          </Link>
          <h1>Создайте новую задачу для вашего урока</h1>
          <DynamicLoadedEditor getEditorText={this.myCallback} />
          <Mutation
            mutation={CREATE_PROBLEM_MUTATION}
            variables={{
              lessonID: id,
              ...this.state
            }}
            refetchQueries={() => [
              {
                query: SINGLE_LESSON_QUERY,
                variables: { id }
              }
            ]}
            awaitRefetchQueries={true}
          >
            {(createProblem, { loading, error }) => (
              <>
                <SubmitButton
                  onClick={async e => {
                    e.preventDefault();
                    const res = await createProblem();
                    document.getElementById("Message").style.display = "block";
                  }}
                >
                  Создать задачу
                </SubmitButton>
                <Message id="Message">Вы создали новую задачу!</Message>
              </>
            )}
          </Mutation>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}

export default CreateProblem;
