import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { SecondaryButton } from "../styles/DevPageStyles";

const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($id: String!) {
    deleteChat(id: $id) {
      id
    }
  }
`;

const DeleteChat = (props) => {
  const { lessonId, chatId } = props;
  const { t } = useTranslation("lesson");

  // const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_CHAT_MUTATION}
      variables={{ id: chatId }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonId },
        },
      ]}
    >
      {(deleteNote, { loading, error }) => (
        <SecondaryButton
          color="secondary"
          onClick={() => {
            if (confirm("Sure?")) {
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

export default DeleteChat;
