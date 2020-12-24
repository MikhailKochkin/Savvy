import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const DELETE_EXAM_MUTATION = gql`
  mutation DELETE_EXAM_MUTATION($id: ID!) {
    deleteExam(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.red};
  width: 120px;
  color: white;
  padding: 1.5% 0;
  margin-bottom: 3%;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${(props) => props.theme.darkRed};
  }
`;

class DeleteExam extends Component {
  render() {
    const { examID, lessonID } = this.props;
    return (
      <Mutation
        mutation={DELETE_EXAM_MUTATION}
        variables={{ id: examID }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
      >
        {(deleteExam, { error, loading }) => (
          <Button
            onClick={() => {
              if (confirm("Вы точно хотите удалить этот экзамен?")) {
                deleteExam().catch((error) => {
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

export default DeleteExam;
