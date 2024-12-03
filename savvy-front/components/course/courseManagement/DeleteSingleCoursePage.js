import React from "react";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import { PrimaryButton } from "../../lesson/styles/DevPageStyles";
import { MY_COURSES_QUERY } from "./MyCourses";

const DELETE_COURSEPAGE_MUTATION = gql`
  mutation DELETE_COURSEPAGE_MUTATION($id: String!) {
    deleteCoursePage(id: $id) {
      id
    }
  }
`;

const DeleteSingleCoursePage = (props) => {
  const [deleteCoursePage, { loading }] = useMutation(
    DELETE_COURSEPAGE_MUTATION,
    {
      refetchQueries: [{ query: MY_COURSES_QUERY }],
    }
  );

  return (
    <PrimaryButton
      onClick={async () => {
        if (confirm("Sure?")) {
          await deleteCoursePage({
            variables: {
              id: props.coursePageId,
            },
          }).catch((error) => {
            alert(error.message);
          });
          Router.push({
            pathname: "/coursesManagement",
          });
        }
      }}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Course"}
    </PrimaryButton>
  );
};

export default DeleteSingleCoursePage;
