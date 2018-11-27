import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteCase from './DeleteCase';

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
                <Link href={{
                        pathname: '/update',
                        query: {id: edCase.id }
                    }}>
                    <a>
                    <Button>Go update this course!</Button>
                    </a>
                </Link>
                    <DeleteCase id={edCase.id}>Delete this Case!</DeleteCase>
            </CaseCard>
        );
    }
}
