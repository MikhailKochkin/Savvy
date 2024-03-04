import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import StoryEx from "./StoryEx";
import { useUser } from "../User";
import LoadingText from "../LoadingText";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      openSize
      name
      number
      type
      structure
      short_structure
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
        next
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
        messages
        user {
          id
        }
      }
      quizes {
        id
        question
        answer
        answers
        complexity
        ifRight
        ifWrong
        check
        type
        name
        image
        goalType
        next
        user {
          id
        }
      }
      newTests {
        answers
        type
        correct
        comments
        complexity
        ifRight
        ifWrong
        question
        name
        image
        next
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
      teamQuests {
        id
        introduction
        solution
        tasks
      }
      problems {
        id
        text
        nodeID
        steps
        complexity
        nodeType
        user {
          id
        }
        createdAt
      }
      offers {
        id
        header
        text
        type
        courseId
        price
        program {
          id
          months
          syllabus
        }
        discountPrice
        user {
          id
        }
        lesson {
          id
        }
      }
      constructions {
        id
        name
        answer
        elements
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
        title
        price
        authors {
          id
        }
        courseType
        lessons {
          id
          number
          type
          published
          name
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
    width: 100%;
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
  let loadedMe = useUser();

  let me = {
    company: {
      __typename: "Company",
      id: "ck95eoaef03600794opika5y8",
      name: "BeSavvy",
    },
    coursePages: [],
    courseVisits: [],
    email: "newuser@besavvy.app",
    id: "clkvdew14837181f13vcbbcw0x",
    image: "",
    tags: ["IP/IT", "Гражданское право"],
    lessonResults: [],
    lessons: [],
    myTeams: [],
    level: {
      __typename: "UserLevel",
      id: "clkvdewap837241f134ehs5su6",
      level: 1,
    },
    image:
      "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1695807197/Screenshot_2023-09-27_at_13.32.54.png",
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
  // const me = useUser();
  useEffect(() => {
    if (props.passStep) props.passStep(0);
  }, [0]);
  const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });
  if (loading) return <LoadingText />;
  let lesson = data.lesson;
  let next = lesson.coursePage.lessons.find(
    (l) => l.number === lesson.number + 1
  );
  if (loadedMe) {
    me = loadedMe;
  }
  let i_am_author = false;
  let i_am_student = false;
  if (
    me &&
    lesson.coursePage.authors.filter((auth) => auth.id == me.id).length > 0
  ) {
    i_am_author = true;
  }

  if (
    me &&
    me.coursePages.filter((c) => c.id == lesson.coursePage.id).length > 0
  ) {
    i_am_student = true;
  }

  const passStep = (num) => {
    if (props.passStep) props.passStep(num);
  };
  return (
    <>
      {/* {!i_am_student &&
        lesson.open &&
        lesson.coursePage.courseType == "FORMONEY" && (
          <Offer me={me} coursePageId={lesson.coursePage.id} />
        )} */}
      <div id="root"></div>
      <>
        {lesson && (
          <>
            <Container>
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={onResize}
              />

              <LessonPart>
                {/* {!props.isBot && !props.embedded && (
                  <Navigation
                    i_am_author={i_am_author}
                    lesson={lesson}
                    me={me}
                    width={width}
                  />
                )} */}
                <StoryEx
                  id={props.id}
                  step={props.step}
                  tasks={
                    props.add == "offer"
                      ? [
                          ...lesson.structure.lessonItems,
                          { id: 1, type: "offer" },
                        ]
                      : lesson.structure.lessonItems
                  }
                  me={me}
                  size={props.size == "short" ? "short" : "long"}
                  lesson={lesson}
                  next={next}
                  coursePageID={lesson.coursePage.id}
                  coursePage={lesson.coursePage}
                  passStep={passStep}
                  openLesson={lesson.open}
                  i_am_author={i_am_author}
                  width={width}
                />
              </LessonPart>
            </Container>{" "}
          </>
        )}
      </>
    </>
  );
};

export default NewSingleLesson;
export { NEW_SINGLE_LESSON_QUERY };
