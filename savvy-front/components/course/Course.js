import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteCoursePage from '../DeleteCoursePage';
import EnrollCoursePage from '../EnrollCoursePage';
import User from '../User';
import Application from './Application'
// import TakeMyMoney from '../TakeMyMoney';

const CaseCard = styled.div`
    border: 1px lightgrey solid;
    border-radius: 5px;    
    text-align: left;
    padding: 0.5%;
    margin: 2%;
    width: 300px;
    line-height: 1.2;
    @media (max-width: 800px) {
        padding: 2%;
        Button {
            padding: 4px 6px;
        }
    }
`;

const Img = styled.img`
    width: 100%;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 
`;

const Title = styled.p`
    font-size:2.4rem;
    font-weight: bold;
    margin-top: 1%;
`;

const Description = styled.p`
    font-size:2rem;
    margin-top: -5%;
`;

const Author = styled.p`
    font-size:2rem;
    color: #686868	;
`;

const Button = styled.button`
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 5px 12px;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width: 135px;
    margin: 2px;
    cursor: pointer;
    &:hover {
       background-color: #003D5B;
    }
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: space-between;
    margin-bottom: 0.5%;
`;

export default class Course extends Component {
    state = {
        revealApplication: false
    }
    static propTypes = {
        coursePage: PropTypes.object.isRequired,
    };
    myCallback = (dataFromChild) => {
        this.setState({ 
            revealApplication: dataFromChild
        });
      }

    render() {
        const { coursePage, key, id } = this.props;
        const studentsArray = [];
        coursePage.students.map(student => studentsArray.push(student))
        let courseType;
        if(coursePage.courseType === "PUBLIC") {
            courseType = "Открытый"
        } else if (coursePage.courseType === "PRIVATE") {
            courseType = "Закрытый"
        } else if (coursePage.courseType === "FORMONEY") {
            courseType = "Платный"
        }
        const applicationsList = [];
        coursePage.applications.map(application => applicationsList.push(application.applicantId))
        return (
        <User>
            {({data: {me}}) => {
                const subjectArray = [];
                me && me.subjects.map(subject => subjectArray.push(subject))
                return ( 
                <CaseCard>
                    {coursePage.image && <Img src={coursePage.image} alt={coursePage.title}/>}
                    <Title><a>{coursePage.title}</a></Title>
                    <Description>{coursePage.description}</Description>
                    <Author>{coursePage.user.name}</Author>
                    <p>Количество участников: {studentsArray.length}</p>
                    <p>Тип курса: {courseType}</p>
                    {/* { me && me !== null && courseType === "Платный" &&
                    <p>Стоимость курса: {coursePage.price} рублей</p>
                    } */}
                    <Buttons>

                    {coursePage.pointsA.length > 0 &&
                    <Link href={{
                            pathname: '/pointA',
                            query: {id }
                        }}>
                        <a>
                            <Button>Описание</Button>
                        </a>
                    </Link>
                    }
                    {me === null && courseType === "Открытый" &&
                    <Link href={{
                            pathname: '/coursePage',
                            query: {id }
                        }}>
                        <a>
                            <Button>Войти</Button>
                        </a>
                    </Link>}
                    {me && me !== null && me.id !== coursePage.user.id 
                    && !this.state.revealApplication && !applicationsList.includes(me.id) &&
                    <EnrollCoursePage
                        coursePage = {coursePage}
                        studentsArray = {studentsArray}
                        subjectArray = {subjectArray}
                        meData={me}
                        getInputReveal={this.myCallback}

                    />} 
                    {me && applicationsList.includes(me.id) &&
                        <h4>Заявка находится на рассмотрении</h4>
                    }
                    {me && me.id === coursePage.user.id &&
                    <>
                        <Link href={{
                                pathname: '/coursePage',
                                query: {id }
                            }}>
                            <a>
                                <Button>Войти</Button>
                            </a>
                        </Link>
                        <Link href={{
                                pathname: '/updateCoursePage',
                                query: {id }
                            }}>
                            <a>
                            <Button>Изменить</Button>
                            </a>
                        </Link>
                        <DeleteCoursePage
                            id={id}
                        >
                            Удалить
                        </DeleteCoursePage> 
                    </>}
                    {/* {me !== null && courseType === "Платный" &&
                    <TakeMyMoney
                        coursePageID={coursePage.id}
                        user={me.id}
                        price={coursePage.price}
                    >
                    Купить
                    </TakeMyMoney>
                    } */}
                    </Buttons>
                    {me && this.state.revealApplication && 
                    <Application
                        getInputReveal={this.myCallback}
                        meData={me}
                        coursePageId = {coursePage.id}
                    />
                   
                    }
                </CaseCard>
            )}}
        </User>
    )}
}
