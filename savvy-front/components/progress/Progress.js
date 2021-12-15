import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CourseBox from "./CourseBox";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin: 50px 0;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const COURSEPAGES_QUERY = gql`
  query COURSEPAGES_QUERY {
    coursePages(where: { published: { equals: true } }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        email
        studentFeedback {
          id
          lesson {
            id
            coursePage {
              id
            }
          }
        }
        courseVisits {
          id
          reminders
          visitsNumber
          coursePage {
            id
          }
          createdAt
        }
      }
      lessons {
        id
        text
        name
        number
        structure
        # coursePage {
        #   id
        # }
        # forum {
        #   id
        # }
        newTests {
          id
          question
          answers
          correct
          next
        }
        quizes {
          id
          question
          answer
          next
        }
        forum {
          rating {
            id
            rating
            createdAt
            user {
              id
              name
              surname
            }
          }
        }
        # documents {
        #   id
        #   title
        #   documentResults {
        #     id
        #     user {
        #       id
        #     }
        #     document {
        #       id
        #     }
        #     answers
        #     drafts
        #     createdAt
        #   }
        # }
        notes {
          id
          text
          next
        }
        problems {
          id
          text
          nodeID
          nodeType
        }
        texteditors {
          id
          text
          totalMistakes
        }
        constructions {
          id
          name
          variants
          answer
        }
        documents {
          id
          title
        }
        # user {
        #   id
        # }
      }
    }
  }
`;

const Progress = () => {
  const { loading, error, data } = useQuery(COURSEPAGES_QUERY);
  if (loading) return <p>Загрузка...</p>;
  let coursePages = data.coursePages;
  console.log(coursePages);
  return (
    <Styles>
      <Container>
        {coursePages.map((c, i) => (
          <CourseBox key={c.id} c={c} />
        ))}
      </Container>
    </Styles>
  );
};

export default Progress;
