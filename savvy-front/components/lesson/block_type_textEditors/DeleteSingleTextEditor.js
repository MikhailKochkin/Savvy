import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";
import { SecondaryButton } from "../styles/DevPageStyles";

const DELETE_TEXTEDITOR_MUTATION = gql`
  mutation DELETE_TEXTEDITOR_MUTATION($id: String!) {
    deleteTextEditor(id: $id) {
      id
    }
  }
`;

const DeleteSingleTextEditor = (props) => {
  const { t } = useTranslation("lesson");

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
        <SecondaryButton
          color="secondary"
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteTextEditor().catch((error) => {
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

// export default withTranslation("update")(DeleteSingleTextEditor);
export default DeleteSingleTextEditor;
