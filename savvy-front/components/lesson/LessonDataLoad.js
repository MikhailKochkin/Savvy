import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import StoryEx from "./StoryEx";
import Loading from "../layout/Loading";

const LOAD_LESSON_QUERY = gql`
  query LOAD_LESSON_QUERY($lessonId: String!) {
    loadLessonData(lessonId: $lessonId) {
      notes {
        id
        link_clicks
        text
        name
        instructorName
        type
        isSecret
        complexity
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        vertical_image
        horizontal_image
        user {
          id
        }
      }
      chats {
        id
        name
        isSecret
        link_clicks
        type
        complexity
        messages {
          messagesList {
            author
            name
            text
            image
            reactions {
              reaction
              comment
              name
              image
            }
          }
        }
        user {
          id
        }
      }
      quizes {
        id
        question
        answer
        answers {
          answerElements {
            answer
            index
            relatedAnswers
            feedback
          }
        }
        complexity
        ifRight
        ifWrong
        check
        type
        name
        image
        goalType
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        isOrderOfAnswersImportant
        shouldAnswerSizeMatchSample
        user {
          id
        }
        isScoringShown
        instructorName
      }
      newTests {
        id
        answers
        complexTestAnswers {
          complexTestAnswers {
            id
            answer
          }
        }
        type
        correct
        comments
        complexity
        ifRight
        ifWrong
        question
        instructorName
        name
        image
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        id
        user {
          id
        }
      }
      testPractices {
        id
        tasks
        tasksNum
        intro
        successText
        failureText
      }
      problems {
        id
        text
        name
        nodeID
        steps {
          problemItems {
            id
            type
            next {
              true {
                type
                value
              }
              false {
                type
                value
              }
              branches {
                source
                type
                value
              }
            }
          }
        }
        complexity
        nodeType
        type
        user {
          id
        }
        createdAt
      }
      constructions {
        id
        name
        answer
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
        complexity
        variants
        hint
        type
        user {
          id
        }
      }
      textEditors {
        id
        name
        complexity
        text
        totalMistakes
        user {
          id
        }
      }
      documents {
        id
        title
        complexity
        user {
          id
        }
        clauses {
          id
          number
          user {
            id
          }
          commentary
          keywords
          sample
        }
      }
      shots {
        id
        name
        title
        parts
        comments
        user {
          id
        }
      }
    }
  }
`;

const LessonDataLoad = (props) => {
  const {
    loading: lessonData_loading,
    error: lessonData_error,
    data: lessonData,
  } = useQuery(LOAD_LESSON_QUERY, {
    variables: {
      lessonId: props.id,
    },
    fetchPolicy: "network-only", // Fetch from the network only once
    // nextFetchPolicy: "cache-first", // Use cached data for subsequent queries
  });

  if (lessonData_loading) return <Loading />;
  if (lessonData_error) return <p>{lessonData_error}</p>;
  let lesson = props.lesson;

  if (lessonData && lessonData?.loadLessonData) {
    lesson = {
      ...props.lesson,
      ...lessonData?.loadLessonData,
    };
  }

  const passStep = (num) => {
    props.passStep(num);
  };
  return (
    lesson && (
      <StoryEx
        id={props.id}
        // step is the ability to set the part of the lesson you want to open via menu
        step={props.step}
        tasks={lesson.structure.lessonItems}
        me={props.me}
        lesson={lesson}
        // next={next}
        openSize={lesson.openSize}
        coursePageId={lesson.coursePageId}
        coursePage={lesson.coursePage}
        passStep={props.passStep}
        openLesson={lesson.open}
        i_am_author={props.i_am_author}
        i_am_student={props.i_am_student}
        authSource={props.authSource}
        embedded={props.embedded}
      />
    )
  );
};

export default LessonDataLoad;
