import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {ALL_COURSE_PAGES_QUERY} from './course/Courses';

const DELETE_COURSEPAGE_MUTATION =gql`
    mutation DELETE_COURSEPAGE_MUTATION($id: ID!){
        deleteCoursePage(id: $id) {
            id
        }
    }
`;

const Button = styled.button`
    background-color: ${props => props.delete ? "red" : "#008CBA"};
    border: none;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    width: 135px;;
    margin: 2px;
    font-size:1.4rem;
    cursor: pointer;
    &:hover {
        background-color: #003D5B;
    }
`

class DeleteCoursePage extends Component {
    // update = (cache, payload) => {
    //     //manually update the cache on the client, so it matches the server
    //     //1. Read the cache for the cases we want
    //     const data = cache.readQuery({ query: ALL_COURSE_PAGES_QUERY})
    //     //2. filter the deleted item out of the page
    //     data.coursePages = data.coursePages.filter(coursePage => coursePage.id !== 
    //         payload.data.deleteCoursePage.id)
    //     //3. Put the cases back!
    //     cache.writeQuery({ query: ALL_COURSE_PAGES_QUERY, data})
    // }
    render() {
        return (
            <Mutation 
                mutation={DELETE_COURSEPAGE_MUTATION}
                variables={{id: this.props.id}}
                refetchQueries={() => [{
                    query: ALL_COURSE_PAGES_QUERY,
                  }]}
            >
            {(DeleteCoursePage, { error }) => (
                <Button onClick={() => {
                  if (confirm('Вы точно хотите удалить страницу этого курса?')) {
                    DeleteCoursePage().catch(error => {
                        alert(error.message)
                    });
                }
                }}>{this.props.children}</Button>    
            )}
            </Mutation>
        );
    }
}

export default DeleteCoursePage;