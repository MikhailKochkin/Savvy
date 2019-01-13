import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { PAGE_LESSONS_QUERY } from './course/CoursePage';

const DELETE_LESSON_MUTATION =gql`
    mutation DELETE_LESSON_MUTATION($id: ID!){
        deleteLesson(id: $id) {
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


class DeleteSingleLesson extends Component {

    render() {
        return (
            <Mutation 
                mutation={DELETE_LESSON_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
                refetchQueries={() => [{
                    query: PAGE_LESSONS_QUERY,
                    variables: { id: this.props.coursePageId },
                  }]}
            >
                {(DeleteSandbox, { error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту запись?')) {
                        DeleteSandbox().catch(error => {
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

export default DeleteSingleLesson;