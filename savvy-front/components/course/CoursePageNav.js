import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import User from '../User'


const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
        id
        title
        image
        courseType
        students
        pointsA {
            id
        }
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
    div {
        background: #FEFAE9;
        border-left: 6px solid #F0C40F;
        /* border-radius: 10px; */
        
        margin-right: 14%;
        padding: 4%;
        p {
            color: black;
            margin: 0;
        }
    }
    @media (max-width: 800px) {
        padding: 5%;
        h2 {
            margin-left: 8%;
        }
        div {
        margin-right: 0%;
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
                            <LeftHeadStyles>
                                {coursePage.image && <Img src={coursePage.image} alt={coursePage.title}/>}
                                <Author>Курс: {coursePage.title} </Author>
                                <Author>Автор: {coursePage.user.name} </Author>
                                { me !== null && coursePage.user.id === me.id ?
                                    <p>Если после создания или удаления материала он не появился сразу на странице, перезагрузите страницу и все будет в порядке.</p>
                                    :
                                    null
                                }
                                <br/>
                            </LeftHeadStyles>
                            <RightHeadStyles>
                                { me && !coursePage.students.includes(me.id) && me.id !== coursePage.user.id &&
                                <>
                                  {coursePage.pointsA.length > 0 &&
                                    <Link href={{
                                            pathname: '/pointA',
                                            query: coursePage.id
                                        }}>
                                        <a>
                                            <Button>Описание курса</Button>
                                        </a>
                                    </Link>
                                }
                                  { coursePage.courseType === "FORMONEY" &&
                                    <>
                                        <Link href={{
                                            pathname: '/',
                                        }}>
                                            <a>
                                                <Button>На главную страницу</Button>
                                            </a>
                                        </Link>
                                        <div>
                                            <p><b>Совет</b>: купить курс вы можете на главной странице сайта.
                                            После оплаты вам откроют доступ ко всем урокам курса.</p>
                                        </div>
                                    </>
                                  }
                                  { coursePage.courseType === "PRIVATE" &&
                                    <>
                                        <Link href={{
                                            pathname: '/',
                                        }}>
                                            <a>
                                                <Button>На главную страницу</Button>
                                            </a>
                                        </Link>
                                        <div>
                                        <p><b>Совет</b>:Зарегестриуйтесь на курс на главной странице сайта!
                                        Преподаватель одобрит вашу заявку и откроет доступ к материалам курса.</p>
                                        </div>
                                    </>
                                  }
                                  { coursePage.courseType === "PUBLIC" &&
                                    <>
                                        <div>
                                        <p><b>Совет</b>:Зарегестриуйтесь на курс на главной странице сайта. 
                                        Сразу после регистрации вы получите доступ к материалам курса.</p>
                                        </div>
                                        <Link href={{
                                            pathname: '/',
                                        }}>
                                            <a>
                                                <Button>На главную страницу</Button>
                                            </a>
                                        </Link>
                                        <p>Зарегестриуйтесь на курс на главной странице сайта! 
                                        <br/>Сразу после регистрации вы получите доступ к материалам курса.</p>
                                    </>
                                  }
                                </>
                                }
                                { me && me !== null && coursePage.user.id === me.id &&
                                <>
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
                              </>
                            }
                            </RightHeadStyles> 
                    </HeadStyles>
                  )}
                  </User>
              )
            }}
        </Query>
      )
    }
  }

