import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { SINGLE_LESSON_QUERY } from './course/SingleLesson';

const DELETE_TEXTEDITOR_MUTATION =gql`
    mutation DELETE_TEXTEDITOR_MUTATION($id: ID!){
        deleteTextEditor(id: $id) {
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
        const { lessonId, id } = this.props
        return (
            <Mutation 
                mutation={DELETE_TEXTEDITOR_MUTATION}
                variables={{id}}
                refetchQueries={() =>[{
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: lessonId},
                  }]}
            >
                {(deleteTextEditor, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту запись?')) {
                        deleteTextEditor().catch(error => {
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