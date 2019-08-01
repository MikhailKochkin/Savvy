import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import User from '../User';
import MakePublic from './MakePublic';
import DeleteCoursePage from '../delete/DeleteCoursePage';

const CaseCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px lightgrey solid;
    border-radius: 5px;    
    text-align: left;
    background: white;
    padding: 0.5%; 
    margin: 2%;
    width: 305px;
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

export default class Course extends Component {

    static propTypes = {
        coursePage: PropTypes.object.isRequired,
    };

    render() {
        const { coursePage, id } = this.props;
        let courseType;
        if(coursePage.courseType === "PUBLIC") {
            courseType = "Открытый"
        } else if (coursePage.courseType === "PRIVATE") {
            courseType = "Закрытый"
        }
        return (
        <User>
            {({data: {me}}) => {
                return ( 
                <CaseCard>
                  <Additional>
                    <>
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
                    </>
                    <>
                        <Buttons>
                        <Link href={{
                                pathname: '/coursePage',
                                query: {id }
                            }}>
                            <a>
                            <Button>Перейти</Button>
                            </a>
                        </Link>
                        {me && me.id === coursePage.user.id &&
                        <>
                            <MakePublic 
                                published = {coursePage.published}
                                id = {coursePage.id}
                            />
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
                        </Buttons>
                    </>
                  </Additional>   
                </CaseCard>
            )}}
        </User>
    )}
}

