import React from "react";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import { PrimaryButton } from "./styles/DevPageStyles";

const DELETE_LESSON_MUTATION = gql`
  mutation DELETE_LESSON_MUTATION($id: String!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

const DeleteSingleLesson = (props) => {
  const [deleteLesson, { data, loading, error }] = useMutation(
    DELETE_LESSON_MUTATION
  );

  return (
    <PrimaryButton
      onClick={() => {
        if (confirm("Sure?")) {
          deleteLesson({
            variables: {
              id: props.lessonId,
            },
          }).catch((error) => {
            alert(error.message);
          });
          Router.push({
            pathname: "/course",
            query: { id: props.coursePageId },
          });
        }
      }}
    >
      Delete Lesson
    </PrimaryButton>
  );
};

export default DeleteSingleLesson;
