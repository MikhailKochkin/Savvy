import React, { useState } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import AreYouEnrolled from "../../auth/AreYouEnrolled";
// import { CSSTransitionGroup } from "react-transition-group";
import Front from "./Front";
import Tasks from "./Tasks";
import PleaseSignIn from "../../auth/PleaseSignIn";
import { useUser } from "../../User";
import Loading from "../../layout/Loading";
// import Navigation from "../../layout/Navigation";

// const useStyles = makeStyles({
//   button: {
//     width: "100%",
//     marginBottom: "2%",
//     fontSize: "1.4rem",
//     textTransform: "none",
//   },
//   root: {
//     marginBottom: "4%",
//   },
//   labelRoot: {
//     fontSize: "1.5rem",
//   },
// });

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      open
      structure
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
      # testResults {
      #   id
      #   student {
      #     id
      #   }
      #   testID
      #   answer
      #   attempts
      # }
      # quizResults {
      #   id
      #   student {
      #     id
      #   }
      #   answer
      #   quiz {
      #     id
      #   }
      # }
      coursePage {
        id
        price
        title
        authors {
          id
        }
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
  width: 100%;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const Box = styled.div`
  width: 570px;
  margin-top: 5%;
  /* width: 100%; */
  @media (max-width: 850px) {
    width: 100%;
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
  const me = useUser();

  const passStep = (val) => {
    if (props.passStep) props.passStep(val);
  };

  return (
    <PleaseSignIn>
      <Query
        query={SINGLE_LESSON_QUERY}
        variables={{
          id: props.id,
        }}
        fetchPolicy="no-cache"
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <Loading />;
          const lesson = data.lesson;
          let all;
          let completed = [];
          let i_am_author = false;
          let i_am_student = false;

          if (
            me &&
            lesson.coursePage.authors.filter((auth) => auth.id == me.id)
              .length > 0
          ) {
            i_am_author = true;
          }

          if (
            me &&
            me.new_subjects.filter((c) => c.id == lesson.coursePage.id).length >
              0
          ) {
            i_am_student = true;
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
            lesson && (
              <>
                <Container>
                  <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={onResize}
                  />
                  {/* {!props.isBot && (
                    <Navigation
                      i_am_author={i_am_author}
                      lesson={lesson}
                      me={me}
                      width={width}
                      page="simulator"
                    />
                  )} */}
                  <Box>
                    {/* <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                      > */}
                    {!start && (
                      <Front
                        me={me}
                        text={lesson.text}
                        getStart={getStart}
                        completed={completed}
                        results={lesson.challengeResults}
                        passStep={passStep}
                      />
                    )}
                    {me && start && (
                      <Tasks
                        tasks={all}
                        lesson={lesson}
                        me={me}
                        completed={completed}
                        results={lesson.challengeResults}
                        passStep={passStep}
                      />
                    )}
                    {/* </CSSTransitionGroup> */}
                  </Box>
                </Container>{" "}
              </>
            )
          );
        }}
      </Query>
    </PleaseSignIn>
  );
};

export default Challenge;
export { SINGLE_LESSON_QUERY };
