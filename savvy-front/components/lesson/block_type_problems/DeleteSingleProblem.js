import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { SecondaryButton } from "../styles/DevPageStyles";

const DELETE_PROBLEM_MUTATION = gql`
  mutation DELETE_PROBLEM_MUTATION($id: String!) {
    deleteProblem(id: $id) {
      id
    }
  }
`;

const DeleteSingleProblem = (props) => {
  const { t } = useTranslation("lesson");
  const { lessonId, id } = props;
  return (
    <Mutation
      mutation={DELETE_PROBLEM_MUTATION}
      variables={{ id }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonId },
        },
      ]}
    >
      {(deleteProblem, { loading, error }) => (
        <SecondaryButton
          color="secondary"
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteProblem().catch((error) => {
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

export default DeleteSingleProblem;
