import React from 'react';
import styled from 'styled-components';
import  gql  from "graphql-tag";
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { SandboxPerPage } from '../../config';


const A = styled.a`
     pointer-events: ${props => props.disabled ? "none" : null};
`;

const SANDBOXES_PAGINATION_QUERY = gql`
    query SANDBOXES_PAGINATION_QUERY{
        sandboxPagesConnection {
            aggregate {
                count
            }
        }
    }
`;

const PaginationStyles = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid grey;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-top: 3%;
    a {
        margin: 4%;
    }
`;

const Pagination = props => (
    <Query query={SANDBOXES_PAGINATION_QUERY}>
        {({ data, loading, error }) => {
            if(loading) return <p>Loading...</p>
            const count = data.sandboxPagesConnection.aggregate.count
            const pages = Math.ceil(count / SandboxPerPage)
            const page = props.page
            return (
            <PaginationStyles>
                <Head>
                  <title>
                      Savvy – Страница {page} из {pages}
                  </title>
                </Head>
                <Link 
                    prefetch
                    href={{
                        pathname: 'courses',
                        query: { page: page - 1 }
                
                }}>
                <A disabled={ page <= 1 }> 
                    ⬅️ Пред
                </A>
                </Link>
                <p>Страница {props.page} из {pages}</p>
                <Link 
                    prefetch
                    href={{
                        pathname: 'courses',
                        query: { page: page + 1 }
                
                }}>
                <A disabled={ page >= pages }>
                    След ➡️
                </A>
                </Link>
            </PaginationStyles>
        )}}
    </Query>
)

export default Pagination;