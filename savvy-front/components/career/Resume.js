import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NewsStyle = styled.div`
    background-color: white;
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 2% 4%;
    margin-bottom: 2rem;
    @media (max-width: 700px) {
        display:none;
    }
`;

const Title = styled.p`
    font-size: 2rem;
    font-style: italic;
`;

const Syn = styled.p`
    font-size: 1.4rem;
`;


class Conf extends Component {
    render() {
        return (
            <NewsStyle>
                <Title>Резюме</Title>
                <Syn>Старт 1 июля</Syn>
                <Syn>Создайте свое онлайн резюме и откройте к нему доступ для представителей лучших компаний.</Syn>
            </NewsStyle>
        );
    }
}

export default Conf;