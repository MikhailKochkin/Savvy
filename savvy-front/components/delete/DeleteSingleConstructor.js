import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_CONSTRUCTION_MUTATION = gql`
  mutation DELETE_CONSTRUCTION_MUTATION($id: ID!) {
    deleteConstruction(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    width: "40%",
    margin: "4% 0",
    fontSize: "1.6rem",
    textTransform: "none"
  }
});

const DeleteSingleConstruction = props => {
  const update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: props.lessonID }
    });
    // 2. Filter the deleted itemout of the page
    data.lessons = data.lesson.constructions.filter(
      item => item.id !== payload.data.deleteConstruction.id
    );
    // 3. Put the items back!
    cache.writeQuery({
      query: SINGLE_LESSON_QUERY,
      variables: { id: props.lessonID },
      data
    });
  };
  const classes = useStyles();
  const { id } = props;
  return (
    <Mutation
      mutation={DELETE_CONSTRUCTION_MUTATION}
      variables={{ id }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: props.lessonID }
        }
      ]}
    >
      {(deleteConstruction, { loading, error }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (
              confirm(
                "Вы точно хотите удалить этот конструктор? Конструктор исчезнет после перезагрузки страницы."
              )
            ) {
              deleteConstruction().catch(error => {
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
};

export default DeleteSingleConstruction;
