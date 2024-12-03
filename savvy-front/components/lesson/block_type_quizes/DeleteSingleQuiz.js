import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { SecondaryButton } from "../styles/DevPageStyles";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const DELETE_QUIZ_MUTATION = gql`
  mutation DELETE_QUIZ_MUTATION($id: String!) {
    deleteQuiz(id: $id) {
      id
    }
  }
`;

const DeleteSingleQuiz = (props) => {
  const { quizID, lessonID } = props;
  const { t } = useTranslation("lesson");

  return (
    <Mutation
      mutation={DELETE_QUIZ_MUTATION}
      variables={{ id: quizID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ]}
    >
      {(deleteQuiz, { error, loading }) => (
        <SecondaryButton
          color="secondary"
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteQuiz().catch((error) => {
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

export default DeleteSingleQuiz;
