import React from "react";
import { useQuery, gql } from "@apollo/client";

const LAWRDLES_QUERY = gql`
  query LAWRDLES_QUERY {
    lawrdles {
      id
      word
      story
      author {
        id
        name
        surname
      }
      active
    }
  }
`;

const Lawrdles = () => {
  const { loading, error, data } = useQuery(LAWRDLES_QUERY);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <ul>
        {data.lawrdles.map((l) => (
          <li>{l.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lawrdles;
