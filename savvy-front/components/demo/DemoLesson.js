import { useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import DemoStoryEx from "./DemoStoryEx";
import { TailSpin } from "react-loader-spinner";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(id: $id) {
      id
      text
      name
      number
      type
      structure {
        lessonItems {
          id
          type
          comment
        }
      }
      change
      open
      totalPoints
      hasSecret
      createdAt
      user {
        id
        name
        surname
        image
      }
      notes {
        id
        link_clicks
        text
        name
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
        user {
          id
        }
      }
      chats {
        id
        name
        isSecret
        link_clicks
        complexity
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
      quizes {
        id
        question
        answer
        answers {
          answerElements {
            answer
            index
            relatedAnswers
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
        user {
          id
        }
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
      texteditors {
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
      miniforums {
        id
        type
        value
        statements {
          id
          text
          comments
          createdAt
          user {
            id
            name
            surname
          }
        }
        lesson {
          id
          user {
            id
          }
        }
        user {
          id
          name
          surname
        }
      }
      forum {
        id
        text
        rating {
          id
          rating
          user {
            id
          }
        }
        statements {
          id
          text
          comments
          createdAt
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
        lesson {
          id
          user {
            id
          }
        }
        user {
          id
          name
          surname
        }
      }
      coursePage {
        id
        lessons {
          id
          number
          type
          published
          name
          open
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  background-image: url("/static/law_pattern.svg");
  background-size: contain;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  margin: 0 0 2% 0;
`;

const LessonPart = styled.div`
  display: flex;
  padding: 0% 2%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin: 0 0 20px 0;
  h1 {
    max-width: 650px;
    line-height: 1.4;
    font-weight: 600;
  }
  @media (max-width: 1500px) {
    width: 55%;
  }
  @media (max-width: 1000px) {
    margin: 1%;
    width: 90%;
    h1 {
      width: 95%;
      font-size: 2.6rem;
    }
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    /* opacity: 1; */
  }

  .example-leave.example-leave-active {
    /* opacity: 0.01; */
    /* transition: opacity 3000ms ease-in; */
  }
`;

const NewSingleLesson = (props) => {
  const [width, setWidth] = useState(0);
  const { t } = useTranslation("lesson");

  const onResize = (width) => setWidth(width);
  const me = {
    company: {
      __typename: "Company",
      id: "ck95eoaef03600794opika5y8",
      name: "BeSavvy",
    },
    coursePages: [],
    courseVisits: [],
    email: "mixa101094@yandex.ru",
    id: "ckmddnbfy180981gwpn2ir82c9",
    image: "",
    tags: ["IP/IT", "Гражданское право"],
    lessonResults: [],
    lessons: [],
    level: {
      __typename: "UserLevel",
      id: "ckmddnbr7181041gwpimgpqmin",
      level: 1,
    },
    name: "Demo User",
    new_subjects: [],
    orders: [],
    permissions: ["USER"],
    status: "STUDENT",
    studentFeedback: [],
    surname: "",
    teacherFeedback: [],
    uni: {
      __typename: "Uni",
      id: "cjyimfz2e00lp07174jpder3m",
      title: "Другой",
      capacity: -7,
      paidMonths: 0,
    },
    __typename: "User",
    __proto__: Object,
  };
  const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });
  if (loading)
    return (
      <Progress>
        <TailSpin
          height="80"
          width="80"
          color="#2E80EC"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Progress>
    );

  let lesson = data.lesson;
  let next = lesson.coursePage.lessons.find(
    (l) => l.number === lesson.number + 1
  );

  return (
    <>
      <div id="root"></div>

      {lesson && (
        <Container>
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          <LessonPart>
            {/* <h1>Demo lesson</h1> */}
            <DemoStoryEx
              id={props.id}
              tasks={
                props.add == "offer"
                  ? [...lesson.structure.lessonItems, { id: 1, type: "offer" }]
                  : lesson.structure.lessonItems
              }
              me={me}
              size={props.size == "short" ? "short" : "long"}
              lesson={lesson}
              next={next}
              coursePageID={lesson.coursePage.id}
            />
          </LessonPart>
        </Container>
      )}
    </>
  );
};

export default NewSingleLesson;
export { NEW_SINGLE_LESSON_QUERY };
