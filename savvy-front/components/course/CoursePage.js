import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import SingleLesson from './SingleLesson';
import SingleTest from './SingleTest';
import SingleProblem from './SingleProblem';
import CoursePageNav from './CoursePageNav';
import { MaterialPerPage } from '../../config';
import PleaseSignIn from '../PleaseSignIn';
import FetchMore from '../FetchMore';

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    lessons(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
      id
      text
      user {
          id
      }
    }
  }
`;

const PAGE_TESTS_QUERY = gql`
  query PAGE_TESTS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    tests(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
      id
      user {
          id
      }
    }
  }
`;

const PAGE_PROBLEMS_QUERY = gql`
  query PAGE_PROBLEMS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    problems(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
      id
      user {
          id
      }
    }
  }
`;

const AGGREGATE_PAGE_LESSONS_QUERY = gql`
  query AGGREGATE_PAGE_LESSONS_QUERY($id: ID!) {
    lessonsConnection(where: {coursePageID: $id}) {
        aggregate {
            count
        }
    }
  }
`;

const AGGREGATE_PAGE_TESTS_QUERY = gql`
  query AGGREGATE_PAGE_TESTS_QUERY($id: ID!) {
    testsConnection(where: {coursePageID: $id}) {
        aggregate {
            count
        }
    }
  }
