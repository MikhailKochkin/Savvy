import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_CASES_QUERY} from './Cases';

const DELETE_CASE_MUTATION =gql`
    mutation DELETE_CASE_MUTATION($id: ID!){
        deleteCase(id: $id) {
            id
        }
    }
`

class DeleteCase extends Component {
    update = (cache, payload) => {
        //manually update the cache on the client, 
        //so it matches the server
        //1. Read the cache for the cases we want
        const data = cache.readQuery({ query: ALL_CASES_QUERY})
        console.log(data, payload);
        //2. filter the deleted item out of the page
        data.cases = data.cases.filter(edCase => edCase.id !== 
            payload.data.deleteCase.id)
        //3. Put the cases back!
        cache.writeQuery({ query: ALL_CASES_QUERY, data})

    }
    render() {
        return (
            <Mutation 
                mutation={DELETE_CASE_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
            >
            {(deleteCase, { error }) => (
                <button onClick={() => {
                  if (confirm('Are you sure?')) {
                    deleteCase();
                }
                }}>{this.props.children}</button>    
            )}
            </Mutation>
        );
    }
}

export default DeleteCase;