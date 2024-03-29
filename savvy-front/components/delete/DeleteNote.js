import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const DELETE_NOTE_MUTATION = gql`
  mutation DELETE_NOTE_MUTATION($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

// const useStyles = makeStyles({
//   button: {
//     width: "140px",
//     height: "45px",
//     margin: "0",
//     fontSize: "1.6rem",
//     textTransform: "none",
//   },
// });

const DeleteNote = (props) => {
  const { lessonID, noteID } = props;
  const { t } = useTranslation("lesson");

  // const classes = useStyles();
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
        <button
          color="secondary"
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteNote().catch((error) => {
                alert(error.message);
              });
            }
          }}
        >
          {loading ? t("deleting") : t("delete")}
        </button>
      )}
    </Mutation>
  );
};

export default DeleteNote;
