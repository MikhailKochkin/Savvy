import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_TEST_MUTATION = gql`
  mutation DELETE_TEST_MUTATION($id: ID!) {
    deleteNewTest(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${props => props.theme.red};
  width: 120px;
  color: white;
  padding: 1.5% 3%;
  margin-left: 3%;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${props => props.theme.darkRed};
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
