import { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Query } from "@apollo/client/react/components";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { CSSTransitionGroup } from "react-transition-group";
import DemoStoryEx from "./DemoStoryEx";
// import Panel from "./Panel";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      type
      structure
      change
      open
      lessonResults {
        id
        student {
          id
        }
        progress
      }
      createdAt
      user {
        id
      }
      notes {
        id
        text
        complexity
        next
        user {
          id
        }
      }
      chats {
        id
        name
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
      problems {
        id
        text
        nodeID
        complexity
        nodeType
        user {
          id
        }
        createdAt
      }
      constructions {
        id
        name
        answer
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
      shotResults {
        id
        student {
          id
        }
        shot {
          id
        }
        answer
      }
      testResults {
        id
        student {
          id
        }
        testID
        answer
        # attempts
      }
      quizResults {
        id
        student {
          id
        }
        answer
        quiz {
          id
        }
      }
      problemResults {
        id
        student {
          id
        }
        answer
        problem {
          id
        }
      }
      textEditorResults {
        id
        student {
          id
        }
        textEditor {
          id
        }
      }
      constructionResults {
        id
        answer
        student {
          id
        }
        construction {
          id
        }
      }
      coursePage {
        id
        lessons {
          id
          number
          type
          published
          lessonResults {
            id
            visitsNumber
            lessonID
            student {
              id
            }
          }
        }
      }
      # exams {
      #   id
      #   name
      #   question
      #   nodeID
      #   nodeType
      #   user {
      #     id
      #   }
      # }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  padding-bottom: 5%;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  min-height: 10vh;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  width: 100%;
  font-size: 2rem;
  span {
    margin: 0 3%;
    margin-right: 3%;
  }
  #back {
    &:hover {
      color: #e4e4e4;
    }
    cursor: pointer;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 1%;
  }
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
  padding: 0.5% 2%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin: 0 0 20px 0;
  h1 {
    max-width: 600px;
    line-height: 1.4;
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

const DemoLesson = (props) => {
  const [width, setWidth] = useState(0);
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
    interests: ["IP/IT", "Гражданское право"],
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
  return (
    <>
      <div id="root"></div>
      <Query
        query={NEW_SINGLE_LESSON_QUERY}
        variables={{
          id: props.id,
        }}
        fetchPolicy="no-cache"
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading)
            return (
              <Progress>
                <CircularProgress />
              </Progress>
            );
          let lesson = data.lesson;
          console.log(123, lesson);
          // if (lesson === undefined) return <Reload />;
          let next = lesson.coursePage.lessons.find(
            (l) => l.number === lesson.number + 1
          );
          let my_result;
          if (me) {
            my_result = lesson.lessonResults.find(
              (l) => l.student.id === me.id
            );
          }
          return (
            <>
              {lesson && (
                <Container>
                  <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={onResize}
                  />
                  <Head>
                    {width > 800 && (
                      <Link
                        href={{
                          pathname: "/coursePage",
                          query: {
                            id: lesson.coursePage.id,
                          },
                        }}
                      >
                        <span>
                          <Icon size={"1.5em"} icon={arrowLeft} id="back" />
                        </span>
                      </Link>
                    )}
                    <span>
                      {me &&
                        (lesson.user.id === me.id ||
                          me.permissions.includes("ADMIN")) && (
                          <div>
                            {/* Режим истории → */}
                            <Link
                              href={{
                                pathname: "/lesson",
                                query: {
                                  id: lesson.id,
                                  type: "regular",
                                },
                              }}
                            >
                              <span>Переключить</span>
                            </Link>
                          </div>
                        )}
                    </span>
                  </Head>
                  <LessonPart>
                    <h1>
                      Урок {lesson.number}. {lesson.name}
                    </h1>
                    <CSSTransitionGroup transitionName="example">
                      <DemoStoryEx
                        tasks={lesson.structure.lessonItems}
                        me={me}
                        lesson={lesson}
                        next={next}
                        my_result={my_result}
                        coursePageID={lesson.coursePage.id}
                      />
                    </CSSTransitionGroup>
                  </LessonPart>
                </Container>
              )}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default DemoLesson;
export { NEW_SINGLE_LESSON_QUERY };
