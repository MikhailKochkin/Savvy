import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { PAGE_TESTS_QUERY } from './course/CoursePage';

const DELETE_TEST_MUTATION =gql`
    mutation DELETE_TEST_MUTATION($id: ID!){
        deleteTest(id: $id) {
            id
        }
    }
`

const Button = styled.button`
    border: none;
    cursor: pointer;
`

const Delete = styled.div`
  color: black;
  &:hover {
    color: red;
  }
`;


class DeleteSingleTest extends Component {
    render() {
        const { id } = this.props
        return (
            <Mutation 
                mutation={DELETE_TEST_MUTATION}
                variables={{id}}
                refetchQueries={() =>[{
                    query: PAGE_TESTS_QUERY,
                    variables: { id},
                  }]}
            >
                {(deleteTest, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту запись?')) {
                        deleteTest().catch(error => {
                            alert(error.message)
                        });
                        }
                    }}>
                        <Delete id="remove">
                            <Icon size={20} icon={remove}/> 
                        </Delete>
                    </Button>    
                )}
            </Mutation>
        );
    }
}

export default DeleteSingleTest;