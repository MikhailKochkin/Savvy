import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AreYouEnrolled from "../../auth/AreYouEnrolled";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Front from "./Front";
import Tasks from "./Tasks";
import PleaseSignIn from "../../auth/PleaseSignIn";
import { useUser } from "../../User";
import Reload from "../Reload";

const useStyles = makeStyles({
  button: {
    width: "100%",
    marginBottom: "2%",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      open
      challenge_num
      number
      type
      user {
        id
      }
      notes {
        id
        text
        next
        user {
          id
        }
      }
      challengeResults {
        id
        student {
          id
          name
          surname
        }
        correct
        wrong
        time
      }
      testResults {
        id
        student {
          id
        }
        testID
        answer
        attempts
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
      coursePage {
        id
      }
      quizes {
        id
        question
        answer
        ifRight
        ifWrong
        type
        check
        next
        user {
          id
        }
      }
      newTests {
        id
        answers
        type
        correct
        ifRight
        ifWrong
        question
        next
        user {
          id
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

const Box = styled.div`
  width: 50%;
  margin-top: 5%;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 10vh;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  width: 100%;
  font-size: 2.3rem;
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
    font-size: 1.8rem;
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
    font-size: 1.8rem;
    justify-content: space-between;
    padding: 2% 15px;
    div {
      flex: 85%;
      text-align: right;
    }
  }
`;

const shuffle = (array) => {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const Challenge = (props) => {
  const [start, setStart] = useState(false);
  const [width, setWidth] = useState(0);
  const onResize = (width) => setWidth(width);
  const getStart = (value) => {
    setStart(value);
  };

  return (
    <PleaseSignIn>
      <User>
        {({ data: { me } }) => (
          <Query
            query={SINGLE_LESSON_QUERY}
            variables={{
              id: props.id,
            }}
            fetchPolicy="no-cache"
          >
            {({ data, error, loading }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              const lesson = data.lesson;
              if (lesson === undefined) return <Reload />;
              let all;
              let completed = [];
              if (lesson) {
                all = shuffle([...lesson.newTests, ...lesson.quizes]).slice(
                  0,
                  lesson.challenge_num
                );
                if (me) {
                  completed = lesson.challengeResults.filter(
                    (c) => c.student.id === me.id
                  );
                }
              }
              return (
                <AreYouEnrolled
                  subject={lesson.coursePage.id}
                  openLesson={lesson.open}
                  lesson={lesson.id}
                >
                  {lesson && (
                    <>
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
                                <Icon size={"10%"} icon={arrowLeft} id="back" />
                              </span>
                            </Link>
                          )}
                          <span>
                            Урок {lesson.number}. {lesson.name}
                          </span>
                        </Head>
                        {me &&
                          (lesson.user.id === me.id ||
                            me.permissions.includes("ADMIN")) && (
                            <Head2>
                              <div>
                                Режим разработки →
                                <Link
                                  href={{
                                    pathname: "/lesson",
                                    query: {
                                      id: lesson.id,
                                      type: "regular",
                                    },
                                  }}
                                >
                                  <span> Переключить</span>
                                </Link>
                              </div>
                            </Head2>
                          )}
                        <Box>
                          <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                          >
                            {!start && (
                              <Front
                                me={me}
                                text={lesson.text}
                                getStart={getStart}
                                completed={completed}
                                results={lesson.challengeResults}
                              />
                            )}
                            {me && start && (
                              <Tasks
                                tasks={all}
                                lesson={lesson}
                                me={me}
                                completed={completed}
                                results={lesson.challengeResults}
                              />
                            )}
                          </ReactCSSTransitionGroup>
                        </Box>
                      </Container>{" "}
                    </>
                  )}
                </AreYouEnrolled>
              );
            }}
          </Query>
        )}
      </User>
    </PleaseSignIn>
  );
};

export default Challenge;
export { SINGLE_LESSON_QUERY };
