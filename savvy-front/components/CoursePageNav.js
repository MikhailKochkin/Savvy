import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import SingleCase from './SingleCase'
import User from './User'

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
        title
        user {
            id
        }
    }
  }
`;

export default class CoursePageNav extends Component {
    render() {
        return (
            <Query
              query={SINGLE_COURSEPAGE_QUERY}
              variables={{
                id: this.props.id,
              }}
            >
            {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            return (
            // if (!data.case) return <p>No Item Found for {this.props.id}</p>;
                <User>
                    {({data: {me}}) => (
                        <>  
                            {/* {console.log(me.id)} */}
                            {/* <p>ID автора курса: {data.coursePage.user.id} </p>
                            
                            <p>Номер страницы с курсом: {this.props.id}</p> */}
                            <h2>Курс: </h2>
                            <h1>{data.coursePage.title}</h1>
                            { me !== null && data.coursePage.user.id === me.id ? 
                            <>
                                <Link href={{
                                    pathname: '/createText',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <button>Написать Текст</button>
                                </a>
                                </Link>
                                <br/>
                                <Link href={{
                                    pathname: '/createQuiz',
                                    query: {id: this.props.id }
                                }}>
                                <a>
                                    <button>Составить Тест</button>
                                </a>
                                </Link>
                            </> 
                            :
                            null
                        }
                    </>
                  )}
                  </User>
              )
            }}
        </Query>
      )
    }
  }

