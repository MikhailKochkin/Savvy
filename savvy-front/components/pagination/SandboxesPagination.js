import React from 'react';
import styled from 'styled-components';
import  gql  from "graphql-tag";
import ReactLoading from 'react-loading';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { SandboxPerPage } from '../../config';

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
    width: 25%;
    background-color: #13214D;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    font-weight: bold;
    margin-top: 3%;
    a {
        margin: 4%;
    }
    @media (max-width: 1000px) {
        a {
            margin: 4%;
        }
        
    }
    @media (max-width: 600px) {
        width: 80%;
        font-size: 1.4rem;
        a {
            margin: 5%;
        }
        margin-top: 6%;
    }
`;

const A = styled.a`
     pointer-events: ${props => props.disabled ? "none" : null};
     padding: 1% 2%;
     border-radius: 5px;
     &:hover {
         background: #E8E8E8;
     }
     cursor: pointer;
`;

const Pagination = props => (
    <Query query={SANDBOXES_PAGINATION_QUERY}>
        {({ data, loading, error }) => {
            if(loading) return "Загрузка..."
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
                                ◀️
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
                           ▶️
                        </A>
                        </Link>
                </PaginationStyles>
        )}}
    </Query>
)

export default Pagination;