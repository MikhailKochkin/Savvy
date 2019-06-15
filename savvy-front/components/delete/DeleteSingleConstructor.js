import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { SINGLE_LESSON_QUERY } from '../lesson/SingleLesson';

const DELETE_CONSTRUCTION_MUTATION =gql`
    mutation DELETE_CONSTRUCTION_MUTATION($id: ID!){
        deleteConstruction(id: $id) {
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


class DeleteSingleConstruction extends Component {
    render() {
        const { id } = this.props
        return (
            <Mutation 
                mutation={DELETE_CONSTRUCTION_MUTATION}
                variables={{id}}
                refetchQueries={() =>[{
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: this.props.lessonID}
                  }]}
            >
                {(deleteConstruction, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить этот конструктор?')) {
                        deleteConstruction().catch(error => {
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

export default DeleteSingleConstruction;