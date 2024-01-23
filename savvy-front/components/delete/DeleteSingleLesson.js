import React, { Component } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Router from "next/router";

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

const Delete = styled.div`
  background: none;
  width: 100%;
`;

const DeleteSingleLesson = (props) => {
  const [deleteLesson, { data, loading, error }] = useMutation(
    DELETE_LESSON_MUTATION
  );

  return (
    // <Mutation
    //   mutation={DELETE_LESSON_MUTATION}
    //   variables={{ id: props.id }}
    //   update={update}
    // >
    //   {(DeleteSandbox, { error }) => (
    <Button
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
      {/* <Delete id="remove"> */}
      Delete Lesson
      {/* </Delete> */}
    </Button>
    //   )}
    // </Mutation>
  );
};

export default DeleteSingleLesson;
