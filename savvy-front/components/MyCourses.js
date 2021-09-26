import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Course from "./course/Course";

const MY_COURSE_PAGES_QUERY = gql`
  query MY_COURSE_PAGES_QUERY($id: String!) {
    coursePages(
      where: { new_students: { some: { id: { equals: $id } } } }
      orderBy: { createdAt: desc }
    ) {
      id
      title
      description
      image
      tags
      lessons {
        id
        forum {
          id
          rating {
            id
            rating
          }
        }
      }
      user {
        id
        name
        surname
        image
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
      authors {
        id
        name
        surname
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
  margin: 40px 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  align-items: center;
  justify-content: center;
`;

const MyCourses = (props) => {
  const { loading, error, data } = useQuery(MY_COURSE_PAGES_QUERY, {
    variables: { id: props.me.id },
  });
  if (loading) return <p>Загрузка...</p>;
  return (
    <Styles>
      <Container>
        {data.coursePages.map((c) => (
          <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
        ))}
      </Container>
    </Styles>
  );
};

export default MyCourses;
