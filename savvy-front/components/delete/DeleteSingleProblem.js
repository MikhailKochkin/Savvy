import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_PROBLEM_MUTATION = gql`
  mutation DELETE_PROBLEM_MUTATION($id: ID!) {
    deleteProblem(id: $id) {
      id
    }
  }
`;
const Button = styled.button`
  background: ${props => props.theme.red};
  width: 20%;
  color: white;
  padding: 1.5% 3%;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${props => props.theme.darkRed};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

class DeleteSingleProblem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: this.props.lessonId }
    });
    // 2. Filter the deleted itemout of the page
    data.lessons = data.lesson.problems.filter(
      item => item.id !== payload.data.deleteProblem.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: this.props.lessonId },
      data
    });
  };
  render() {
    const { lessonId, id } = this.props;
    return (
      <Mutation
        mutation={DELETE_PROBLEM_MUTATION}
        variables={{ id }}
        update={this.update}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonId }
          }
        ]}
      >
        {(deleteProblem, { loading, error }) => (
          <Button
            onClick={() => {
              if (confirm("Вы точно хотите удалить эту задачу?")) {
                deleteProblem().catch(error => {
                  alert(error.message);
                });
              }
            }}
          >
            {loading ? "Удаляем..." : "Удалить"}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteSingleProblem;
