import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Sandbox from './Sandbox';
import SandboxesPagination from '../pagination/SandboxesPagination';
import { SandboxPerPage } from '../../config';


const Center = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;

const SandboxesStyles = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ALL_SANDBOX_PAGES_QUERY = gql`
  query ALL_SANDBOX_PAGES_QUERY($skip: Int = 0, $first: Int = ${SandboxPerPage}) {
    sandboxPages(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      user {
          id
          name
      }
    }
  }
`;

class Sandboxes extends Component {
    render() {
        return (
            <Center>
                <SandboxesPagination page={this.props.page} />
                    <h1>Песочницы</h1>
                    <Query 
                        query={ALL_SANDBOX_PAGES_QUERY} 
                        // fetchPolicy="cache-and-network"
                        variables={{
                            skip: this.props.page * SandboxPerPage - SandboxPerPage,
                            // first: 4,
                        }}>
                        {({ data, error, loading }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error: {error.message}</p>;
                            return <SandboxesStyles>
                                {data.sandboxPages.map(sandboxPage => <Sandbox key={sandboxPage.id} sandboxPage={sandboxPage}/>)}
                                </SandboxesStyles>  
                        }}
                    </Query>
                {/* <Pagination page={this.props.page}/> */}
            </Center>
        );
    }
}

export default Sandboxes;
export {ALL_SANDBOX_PAGES_QUERY};