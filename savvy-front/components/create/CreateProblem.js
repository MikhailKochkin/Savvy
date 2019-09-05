import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { Message } from "../styles/Button";

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION($text: String!, $lessonID: ID!) {
    createProblem(text: $text, lessonID: $lessonID) {
      id
    }
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

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Styles = styled.div`
  margin-top: 2%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/ProblemEditor"), {
  loading: () => <p>Загрузка редактора...</p>,
  ssr: false
});

class CreateProblem extends Component {
  state = {
    text: ""
  };
  puzzleStage = "";

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  render() {
    const { lessonID } = this.props;
    return (
      <Styles>
        <Title>Создайте новую задачу для вашего урока</Title>
        <DynamicLoadedEditor getEditorText={this.myCallback} />
        <Mutation
          mutation={CREATE_PROBLEM_MUTATION}
          variables={{
            lessonID: lessonID,
            ...this.state
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID }
            }
          ]}
          awaitRefetchQueries={true}
        >
          {(createProblem, { loading, error }) => (
            <>
              <Button
                onClick={async e => {
                  e.preventDefault();
                  const res = await createProblem();
                  document.getElementById("Message").style.display = "block";
                  setTimeout(() => {
                    document.getElementById("Message")
                      ? (document.getElementById("Message").style.display =
                          "none")
                      : "none";
                  }, 3000);
                }}
              >
                {loading ? "Сохраняем..." : "Сохранить"}
              </Button>
              <Message id="Message">Вы создали новую задачу!</Message>
            </>
          )}
        </Mutation>
      </Styles>
    );
  }
}

export default CreateProblem;
