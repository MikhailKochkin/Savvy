import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteCoursePage from '../DeleteCoursePage';
import EnrollCoursePage from '../EnrollCoursePage';
import User from '../User';
import Application from './Application'

const CaseCard = styled.div`
    border: 1px lightgrey solid;
    border-radius: 5px;    
    text-align: left;
    padding: 0.5%;
    margin: 2%;
    width: 300px;
    line-height: 1.2;
    
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
    width: 97%;
    margin: 0%;
    cursor: pointer;
    Button:hover {
        width: 10%;
    }
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
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
                    <Title>
                    {coursePage !== null && 
                    <Link href={{
                            pathname: '/coursePage',
                            query: {id }
                        }}>
                        <a>{coursePage.title}</a>
                    </Link>}
                    </Title>
                    <Description>{coursePage.description}</Description>
                    <Author>{coursePage.user.name}</Author>
                    <p>Количество участников: {studentsArray.length}</p>
                    <p>Тип курса: {courseType}</p>
                    {/* <Price>{edCase.price} in Roubles</Price> */}
                    <Buttons>
                    {me === null && coursePage.courseType !== "PRIVATE" &&
                    <Link href={{
                            pathname: '/coursePage',
                            query: {id }
                        }}>
                        <a>
                            <Button>Просмотреть</Button>
                        </a>
                    </Link>}
                    {me !== null && coursePage.courseType === "PRIVATE" && coursePage.students.includes(me.id) &&
                    <Link href={{
                            pathname: '/coursePage',
                            query: {id }
                        }}>
                        <a>
                            <Button>Войти</Button>
                        </a>
                    </Link>}
                    {me !== null && me.id === coursePage.user.id &&
                    <Link href={{
                            pathname: '/updateCoursePage',
                            query: {id }
                        }}>
                        <a>
                        <Button>Изменить</Button>
                        </a>
                    </Link>}

                    {me !== null && me.id !== coursePage.user.id 
                    && !this.state.revealApplication && !applicationsList.includes(me.id) && !coursePage.students.includes(me.id) &&
                    <EnrollCoursePage
                        coursePage = {coursePage}
                        studentsArray = {studentsArray}
                        subjectArray = {subjectArray}
                        meData={me}
                        getInputReveal={this.myCallback}

                    />}
                    {me && applicationsList.includes(me.id) ?
                        <h4>Заявка находится на рассмотрении</h4>
                        :
                        null
                    }
                    {me !== null && me.id === coursePage.user.id &&
                    <DeleteCoursePage
                        id={id}
                    >
                        Удалить
                    </DeleteCoursePage>}  
                    </Buttons>
                    {this.state.revealApplication && 
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
