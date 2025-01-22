import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

import Loading from "../../layout/Loading";
import SimulatorAnalyticsMainComponent from "./SimulatorAnalyticsMainComponent";
import Navigation from "../../lesson/lesson_management/Navigation";
import { useUser } from "../../User";

const STUDENTS_QUERY = gql`
  query STUDENTS_QUERY($lessonId: String!) {
    studentsAnalytics(lessonId: $lessonId) {
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
        # reminders
        visitsNumber
        coursePage {
          id
        }
        createdAt
      }
      challengeResults {
        id
        wrong
        correct
        createdAt
        lesson {
          id
          name
          coursePage {
            id
            title
          }
        }
      }
    }
  }
`;

const LESSONS_QUERY = gql`
  query LESSONS_QUERY($id: String!) {
    lesson(id: $id) {
      id
      text
      name
      open
      type
      goal
      published
      assignment
      number
      user {
        id
        name
        surname
      }
      structure {
        lessonItems {
          id
          type
          comment
        }
      }
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
        name
        question
        answers
        correct
        # next
        type
        goal
      }
      quizes {
        id
        name
        question
        answer
        answers {
          answerElements {
            answer
            index
          }
        }
        # next
        type
        goal
      }
      testPractices {
        id
        # tasks
        goal
        # tasksNum
        intro
        successText
        failureText
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
      documents {
        id
        title
        documentResults {
          id
          user {
            id
          }
          document {
            id
          }
          answers
          drafts
          createdAt
        }
      }
      notes {
        id
        name
        text
        type
        # next
      }
      chats {
        id
        name
        messages {
          messagesList {
            author
            name
            text
            image
          }
        }
        user {
          id
        }
      }
      problems {
        id
        text
        steps {
          problemItems {
            id
            type
          }
        }
        nodeID
        nodeType
        goal
        name
      }
      texteditors {
        id
        name
        text
        totalMistakes
        goal
      }
      constructions {
        id
        name
        variants
        elements {
          elements {
            type
            value
            text
            comment
            place
            size
            rows
            inDoc
            isTest
            edit
            borders {
              top
              bottom
              left
              right
            }
          }
        }
        columnsNum
        answer
        goal
      }
      documents {
        id
        title
        goal
      }
      # user {
      #   id
      # }
    }
  }
`;

const Styles = styled.div`
  background: #f2f6f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const SingleLessonAnalyticsDataLoad = (props) => {
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(STUDENTS_QUERY, {
    variables: { lessonId: props.id },
  });
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSONS_QUERY, {
    variables: { id: props.id },
  });
  const me = useUser();

  if (loading1 || loading2) return <Loading />;

  let students = data1?.studentsAnalytics;
  let lesson = data2?.lesson;

  return (
    <Styles>
      <Navigation
        i_am_author={true}
        lesson={lesson}
        me={me}
        page="analytics"
        coursePageId={lesson?.coursePage?.id}
      />
      {students && lesson ? (
        <SimulatorAnalyticsMainComponent
          lesson={lesson}
          students={students}
          me={me}
        />
      ) : null}
    </Styles>
  );
};

export default SingleLessonAnalyticsDataLoad;
