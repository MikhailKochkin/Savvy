import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SINGLE_CASE_QUERY = gql`
  query SINGLE_CASE_QUERY($id: ID!) {
    case(where: { id: $id }) {
        id
        title
        description
        mainText
        issue 
        rule
        analysis
        conclusion
    }
  }
`;

class SingleCase extends Component {
    render() {
      return (
        <Query
          query={SINGLE_CASE_QUERY}
          variables={{
            id: this.props.id,
          }}
        >
          {({ error, loading, data }) => {
            // if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            if (!data.case) return <p>No Item Found for {this.props.id}</p>;
            const eDcase = data.case;
            return (
              <>
                <h1>{eDcase.title}</h1>
                <h2>{eDcase.description}</h2>
                <p>{eDcase.mainText}</p>
                <p>{eDcase.issue}</p>
                <p>{eDcase.rule}</p>
                <p>{eDcase.analysis}</p>
                <p>{eDcase.conclusion}</p>
              </>
            );
          }}
        </Query>
      );
    }
  }
  
  export default SingleCase;
  export { SINGLE_CASE_QUERY };