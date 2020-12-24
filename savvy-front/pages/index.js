import React, { Component } from "react";
import Courses from "../components/course/Courses";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query coursePages {
    coursePages {
      id
      title
    }
  }
`;

const Index = (props) => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return <Courses />;
};

export default Index;
