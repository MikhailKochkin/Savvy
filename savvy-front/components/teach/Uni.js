import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const UniInfo = styled.div`
    padding: 2%;
    background: white;
    flex-basis: 50%;
    height: 250px;
`;

const Title = styled.p`
    font-size: ${props => props.primary ? "2.6rem" : "1.6rem"};
    margin-top: 0;
    margin-bottom: ${props => props.primary ? "3%" : "0"};
`;

const Button = styled.button`
    margin-top: 2%;
    padding: 2% 2%;
    font-size: 1.6rem;
    background: #4DAC44;
    color: white;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    &:hover {
        background: #006400;
    }
    a {
        color: white;
    }
`;

class Uni extends Component {
    render() {
        const { me } = this.props
        let price
        if(me.uni.paidMonths == null){ 
            price = 0 
        } else {
            price = me.uni.paidMonths
        }
        return (
            <UniInfo>
                <Title primary>Информация</Title>
                <Title>Ваш вуз: {me.uni.title}</Title>
                <Title>Лимит новых курсов: {me.uni.capacity}</Title>
                <Title>Оплачено месяцев: {price}</Title>
                <Link 
                    prefetch 
                    href="/create">
                    <Button><a>Пополнить</a></Button>
                </Link>
            </UniInfo>
        );
    }
}

export default Uni;