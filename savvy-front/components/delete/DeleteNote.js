import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { withTranslation } from "../../i18n";

const DELETE_NOTE_MUTATION = gql`
  mutation DELETE_NOTE_MUTATION($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    margin: "4% 0",
    fontSize: "1.6rem",
    textTransform: "none",
  },
});

const DeleteNote = (props) => {
  const { lessonID, noteID } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_NOTE_MUTATION}
      variables={{ id: noteID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ]}
    >
      {(deleteNote, { loading, error }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (confirm(props.t("sure"))) {
              deleteNote().catch((error) => {
                alert(error.message);
              });
            }
          }}
        >
          {loading ? props.t("deleting") : props.t("delete")}
        </Button>
      )}
    </Mutation>
  );
};

export default withTranslation("update")(DeleteNote);
