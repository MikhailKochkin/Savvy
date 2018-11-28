import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Case from './Case';
import Pagination from './Pagination';
import { perPage } from '../config';
import {CURRENT_USER_QUERY} from './User'


const Center = styled.div`
    text-align: center;
    
`;

const CasesStyles = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const ALL_CASES_QUERY = gql`
  query ALL_CASES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    cases(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      mainText
      image
      largeImage
      price
      user {
          id
      }
    }
  }
`;

class Cases extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page} />
                <h1>Cases</h1>
                    <Query 
                    query={ALL_CASES_QUERY} 
                    // fetchPolicy="network-only"
                    
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        // first: 4,
                    }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return <CasesStyles>
                            {data.cases.map(edCase => <Case key={edCase.id} edCase={edCase}/>)}
                            </CasesStyles>
                    }}
                   </Query>
                <Pagination page={this.props.page}/>
            </Center>
        );
    }
}

export default Cases;
export {ALL_CASES_QUERY};