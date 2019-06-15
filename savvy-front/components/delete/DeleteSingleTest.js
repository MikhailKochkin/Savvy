import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { SINGLE_LESSON_QUERY } from '../lesson/SingleLesson';

const DELETE_TEST_MUTATION =gql`
    mutation DELETE_TEST_MUTATION($id: ID!){
        deleteNewTest(id: $id) {
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
        const { lessonId, testId } = this.props
        return (
            <Mutation 
                mutation={DELETE_TEST_MUTATION}
                variables={{id: testId}}
                refetchQueries={() =>[{
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: lessonId},
                  }]}
            >
                {(deleteNewTest, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту запись?')) {
                        deleteNewTest().catch(error => {
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