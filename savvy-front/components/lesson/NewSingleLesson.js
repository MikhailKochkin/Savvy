import { useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { CSSTransitionGroup } from "react-transition-group";
import { useTranslation } from "next-i18next";
import PleaseSignIn from "../auth/PleaseSignIn";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import StoryEx from "./StoryEx";
import { useUser } from "../User";
import Offer from "./Offer";
import Navigation from "./Navigation";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      type
      structure
      short_structure
      change
      open
      totalPoints
      hasSecret
      # lessonResults {
      #   id
      #   student {
      #     id
      #   }
      #   progress
      # }
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
        complexity
        ifRight
        ifWrong
        check
        type
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
        authors {
          id
        }
        courseType
        lessons {
          id
          number
          type
          published
          # lessonResults {
          #   id
          #   visitsNumber
          #   lessonID
          #   student {
          #     id
          #   }
          # }
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
  /* background-image: url("/static/law_pattern.svg"); */
  background-image: url("/static/law_pattern.svg");

  background-size: contain;
`;

const Head2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  span {
    color: #3ddc97;
    cursor: pointer;
    &:hover {
      color: #139a43;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    padding: 2% 15px;
    div {
      flex: 85%;
      text-align: right;
    }
  }
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
  const me = useUser();
  const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });
  if (loading)
    return (
      <Progress>
        <CircularProgress />
      </Progress>
    );

  let lesson = data.lesson;
  let next = lesson.coursePage.lessons.find(
    (l) => l.number === lesson.number + 1
  );

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
  return (
    <PleaseSignIn>
      {/* {!i_am_student &&
        lesson.open &&
        lesson.coursePage.courseType == "FORMONEY" && (
          <Offer me={me} coursePageId={lesson.coursePage.id} />
        )} */}
      <div id="root"></div>
      <>
        {lesson && (
          <AreYouEnrolled
            openLesson={lesson.open}
            subject={lesson.coursePage.id}
            lessonId={lesson.id}
          >
            <Container>
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={onResize}
              />

              <Navigation
                i_am_author={i_am_author}
                lesson={lesson}
                me={me}
                width={width}
              />
              <LessonPart>
                {/* <h1>
                  {t("lesson")} {lesson.number}. {lesson.name}
                </h1> */}
                <CSSTransitionGroup transitionName="example">
                  <StoryEx
                    id={props.id}
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
                  />
                </CSSTransitionGroup>
              </LessonPart>
            </Container>{" "}
          </AreYouEnrolled>
        )}
      </>
    </PleaseSignIn>
  );
};

export default NewSingleLesson;
export { NEW_SINGLE_LESSON_QUERY };
