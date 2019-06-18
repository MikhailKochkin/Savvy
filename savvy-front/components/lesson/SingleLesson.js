import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import TestGroup from './TestGroup';
import QuizGroup from './QuizGroup';
import ProblemGroup from './ProblemGroup';
import SingleConstructor from './SingleConstructor';
import SingleTextEditor from './SingleTextEditor';
import PleaseSignIn from '../auth/PleaseSignIn';
import AreYouEnrolled from '../auth/AreYouEnrolled';
import User from '../User';
import { IoMdMenu } from "react-icons/io";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
        id
        text
        name
        number
        createdAt
        user {
          id
        }
        coursePage {
          id
        }
        tests {
          id
          answer1
          answer1Correct
          answer2
          answer2Correct
          answer3
          answer3Correct
          answer4
          answer4Correct
          question
          user {
            id
          }
        }
        quizes {
          id
          lang
          question
          answer
        }
        newTests {
          id
          answers
          correct
          question
          user {
            id
          }
        }
        problems {
          id
          text
          user {
            id
          }
          createdAt
        }
        constructions {
          id
          name
          dbPart1
          dbPart2
          dbPart3
          dbPart4
          dbPart5
          dbPart6
          dbPart7
          dbPart8
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
    }
  }
`;

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  font-size: 1.8rem;
  padding: 2% 2% 4% 2%;

  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.8rem;
  }
`;

const Title = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');
  font-family: 'Comfortaa', cursive;
  font-size: 2.2rem;
  font-weight: bold;
  color: #112962;

`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LessonStyles = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
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
  background-color: #FFF; /* A background-color is required */
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
  background: white;
  border-radius: 2px;
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
    display: ${props => props.shown ? "block" : "none"};
    order: 1;
    margin: 1%;
    padding: 2%;
    position: absolute;
    /* right: 450px; */
    top: 200px;
    z-index: 10;
    margin-right: -100%;
    width: 100%;
    animation-name: fadein;
    animation-duration: 1.5s;
    @keyframes fadein {
        from {right: 650px;}
        to {right: 350px;}
    }
    
  }
`;

const Sticky= styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 20px;

`;

const NavPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 2px;
  @media (max-width: 800px) {
    width: 50%;
    order: 0;
    background: #112A62;
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
  border-radius: 2px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ButtonZone = styled.div`
  width: 100%;
  align-content: left;
  background: white;
  &:hover{
      background: #F2F2F2;
      color: black;
    }
  @media (max-width: 800px) {
    text-align: center;
    background: none;
    align-content: center;
    padding-top: 3%;
    border-bottom: solid 1px white;
  }
`;

const ChooseButton = styled.button`
  font-size: 1.5rem;
  padding: 1%;
  width: 100%;
  border: none;
  padding-left: 8%;
  background: none;
  text-align: left;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  cursor: pointer;
  &:hover{
      color: white;
      background: #112A62;
  }
  &:focus {
    outline: 0;
  }
  @media (max-width: 800px) {
    color: white;
    &:hover{
      color: #112A62;
      background: #F2F2F2;
  }
  }
`;

const Text = styled.div`
  line-height: 1.6;
  a {
    color: #800000;
    text-decoration: underline;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: '0 0 0 2px blue;'
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
          width: 100%;
          height: auto;
      }
  }
`;

const ShowMenu = styled.button`
  display: none;
  border: none;
  background: none;
  width: 8%;
  outline: none;
  @media (max-width: 800px) {
    display: block;
    width: 16%;

  }