`;

const AGGREGATE_PAGE_PROBLEMS_QUERY = gql`
  query AGGREGATE_PAGE_PROBLEMS_QUERY($id: ID!) {
    problemsConnection(where: {coursePageID: $id}) {
        aggregate {
            count
        }
    }
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
    border-bottom: 2px solid #0A2342;
    padding-bottom: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class CoursePage extends Component {
    constructor(props) {
        super(props);

    this.state = {
        page: 'lesson',
        button1: true,
        button2: false,
        button3: false
    }
    this.pageView = ''
}
    onLesson = () => {this.setState({page: "lesson", button1: true, button2: false, button3: false})}
    onTest = () => {this.setState({page: "test", button1: false, button2: true, button3: false})}
    onProblem = () => {this.setState({page: "problem", button1: false, button2: false, button3: true})}

    render() {
        switch(this.state.page) {
            case "lesson":
            this.pageView = 
                <Query
                    query={PAGE_LESSONS_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                            id: this.props.id,
                    }}

                    >
                    {({ data: data1, error: error1, loading: loading1, fetchMore}) => {
                        if (loading1) return <p>Загрузка...</p>
                        if (error1) return <p>Error: {error1.message}</p>;
                        if(data1.lessons == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                            <>
                            <Query
                                    query={AGGREGATE_PAGE_LESSONS_QUERY} 
                                    fetchPolicy="cache-first"
                                    variables={{
                                        id: this.props.id,
                                    }}
                            >
                            {({ data: data2, error: error2, loading: loading2 }) => {
                                if (loading2) return <p>Loading...</p>;
                                if (error2) return <p>Error: {error2.message}</p>;
                                return (
                                    <div>
                                        <h4>Всего уроков: {data2.lessonsConnection.aggregate.count}</h4>
                                        {data1.lessons.map(lesson => <SingleLesson key={lesson.id} lesson={lesson} coursePageId={this.props.id}/>)}
                                            <>
                                            {data2.lessonsConnection.aggregate.count > data1.lessons.length ?
                                            <FetchMore
                                                onLoadMore={() =>
                                                    fetchMore({
                                                    variables: {
                                                        skip: data1.lessons.length  
                                                    },
                                                    updateQuery: (prev, { fetchMoreResult }) => {
                                                        if (!fetchMoreResult) return prev;
                                                        return Object.assign({}, prev, {
                                                            lessons: [...prev.lessons, ...fetchMoreResult.lessons]
                                                        });
                                                    }
                                                    })
                                                }
                                              />
                                            :
                                          null}
                                        </> 
                                </div>
                              )
                            }}
                         </Query> 
                        </>
                      )
                    }}
                </Query>
                break;
            case "test":
                this.pageView = 
                <Query
                    query={PAGE_TESTS_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                            id: this.props.id,
                        }}

                    >
                    {({ data: data1, error: error1, loading: loading1, fetchMore}) => {
                        if (loading1) return <p>Загрузка...</p>
                        if (error1) return <p>Error: {error1.message}</p>;
                        if(data1.tests == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                            <>
                            <Query
                                    query={AGGREGATE_PAGE_TESTS_QUERY} 
                                    fetchPolicy="cache-first"
                                    variables={{
                                        id: this.props.id,
                                    }}
                            >
                            {({ data: data2, error: error2, loading: loading2 }) => {
                                if (loading2) return <p>Loading...</p>;
                                if (error2) return <p>Error: {error2.message}</p>;
                                return (
                                    <div>
                                        <h4>Всего тестов: {data2.testsConnection.aggregate.count}</h4>
                                        {data1.tests.map(test => <SingleTest key={test.id} test={test} coursePageId={this.props.id}/>)}
                                            <>
                                            {data2.testsConnection.aggregate.count > data1.tests.length ?
                                            <FetchMore
                                                onLoadMore={() =>
                                                    fetchMore({
                                                    variables: {
                                                        skip: data1.tests.length  
                                                    },
                                                    updateQuery: (prev, { fetchMoreResult }) => {
                                                        if (!fetchMoreResult) return prev;
                                                        return Object.assign({}, prev, {
                                                            tests: [...prev.tests, ...fetchMoreResult.tests]
                                                        });
                                                    }
                                                    })
                                                }
                                              />
                                            :
                                          null}
                                        </> 
                                </div>
                              )
                            }}
                         </Query> 
                        </>
                      )
                    }}
                </Query>
                break;
            case "problem":
                this.pageView = 
                <Query
                    query={PAGE_PROBLEMS_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                            id: this.props.id,
                        }}

                    >
                    {({ data: data1, error: error1, loading: loading1, fetchMore}) => {
                        if (loading1) return <p>Загрузка...</p>
                        if (error1) return <p>Error: {error1.message}</p>;
                        if(data1.problems == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                            <>
                            <Query
                                    query={AGGREGATE_PAGE_PROBLEMS_QUERY} 
                                    fetchPolicy="cache-first"
                                    variables={{
                                        id: this.props.id,
                                    }}
                            >
                            {({ data: data2, error: error2, loading: loading2 }) => {
                                if (loading2) return <p>Loading...</p>;
                                if (error2) return <p>Error: {error2.message}</p>;
                                return (
                                    <div>
                                        <h4>Всего задач: {data2.problemsConnection.aggregate.count}</h4>
                                        {data1.problems.map(problem => <SingleProblem key={problem.id} problem={problem} coursePageId={this.props.id}/>)}
                                            <>
                                            {data2.problemsConnection.aggregate.count > data1.problems.length ?
                                            <FetchMore
                                                onLoadMore={() =>
                                                    fetchMore({
                                                    variables: {
                                                        skip: data1.problems.length  
                                                    },
                                                    updateQuery: (prev, { fetchMoreResult }) => {
                                                        if (!fetchMoreResult) return prev;
                                                        return Object.assign({}, prev, {
                                                            problems: [...prev.problems, ...fetchMoreResult.problems]
                                                        });
                                                    }
                                                    })
                                                }
                                              />
                                            :
                                          null}
                                        </> 
                                </div>
                              )
                            }}
                         </Query> 
                        </>
                      )
                    }}
                </Query>
                break;
            default:
                this.pageView = 
                <Query
                    query={PAGE_LESSONS_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                            id: this.props.id,
                        }}

                    >
                    {({ data, error, loading, fetchMore}) => {
                        if (loading) return <ReactLoading type={'spin'} color={'#13214D'} height={60} width={60} />
                    
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.lessons == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                            // {data2.sandboxesConnection.aggregate.count > data1.sandboxes.length ?
                        <>
                            <div>
                                {data.lessons.map(lesson => <SingleLesson key={lesson.id} lesson={lesson} coursePageId={this.props.id}/>)}
                                <FetchMore
                                    onLoadMore={() =>
                                        fetchMore({
                                        variables: {
                                            skip: data.lessons.length  
                                        },
                                        updateQuery: (prev, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) return prev;
                                            return Object.assign({}, prev, {
                                                lessons: [...prev.lessons, ...fetchMoreResult.lessons]
                                            });
                                        }
                                        })
                                    }
                                />
                            </div>
                        </>
                        )
                    }}
                </Query>
                break;
            }
        return (
            <PleaseSignIn>
                <CoursePageNav id={this.props.id}/>
                <br/>
                <Nav>
                    <ChooseButtons>
                        <ChooseButton
                            onClick = {this.onLesson}
                            active={this.state.button1}
                        >
                            <h1>Уроки</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onTest}
                            active={this.state.button2}
                        >
                            <h1>Тесты</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onProblem}
                            active={this.state.button3}
                        >
                            <h1>Задачи</h1>
                        </ChooseButton>
                    </ChooseButtons>
                </Nav>
                {this.pageView}
            
        </PleaseSignIn>
    )}
}

export default CoursePage;
export { PAGE_LESSONS_QUERY };
export { PAGE_TESTS_QUERY };
export { PAGE_PROBLEMS_QUERY };