import React from "react";
import { useQuery, gql } from "@apollo/client";

import ATF from "./ATF";
import Program from "./Program";
import Register from "./Register";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      nextStart
      header
      countries
      subheader
      title
      price
      goals
      discountPrice
      lessons {
        id
        # name
        # number
        # type
        # open
        # description
        # structure
        # published
        # coursePage {
        #   id
        # }
        # user {
        #   id
        # }
      }
      description
      courseType

      user {
        id
        name
        description
        surname
        image
        description
        work
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      authors {
        id
        name
        description
        surname
        image
        description
        status
        work
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
    }
  }
`;

const ConfPage = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <p>Loading...</p>;

  let conf = data.coursePage;
  return (
    <>
      <ATF conf={conf} />
      <Program conf={conf} /> <Register conf={conf} />
    </>
  );
};

export default ConfPage;
