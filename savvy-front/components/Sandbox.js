import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteCase from './DeleteCase';
import User from './User';

const CaseCard = styled.div`
    border: 1px lightgrey solid;
    border-radius: 25px;    
    display: flex;
    flex-direction: column;
    padding: 0.5%;
    margin: 1%;
    width: 45%;
    align-items: center;
    justify-content: flex-end;
    Title {
        display: flex;
        align-self: flex-start;
    }
`;

const Title = styled.h1`
    font-size:3rem;
`;

const Description = styled.p`
    font-size:2rem;
`;

const Price = styled.p`
    font-size:3rem;

`;

const Button = styled.button`
    background-color: ${props => props.delete ? "red" : "#008CBA"};
    border: none;
    color: white;
    padding: 15px 32px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    width: 70%;
    margin: 0.5%;
`

export default class SandboxPage extends Component {
    // static propTypes = {
    //     coursePage: PropTypes.object.isRequired,
    // };

    render() {
        const { sandboxPage, key } = this.props;
        // console.log(sandboxPage)
        return (
        <User>
            {({data: {me}}) => ( 
                <CaseCard>
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
                    <Description>Описание песочницы: {sandboxPage.description}</Description>
                    {/* <Price>{edCase.price} in Roubles</Price> */}
                    <Link href={{
                            pathname: '/sandboxPage',
                            query: {id: sandboxPage.id }
                        }}>
                        <a>
                        <Button>Перейти на страницу песочницы!</Button>
                        </a>
                    </Link>
                    {me !== null && me.id === sandboxPage.user.id &&
                    <Link href={{
                            pathname: '/update',
                            query: {id: sandboxPage.id }
                        }}>
                        <a>
                        <Button>Внести изменения в песочницу!</Button>
                        </a>
                    </Link>}
                        {me !== null && me.id === sandboxPage.user.id &&
                        <DeleteCase 
                            id={sandboxPage.id}
                        >
                            Удалить песочницу!
                        </DeleteCase>}   
                </CaseCard>
            )}
        </User>
    )}
}
