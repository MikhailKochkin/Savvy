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

const COURSEPAGE_QUERY = gql`
  query COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        tags
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
        assignment
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
          id
          text
          lesson {
            id
            name
          }
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
          statements {
            id
            text
            createdAt
            answered
            comments
            user {
              id
              name
              surname
            }
            forum {
              id
              rating {
                id
                rating
              }
            }
          }
          # lesson {
          #   id
          #   user {
          #     id
          #   }
          # }
          # user {
          #   id
          #   name
          #   surname
          # }
        }
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
      }
    }
  }
`;

const Progress = (props) => {
  const { loading, error, data } = useQuery(COURSEPAGE_QUERY, {
    variables: { id: props.courseId },
  });
  if (loading) return <p>Loading...</p>;
  let coursePage = data.coursePage;

  return (
    <Styles>
      <Container>
        <CourseBox key={coursePage.id} id={coursePage.id} c={coursePage} />
      </Container>
    </Styles>
  );
};

export default Progress;
