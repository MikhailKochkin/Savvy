import React, { Component } from 'react';
import gql from 'graphql-tag';
import  { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {heart} from 'react-icons-kit/ikons/heart'
import moment from 'moment';
import DeleteSingleSandbox from '../DeleteSingleSandbox';
import { NavButton } from '../styles/Button';

const ProposalBox = styled.div`
  margin: 2%;
  padding: 2%;
  width: 90%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: left;
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
  button {
    border: none;
  }
`;

const TextBar = styled.div`
  width: 800px;
  font-size: 1.8rem;
  border: 1px solid #112A62;
  padding: 0 2%;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
    
  }
`;

const ButtonBox = styled.div`
  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    margin-top: -5%;
  }
`;

const Date = styled.h4`
  color: #A8A8A8;
`;

const Like = styled.div`
  color: #DC143C;
  &:hover {
    color: #A52A2A;
  }
`;

const Iframe = styled.iframe`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background: none;
`;

const SINGLE_SANDBOX_QUERY = gql`
  query SINGLE_SANDBOX_QUERY($id: ID!) {
    sandbox(where: { id: $id }) {
        id
        text
        link
        video
        createdAt
        likes
        user {
            id
            name
        }
    }
  }
`;

const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION(
    $likes: Int
    $id: ID!,
    ) {
    likePost(
      id: $id,
      likes: $likes 
    ) {
      id
    }
  }
`;

const ADD_TO_FAVOURITES_MUTATION = gql`
  mutation ADD_TO_FAVOURITES_MUTATION(
    $favourites: [ID]
    $id: ID!,
    ) {
      addToFavourites(
      id: $id,
      favourites: $favourites 
    ) {
      id
    }
  }
`;

const DELETE_SANDBOX_MUTATION =gql`
    mutation DELETE_SANDBOX_MUTATION($id: ID!){
        deleteSandbox(id: $id) {
          id
          likes
          # user {
          #     id
          # }
        }
    }
`

class SingleSandbox extends Component {
    state = { 
      likes: this.props.sandboxLikes,
      favourites: [...this.props.userFavourites]
    }
    like = async (e, likePost, addToFavourites) => {
      e.preventDefault();
      // console.log(this.props.userFavourites.includes(this.props.id))
      this.state.favourites.includes(this.props.id) ? 
      (
        this.setState(prevState => ({
          likes: prevState.likes - 1,
          favourites: prevState.favourites.filter(id => id !== this.props.id)
        }), () => {
          likePost({
            variables: {
                id: this.props.id,
                ...this.state,
              }
            })
          })
      )
      :
      (
        this.setState( prevState => ({
          likes: prevState.likes + 1,
          favourites: [...prevState.favourites, this.props.id]
        }), () => {
        likePost({
          variables: {
              id: this.props.id,
              ...this.state,
            }
          })
        addToFavourites({
          variables: {
              id: this.props.userId,
              ...this.state,
            }
          })
        }, 
      )
    )
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

              return (
                <ProposalBox>
                  <TextBar>
                    <div dangerouslySetInnerHTML={{ __html: sandbox.text }}></div>
                    {sandbox.video ?
                      <Iframe width="620" height="400" src={sandbox.video} allowFullScreen>
                      </Iframe>
                    :
                    null } 
                    {sandbox.link &&
                    <>
                      <h4>Перейти к материалу для более подробного обзора</h4>
                      <NavButton type="submit">
                        <a target="_blank" href={sandbox.link}>
                          Перейти
                        </a>
                      </NavButton>
                    </>
                    }
                  </TextBar>
                  <SideBar>
                    {/* <h2>Место для фотографии</h2> */}
                    <h4>{sandbox.user.name}</h4>
                    {/* <h4>{me && me.favourites}</h4> */}
                    <Date>{moment(sandbox.createdAt).format('D MMM YYYY')}</Date>
                    <ButtonBox>
                      <p>{this.state.likes}</p>
                      <Mutation 
                        mutation={LIKE_MUTATION}>
                          {(likePost) => (
                            <Mutation 
                            mutation={ADD_TO_FAVOURITES_MUTATION}>
                              {(addToFavourites) => (
                                <Button onClick={e => this.like(e, 
                                likePost, addToFavourites)}>
                                  <Like id="like">
                                    <Icon size={20} icon={heart}/> 
                                  </Like>
                                </Button>
                            )}
                          </Mutation>
                        )}
                      </Mutation>
                      <DeleteSingleSandbox 
                        id={this.props.id}
                        sandboxPageId={this.props.sandboxPageId}
                      />
                    </ButtonBox>
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