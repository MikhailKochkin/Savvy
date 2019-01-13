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
    background-color: #0A2342;
    color: white;
    padding: 5%;
`;

const Img = styled.img`
    width: 350px;
    height: 200px;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

const Author = styled.p`
    font-size: 1.8rem;
    margin: -0.1%;
`;

const Button = styled.button`
    margin-top: 5%;
    padding: 2%;
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #FFFDF7;
    background-color: #84BC9C;
    border: solid 1px white;
    cursor: pointer;
    &:hover{
        background-color: #294D4A;
    }
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
                            {sandboxPage.image && <Img src={sandboxPage.image} alt={sandboxPage.title}/>}
                            <Author>{sandboxPage.title}</Author>
                            { me !== null ? 
                            <>
                                <Link href={{
                                    pathname: '/createSandbox',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <Button>Написать Текст</Button>
                                </a>
                                </Link>
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

