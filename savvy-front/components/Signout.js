import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import { CURRENT_USER_QUERY} from './User';

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION{
        signout {
            message
        }
    }
`;

const Button = styled.button`
    border: none;
    text-decoration: none;
    color: #13214D;
    font-family: "Gill Sans",serif;
    font-size: 1.8rem;
    font-weight: 700;
    /* margin-top: 10%;
    margin-bottom: -2%; */
    cursor: pointer;
    background-color: #F0F0F0;
    &:hover {
        color: #6DAAE1;
    }
`;

const Signout= props => (
    <Mutation 
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY}]}>
            {signout => 
                <Button onClick={signout}>Выйти</Button>
            }
    </Mutation>
    
)


export default Signout;