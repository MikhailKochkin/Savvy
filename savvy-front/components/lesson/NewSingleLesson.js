import { useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import Head from "next/head";

import StoryEx from "./StoryEx";
import { useUser } from "../User";
import LoadingText from "../layout/LoadingText";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import PleaseSignIn from "../auth/PleaseSignIn";
import LoadingErrorMessage from "../layout/LoadingErrorMessage";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(id: $id) {
      id
      text
      openSize
      name
      number
      type
      context
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
      # teamQuests {
      #   id
      #   introduction
      #   solution
      #   # tasks
      # }
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
        title
        price
        authors {
          id
        }
        user {
          id
        }
        courseType
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
  const { t } = useTranslation("lesson");
  // const onResize = (width) => setWidth(width);
  let loadedMe = useUser();

  // 1. Demo User data

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

  // 2. Move around the lesson

  useEffect(() => {
    if (props.passStep) props.passStep(0);
  }, [0]);

  const passStep = (num) => {
    if (props.passStep) props.passStep(num);
  };

  // 3. Download lesson data

  const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });

  if (loadedMe) {
    me = loadedMe;
  }

  if (loading) return <LoadingText />;
  if (!data || !data.lesson) {
    let errorData = {
      type: "simulator",
      page: "lesson",
      id: props.id ? props.id : null,
      error: error
        ? error
        : "For some reason data or data.lesson have not been loaded.",
    };
    return <LoadingErrorMessage errorData={errorData} />;
  }
  let lesson = data.lesson;
  let next = lesson.coursePage.lessons.find(
    (l) => l.number === lesson.number + 1
  );
  // 4. Check if I am the student or the author

  let i_am_author = false;
  let i_am_student = false;

  if (
    me &&
    (lesson.coursePage.authors.filter((auth) => auth.id == me.id).length > 0 ||
      lesson.coursePage?.user?.id == me.id)
  ) {
    i_am_author = true;
  }

  if (
    me &&
    me.new_subjects.filter((c) => c.id == lesson.coursePage.id).length > 0
  ) {
    i_am_student = true;
  }

  if (!lesson.open && (!me || me.id == "clkvdew14837181f13vcbbcw0x")) {
    return (
      <PleaseSignIn
        authSource={props.authSource}
        coursePageId={lesson.coursePage.id}
      />
    );
  }

  if (
    me &&
    !i_am_student &&
    !i_am_author &&
    !me.permissions.includes("ADMIN") &&
    !lesson.open
  ) {
    return <AreYouEnrolled coursePageId={lesson.coursePage.id} />;
  }

  return (
    <>
      <Head>
        <title>{lesson ? lesson.name : "Simulator"}</title>
        <meta name="description" content={lesson.description} />
      </Head>
      <div id="root"></div>
      <>
        {lesson && (
          <>
            <Container>
              <LessonPart>
                <StoryEx
                  id={props.id}
                  // step is the ability to set the part of the lesson you want to open via menu
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
                  i_am_student={i_am_student}
                  authSource={props.authSource}
                  embedded={props.embedded}
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
