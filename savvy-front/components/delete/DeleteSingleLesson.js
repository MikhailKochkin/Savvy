import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
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
  padding: 1%;
  width: 100%;
  border: none;
  border-left: 1px solid white;
  padding-left: 8%;
  outline: none;
  background: none;
  text-align: left;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
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
`;

class DeleteSingleLesson extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_LESSON_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        // refetchQueries={() => [
        //   {
        //     query: PAGE_LESSONS_QUERY,
        //     variables: { id: this.props.coursePageID }
        //   }
        // ]}
      >
        {(DeleteSandbox, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Вы точно хотите удалить этот урок?")) {
                DeleteSandbox().catch((error) => {
                  alert(error.message);
                });
                Router.push({
                  pathname: "/coursePage",
                  query: { id: this.props.coursePageID },
                });
              }
            }}
          >
            <Delete id="remove">Удалить урок</Delete>
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteSingleLesson;
