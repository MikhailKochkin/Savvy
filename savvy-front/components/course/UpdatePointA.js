import React, {Component} from 'react';
import  { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { SubmitButton } from '../styles/Button';
import PleaseSignIn from '../auth/PleaseSignIn';

const SINGLE_POINTA_QUERY = gql`
  query SINGLE_POINTA_QUERY($id: ID!) {
    pointA(where: { id: $id }) {
      id
      description
    }
  }
`;

const UPDATE_POINTA_MUTATION = gql`
  mutation UPDATE_POINTA_MUTATION($id: ID!, $description: String) {
    updatePointA(id: $id, description: $description) {
      id
      description
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const DynamicLoadedEditor = dynamic(
  import('../editor/Editor'),
  {
    loading: () => (<p>Загрузка...</p>),
    ssr: false
  }
)

export default class CreateLesson extends Component {
    constructor(props) {
      super(props)
      this.state = {
        description: '',
      };
    }
    myCallback = (dataFromChild) => {
      this.setState({ 
        description: dataFromChild
      });
    }
    render() {
        const {id} = this.props
        return (
        <PleaseSignIn>
            <Query
                query={SINGLE_POINTA_QUERY}
                variables={{
                    id: this.props.id,
            }}
            >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.pointA) return <p>No Point A Found for ID {this.props.id}</p>;
              return (
            <>
            <DynamicLoadedEditor 
              getEditorText={this.myCallback}
              previousText={data.pointA.description}
            />
            <Width>
              <Mutation 
                mutation={UPDATE_POINTA_MUTATION} 
                variables={{
                      id: id,
                      ...this.state
                }}
              >
                {(updatePointA, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await updatePointA();
                      // change the page to the single case page
                      Router.push({
                        pathname: '/pointA',
                        query: {id: data.pointA.id}
                      })
                      console.log("Success")
                    }}
                  >
                  Отправить
                  </SubmitButton>
                )}
                </Mutation>
              </Width>
              </>
            )}}
            </Query>
        </PleaseSignIn>
        )
    }
}
