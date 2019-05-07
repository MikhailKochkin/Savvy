import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteSandboxPage from '../delete/DeleteCoursePage';
import User from '../User';

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

const Title = styled.h1`
    font-size:2.4rem;
    font-weight: bold;
    margin-top: -5%;
`;

const Description = styled.p`
    font-size:1.8rem;
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
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    width: 95%;
    margin: 0%;
    cursor: pointer;
    Button:hover {
        width: 10%;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5%;
`;

export default class SandboxPage extends Component {
    render() {
        const { sandboxPage, key } = this.props;
        return (
        <User>
            {({data: {me}}) => ( 
                <CaseCard>
                    {sandboxPage.image && <Img src={sandboxPage.image} alt={sandboxPage.title}/>}
                    <Title>
                        <Link href={{
                                pathname: '/sandboxPage',
                                query: {id: sandboxPage.id }
                            }}>
                            <a>
                                <p>{sandboxPage.title}</p>
                            </a>
                        </Link>
                    </Title>
                    <Description>{sandboxPage.description}</Description>
                    <Author>{sandboxPage.user.name}</Author>
                    <Buttons>
                        <Link href={{
                                pathname: '/sandboxPage',
                                query: {id: sandboxPage.id }
                            }}>
                            <a>
                            <Button>Просмотреть</Button>
                            </a>
                        </Link>
                        {me !== null && me.id === sandboxPage.user.id &&
                        <Link href={{
                                pathname: '/updateSandboxPage',
                                query: {id: sandboxPage.id }
                            }}>
                            <a>
                            <Button>Изменить</Button>
                            </a>
                        </Link>}
                        {me !== null && me.id === sandboxPage.user.id &&
                        <DeleteSandboxPage
                            id={sandboxPage.id}
                        >
                            Удалить
                        </DeleteSandboxPage>} 
                    </Buttons>  
                </CaseCard>
            )}
        </User>
    )}
}
