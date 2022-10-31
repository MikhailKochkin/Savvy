import React from "react";
import { gql, useQuery } from "@apollo/client";

import StudentData from "../StudentData";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      lessons {
        id
        text
        name
        open
        assignment
        number
        structure
      }
    }
  }
`;

const STUDENT_QUERY = gql`
  query STUDENT_QUERY($userId: String!) {
    user(where: { id: $userId }) {
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

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $studentId: String!) {
    lessonResults(
      where: {
        lesson: { id: { equals: $lessonId } }
        student: { id: { equals: $studentId } }
      }
    ) {
      id
      visitsNumber
      progress
      checked
      lesson {
        id
        name
        structure
        type
        number
      }
      student {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

const LESSON_QUERY = gql`
  query LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
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
      #   lessonResults {
      #     id
      #     progress
      #     createdAt
      #     updatedAt
      #     student {
      #       id
      #       name
      #       surname
      #       number
      #       email
      #       new_subjects {
      #         id
      #       }
      #     }
      #   }
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

const ExResults = (props) => {
  console.log("props.less", props);
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.coursePageId },
  });
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(STUDENT_QUERY, {
    variables: { userId: props.userId },
  });
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSON_QUERY, {
    variables: { id: props.lessondId },
  });

  const {
    loading: loading3,
    error: error3,
    data: data3,
  } = useQuery(LESSON_RESULTS_QUERY, {
    variables: { lessonId: props.lessondId, studentId: props.userId },
  });

  if (loading) return <p>Загружаем информацию о курсе...</p>;
  if (loading1) return <p>Загружаем информацию о студентах...</p>;
  if (loading2) return <p>Загружаем информацию об уроках...</p>;
  if (loading3) return <p>Загружаем информацию о результатах...</p>;

  let coursePage = data.coursePage;
  let student = data1.user;
  let lessons = [data2.lesson];
  let lessonResults = data3.lessonResults;
  return (
    <div>
      <div>Результаты урока:</div>
      <StudentData
        coursePage={coursePage}
        student={student}
        lessons={lessons}
        coursePageID={props.coursePageId}
        results={lessonResults}
        courseVisit={[]}
      />
    </div>
  );
};

export default ExResults;
