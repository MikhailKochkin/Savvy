import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {ALL_SANDBOX_PAGES_QUERY} from './sandbox/Sandboxes';

const DELETE_SANDBOXPAGE_MUTATION =gql`
    mutation DELETE_SANDBOXPAGE_MUTATION($id: ID!){
        deleteSandboxPage(id: $id) {
            id
        }
    }
`

const Button = styled.button`
    background-color: ${props => props.delete ? "red" : "#008CBA"};
    border: none;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    width: 95%;
    margin: 0%;
    font-size:1.4rem;
    cursor: pointer;
`

class DeleteSandboxPage extends Component {
    update = (cache, payload) => {
        //manually update the cache on the client, so it matches the server
        //1. Read the cache for the cases we want
        const data = cache.readQuery({ query: ALL_SANDBOX_PAGES_QUERY})
        //2. filter the deleted item out of the page
        // console.log(payload);
        data.sandboxPages = data.sandboxPages.filter(sandboxPage => sandboxPage.id !== 
            payload.data.deleteSandboxPage.id)
            // data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        //3. Put the cases back!
        cache.writeQuery({ query: ALL_SANDBOX_PAGES_QUERY, data})

    }
    render() {
        return (
            <Mutation 
                mutation={DELETE_SANDBOXPAGE_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
            >
            {(DeleteSandboxPage, { error }) => (
                <Button onClick={() => {
                  if (confirm('Вы точно хотите удалить страницу этой песочницы?')) {
                    DeleteSandboxPage().catch(error => {
                        alert(error.message)
                    });
                }
                }}>{this.props.children}</Button>    
            )}
            </Mutation>
        );
    }
}

export default DeleteSandboxPage;