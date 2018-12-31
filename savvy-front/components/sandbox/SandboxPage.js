import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SingleSandbox from './SingleSandbox'
import SingleSandboxLight from './SingleSandboxLight'
import SandboxPageNav from './SandboxPageNav'
import SandBoxPageGoals from './SandBoxPageGoals'
import styled from 'styled-components';
import User from '../User';

const HeaderStyles = styled.div`
    display:flex;
    flex-direction: row;
`;


const PAGE_SANDBOXES_QUERY = gql`
  query PAGE_SANDBOXES_QUERY($id: ID!) {
    sandboxes(where: {sandboxPageID: $id}) {
      id
      likes
      user {
          id
      }
    }
  }
`;

class CoursePage extends Component {
    render() {
        return (
          <User>
            {({data: {me}}) => ( 
            <Query
                query={PAGE_SANDBOXES_QUERY} 
                fetchPolicy="cache-first"
                variables={{
                    id: this.props.id,
                }}>
                {({ data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                        <>  
                            <HeaderStyles>
                                <SandboxPageNav id={this.props.id}/>
                                <SandBoxPageGoals id={this.props.id}/>
                            </HeaderStyles>
                            <div>
                                {data.sandboxes.map(sandbox => 
                                me !== null ? (
                                    <SingleSandbox 
                                        key={sandbox.id} 
                                        id={sandbox.id} 
                                        sandboxLikes={sandbox.likes}
                                        userFavourites={me.favourites}
                                        userId={me.id}
                                        sandboxPageId={this.props.id}
                                    />
                                ) : (
                                    <SingleSandboxLight
                                        key={sandbox.id} 
                                        id={sandbox.id} 
                                        sandboxLikes={sandbox.likes}
                                    />
                                )
                                )}
                            </div>
                        </>
                    )
                }}
            </Query>
          )}
        </User>
        );
    }
}

export default CoursePage;
export { PAGE_SANDBOXES_QUERY };