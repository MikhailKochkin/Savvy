import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import SingleLesson from './SingleLesson';
import SingleTest from './SingleTest';
import SingleProblem from './SingleProblem';
import CoursePageNav from './CoursePageNav';
import { MaterialPerPage } from '../../config';
import LessonPagination from '../pagination/LessonPagination';
import PleaseSignIn from '../PleaseSignIn';

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

    onFetchMore = () => {
        console.log("G`et")
        // console.log(fetchMore)
        // const { data: { matches, fetchMore } } = this.props;
    
        // fetchMore({
        //   variables: { date: matches[matches.length - 1].date },
        //   updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        //     return {
        //       ...previousResult,
        //       // Add the new matches data to the end of the old matches data.
        //       matches: [
        //         ...previousResult.matches,
        //         ...fetchMoreResult.matches,
        //       ],
        //     };
        //   },
        // });
      }

    render() {
        switch(this.state.page) {
            case "lesson":
            this.pageView = 
                <Query
                    query={PAGE_LESSONS_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                            id: this.props.id,
                            skip: this.props.page * MaterialPerPage - MaterialPerPage
                        }}

                    >
                    {({ data, error, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.lessons == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                        <>
                            <div>
                                {/* <LessonPagination/> */}
                                {data.lessons.map(lesson => <SingleLesson key={lesson.id} lesson={lesson} coursePageId={this.props.id}/>)}
                            </div>
                        <button onClick={this.onFetchMore}>Fetch More</button>
                        </>
                        )
                    }}
                </Query>
                break;
            case "test":
                this.pageView = 
                <Query
                    query={PAGE_TESTS_QUERY} 
                    // fetchPolicy="network-only"
                    variables={{
                        id: this.props.id,
                    }}
                    fetchPolicy="cache-first"
                >
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.tests == 0) return <p>По этому курсу, к сожалению,тесты пока еще не были созданы.</p>
                        return (
                        <>
                        <div>
                            
                            {data.tests.map(test => <SingleTest key={test.id} test={test} coursePageId={this.props.id} ></SingleTest>)}
                        </div>
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
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.problems == 0) return <p>По этому курсу, к сожалению, задачи пока еще не были созданы.</p>
                        return (
                            <>
                                <div>
                                    {data.problems.map(problem => <SingleProblem key={problem.id} problem={problem} coursePageId={this.props.id}/>)}
                                </div>
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
                    {({ data, error, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.lessons == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                        return (
                        <>
                            <div>
                                {data.lessons.map(lesson => <SingleLesson key={lesson.id} id={lesson.id} coursePageId={this.props.id} >{lesson.id}</SingleLesson>)}
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