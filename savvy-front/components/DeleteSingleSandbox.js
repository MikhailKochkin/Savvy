import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {remove} from 'react-icons-kit/fa/remove'
import { PAGE_SANDBOXES_QUERY } from './sandbox/SandboxPage';

const DELETE_SANDBOX_MUTATION =gql`
    mutation DELETE_SANDBOX_MUTATION($id: ID!){
        deleteSandbox(id: $id) {
            id
        }
    }
`

const Button = styled.button`
    border: none;
    cursor: pointer;
`

const Delete = styled.div`
  color: grey;
  &:hover {
    color: black;
  }
`;


class DeleteSandbox extends Component {
    // update = (cache, payload) => {
    //     //manually update the cache on the client, so it matches the server
    //     //1. Read the cache for the cases we want
    //     const data = cache.readQuery({ 
    //       query: gql`
    //         query PAGE_SANDBOXES_QUERY($id: ID!) {
    //           sandboxes(where: {sandboxPageID: $id}) {
    //             id
    //             text
    //             video
    //             likes
    //             user {
    //               id
    //             }
    //           }
    //         }
    //       `,
    //       variables: {
    //         id: this.props.sandboxPageId
    //       },
    //     })
    //     console.log(data)
    //     console.log(payload);
        //2. filter the deleted item out of the page
        // data.sandboxes = data.sandboxes.filter(sandbox => sandbox.id !== 
        //     payload.data.deleteSandbox.id)
        //3. Put the cases back!
        // cache.writeQuery({ query: PAGE_SANDBOXES_QUERY, data})
        // cache.writeQuery({
        //     query: PAGE_SANDBOXES_QUERY,
        //     data: {
        //       sandboxes: data.sandboxes.filter(sandbox => sandbox.id !== payload.data.deleteSandbox.id)
        //     }
        //   });
        // const filteredSandboxes = data.sandboxes.filter(sandbox => sandbox.id !== payload.data.deleteSandbox.id)
        // cache.writeQuery({ query: PAGE_SANDBOXES_QUERY, data: { sandboxes: filteredSandboxes } })
    // }
    render() {
        const {id} = this.props
        return (
            <Mutation 
                mutation={DELETE_SANDBOX_MUTATION}
                variables={{id}}
                refetchQueries={() =>[{  
                    query: PAGE_SANDBOXES_QUERY,
                    variables: { id},
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

export default DeleteSandbox;