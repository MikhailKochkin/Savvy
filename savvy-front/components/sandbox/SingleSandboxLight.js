import React, { Component } from 'react';
import gql from 'graphql-tag';
import  { Mutation, Query, withApollo } from 'react-apollo';
import styled, { consolidateStreamedStyles } from 'styled-components';
import Icon from 'react-icons-kit';
import {heart} from 'react-icons-kit/ikons/heart'
import {ic_do_not_disturb_on} from 'react-icons-kit/md/ic_do_not_disturb_on'
import {ic_remove_circle_outline} from 'react-icons-kit/md/ic_remove_circle_outline'
import moment from 'moment';
import debounce from 'lodash.debounce';


const ProposalBox = styled.div`
  margin: 2%;
  padding: 2%;
  width: 90%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SideBar = styled.div`
  margin-left: 2%;
  .like {
    color: red;
  }
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
  Like:hover {
    color: red;
  }
`;

const TextBar = styled.div`
  width: 800px;
  font-size: 1.8rem;
  border: 1px solid #112A62;
  padding: 0 2%;
  border-radius: 5px;
`;

const Date = styled.h4`
  color: #A8A8A8;
`;

const Like = styled.div`
  color: grey;
`;

const SINGLE_SANDBOX_QUERY = gql`
  query SINGLE_SANDBOX_QUERY($id: ID!) {
    sandbox(where: { id: $id }) {
        id
        text
        createdAt
        likes
        user {
            id
            name
        }
    }
  }
`;

class SingleSandbox extends Component {
    state = { 
      likes: this.props.sandboxLikes,
  }
    render() {
      moment.locale('ru');
      return (
          <Query
            query={SINGLE_SANDBOX_QUERY}
            variables={{
              id: this.props.id,
            }}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              if (!data.sandbox) return <p>No Item Found for {this.props.id}</p>;
              moment.locale('ru');
              const sandbox = data.sandbox;
              console.log(sandbox)
              return (
                <ProposalBox>
                  <TextBar>
                    <p>Предложение</p>
                    <div dangerouslySetInnerHTML={{ __html: sandbox.text }}></div>
                  </TextBar>
                  <SideBar>
                    <h2>Место для фотографии</h2>
                    <h4>{sandbox.user.name}</h4>
                    <Date>{moment(sandbox.createdAt).format('D MMM YYYY')}</Date>
                    <Like id="like">
                        <Icon size={20} icon={heart}/> 
                    </Like>
                    <h2>DB: {sandbox.likes} </h2>
                    <h2>STATE: {this.state.likes}</h2>
                    <Like id="dislike">
                      <Icon size={20} icon={ic_remove_circle_outline}/> 
                    </Like>
                  </SideBar>
                </ProposalBox>
              );
            }}
          </Query>
      );
    }
  }
  
  export default SingleSandbox;
  export { SINGLE_SANDBOX_QUERY };