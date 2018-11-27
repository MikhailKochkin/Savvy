import React from 'react';
import styled from 'styled-components';
import  gql  from "graphql-tag";
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';



const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        casesConnection {
            aggregate {
                count
            }
        }
    }
`;

const PaginationStyles = styled.div`
    border: 1px solid grey;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-top: 3%;
`;

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
            if(loading) return <p>Loading...</p>
            const count = data.casesConnection.aggregate.count
            const pages = Math.ceil(count / perPage)
            const page = props.page
            console.log(page)
            console.log(pages)
            return (
            <PaginationStyles>
                <Head>
                  <title>
                      Savvy! – Page {page} of {pages}
                  </title>
                </Head>
                <Link 
                    prefetch
                    href={{
                    pathname: 'cases',
                    query: { page: page - 1 }
                
                }}>
                <a aria-disabled={page <= 1}> 
                    Prev
                </a>
                </Link>
                <p>Page {props.page} of {pages}</p>
                <Link 
                    prefetch
                    href={{
                    pathname: 'cases',
                    query: { page: page + 1 }
                
                }}>
                <a className='prev' >
                    Next
                </a>
                </Link>
            </PaginationStyles>
        )}}
    </Query>
)

export default Pagination;