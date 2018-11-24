import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const CaseCard = styled.div`
    border: 1px lightgrey solid;
    border-radius: 25px;    
    display: flex;
    flex-direction: column;
    padding: 0.5%;
    margin: 1%;
    width: 45%;
    /* align-items: flex-end; */
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
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`




export default class Case extends Component {
    static propTypes = {
        edCase: PropTypes.object.isRequired,
    };

    render() {
        const { edCase } = this.props;
        return (
            <CaseCard>
                <Title>
                <Link href={{
                        pathname: '/case',
                        query: {id: edCase.id }
                    }}>
                    <a>
                        <p>{edCase.title}</p>
                    </a>
                </Link>
                </Title>
                <Description>Course description: {edCase.description}</Description>
                <Price>{edCase.price} in Roubles</Price>
                <Link href={{
                        pathname: '/case',
                        query: {id: edCase.id }
                    }}>
                    <a>
                    <Button>Go to course!</Button>
                    </a>
                </Link>
                
            </CaseCard>
        );
    }
}
