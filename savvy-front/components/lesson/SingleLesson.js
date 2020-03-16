import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import renderHTML from "react-render-html";
import Link from "next/link";
import Note from "./notes/Note";
import Document from "./documents/Document";
import Exams from "./exams/Exams";
import TestGroup from "./tests/TestGroup";
import ShotsGroup from "./shots/ShotsGroup";
import QuizGroup from "./quizes/QuizGroup";
import ProblemGroup from "./problems/ProblemGroup";
import ConstructorGroup from "./constructions/ConstructorGroup";
import TextEditorGroup from "./textEditors/TextEditorGroup";
import PleaseSignIn from "../auth/PleaseSignIn";
import CreateNewTest from "../create/CreateNewTest";
import CreateQuiz from "../create/CreateQuiz";
import CreateShot from "../create/CreateShot";
import CreateConstructor from "../create/CreateConstructor";
import CreateTextEditor from "../create/CreateTextEditor";
import CreateProblem from "../create/CreateProblem";
import CreateNote from "../create/CreateNote";
import CreateExam from "../create/CreateExam";
import CreateDocument from "./documents/CreateDocument";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import DeleteSingleLesson from "../delete/DeleteSingleLesson";
import UpdateLesson from "./UpdateLesson";
import User from "../User";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      description
      open
      type
      createdAt
      map
      user {
        id
      }
      testResults {
        id
        student {
          id
        }
        answer
        test {
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
      quizResults {
        id
        student {
          id
        }
        quiz {
          id
        }
        answer
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
        openLesson
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
      notes {
        id
        text
        next
        user {
          id
        }
      }
      quizes {
        id
        question
        type
        answer
        next
        user {
          id
        }
      }
      documents {
        id
        title
        user {
          id
        }
        clauses {
          number
          commentary
          keywords
          sample
        }
      }
      newTests {
        id
        answers
        correct
        type
        next
        question
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
        name
        question
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

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 2.5% 0;
  font-size: 1.6rem;
  padding: 2% 2% 4% 2%;
  a {
    color: #800000;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.8rem;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const LessonStyles = styled.div`
  display: flex;
  width: 65%;
  max-width: 1000px;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
  }
  .slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 256px;
    min-height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    position: relative;
    z-index: 1;
    will-change: transform;
    background-color: #fff; /* A background-color is required */
    min-height: 100vh;
  }

  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
    display: block;
  }
`;

const LessonPart = styled.div`
  display: flex;

  flex-basis: 75%;
  flex-direction: column;
  /* background: white; */
  border-radius: 2px;
  a {
    padding-top: 2%;
    padding-left: 2%;
  }
  @media (max-width: 800px) {
    order: 2;
    margin: 1%;
  }
`;

const MenuPart = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  margin-left: 1rem;
  border-radius: 2px;
  @media (max-width: 800px) {
    display: ${props => (props.shown ? "block" : "none")};
    order: 1;
    margin: 1%;
    position: absolute;
    top: 200px;
    z-index: 10;
    margin-right: -100%;
    width: 100%;
    animation-name: fadein;
    animation-duration: 1.5s;
    @keyframes fadein {
      from {
        right: 650px;
      }
      to {
        right: 350px;
      }
    }
  }
`;

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
`;

const NavPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 50%;
    order: 0;
    background: #112a62;
    align-items: left;
    justify-content: left;
    align-content: left;
  }
`;

const TeacherPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  background: white;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ButtonZone = styled.div`
  width: 100%;
  align-content: left;
  background: white;
  @media (max-width: 800px) {
    text-align: center;
    background: none;
    align-content: center;
    padding-top: 3%;
    border-bottom: solid 1px #112a62;
  }
`;

const ChooseButton = styled.button`
  font-size: 1.5rem;
  padding: 1%;
  width: 100%;
  border: none;
  border-left: 1px solid white;
  padding-left: 8%;
  outline: none;
  font-family: Montserrat;
  background: none;
  text-align: left;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  cursor: pointer;
  &:hover {
    border-left: 1px solid #112a62;
  }
  @media (max-width: 800px) {
    border-left: 1px solid #112a62;
    color: white;
    &:hover {
      border-bottom: 1px solid white;
    }
  }
`;

const Text = styled.div`
  line-height: 1.8;
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  iframe {
    width: 110%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
`;

class SingleLesson extends Component {
  state = {
    page: "lesson",
    shown: false,
    width: 0
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
              fetchPolicy="cache-first"
            >
              {({ data, error, loading }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                if (data === null) return <p>Нет урока</p>;
                const lesson = data.lesson;
                return (
                  <>
                    <AreYouEnrolled
                      subject={lesson.coursePage.id}
                      openLesson={lesson.coursePage.openLesson}
                      lesson={lesson.id}
                    >
                      <div id="root"></div>
                      <Container>
                        <ReactResizeDetector
                          handleWidth
                          handleHeight
                          onResize={this.onResize}
                        />
                        {this.state.width < 800 && (
                          <>
                            <div id="mySidenav2" className="sidenav">
                              <a
                                href="javascript:void(0)"
                                className="closebtn"
                                onClick={this.closeNav}
                              >
                                &times;
                              </a>

                              <ButtonZone>
                                <ChooseButton
                                  name="lesson"
                                  onClick={this.onSwitchMob}
                                >
                                  {" "}
                                  Урок{" "}
                                </ChooseButton>
                              </ButtonZone>
                              {lesson.notes.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="note"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Заметки{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.documents.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="document"
                                    onClick={this.onSwitch}
                                  >
                                    {" "}
                                    Документы{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.newTests.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="test"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Тесты{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.quizes.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="quiz"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Вопросы{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.problems.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="problem"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Задачи{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.constructions.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="constructor"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Конструкторы{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.texteditors.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="textEditor"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Редакторы{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                              {lesson.exams.length > 0 && (
                                <ButtonZone>
                                  <ChooseButton
                                    name="exam"
                                    onClick={this.onSwitchMob}
                                  >
                                    {" "}
                                    Экзамены{" "}
                                  </ChooseButton>
                                </ButtonZone>
                              )}
                            </div>
                            {/* Use any element to open the sidenav */}
                          </>
                        )}

                        <Head>
                          {this.state.width > 800 ? (
                            <Link
                              href={{
                                pathname: "/coursePage",
                                query: {
                                  id: lesson.coursePage.id
                                }
                              }}
                            >
                              <span>
                                <Icon size={"10%"} icon={arrowLeft} id="back" />
                              </span>
                            </Link>
                          ) : (
                            this.state.width < 800 && (
                              <span onClick={this.openNav}>Навигация</span>
                            )
                          )}
                          <span>
                            Урок {lesson.number}. {lesson.name}
                          </span>
                        </Head>
                        {me &&
                          (lesson.user.id === me.id ||
                            me.permissions.includes("ADMIN")) && (
                            <Head2>
                              {lesson.map.length > 0 ? (
                                <div>
                                  Режим разработки →
                                  <Link
                                    href={{
                                      pathname: "/lesson",
                                      query: {
                                        id: lesson.id,
                                        type: "story"
                                      }
                                    }}
                                  >
                                    <span> Переключить</span>
                                  </Link>
                                </div>
                              ) : (
                                <div>
                                  Режим разработки →
                                  <span
                                    onClick={() =>
                                      alert(
                                        `Формат истории не создан, это можно сделать в настройках.`
                                      )
                                    }
                                  >
                                    {" "}
                                    Переключить
                                  </span>
                                </div>
                              )}
                            </Head2>
                          )}
                        <LessonStyles>
                          <LessonPart>
                            {this.state.page === "lesson" && (
                              <TextBar>
                                <Text>{renderHTML(lesson.text)}</Text>
                              </TextBar>
                            )}
                            {this.state.page === "note" &&
                              lesson.notes.map(note => (
                                <Note
                                  text={note.text}
                                  me={me}
                                  user={lesson.user.id}
                                  note={note}
                                  id={note.id}
                                  next={note.next}
                                  quizes={lesson.quizes}
                                  notes={lesson.notes}
                                  tests={lesson.newTests}
                                  lessonID={lesson.id}
                                />
                              ))}
                            {this.state.page === "document" &&
                              lesson.documents.map(doc => (
                                <Document
                                  clauses={doc.clauses}
                                  title={doc.title}
                                  me={me}
                                  documentID={doc.id}
                                  user={lesson.user.id}
                                  lessonID={lesson.id}
                                />
                              ))}
                            {this.state.page === "shots" && (
                              <ShotsGroup
                                shots={lesson.shots}
                                me={me}
                                lessonID={lesson.id}
                                shotResults={lesson.shotResults}
                              />
                            )}

                            {this.state.page === "test" && (
                              <>
                                {lesson.newTests.length > 0 ? (
                                  <TestGroup
                                    tests={lesson.newTests}
                                    me={me}
                                    lessonID={lesson.id}
                                    testResults={lesson.testResults}
                                    quizes={lesson.quizes}
                                    notes={lesson.notes}
                                    tests={lesson.newTests}
                                  />
                                ) : (
                                  <Center>
                                    <h2>Тестов по этому уроку нет</h2>
                                  </Center>
                                )}
                              </>
                            )}

                            {this.state.page === "quiz" && (
                              <>
                                {lesson.quizes.length > 0 ? (
                                  <QuizGroup
                                    notes={lesson.notes}
                                    lessonID={lesson.id}
                                    quizResults={lesson.quizResults}
                                    me={me}
                                    quizes={lesson.quizes}
                                    notes={lesson.notes}
                                    tests={lesson.newTests}
                                  />
                                ) : (
                                  <Center>
                                    <h2>Вопросов по этому уроку нет</h2>
                                  </Center>
                                )}
                              </>
                            )}
                            {this.state.page === "problem" && (
                              <>
                                {lesson.problems.length > 0 ? (
                                  <ProblemGroup
                                    lessonID={lesson.id}
                                    problems={lesson.problems}
                                    me={me}
                                    problemResults={lesson.problemResults}
                                    lesson={lesson}
                                  />
                                ) : (
                                  <Center>
                                    <h2>Задач пока нет</h2>
                                  </Center>
                                )}
                              </>
                            )}
                            {this.state.page === "constructor" && (
                              <>
                                {" "}
                                {lesson.constructions.length > 0 ? (
                                  <>
                                    <ConstructorGroup
                                      constructions={lesson.constructions}
                                      lessonID={lesson.id}
                                      me={me}
                                      constructionResults={
                                        lesson.constructionResults
                                      }
                                    />
                                  </>
                                ) : (
                                  <Center>
                                    <h2>Конструкторов документов пока нет</h2>
                                  </Center>
                                )}{" "}
                              </>
                            )}
                            {this.state.page === "textEditor" &&
                              (lesson.texteditors.length > 0 ? (
                                <TextEditorGroup
                                  lesson={lesson.id}
                                  textEditors={lesson.texteditors}
                                  me={me}
                                  textEditorResults={lesson.textEditorResults}
                                />
                              ) : (
                                <Center>
                                  <h2>Редакторов документов пока нет</h2>
                                </Center>
                              ))}
                            {this.state.page === "exam" && (
                              <Exams lesson={lesson} me={me} />
                            )}
                            {this.state.page === "createTest" && (
                              <CreateNewTest lessonID={lesson.id} />
                            )}
                            {this.state.page === "createNote" && (
                              <CreateNote lessonID={lesson.id} />
                            )}
                            {this.state.page === "createDocument" && (
                              <CreateDocument lessonID={lesson.id} />
                            )}
                            {this.state.page === "createShot" && (
                              <CreateShot lessonID={lesson.id} />
                            )}
                            {this.state.page === "createQuiz" && (
                              <CreateQuiz lessonID={lesson.id} />
                            )}
                            {this.state.page === "createProblem" && (
                              <CreateProblem
                                lessonID={lesson.id}
                                lesson={lesson}
                              />
                            )}
                            {this.state.page === "createConstructor" && (
                              <CreateConstructor lessonID={lesson.id} />
                            )}
                            {this.state.page === "createTextEditor" && (
                              <CreateTextEditor lessonID={lesson.id} />
                            )}
                            {this.state.page === "createExam" && (
                              <CreateExam
                                lessonID={lesson.id}
                                lesson={lesson}
                              />
                            )}
                            {this.state.page === "updateLesson" && (
                              <UpdateLesson
                                lessonID={lesson.id}
                                description={lesson.description}
                                lesson={lesson}
                              />
                            )}
                            {this.state.page === "updateShots" && (
                              <UpdateShots lessonID={lesson.id} />
                            )}
                          </LessonPart>

                          {this.state.width > 800 && (
                            <MenuPart shown={this.state.shown}>
                              <Sticky>
                                <NavPart>
                                  <ButtonZone>
                                    <ChooseButton
                                      name="lesson"
                                      onClick={this.onSwitch}
                                    >
                                      {" "}
                                      Урок{" "}
                                    </ChooseButton>
                                  </ButtonZone>
                                  {lesson.shots.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="shots"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Алгоритм{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.notes.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="note"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Заметки{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.documents.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="document"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Документы{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}

                                  {lesson.newTests.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="test"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Тесты{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.quizes.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="quiz"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Вопросы{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.problems.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="problem"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Задачи{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.constructions.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="constructor"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Конструкторы{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.texteditors.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="textEditor"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Редакторы{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                  {lesson.exams.length > 0 && (
                                    <ButtonZone>
                                      <ChooseButton
                                        name="exam"
                                        onClick={this.onSwitch}
                                      >
                                        {" "}
                                        Экзамены{" "}
                                      </ChooseButton>
                                    </ButtonZone>
                                  )}
                                </NavPart>
                                {me &&
                                  (lesson.user.id === me.id ||
                                    me.permissions.includes("ADMIN")) && (
                                    <TeacherPart>
                                      <ButtonZone>
                                        <ChooseButton
                                          name="createTest"
                                          onClick={this.onSwitch}
                                        >
                                          Новый тест
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <ChooseButton
                                          name="createNote"
                                          onClick={this.onSwitch}
                                        >
                                          Новая заметка
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <ChooseButton
                                          name="createDocument"
                                          onClick={this.onSwitch}
                                        >
                                          Новый документ
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <ChooseButton
                                          name="createShot"
                                          onClick={this.onSwitch}
                                        >
                                          Новый алгоритм
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <ChooseButton
                                          name="createQuiz"
                                          onClick={this.onSwitch}
                                        >
                                          Новый вопрос
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <ChooseButton
                                          name="createProblem"
                                          onClick={this.onSwitch}
                                        >
                                          Новая задача
                                        </ChooseButton>
                                      </ButtonZone>
                                      <ButtonZone>
                                        <ChooseButton
                                          name="createConstructor"
                                          onClick={this.onSwitch}
                                        >
                                          Новый конструктор
                                        </ChooseButton>
                                      </ButtonZone>
                                      <ButtonZone>
                                        <ChooseButton
                                          name="createTextEditor"
                                          onClick={this.onSwitch}
                                        >
                                          Новый редактор
                                        </ChooseButton>
                                      </ButtonZone>
                                      <ButtonZone>
                                        <ChooseButton
                                          name="createExam"
                                          onClick={this.onSwitch}
                                        >
                                          Новый экзамен
                                        </ChooseButton>
                                      </ButtonZone>
                                      <ButtonZone>
                                        <ChooseButton
                                          name="updateLesson"
                                          onClick={this.onSwitch}
                                        >
                                          Изменить урок
                                        </ChooseButton>
                                      </ButtonZone>

                                      <ButtonZone>
                                        <DeleteSingleLesson
                                          id={lesson.id}
                                          coursePageID={lesson.coursePage.id}
                                        />
                                      </ButtonZone>
                                    </TeacherPart>
                                  )}
                              </Sticky>
                            </MenuPart>
                          )}
                        </LessonStyles>
                      </Container>
                    </AreYouEnrolled>
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
