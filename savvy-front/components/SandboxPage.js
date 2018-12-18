import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SingleSandbox from './SingleSandbox'
import SandboxPageNav from './SandboxPageNav'

const PAGE_SANDBOXES_QUERY = gql`
  query PAGE_SANDBOXES_QUERY($id: ID!) {
    sandboxes(where: {sandboxPageID: $id}) {
      id
      user {
          id
      }
    }
  }
`;

class CoursePage extends Component {
    render() {
        return (
            <Query
                query={PAGE_SANDBOXES_QUERY} 
                // fetchPolicy="network-only"
                variables={{
                    id: this.props.id,
                }}>
                {({ data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                        <>
                            <SandboxPageNav id={this.props.id}/>
                            <div>
                                {this.props.id}
                                {data.sandboxes.map(sandbox => 
                                <SingleSandbox key={sandbox.id} id={sandbox.id}/>
                                )}
                            </div>
                        </>
                    )
                }}
            </Query>
        );
    }
}

export default CoursePage;