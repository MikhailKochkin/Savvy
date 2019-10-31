import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_TEXTEDITOR_MUTATION = gql`
  mutation DELETE_TEXTEDITOR_MUTATION($id: ID!) {
    deleteTextEditor(id: $id) {
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
  margin-bottom: 3%;
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
      variables: { id: this.props.lessonID }
    });
    // 2. Filter the deleted itemout of the page
    data.lessons = data.lesson.texteditors.filter(
      item => item.id !== payload.data.deleteTextEditor.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: this.props.lessonID },
      data
    });
  };
  render() {
    const { lessonID, id } = this.props;
    return (
      <Mutation
        mutation={DELETE_TEXTEDITOR_MUTATION}
        variables={{ id }}
        // update={this.update}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID }
          }
        ]}
      >
        {(deleteTextEditor, { loading, error }) => (
          <Button
            onClick={() => {
              if (
                confirm(
                  "Вы точно хотите удалить эту запись? Запись исчезнет после перезагрузки страницы."
                )
              ) {
                deleteTextEditor().catch(error => {
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
