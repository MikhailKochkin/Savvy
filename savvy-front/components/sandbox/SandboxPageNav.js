import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import User from '../User'

const NavStyles = styled.div`
    display: flex;
    flex: 1 40%;
    flex-direction: column;
`;

const Img = styled.img`
    width: 75%;
    height: 300px;
`;

const SINGLE_SANDBOXPAGE_QUERY = gql`
  query SINGLE_SANDBOXPAGE_QUERY($id: ID!) {
    sandboxPage(where: { id: $id }) {
        title
        image
        user {
            id
            name
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
            const sandboxPage = data.sandboxPage
            return (
            // if (!data.case) return <p>No Item Found for {this.props.id}</p>;
                <User>
                    {({data: {me}}) => (
                        <NavStyles>  
                            {/* {console.log(me.id)} */}
                            {/* <p>ID автора курса: {data.coursePage.user.id} </p>
                            
                            <p>Номер страницы с курсом: {this.props.id}</p> */}
                            {sandboxPage.image && <Img src={sandboxPage.image} alt={sandboxPage.title}/>}
                            <h1>{sandboxPage.title}</h1>
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
                                {/* <Link
                                    href={{
                                        pathname: 'updateSandboxPage',
                                        query: { id: this.props.id },
                                    }}
                                >
                                    <button>Изменить песочницу ✏️</button>
                                </Link> */}
                            </> 
                            :
                            null
                        }
                    </NavStyles>
                  )}
                  </User>
              )
            }}
        </Query>
      )
    }
  }

