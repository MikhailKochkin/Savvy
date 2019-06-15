import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
// import { SINGLE_LESSON_QUERY } from './course/SingleLesson';

const DELETE_POINTATEST_MUTATION =gql`
    mutation DELETE_POINTATEST_MUTATION($id: ID!){
        deletePointATest(id: $id) {
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


class DeleteSinglePontATest extends Component {
    render() {
        const { coursePageId, id } = this.props
        return (
            <Mutation 
                mutation={DELETE_POINTATEST_MUTATION}
                variables={{id}}
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

export default DeleteSinglePontATest;