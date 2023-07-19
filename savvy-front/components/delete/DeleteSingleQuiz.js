import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const DELETE_QUIZ_MUTATION = gql`
  mutation DELETE_QUIZ_MUTATION($id: String!) {
    deleteQuiz(id: $id) {
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

const DeleteSingleQuiz = (props) => {
  const { quizID, lessonID } = props;
  const { t } = useTranslation("lesson");

  const classes = useStyles();
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
        <Button
          className={classes.button}
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
        </Button>
      )}
    </Mutation>
  );
};

export default DeleteSingleQuiz;
