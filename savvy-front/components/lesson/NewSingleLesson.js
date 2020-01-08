import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
import PleaseSignIn from "../auth/PleaseSignIn";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import StoryEx from "./StoryEx";
import User from "../User";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      type
      map
      open
      createdAt
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
      shots {
        id
        title
        parts
        comments
        user {
          id
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
      }
      quizes {
        id
        question
        answer
        type
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
        question
        next
        user {
          id
        }
      }
      problems {
        id
        text
        nodeID
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
        text
        totalMistakes
        user {
          id
        }
      }
      exams {
        id
        nodeID
        nodeType
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
  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #112a62; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1% 0;
  background: #f0f8ff;
  width: 100%;
  text-align: center;
  font-size: 2.6rem;
  @media (max-width: 800px) {
    font-size: 1.8rem;
    justify-content: space-between;
    padding: 2% 15px;
    span {
      flex: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #112a62;
      color: #112a62;
      border-radius: 5px;
      padding: 0 1%;
    }
    div {
      flex: 85%;
      text-align: right;
    }
  }
`;

const Head2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  background: #3626a7;
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

const LessonPart = styled.div`
  display: flex;
  border: 1px solid #edefed;
  padding: 0.5% 2%;
  width: 45%;
  flex-direction: column;
  border-radius: 2px;
  margin: 0 0 20px 0;
  a {
    padding-top: 2%;
    padding-left: 2%;
  }
  @media (max-width: 800px) {
    margin: 1%;
    width: 90%;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  width: 45%;
  button {
    border: none;
    background: none;
    border: 1px solid #112a62;
    border-radius: 5px;
    font-family: Montserrat;
    padding: 1.5% 3%;
    font-size: 1.6rem;
    margin-right: 3%;
    outline: 0;
    color: #112a62;
    cursor: pointer;
    &:hover {
      background: #112a62;
      color: white;
    }
  }
  div {
    font-weight: bold;
    color: #112a62;
    margin-left: 15px;
    padding: 10px;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 20px;
    padding: 1.5%;
    button {
      width: 50%;
      height: 40px;
    }
    div {
      padding: 0;
    }
  }
`;

const Header = styled.div`
  border: 1px solid #edefed;
  background: #edefed;
  margin-top: 4%;
  border-bottom: 0;
  width: 45%;
  text-align: left;
  padding: 5px 0px 5px 2%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

class SingleLesson extends Component {
  state = {
    page: "shots",
    shown: false,
    width: 0,
    step: 0
  };

  onSwitch = e => {
    e.preventDefault();
    const name = e.target.getAttribute("name");

    this.setState({ page: name });
    this.setState(prevState => ({ shown: !prevState.shown }));
  };

  onSwitchMob = e => {
    e.preventDefault();
    const name = e.target.getAttribute("name");

    this.setState({ page: name });
    this.setState(prevState => ({ shown: !prevState.shown }));
    this.closeNav();
  };

  onResize = width => {
    this.setState({ width });
  };

  openNav = () => {
    document.getElementById("mySidenav2").style.width = "180px";
  };

  /* Set the width of the side navigation to 0 */
  closeNav = () => {
    document.getElementById("mySidenav2").style.width = "0";
  };

  more = e => {
    const max = parseInt(e.target.getAttribute("data"));
    if (this.state.step < parseInt(max) - 1) {
      this.setState(prev => ({ step: prev.step + 1 }));
    }
  };

  less = () => {
    if (this.state.step > 0) {
      this.setState(prev => ({ step: prev.step - 1 }));
    }
  };

  plusTest = () => {
    this.setState(prevState => ({
      steps: prevState.steps + 1
    }));
  };

  render() {
    return (
      <PleaseSignIn number={this.props.number}>
        <User>
          {({ data: { me } }) => (
            <Query
              query={SINGLE_LESSON_QUERY}
              variables={{
                id: this.props.id
              }}
            >
              {({ data, error, loading }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                const lesson = data.lesson;
                return (
                  <>
                    {lesson && (
                      <>
                        {/* <AreYouEnrolled subject={lesson.coursePage.id}> */}
                        <Container>
                          <ReactResizeDetector
                            handleWidth
                            handleHeight
                            onResize={this.onResize}
                          />
                          <Head>
                            <div>
                              {lesson.number}. {lesson.name}
                            </div>
                          </Head>
                          {lesson.user.id === me.id && (
                            <Head2>
                              {lesson.map.length > 0 && (
                                <div>
                                  Режим истории →
                                  <Link
                                    href={{
                                      pathname: "/lesson",
                                      query: {
                                        id: lesson.id,
                                        type: "regular"
                                      }
                                    }}
                                  >
                                    <span> Переключить</span>
                                  </Link>
                                </div>
                              )}
                            </Head2>
                          )}
                          <Header>
                            Шаг {this.state.step + 1} из{" "}
                            {data.lesson.map[0].length}
                          </Header>
                          <LessonPart>
                            <StoryEx
                              m={data.lesson.map[0][this.state.step]}
                              me={me}
                              lesson={lesson}
                              step={this.state.step}
                            />
                          </LessonPart>
                          <Navigation>
                            {lesson && this.state.step + 1 > 1 && (
                              <button onClick={this.less}>Назад</button>
                            )}
                            {lesson &&
                              this.state.step + 1 !==
                                data.lesson.map[0].length && (
                                <button
                                  data={data.lesson.map[0].length}
                                  onClick={this.more}
                                >
                                  Вперед
                                </button>
                              )}
                            {lesson &&
                              this.state.step + 1 ===
                                data.lesson.map[0].length && (
                                <Link
                                  href={{
                                    pathname: "/coursePage",
                                    query: { id: lesson.coursePage.id }
                                  }}
                                >
                                  <div>Вернуться на страницу курса</div>
                                </Link>
                              )}
                          </Navigation>
                        </Container>{" "}
                        <div id="root"></div>
                        {/* </AreYouEnrolled> */}
                      </>
                    )}
                  </>
                );
              }}
            </Query>
          )}
        </User>
      </PleaseSignIn>
    );
  }
}

export default SingleLesson;
export { SINGLE_LESSON_QUERY };
