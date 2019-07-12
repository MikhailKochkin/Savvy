import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { SINGLE_LESSON_QUERY } from '../lesson/SingleLesson';

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
    /* margin-top: 5%; */
`

const Delete = styled.div`
  color: black;
  &:hover {
    color: red;
  }
`;

class DeleteSingleProblem extends Component {
    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({ query: SINGLE_LESSON_QUERY, variables: { id: this.props.lessonId } });
        console.log(data);
        // 2. Filter the deleted itemout of the page
        data.lessons = data.lesson.problems.filter(item => item.id !== payload.data.deleteProblem.id);
        // 3. Put the items back!
        cache.writeQuery({ query: SINGLE_LESSON_QUERY, variables: { id: this.props.lessonId }, data });
      };
    render() {
        const { lessonId, id } = this.props
        return (
            <Mutation 
                mutation={DELETE_PROBLEM_MUTATION}
                variables={{id}}
                update={this.update}
                refetchQueries={() =>[{
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: lessonId},
                  }]}
            >
                {(deleteProblem, { loading, error }) => (
                    <Button onClick={() => {
                    if (confirm('Вы точно хотите удалить эту задачу?')) {
                        deleteProblem().catch(error => {
                            alert(error.message)
                        });
                        }
                    }}>
                        <Delete id="remove">
                            {loading ? "Удаляем..." :<Icon size={20} icon={remove}/>  }
                        </Delete>
                    </Button>    
                )}
            </Mutation>
        );
    }
}

export default DeleteSingleProblem;