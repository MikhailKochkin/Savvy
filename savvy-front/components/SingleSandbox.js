import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {heart} from 'react-icons-kit/ikons/heart'
import {ic_do_not_disturb_on} from 'react-icons-kit/md/ic_do_not_disturb_on'



const TextBox = styled.div`
  border: 1px solid #112A62;
  margin: 2%;
  padding: 2%;
  width: 90%;
  border-radius: 5px;
  font-size: 2rem;
`;


const SINGLE_SANDBOX_QUERY = gql`
  query SINGLE_SANDBOX_QUERY($id: ID!) {
    sandbox(where: { id: $id }) {
        id
        text
        user {
            id
            name
        }
    }
  }
`;

class SingleSandbox extends Component {
    render() {
      return (
        <Query
          query={SINGLE_SANDBOX_QUERY}
          variables={{
            id: this.props.id,
          }}
        >
          {({ error, loading, data }) => {
            // if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            if (!data.sandbox) return <p>No Item Found for {this.props.id}</p>;
            // console.log(data)
            const sandbox = data.sandbox;
            return (
              <TextBox>
                <p>Предложение</p>
                <div dangerouslySetInnerHTML={{ __html: sandbox.text }} ></div>
                <h4>Автор: {sandbox.user.name}</h4>
                <Icon size={20} icon={heart}/> 
                <Icon size={20} icon={ic_do_not_disturb_on}/> 
              </TextBox>
            );
          }}
        </Query>
      );
    }
  }
  
  export default SingleSandbox;
  export { SINGLE_SANDBOX_QUERY };