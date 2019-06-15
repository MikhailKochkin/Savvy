import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Style = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
    background-color: white;
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 4%;
    margin-bottom: 2rem;
    @media (max-width: 700px) {
        margin-left: 0;
    }
    a {
        border: 1px solid white;
        background: #00CC00;
        border-radius: 4px;
        padding: 2%;
        &:hover {
            color: grey;
        }
    }
`;

const Button = styled.button`
    padding: 2%;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 3%;
    color: #FFFDF7;
    background-color: #5DAE76;
    border: solid 1px white;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    &:hover{
        background-color: #294D4A;
    }
`;

const AdminPage = () => (
    <Style>
        <Link href={{
            pathname: '/manageCareer',
            // query: {id: this.props.id}
        }}>
            <Button> Управление карьерным треком </Button>
        </Link>
    </Style>
)



export default AdminPage;