import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { ENROLL_COURSE_MUTATION } from "../../EnrollCoursePage";
import { CURRENT_USER_QUERY } from "../../User";

const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($id: ID!, $isPaid: Boolean!) {
    updateOrder(id: $id, isPaid: $isPaid) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 110px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const AcceptApplication = (props) => {
  const onClick = async (e, enrollOnCourse, updateOrder) => {
    e.preventDefault();
    enrollOnCourse({
      variables: {
        id: props.user.id,
        coursePage: props.coursePageID,
      },
    });
    updateOrder({
      variables: {
        id: props.orderID,
        isPaid: true,
      },
    });
    props.getData("accept");
  };
  return (
    <div>
      <Mutation
        mutation={ENROLL_COURSE_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(enrollOnCourse) => (
          <Mutation mutation={UPDATE_ORDER}>
            {(updateOrder, { loading, error }) => (
              <Button onClick={(e) => onClick(e, enrollOnCourse, updateOrder)}>
                Принять
              </Button>
            )}
          </Mutation>
        )}
      </Mutation>
    </div>
  );
};

export default AcceptApplication;
