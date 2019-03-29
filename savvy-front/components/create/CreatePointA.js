import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import { PAGE_LESSONS_QUERY } from '../course/CoursePage';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton } from '../styles/Button';
import AreYouATeacher from '../AreYouATeacher';
import PleaseSignIn from '../PleaseSignIn';

const CREATE_POINTA_MUTATION = gql`
  mutation CREATE_POINTA_MUTATION(
    $description: String!
    $coursePageID: ID!
  ) {
    createPointA(
      description: $description
      coursePageID: $coursePageID
    ) {
      id
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
          <AreYouATeacher
              subject={this.props.id}
          >
              <DynamicLoadedEditor getEditorText={this.myCallback}/>
            <Width>
              <Mutation 
                mutation={CREATE_POINTA_MUTATION} 
                variables={{
                      coursePageID: id,
                      ...this.state
                }}
                // refetchQueries={() => [{
                //   query: PAGE_LESSONS_QUERY,
                //   variables: { id},
                // }]}
              >
                {(createPointA, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createPointA();
                      // change the page to the single case page
                      Router.push({
                        pathname: '/coursePage',
                        query: {id: id}
                      })
                    }}
                  >
                  Отправить
                  </SubmitButton>
                )}
              </Mutation>
            </Width>
          </AreYouATeacher>
        </PleaseSignIn>
        )
    }
}
