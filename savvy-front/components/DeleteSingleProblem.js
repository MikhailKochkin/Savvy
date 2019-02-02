import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { PAGE_PROBLEMS_QUERY } from './course/CoursePage';

const DELETE_PROBLEM_MUTATION =gql`
    mutation DELETE_PROBLEM_MUTATION($id: ID!){
        deleteProblem(id: $id) {
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

class DeleteSingleProblem extends Component {
    render() {
        const { id } = this.props
        return (
            <Mutation 
                mutation={DELETE_PROBLEM_MUTATION}
                variables={{id}}
                refetchQueries={() =>[{
                    query: PAGE_PROBLEMS_QUERY,
                    variables: { id: this.props.lessonID},
                  }]}
            >
                {(deleteProblem, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту запись?')) {
                        deleteProblem().catch(error => {
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

export default DeleteSingleProblem;