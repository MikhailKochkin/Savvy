import React from "react";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import { useTranslation } from "next-i18next";

import { SecondaryButton } from "./styles/DevPageStyles";

const DELETE_LESSON_MUTATION = gql`
  mutation DELETE_LESSON_MUTATION($id: String!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

const DeleteSingleLesson = (props) => {
  const { t } = useTranslation("lesson");

  const [deleteLesson, { data, loading, error }] = useMutation(
    DELETE_LESSON_MUTATION
  );

  return (
    <SecondaryButton
      onClick={async () => {
        if (confirm("Sure?")) {
          try {
            await deleteLesson({
              variables: {
                id: props.lessonId,
              },
            });
            Router.push({
              pathname: "/course",
              query: { id: props.coursePageId },
            });
          } catch (error) {
            alert(error.message);
          }
        }
      }}
    >
      {t("delete_lesson")}
    </SecondaryButton>
  );
};

export default DeleteSingleLesson;
