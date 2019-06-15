import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteCoursePage from '../delete/DeleteCoursePage';
import EnrollCoursePage from '../EnrollCoursePage';
import User from '../User';
import Application from './Application'
import TakeMyMoney from '../TakeMyMoney';

const CaseCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px lightgrey solid;
    border-radius: 5px;    
    text-align: left;
    padding: 1%;
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
    font-size:2rem;
    font-weight: bold;
    margin-top: 1%;
`;

const Price = styled.span`
    font-size:1.6rem;
    font-weight: bold;
`;

const PriceBox = styled.div`
    font-size:1.6rem;
    font-weight: bold;
    margin-bottom: 8%;
`;

const Description = styled.p`
    font-size:1.7rem;
    margin-top: -5%;
`;

const Author = styled.p`
    font-size:1.6rem;
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
    margin-bottom: 0.5%;
`;

const Additional = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const LineThrough = styled.span`
    text-decoration: line-through;
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
        const { coursePage, key, id, me } = this.props;

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

        const subjectArray = [];
        me && me.subjects.map(subject => subjectArray.push(subject))

        const trackArray = [];
        coursePage.careerTrack.map(item => trackArray.push(item.id))

        let price;
        if (me === null) {
            if(coursePage.price === null) {
                price = "Бесплатно"
            }
            else {
                price = coursePage.price
            }
        } else if (me !== null && me.careerTrack === null) {
            if(coursePage.price === null) {
                price = "Бесплатно"
            }
            else {
                price = coursePage.price
            }
        } else if (me && me.careerTrack !== null) { 
            if(trackArray.includes(me.careerTrack.id) && coursePage.price !== null){
                price = coursePage.price * 0.9;
            }
            else if(coursePage.price === null) {
                price = "Бесплатно"
            }
            else {
                price = coursePage.price
            }
        }
        return (

                <CaseCard>
                  <Additional>
                    <div>
                    {coursePage.image && <Img src={coursePage.image} alt={coursePage.title}/>}
                    <Title><a>{coursePage.title}</a></Title>
                    <Description>{coursePage.description}</Description>
                    <Author>{coursePage.user.name}</Author>
                    {/* <p>Количество участников: {studentsArray.length}</p> */}
                    {price !== "Бесплатно" && 
                    <PriceBox> Стоимость: 
                    <span> </span>
                    {price}

                    </PriceBox>}
                    </div>
                    <div>
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
                    {me && me !== null && me.id !== coursePage.user.id 
                    && !this.state.revealApplication && !applicationsList.includes(me.id) && courseType !== "Платный" &&
                    <EnrollCoursePage
                        coursePage = {coursePage}
                        studentsArray = {studentsArray}
                        subjectArray = {subjectArray}
                        meData={me}
                        getInputReveal={this.myCallback}

                    />}
                    {me && me !== null && me.id !== coursePage.user.id && courseType === "Платный" && subjectArray.includes(coursePage.id) &&
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
                    {!subjectArray.includes(coursePage.id) && 
                        <Link href={{
                                pathname: '/coursePage',
                                query: {id }
                            }}>
                            <a>
                                <Button>Войти</Button>
                            </a>
                    </Link> }
                    {me && me.id === coursePage.user.id &&
                      <>
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
                    {me && me !== null && courseType === "Платный" && 
                    me.id !== coursePage.user.id && !applicationsList.includes(me.id) && !subjectArray.includes(coursePage.id) &&
                    <TakeMyMoney
                        coursePage = {coursePage}
                        coursePageID={coursePage.id}
                        name={me.name}
                        user={me.id}
                        price={price}
                    >
                      Купить
                    </TakeMyMoney>
                    }
                    </Buttons>
                    {me && this.state.revealApplication && 
                    <Application
                        getInputReveal={this.myCallback}
                        meData={me}
                        coursePageId = {coursePage.id}
                    />
                   
                    }
                    </div>
                  </Additional>
                </CaseCard>
    )}
}
