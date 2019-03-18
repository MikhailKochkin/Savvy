import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import SingleTest from './SingleTest';
import SingleProblem from './SingleProblem';
import SingleConstructor from './SingleConstructor';
import PleaseSignIn from '../PleaseSignIn';
import AreYouEnrolled from '../AreYouEnrolled';
import User from '../User';


const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
        id
        text
        name
        number
        video
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
        problems {
          id
          text
          hints
          solution
          answer
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
    }
  }
`;

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;;
  font-size: 1.8rem;
  padding: 0 2%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Iframe = styled.iframe`
  width: auto;
  height: 400px;
  @media (max-width: 800px) {
        width: 100%;
        height: auto;
    }
`;

const ChooseButtons = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ChooseButton = styled.button`
    font-size: 0.8rem;
    border: ${props => props.active ? "2px solid #0E78C6" : "2px solid #fff"};
    color: ${props => props.active ? "#008CBA" : "white"};
    background-color: ${props => props.active ? "white" : "#008CBA"};
    margin: 0 0.5%;
    width: 150px;
    cursor: pointer;
    @media (max-width: 800px) {
        margin: 1% 0;
        padding: 2% 1%;
    }
`;

const Nav = styled.div`
    /* border-top: 1px solid #0A2342; */
    padding-top: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Center = styled.div`
    /* border-top: 1px solid #0A2342; */
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    font-size: 1.4rem;
    font-weight: 600;
    padding: 2% ;
    /* margin: 2%; */
    color: #FFFDF7;
    border-radius: 10px;
    background-color: #84BC9C;
    border: solid 1px white;
    cursor: pointer;
    &:hover{
        background-color: #294D4A;
    }
`;


class SingleLesson extends Component {
  state = {
      page: 'test',
      button1: true,
      button2: false,
      button3: false,
  }

  pageView = ''

  onTest = () => {this.setState({page: "test", button1: true, button2: false, button3: false })}
  onProblem = () => {this.setState({page: "problem", button1: false, button2: true, button3: false })}
  onConstructor = () => {this.setState({page: "constructor", button1: false, button2: false, button3: true })}

    render() {
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
                moment.locale('ru');
                return (
                  <AreYouEnrolled 
                    subject={lesson.coursePage.id}
                  >
                    <Center>
                      <TextBar>
                        <h4>Урок {lesson.number}. {lesson.name}</h4>
                        { me && me.id === lesson.user.id ?
                        <Link href={{
                                  pathname: '/updateLesson',
                                  query: {id: lesson.id}
                              }}>
                              <a>
                              <Button>Изменить текст урока</Button>
                              </a>
                        </Link>
                        :
                        null
                        }
                        {lesson.video ?
                        <Iframe src={lesson.video} allowFullScreen></Iframe>
                        :
                        null } 
                        <div dangerouslySetInnerHTML={{ __html: lesson.text }}></div>
                      </TextBar>
                    </Center>
                    <Nav>
                      <ChooseButtons>
                          <ChooseButton
                              onClick = {this.onTest}
                              active={this.state.button1}
                          >
                              <h1>Тесты</h1>
                          </ChooseButton>
                          <ChooseButton
                              onClick = {this.onProblem}
                              active={this.state.button2}
                          >
                              <h1>Задачи</h1>
                          </ChooseButton>
                          <ChooseButton
                              onClick = {this.onConstructor}
                              active={this.state.button3}
                          >
                              <h1>Конструкторы документов</h1>
                          </ChooseButton>
                      </ChooseButtons>
                  </Nav>
                  {/* <Center> */}
                  { this.state.button1 &&
                  <>
                    { me && me.id === lesson.user.id ?
                    <Center>
                    <Link href={{
                          pathname: '/createTest',
                          query: {id: lesson.id}
                          }}>
                          <a>
                          <Button>Составить тест</Button>
                          </a>
                    </Link>
                    </Center>
                    :
                    null }
                    {lesson.tests.length > 0 ?
                      <>
                        {lesson.tests.map(test => 
                          <SingleTest 
                            key={test.id} 
                            lessonId={lesson.id} 
                            data={test}
                            me={me}
                          />
                        )}
                      </>
                      :
                      <Center>
                        <h2>Тестов пока нет</h2>
                      </Center>
                    }
                  </>
                  }
                  
                  { this.state.button2 &&
                  <>
                    { me && me.id === lesson.user.id ?
                    <Center>
                    <Link href={{
                          pathname: '/createProblem',
                          query: {id: lesson.id}
                          }}>
                          <a>
                          <Button>Составить задачу</Button>
                          </a>
                    </Link>
                    </Center>
                    :
                    null}
                    {lesson.problems.length > 0 ?
                      <>
                        {lesson.problems.map(problem => 
                          <SingleProblem 
                            key={problem.id}
                            lessonId={lesson.id}
                            data={problem}
                            me={me}
                          />
                        )}
                      </>
                      :
                      <Center>
                        <h2>Задач пока нет</h2>
                      </Center>
                    }
                  </>
                  }
                  { this.state.button3 &&
                  <>
                    { me && me.id === lesson.user.id ?
                    <Center>
                      <Link href={{
                            pathname: '/createConstructor',
                            query: {id: lesson.id}
                            }}>
                            <a>
                            <Button>Составить конструктор документа</Button>
                            </a>
                      </Link>
                    </Center>
                    :
                    null}
                    {lesson.constructions.length > 0 ?
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
                    }
                  </>
                  }
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
