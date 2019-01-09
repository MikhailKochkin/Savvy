import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
// import SingleCase from './SingleCase'
import User from '.././User'


const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
        title
        image
        user {
            id
            name
        }
    }
  }
`;

const HeadStyles = styled.div`
    display: flex;
    margin-top: -2%;
    flex-direction: row;
    background-color: #0A2342;
    /* #0B3954; */
    color: #FFFDF7;
    Button:focus {
        background-color: #122557;
    }
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const LeftHeadStyles = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 50%;
    padding: 5% 0 0 5%;
    
`;

const RightHeadStyles = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 50%;
    padding-top: 5%;
    font-size: 1.8rem;
    @media (max-width: 800px) {
        padding: 5%;
    }
`;

const Button = styled.button`
    padding: 2%;
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #FFFDF7;
    background-color: #84BC9C;
`;


const Buttons = styled.div`
    display: flex;
    flex-direction: column;

`;

const Img = styled.img`
    width: 350px;
    height: 200px;
`;

const Author = styled.p`
    font-size: 1.8rem;
    margin: -0.1%;
`;

const Header = styled.p`
    margin-top: 0;
    padding-top: 0;

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
            const coursePage = data.coursePage;
            return (
            // if (!data.case) return <p>No Item Found for {this.props.id}</p>;
                <User>
                    {({data: {me}}) => (
                        <HeadStyles>  
                            {/* {console.log(me.id)} */}
                            <LeftHeadStyles>
                                {coursePage.image && <Img src={coursePage.image} alt={coursePage.title}/>}
                                <Author>{coursePage.title} </Author>
                                <Author>{coursePage.user.name} </Author> 
                                <br/>
                            </LeftHeadStyles>

                            { me !== null && coursePage.user.id === me.id ? 
                            <RightHeadStyles>
                                <Header> Инструменты преподавателя: </Header>
                                <Buttons>
                                <Link href={{
                                    pathname: '/createLesson',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <Button>Составить урок</Button>
                                </a>
                                </Link>
                                <br/>
                                <Link href={{
                                    pathname: '/createTest',
                                    query: {id: this.props.id }
                                }}>
                                <a>
                                    <Button>Составить Тест</Button>
                                </a>
                                </Link>
                                <br/>
                                <Link href={{
                                    pathname: '/createProblem',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <Button>Составить задачу </Button>
                                </a>
                                </Link>
                                <br/>
                                <Link href={{
                                    pathname: '/applications',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <Button>Рассмотреть заявки </Button>
                                </a>
                                </Link>
                              </Buttons>
                            </RightHeadStyles> 
                            :
                            null
                        }
                    </HeadStyles>
                  )}
                  </User>
              )
            }}
        </Query>
      )
    }
  }

