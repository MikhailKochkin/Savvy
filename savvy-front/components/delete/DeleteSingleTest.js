import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_TEST_MUTATION = gql`
  mutation DELETE_TEST_MUTATION($id: String!) {
    deleteNewTest(id: $id) {
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

const DeleteSingleTest = (props) => {
  const { testId, lessonId } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_TEST_MUTATION}
      variables={{ id: testId }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonId },
        },
      ]}
    >
      {(deleteTest, { error, loading }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (
              confirm(
                "Вы точно хотите удалить этот тест? Тест исчезнет после перезагрузки страницы."
              )
            ) {
              deleteTest().catch((error) => {
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

export default DeleteSingleTest;
