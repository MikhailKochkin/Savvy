import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_COURSE_PAGES_QUERY} from './Cases';

const DELETE_COURSEPAGE_MUTATION =gql`
    mutation DELETE_COURSEPAGE_MUTATION($id: ID!){
        deleteCoursePage(id: $id) {
            id
        }
    }
`

class DeleteCoursePage extends Component {
    update = (cache, payload) => {
        //manually update the cache on the client, 
        //so it matches the server
        //1. Read the cache for the cases we want
        const data = cache.readQuery({ query: ALL_COURSE_PAGES_QUERY})
        console.log(data);
        console.log(payload);
        //2. filter the deleted item out of the page
        data.coursePages = data.coursePages.filter(coursePage => coursePage.id !== 
            payload.data.deleteCoursePage.id)
            // data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        //3. Put the cases back!
        cache.writeQuery({ query: ALL_COURSE_PAGES_QUERY, data})

    }
    render() {
        return (
            <Mutation 
                mutation={DELETE_COURSEPAGE_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
            >
            {(DeleteCoursePage, { error }) => (
                <button onClick={() => {
                  if (confirm('Are you sure?')) {
                    DeleteCoursePage().catch(error => {
                        alert(error.message)
                    });
                }
                }}>{this.props.children}</button>    
            )}
            </Mutation>
        );
    }
}

export default DeleteCoursePage;