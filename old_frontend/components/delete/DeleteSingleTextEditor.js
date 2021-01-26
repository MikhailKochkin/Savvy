import React from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { withTranslation } from "../../i18n";

const DELETE_TEXTEDITOR_MUTATION = gql`
  mutation DELETE_TEXTEDITOR_MUTATION($id: ID!) {
    deleteTextEditor(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    fontSize: "1.6rem",
    textTransform: "none",
    maxHeight: "40px",
  },
});

const DeleteSingleTextEditor = (props) => {
  const classes = useStyles();
  const { lessonID, id } = props;
  return (
    <Mutation
      mutation={DELETE_TEXTEDITOR_MUTATION}
      variables={{ id }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ]}
    >
      {(deleteTextEditor, { loading, error }) => (
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => {
            if (confirm(props.t("sure"))) {
              deleteTextEditor().catch((error) => {
                alert(error.message);
              });
            }
          }}
        >
          {loading ? props.t("deleting") : props.t("delete")}
        </Button>
      )}
    </Mutation>
  );
};

export default withTranslation("update")(DeleteSingleTextEditor);
