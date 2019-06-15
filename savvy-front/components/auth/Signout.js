import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import { CURRENT_USER_QUERY} from '../User';

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION{
        signout {
            message
        }
    }
`;

const Button = styled.button`
    border: none;
    background: none;
    font-size: 1.8rem;
    cursor: pointer;
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