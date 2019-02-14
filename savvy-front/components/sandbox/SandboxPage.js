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
import FetchMore from '../FetchMore';
import { MaterialPerPage } from '../../config';

const HeaderStyles = styled.div`
    display:flex;
    flex-direction: row;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const PAGE_SANDBOXES_QUERY = gql`
  query PAGE_SANDBOXES_QUERY($id: ID!, $first: Int = ${MaterialPerPage}, $skip: Int = 0) {
    sandboxes(where: {sandboxPageID: $id}, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
      id
      text
      likes
      user {
          id
      }
    }
  }
`;

const AGGREGATE_PAGE_SANDBOXES_QUERY = gql`
  query AGGREGATE_PAGE_SANDBOXES_QUERY($id: ID!) {
    sandboxesConnection(where: {sandboxPageID: $id}) {
        aggregate {
            count
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
                    first: MaterialPerPage,
                    skip: 0,
                }}>
                {({ data: data1, error: error1, loading: loading1, fetchMore }) => {
                    if (loading1) return <p>Loading...</p>;
                    if (error1) return <p>Error: {error1.message}</p>;
                    return (
                        <>  
                            <HeaderStyles>
                                <SandboxPageNav id={this.props.id}/>
                                <SandBoxPageGoals id={this.props.id}/>
                            </HeaderStyles>
                            <div>
                                {data1.sandboxes.map(sandbox => 
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
                                <Query
                                    query={AGGREGATE_PAGE_SANDBOXES_QUERY} 
                                    fetchPolicy="cache-first"
                                    variables={{
                                        id: this.props.id,
                                    }}
                                >
                                {({ data: data2, error: error2, loading: loading2 }) => {
                                    if (loading2) return <p>Loading...</p>;
                                    if (error2) return <p>Error: {error2.message}</p>;
                                    return (
                                        <>
                                            {data2.sandboxesConnection.aggregate.count > data1.sandboxes.length ?
                                            <FetchMore
                                                onLoadMore={() =>
                                                    fetchMore({
                                                    variables: {
                                                        skip: data1.sandboxes.length  
                                                    },
                                                    updateQuery: (prev, { fetchMoreResult }) => {
                                                        if (!fetchMoreResult) return prev;
                                                        return Object.assign({}, prev, {
                                                            sandboxes: [...prev.sandboxes, ...fetchMoreResult.sandboxes]
                                                        });
                                                    }
                                                    })
                                                }
                                            />
                                            :
                                            <h2>Это все материалы в этой песочнице на данный момент.</h2>
                                            }
                                        </> 
                                    )
                                  }}
                                </Query>
                                
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