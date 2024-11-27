import React, { Component } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Router from "next/router";
import { PrimaryButton } from "./styles/DevPageStyles";
const DELETE_LESSON_MUTATION = gql`
  mutation DELETE_LESSON_MUTATION($id: String!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  outline: none;
  background: none;

  cursor: pointer;
  &:hover {
    border-left: 1px solid white;
  }
  @media (max-width: 800px) {
    border-left: 1px solid #112a62;
    color: white;
    &:hover {
      border-bottom: 1px solid white;
    }
  }
`;

const DeleteSingleLesson = (props) => {
  const [deleteLesson, { data, loading, error }] = useMutation(
    DELETE_LESSON_MUTATION
  );

  return (
    <PrimaryButton
      onClick={() => {
        if (confirm("Sure?")) {
          deleteLesson({
            variables: {
              id: props.lessonId,
            },
          }).catch((error) => {
            alert(error.message);
          });
          Router.push({
            pathname: "/course",
            query: { id: props.coursePageId },
          });
        }
      }}
    >
      Delete Lesson
    </PrimaryButton>
  );
};

export default DeleteSingleLesson;
