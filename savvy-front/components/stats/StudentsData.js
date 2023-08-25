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
      type
      assignment
      number
      user {
        id
        name
        surname
      }
      structure
      coursePage {
        id
      }
      forum {
        id
      }
      shots {
        id
        title
        parts
        comments
        user {
          id
        }
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
        type
      }
      quizes {
        id
        question
        answer
        next
        type
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
        type
        next
      }
      chats {
        id
        name
        messages
        user {
          id
        }
      }
      problems {
        id
        text
        steps
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
        elements
        columnsNum
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

  if (loading) return <p>Loading course data...</p>;
  if (loading1) return <p>Loading students data...</p>;
  if (loading2) return <p>Loading lessons data...</p>;

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
