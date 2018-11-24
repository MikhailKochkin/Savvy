import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Case from './Case';

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
  query ALL_CASES_QUERY {
    cases {
      id
      title
      description
      mainText
      image
      largeImage
      price 
    }
  }
`;

class Cases extends Component {
    render() {
        return (
            <Center>
                <h1>Cases</h1>
                
                    <Query query={ALL_CASES_QUERY}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return <CasesStyles>
                            {data.cases.map(edCase => <Case key={edCase.id} edCase={edCase}/>)}
                            </CasesStyles>
                    }}
                   </Query>
            </Center>
        );
    }
}

export default Cases;

                    {/* // return <ItemsList>
                    // {data.items.map(item => <Item item={item} key={item.id}/>)}
                    // </ItemsList> */}