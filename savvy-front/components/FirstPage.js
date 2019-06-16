import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HomeStyles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4%;
`;

const Data = styled.div`
    background: white;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 3%;
    border: 1px lightgrey solid;
    p {
        font-size: 2rem;
        text-align: center;
    }
    @media (max-width: 800px) {
        width: 90%;
        p { font-size: 1.4rem;}
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3%;
    a {
        padding: 15px 30px;
        background: #112862;
        &:hover {
            background: white;
            border: 1px solid #112862;
            color: #112862;
        }
        color: white;
        font-size: 1.7rem;
        font-weight: bold;
    }
    @media (max-width: 800px) {
        a {
            font-size: 1.6rem; 
        }
    }
`;


class FirstPage extends Component {
    render() {
        return (
            <HomeStyles>
                <Data>
                    <p>Добро пожаловать на Savvvy.app – интерактивную платформу он-лайн курсов по праву.</p>
                    <Card>
                        <p>Зарегистрироваться, чтобы получить доступ к курсам и другим возможностям сайта.</p>
                        <Link 
                            prefetch 
                            href="/signup">
                            <a>Зарегистрироваться</a>
                        </Link>
                    </Card>
                    <Card>
                        <p>Посмотреть курсы.</p>
                        <Link 
                            prefetch 
                            href="/courses">
                            <a>Посмотреть</a>
                        </Link>
                    </Card>
                  </Data>
            </HomeStyles>
        );
    }
}

export default FirstPage;