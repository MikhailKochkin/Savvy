import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Case from './Case';
import Pagination from './Pagination';
import { perPage } from '../config';
import {CURRENT_USER_QUERY} from './User';


const Center = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;

const CasesStyles = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const ALL_COURSE_PAGES_QUERY = gql`
  query ALL_COURSE_PAGES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    coursePages(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
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
                <h1>Курсы</h1>
                
                    <Query 
                    query={ALL_COURSE_PAGES_QUERY} 
                    // fetchPolicy="cache-and-network"
                    
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        // first: 4,
                    }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return <CasesStyles>
                            {data.coursePages.map(coursePage => <Case key={coursePage.id} coursePage={coursePage}/>)}
                            </CasesStyles>  
                    }}
                   </Query>
                <Pagination page={this.props.page}/>
            </Center>
        );
    }
}

export default Cases;
export {ALL_COURSE_PAGES_QUERY};