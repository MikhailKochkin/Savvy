import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";

const DELETE_STATEMENT_MUTATION = gql`
  mutation DELETE_STATEMENT_MUTATION($id: String!) {
    deleteStatement(id: $id) {
      id
    }
  }
`;

// const useStyles = makeStyles({
//   button: {
//     margin: "0.5% 0",
//     fontSize: "1.4rem",
//     textTransform: "none",
//     marginLeft: "5px",
//   },
// });

const DeleteStatement = (props) => {
  // const classes = useStyles();
  return (
    <Mutation
      mutation={DELETE_STATEMENT_MUTATION}
      variables={{ id: props.statementID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: props.lesson },
        },
      ]}
    >
      {(deleteStatement, { loading, error }) => (
        <button
          color="secondary"
          onClick={() => {
            if (confirm("Уверены?")) {
              deleteStatement().catch((error) => {
                alert(error.message);
              });
            }
          }}
        >
          {loading ? "Удаляем..." : "Удалить"}
        </button>
      )}
    </Mutation>
  );
};

export default DeleteStatement;