`;


class SingleLesson extends Component {
  state = {
      page: 'lesson',
      shown: false,
  }
  onLesson = () => {this.setState({page: "lesson"}), this.setState(prevState => ({shown: !prevState.shown}))}
  onTest = () => {this.setState({page: "test"}), this.setState(prevState => ({shown: !prevState.shown}))}
  onQuiz= () => {this.setState({page: "quiz"}), this.setState(prevState => ({shown: !prevState.shown}))}
  onProblem = () => {this.setState({page: "problem"}), this.setState(prevState => ({shown: !prevState.shown}))}
  onConstructor = () => {this.setState({page: "constructor"}), this.setState(prevState => ({shown: !prevState.shown}))}
  onTextEditor = () => {this.setState({page: "texteditor"}), this.setState(prevState => ({shown: !prevState.shown}))}

  onShowMenu = () => {
    this.setState(prevState => ({shown: !prevState.shown}))

  }
    render() {
   
      const quizes = [[ "Как будет машина?", ["car", "automobile"]], ["Как будет кошка?", ["cat"]], ["Как будет такси?", ["cab", "taxi"]]]
      return (
        <PleaseSignIn>
          <User>
            {({data: {me}}) => (
            <Query
              query={SINGLE_LESSON_QUERY}
              variables={{
                id: this.props.id,
              }}
            >
              {({ data, error, loading }) => {
                // if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                // if (!data.lesson) return <p>No Lesson Found for {this.props.id}</p>;
                const lesson = data.lesson;
                return (
                  <AreYouEnrolled 
                    subject={lesson.coursePage.id}
                  >
                  <LessonStyles>
                    <LessonPart>
                      <Center>
                        {this.state.page === "lesson" && 
                        <TextBar>
                          <Title>Урок {lesson.number}. {lesson.name}</Title>       
                          <Text dangerouslySetInnerHTML={{ __html: lesson.text }}></Text>
                        </TextBar>}
                          
                      {this.state.page === "test" && 
                        <>
                          {lesson.newTests.length > 0 ? 
                          <TestGroup 
                              tests={lesson.newTests}
                              me={me}
                              lessonId={lesson.id}
                            />
                          :
                          <Center>
                            <h2>Тестов по этому уроку нет</h2>
                          </Center>
                          }
                        </>
                      }
                      
                      {this.state.page === "quiz" &&
                        <>
                          {lesson.quizes.length > 0 ?
                            <QuizGroup quizes={lesson.quizes}/>
                            :
                            <Center>
                              <h2>Вопросов по этому уроку нет</h2>
                            </Center>
                          }
                        </>
                      }
                      {this.state.page === "problem" &&
                      <>
                      {lesson.problems.length > 0 ?
                        <>
                            <ProblemGroup 
                              lessonId={lesson.id}
                              problems={lesson.problems}
                              me={me}
                            />
                        </>
                      :
                        <Center>
                          <h2>Задач пока нет</h2>
                        </Center>
                      }
                      </>
                      }
                      {this.state.page === "constructor" &&
                        <> {lesson.constructions.length > 0 ?
                          <>
                            {lesson.constructions.map(constructor => 
                              <SingleConstructor 
                                key={constructor.id}
                                lessonId={lesson.id}
                                data={constructor}
                                me={me}
                              />
                            )}
                          </>
                          :
                          <Center>
                            <h2>Конструкторов документов пока нет</h2>
                          </Center>
                        } </>
                      }
                      {this.state.page === "texteditor" &&
                      <> {lesson.texteditors.length > 0 ?
                      <> 
                        {lesson.texteditors.map(texteditor => 
                          <SingleTextEditor 
                            key={texteditor.id}
                            lessonId={texteditor.id}
                            data={texteditor}
                            me={me}
                          />
                        )}
                      </>
                      :
                      <Center>
                        <h2>Редакторов документов пока нет</h2>
                      </Center>
                    } </>
                  }

                      </Center>
             
                    </LessonPart>
                    <ShowMenu onClick={this.onShowMenu}><IoMdMenu size={32}/></ShowMenu>
                    <MenuPart shown={this.state.shown}>
                      <Sticky>
                        <NavPart>
                          <ButtonZone><ChooseButton onClick = {this.onLesson}> Урок </ChooseButton></ButtonZone>
                          <ButtonZone><ChooseButton onClick = {this.onTest}> Тесты </ChooseButton></ButtonZone>
                          <ButtonZone><ChooseButton onClick = {this.onQuiz}> Вопросы </ChooseButton></ButtonZone>
                          <ButtonZone><ChooseButton onClick = {this.onProblem}> Задачи </ChooseButton></ButtonZone>
                          <ButtonZone><ChooseButton onClick = {this.onConstructor}> Конструктор документов </ChooseButton></ButtonZone>
                          <ButtonZone><ChooseButton onClick = {this.onTextEditor}> Редактор документов </ChooseButton></ButtonZone>
                        </NavPart>
                        {me && lesson.user.id === me.id && 
                        <TeacherPart>
                          <ButtonZone> <Link href={{
                                    pathname: '/updateLesson',
                                    query: {id: lesson.id}
                                }}>
                                <a>
                                <ChooseButton>Изменить текст урока</ChooseButton>
                                </a>
                          </Link></ButtonZone>
                          <ButtonZone> <Link href={{
                              pathname: '/createNewTest',
                              query: {id: lesson.id}
                              }}>
                              <a>
                              <ChooseButton>Составить тест</ChooseButton>
                            </a>
                          </Link></ButtonZone>
                          <ButtonZone> <Link href={{
                              pathname: '/createQuiz',
                              query: {id: lesson.id}
                              }}>
                              <a>
                              <ChooseButton>Составить вопрос</ChooseButton>
                              </a>
                          </Link></ButtonZone>
                          <ButtonZone> <Link href={{
                            pathname: '/createProblem',
                            query: {id: lesson.id}
                            }}>
                            <a>
                            <ChooseButton>Составить задачу</ChooseButton>
                            </a>
                          </Link></ButtonZone>
                          <ButtonZone> <Link href={{
                              pathname: '/createConstructor',
                              query: {id: lesson.id}
                              }}>
                              <a>
                              <ChooseButton>Составить конструктор документа</ChooseButton>
                              </a>
                          </Link></ButtonZone>
                          <ButtonZone> <Link href={{
                              pathname: '/createTextEditor',
                              query: {id: lesson.id}
                              }}>
                              <a>
                              <ChooseButton>Составить редактор документа</ChooseButton>
                              </a>
                          </Link></ButtonZone> 
                            </TeacherPart> }
                      </Sticky>
                    </MenuPart>              
                  </LessonStyles>
                  
                </AreYouEnrolled>
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
