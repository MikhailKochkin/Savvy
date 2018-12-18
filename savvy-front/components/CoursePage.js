import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SingleCase from './SingleCase'
import SingleTest from './SingleTest'
import CoursePageNav from './CoursePageNav'

const PAGE_CASES_QUERY = gql`
  query PAGE_CASES_QUERY($id: ID!) {
    cases(where: {coursePageID: $id}) {
      id
      title
      description
      user {
          id
      }
    }
  }
`;

const PAGE_TESTS_QUERY = gql`
  query PAGE_TESTS_QUERY($id: ID!) {
    tests(where: {coursePageID: $id}) {
      id
      user {
          id
      }
    }
  }
`;

class CoursePage extends Component {
    state = {
        page: 'text',
    }

    onText = () => {
        this.setState({page: "text"})
        const but1 = document.getElementById("TextButton")
        but1.style.backgroundColor = "#122557";
        but1.style.color = "white";
        const but2 = document.getElementById("TestButton")
        but2.style.backgroundColor = "white";
        but2.style.color = "black";
      }
    
    onTest = () => {
        this.setState({page: "test"})
        const but1 = document.getElementById("TextButton")
        but1.style.backgroundColor = "white";
        but1.style.color = "black";
        const but2 = document.getElementById("TestButton")
        but2.style.backgroundColor = "#122557";
        but2.style.color = "white";
      }
    render() {
        return (
            <>
                <CoursePageNav id={this.props.id}/>
                <br/>
                <button
                    style = {{background: '#' + 122557, color:'white'}}
                    id = "TextButton"
                    onClick = {this.onText}
                >
                    <h1>Теоретические материалы</h1>
                </button>
                <button
                    id = "TestButton"
                    onClick = {this.onTest}
                >
                    <h1>Тесты</h1>
                </button>

                {this.state.page === 'text' ? 

                <Query
                    query={PAGE_CASES_QUERY} 
                    // fetchPolicy="network-only"
                    variables={{
                        id: this.props.id,
                    }}>
                    {({ data, error, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error1.message}</p>;
                        return (
                          <>
                              <div>
                                  {data.cases.map(edCase => <SingleCase key={edCase.id} id={edCase.id} ></SingleCase>)}
                              </div>
                          </>
                        )
                    }}
                </Query>
            :
                <Query
                    query={PAGE_TESTS_QUERY} 
                    // fetchPolicy="network-only"
                    variables={{
                        id: this.props.id,
                    }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        if(data.tests == 0) return <p>По этому курсу, к сожалению,тесты пока еще не были созданы.</p>
                        return (
                        <>
                          <div>
                            {data.tests.map(test => <SingleTest key={test.id} id={test.id} ></SingleTest>)}
                          </div>
                        </>
                            )
                    }}
                </Query>
            }
        </>
    )}
}

export default CoursePage;