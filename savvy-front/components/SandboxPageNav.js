import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import SingleCase from './SingleCase'
import User from './User'

const SINGLE_SANDBOXPAGE_QUERY = gql`
  query SINGLE_SANDBOXPAGE_QUERY($id: ID!) {
    sandboxPage(where: { id: $id }) {
        title
        user {
            id
        }
    }
  }
`;

export default class SandboxPageNav extends Component {
    render() {
        return (
            <Query
              query={SINGLE_SANDBOXPAGE_QUERY}
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
                            <h2>Песочница: </h2>
                            <h1>{data.sandboxPage.title}</h1>
                            { me !== null ? 
                            <>
                                <Link href={{
                                    pathname: '/createSandbox',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <button>Написать Текст</button>
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

