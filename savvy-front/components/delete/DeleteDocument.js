import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_DOCUMENT_MUTATION = gql`
  mutation DELETE_DOCUMENT_MUTATION($id: ID!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    margin: "4% 0",
    fontSize: "1.6rem",
    textTransform: "none"
  }
});

const DeleteDocument = props => {
  const { documentID, lessonID } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_DOCUMENT_MUTATION}
      variables={{ id: documentID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID }
        }
      ]}
    >
      {(deleteDocument, { error, loading }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (
              confirm(
                "Вы точно хотите удалить этот документ? Документ исчезнет после перезагрузки страницы."
              )
            ) {
              deleteDocument().catch(error => {
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

export default DeleteDocument;
