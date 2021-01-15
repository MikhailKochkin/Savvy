import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_CONSTRUCTION_MUTATION = gql`
  mutation DELETE_CONSTRUCTION_MUTATION($id: String!) {
    deleteConstruction(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.red};
  width: 35%;
  color: white;
  padding: 10px 16px;
  margin-top: 3%;
  font-size: 1.6rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${(props) => props.theme.darkRed};
  }
  @media (max-width: 800px) {
    width: 60%;
  }
`;

class DeleteSingleConstruction extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: this.props.lessonID },
    });
    // 2. Filter the deleted itemout of the page
    data.lessons = data.lesson.constructions.filter(
      (item) => item.id !== payload.data.deleteConstruction.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: this.props.lessonID },
      data,
    });
  };
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={DELETE_CONSTRUCTION_MUTATION}
        variables={{ id }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: this.props.lessonID },
          },
        ]}
      >
        {(deleteConstruction, { loading, error }) => (
          <Button
            onClick={() => {
              if (
                confirm(
                  "Вы точно хотите удалить этот конструктор? Конструктор исчезнет после перезагрузки страницы."
                )
              ) {
                deleteConstruction().catch((error) => {
                  alert(error.message);
                });
              }
              console.log("Тут!");
            }}
          >
            {loading ? "Удаляем..." : "Удалить"}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteSingleConstruction;
