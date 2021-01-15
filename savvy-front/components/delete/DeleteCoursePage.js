import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { CoursePerPage, Tags } from "../../config";

const ALL_COURSE_PAGES_QUERY = gql`
  query ALL_COURSE_PAGES_QUERY($skip: Int = 0, $first: Int = ${CoursePerPage}) {
    coursePages(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      tags
      courseType
      students
      price
      discountPrice
      careerTrack {
          id
      }
      pointsA {
          id
      }
      applications {
          id
          applicantId
      }
      user {
          id
          name
      }
    }
  }
`;

const DELETE_COURSEPAGE_MUTATION = gql`
  mutation DELETE_COURSEPAGE_MUTATION($id: String!) {
    deleteCoursePage(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background-color: #008cba;
  border: none;
  color: white;
  padding: 5px 12px;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  width: 135px;
  margin: 2px;
  cursor: pointer;
  &:hover {
    background-color: #003d5b;
  }
`;

class DeleteCoursePage extends Component {
  // update = (cache, payload) => {
  //     //manually update the cache on the client, so it matches the server
  //     //1. Read the cache for the cases we want
  //     const data = cache.readQuery({ query: ALL_COURSE_PAGES_QUERY})
  //     //2. filter the deleted item out of the page
  //     data.coursePages = data.coursePages.filter(coursePage => coursePage.id !==
  //         payload.data.deleteCoursePage.id)
  //     //3. Put the cases back!
  //     cache.writeQuery({ query: ALL_COURSE_PAGES_QUERY, data})
  // }
  render() {
    return (
      <Mutation
        mutation={DELETE_COURSEPAGE_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={() => [
          {
            query: ALL_COURSE_PAGES_QUERY,
          },
        ]}
      >
        {(DeleteCoursePage, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Вы точно хотите удалить страницу этого курса?")) {
                DeleteCoursePage().catch((error) => {
                  alert(error.message);
                });
              }
            }}
          >
            {this.props.children}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteCoursePage;
