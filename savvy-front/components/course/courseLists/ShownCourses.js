import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import LoadingDummy from "../LoadingDummy";

const COURSE_PAGES_QUERY = gql`
  query COURSE_PAGES_QUERY {
    coursePages(orderBy: createdAt_DESC) {
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
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  @media (max-width: 800px) {
    width: 95%;
    padding: 20px 0;
  }
`;

const Container = styled.div`
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

const Header = styled.div`
  /* font-weight: bold; */
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 0 0;
  @media (max-width: 800px) {
    font-size: 2rem;
    margin: 0 0 30px 0;
  }
`;

const Message = styled.div`
  /* font-weight: bold; */
  font-size: 1.7rem;
  width: 75%;
  margin: 3% 0;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const ShownCourses = (props) => {
  return (
    <Styles>
      <Header>Вам могут быть интересны:</Header>
      <Container>
        <Query query={COURSE_PAGES_QUERY} fetchPolicy="cache-and-network">
          {({ data, error, loading }) => {
            if (error) return <p>Error: {error.message}</p>;
            if (loading) return <LoadingDummy />;
            const coursePages = data.coursePages;
            let displayed = coursePages.filter(
              (c) =>
                c.published &&
                (c.courseType === "FORMONEY" || c.courseType === "PUBLIC")
            );
            if (props.topic && props.topic !== "Any") {
              displayed = coursePages.filter((c) =>
                c.tags.includes(props.topic)
              );
            }
            if (props.teacher) {
              displayed = displayed.filter((c) =>
                c.tags.includes(props.teacher)
              );
            }
            if (props.level && props.level !== "All") {
              displayed = displayed.filter((c) => c.tags.includes(props.level));
            }
            return (
              <>
                {displayed.length === 0 && (
                  <Message>
                    Курсов с такими характеристиками пока нет. Но мы их уже
                    делаем. Зарегистрируйтесь на сайте, и мы пришлем вам
                    сообщение, когда такие курсы появятся.
                  </Message>
                )}
                {displayed.map((c) => (
                  <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
                ))}
              </>
            );
          }}
        </Query>
      </Container>
    </Styles>
  );
};

export default ShownCourses;
