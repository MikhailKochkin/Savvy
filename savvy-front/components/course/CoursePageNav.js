import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import User from '.././User'


const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
        title
        image
        courseType
        user {
            id
            name
        }
    }
  }
`;

const HeadStyles = styled.div`
    display: flex;
    margin-top: 0%;
    flex-direction: row;
    background-color: #0A2342;
    /* #0B3954; */
    color: #FFFDF7;
    Button:focus {
        background-color: #122557;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        Img {
            width: 95%;
        }
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
    padding-top: 4%;
    font-size: 1.8rem;
    @media (max-width: 800px) {
        padding: 5%;
        h2 {
            margin-left: 8%;
        }
    }
`;

const Button = styled.button`
    padding: 2%;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 3%;
    text-transform: uppercase;
    color: #FFFDF7;
    background-color: #84BC9C;
    border: solid 1px white;
    cursor: pointer;
    &:hover{
        background-color: #294D4A;
    }
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
                                { me !== null && coursePage.user.id === me.id ?
                                    <p>Если после создания или удаления материала он не появился сразу на странице, перезагрузите страницу и все будет в порядке.</p>
                                    :
                                    null
                                }
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
                                <Link href={{
                                    pathname: '/createPointA',
                                    query: {id: this.props.id}
                                    }}>
                                    <a>
                                        <Button>Составить описание</Button>
                                    </a>
                                </Link>
                                {coursePage.courseType !== "PUBLIC" &&
                                <Link href={{
                                    pathname: '/applications',
                                    query: {id: this.props.id}
                                }}>
                                <a>
                                    <Button>Рассмотреть заявки </Button>
                                </a>
                                </Link>
                                }
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

