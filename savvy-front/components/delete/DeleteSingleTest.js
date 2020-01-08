import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_TEST_MUTATION = gql`
  mutation DELETE_TEST_MUTATION($id: ID!) {
    deleteNewTest(id: $id) {
      id
    }
  }
`;

const Button = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.6rem;
  /* margin-bottom: 1.5%; */
  &:hover {
    text-decoration: underline;
  }
`;

class DeleteSingleTest extends Component {
  render() {
    const { testId, lessonId } = this.props;
    return (
      <Mutation
        mutation={DELETE_TEST_MUTATION}
        variables={{ id: testId }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonId }
          }
        ]}
      >
        {(deleteTest, { error, loading }) => (
          <Button
            className="but2"
            onClick={() => {
              if (
                confirm(
                  "Вы точно хотите удалить этот тест? Тест исчезнет после перезагрузки страницы."
                )
              ) {
                deleteTest().catch(error => {
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

export default DeleteSingleTest;
