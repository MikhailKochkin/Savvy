import React from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_COURSEPAGE_QUERY } from "../CoursePage";

const DELETE_STATEMENT_MUTATION = gql`
  mutation DELETE_STATEMENT_MUTATION($id: ID!) {
    deleteStatement(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    margin: "0.5% 0",
    fontSize: "1.3rem",
    textTransform: "none",
  },
});

const DeleteStatement = (props) => {
  const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_STATEMENT_MUTATION}
      variables={{ id: props.statementID }}
      refetchQueries={() => [
        {
          query: SINGLE_COURSEPAGE_QUERY,
          variables: { id: props.coursePageID },
        },
      ]}
    >
      {(deleteStatement, { loading, error }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (confirm("Вы точно хотите удалить этот пост?")) {
              deleteStatement().catch((error) => {
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

export default DeleteStatement;
