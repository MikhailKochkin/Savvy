import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_PROBLEM_MUTATION = gql`
  mutation DELETE_PROBLEM_MUTATION($id: String!) {
    deleteProblem(id: $id) {
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

const DeleteSingleProblem = (props) => {
  // const update = (cache, payload) => {
  //   // manually update the cache on the client, so it matches the server
  //   // 1. Read the cache for the items we want
  //   const data = cache.readQuery({
  //     query: SINGLE_LESSON_QUERY,
  //     variables: { id: this.props.lessonId },
  //   });
  //   // 2. Filter the deleted itemout of the page
  //   data.lessons = data.lesson.problems.filter(
  //     (item) => item.id !== payload.data.deleteProblem.id
  //   );
  //   // 3. Put the items back!
  //   cache.writeQuery({
  //     query: SINGLE_LESSON_QUERY,
  //     variables: { id: this.props.lessonId },
  //     data,
  //   });
  // };
  const { lessonId, id } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_PROBLEM_MUTATION}
      variables={{ id }}
      // update={update}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonId },
        },
      ]}
    >
      {(deleteProblem, { loading, error }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (confirm("Вы точно хотите удалить эту задачу?")) {
              deleteProblem().catch((error) => {
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

export default DeleteSingleProblem;
