import React from "react";
import { useQuery, gql } from "@apollo/client";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY {
    lessons {
      id
      structure
      name
    }
  }
`;

const test = () => {
  const { data, loading, error } = useQuery(NEW_SINGLE_LESSON_QUERY);
  console.log(data);
  return <div>Привет!</div>;
};

export default test;
