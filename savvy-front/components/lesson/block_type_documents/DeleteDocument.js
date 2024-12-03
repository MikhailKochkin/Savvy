import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";

const DELETE_DOCUMENT_MUTATION = gql`
  mutation DELETE_DOCUMENT_MUTATION($id: String!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;

const DeleteDocument = (props) => {
  const { t } = useTranslation("lesson");

  const { documentID, lessonID } = props;
  // const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_DOCUMENT_MUTATION}
      variables={{ id: documentID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ]}
    >
      {(deleteDocument, { error, loading }) => (
        <button
          color="secondary"
          onClick={() => {
            if (confirm("Sure?")) {
              deleteDocument().catch((error) => {
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

export default DeleteDocument;
