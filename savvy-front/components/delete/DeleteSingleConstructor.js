import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const DELETE_CONSTRUCTION_MUTATION = gql`
  mutation DELETE_CONSTRUCTION_MUTATION($id: String!) {
    deleteConstruction(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.red};
  width: 35%;
  color: white;
  padding: 10px 16px;
  margin-top: 3%;
  font-size: 1.6rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: ${(props) => props.theme.darkRed};
  }
  @media (max-width: 800px) {
    width: 60%;
  }
`;

const DeleteSingleConstruction = (props) => {
  const { t } = useTranslation("lesson");

  const { id } = props;
  return (
    <Mutation
      mutation={DELETE_CONSTRUCTION_MUTATION}
      variables={{ id }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: props.lessonID },
        },
      ]}
    >
      {(deleteConstruction, { loading, error }) => (
        <Button
          onClick={() => {
            if (confirm("Are you sure")) {
              deleteConstruction().catch((error) => {
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

export default DeleteSingleConstruction;
