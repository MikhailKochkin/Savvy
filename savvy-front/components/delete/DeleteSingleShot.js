import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const DELETE_SHOT_MUTATION = gql`
  mutation DELETE_SHOT_MUTATION($id: String!) {
    deleteShot(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.red};
  width: 20%;
  color: white;
  padding: 1.5% 3%;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${(props) => props.theme.darkRed};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

const DeleteSingleQuiz = (props) => {
  const { t } = useTranslation("lesson");

  const { shotID, lessonID } = props;
  return (
    <Mutation
      mutation={DELETE_SHOT_MUTATION}
      variables={{ id: shotID }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ]}
    >
      {(deleteShot, { error, loading }) => (
        <Button
          onClick={() => {
            if (confirm("Sure?")) {
              deleteShot().catch((error) => {
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
