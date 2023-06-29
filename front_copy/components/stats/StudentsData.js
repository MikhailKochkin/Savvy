import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import UserAnalytics from "./UserAnalytics";

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
      number
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

const StudentsData = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(STUDENTS_QUERY, {
    variables: { coursePageId: props.id },
  });
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSONS_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <p>Загружаем информацию о курсе...</p>;
  if (loading1) return <p>Загружаем информацию о студентах...</p>;
  if (loading2) return <p>Загружаем информацию об уроках...</p>;

  let coursePage = data.coursePage;
  let students = data1.users;
  let lessons = data2.lessons;

  return (
    <div>
      <UserAnalytics
        coursePage={coursePage.title}
        coursePageID={coursePage.id}
        lessons={lessons}
        students={students}
      />
    </div>
  );
};

export default StudentsData;
export { SINGLE_COURSEPAGE_QUERY };
