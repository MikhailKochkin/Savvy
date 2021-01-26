import React, { useState, useEffect } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "./Course";

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($me: ID) {
    coursePages(
      where: { new_students_some: { id: $me }, published: true }
      orderBy: createdAt_DESC
    ) {
      id
      title
      description
      image
      tags
      published
      courseType
      user {
        id
        name
        status
        company {
          id
          name
        }
        uni {
          id
          title
        }
        image
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Block = styled.div`
  box-sizing: border-box;
  width: 75%;
  padding: 2% 0;
  margin-top: 3%;
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 0;
    padding-top: 25px;
    border-radius: 0;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 0 0;
  @media (max-width: 800px) {
    font-size: 2rem;
    margin: 0 0 30px 0;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Enrolled = (props) => {
  return (
    <Styles>
      <Block>
        <Header>Вы уже проходите:</Header>
        <Query
          query={MY_COURSES_QUERY}
          variables={{
            me: props.me.id,
          }}
        >
          {({ data, error, loading, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <Group>
                {data.coursePages.map((c) => (
                  <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
                ))}
              </Group>
            );
          }}
        </Query>
      </Block>
    </Styles>
  );
};

export default Enrolled;
