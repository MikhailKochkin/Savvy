import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const An = styled.div`
    background-color: white;
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 2% 4%;
    margin-bottom: 2rem;
    outline: none;
    @media (max-width: 700px) {
        margin-left: 0;
    }
`;

const Title = styled.p`
    font-size: 2rem;
    font-style: italic;
`;

const Syn = styled.p`
    font-size: 1.4rem;

`;

const Item = styled.div`
`;

const Button = styled.button`
    background: none;
    border: none;
    font-size: 1.8rem;
    font-style: italic;
    color: #145C9E;
    padding: 0;
    cursor: pointer;
    &:hover{
        color: #112A61;
    }
`;

class Analytics extends Component {
    render() {
        const article = this.props.AnList
        return (
            <An>
                {/* {this.props.AnList.map( article =>  */}
                    <Item key={article.title}>
                        <Title><b>Аналитика:</b> {article.title}</Title>
                        <Syn>{article.synopsis}</Syn>
                        {/* <a href={news.link} target="_blank">Ссылка</a> */}
                        <Link href={{
                            pathname: '/careerTrack',
                            query: {id: this.props.id}
                        }}>
                        <Button> Больше аналитики </Button>
                        </Link>
                    </Item>
                {/* )} */}
            </An>
        );
    }
}

export default Analytics;