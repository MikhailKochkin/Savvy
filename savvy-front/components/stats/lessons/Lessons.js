import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import LessonResult from "./LessonResult";

const STUDENTS_QUERY = gql`
  query STUDENTS_QUERY($coursePageId: String!) {
    users(
      where: { new_subjects: { some: { id: { equals: $coursePageId } } } }
    ) {
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
  }
`;

const LESSONS_QUERY = gql`
  query LESSONS_QUERY($id: String!) {
    lessons(where: { coursePage: { id: { equals: $id } } }) {
      id
      text
      name
      open
      assignment
      number
      structure
      coursePage {
        id
      }
      forum {
        id
      }
      lessonResults {
        id
        progress
        createdAt
        updatedAt
        student {
          id
          name
          surname
          number
          email
          new_subjects {
            id
          }
        }
      }
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
`;

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const MiniStyles = styled.div`
  margin-bottom: 5px;
  border-bottom: 2px solid #edefed;
  padding: 3%;
`;

const Header = styled.p`
  font-size: 1.8rem;
  /* background: #edefed; */
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  /* border-bottom: 2px solid #edefed; */
`;

const Lessons = (props) => {
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSONS_QUERY, {
    variables: { id: props.id },
  });
  if (loading2) return <p>Загружаем информацию об уроках...</p>;

  let lessons = data2.lessons;
  {
    console.log("lessons", lessons);
  }

  return (
    <Styles>
      {[...lessons]
        .sort((a, b) => (a.number > b.number ? 1 : -1))
        .map((l) => {
          let ratings = [];
          l.forum
            ? l.forum.rating.map((r) => ratings.push(r.rating))
            : (ratings = [0]);
          let average = (
            ratings.reduce((a, b) => a + b, 0) / ratings.length
          ).toFixed(2);
          console.log(average == NaN);
          if (isNaN(average)) {
            average = "Нет оценок";
          }
          console.log("l", l.structure);
          return (
            <MiniStyles>
              <Header>
                {l.open ? "🔓" : ""}
                {l.number}. {l.name}.({l.id}) {average}
              </Header>
              {/* {console.log("l.lessonResults", l.lessonResults)} */}
              <LessonResult
                coursePageId={props.id}
                structure={l.structure}
                res={l.lessonResults}
              />
            </MiniStyles>
          );
        })}
    </Styles>
  );
};

export default Lessons;
