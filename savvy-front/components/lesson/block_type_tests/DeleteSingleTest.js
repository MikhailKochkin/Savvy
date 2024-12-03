import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";
import { SecondaryButton } from "../styles/DevPageStyles";

const DELETE_TEST_MUTATION = gql`
  mutation DELETE_TEST_MUTATION($id: String!) {
    deleteNewTest(id: $id) {
      id
    }
  }
`;

const DeleteSingleTest = (props) => {
  const { testId, lessonId } = props;
  const { t } = useTranslation("lesson");

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
        <SecondaryButton
          color="secondary"
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteTest().catch((error) => {
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

export default DeleteSingleTest;
