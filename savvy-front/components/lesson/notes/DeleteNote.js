import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { SecondaryButton } from "../styles/DevPageStyles";

const DELETE_NOTE_MUTATION = gql`
  mutation DELETE_NOTE_MUTATION($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const DeleteNote = (props) => {
  const { lessonID, noteID } = props;
  const { t } = useTranslation("lesson");
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
        <SecondaryButton
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
        </SecondaryButton>
      )}
    </Mutation>
  );
};

export default DeleteNote;
