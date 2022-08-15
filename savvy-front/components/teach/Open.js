import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import UserRow from "./UserRow";

const PUBLISHED_QUERY = gql`
  query PUBLISHED_QUERY {
    coursePages(where: { published: { equals: true } }) {
      id
      title
    }
  }
`;

const Open = (props) => {
  const { loading, error, data } = useQuery(PUBLISHED_QUERY);
  if (loading) return <p>Loading...</p>;
  let courses = data.coursePages;
  console.log(courses);
  return <div>coursePages</div>;
};

export default Open;
