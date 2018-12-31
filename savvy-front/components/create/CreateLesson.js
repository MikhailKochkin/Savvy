import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PAGE_LESSONS_QUERY } from '../course/CoursePage';
import { NavButton, SubmitButton } from '../styles/Button';

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $text: String!
    $video: String
    $coursePageID: ID!
  ) {
    createLesson(
      text: $text 
      video: $video
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const ButtonDiv = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${SubmitButton} {
    width: 10%;
    
  }
`;

const DynamicLoadedEditor = dynamic(
  import('../editor/Editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

export default class CreateLesson extends Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '',
        video: ''
      };
      this.handleChange = e => {
        const { name, type, value } = e.target;
        this.setState({[name]: value});
      };

    }

    myCallback = (dataFromChild) => {
      this.setState({ 
        text: dataFromChild
      });
    }
  
    render() {
        const {id} = this.props
        return (
            <>
              <Link href={{
                  pathname: '/coursePage',
                  query: { id }
                }}>
                <a>
                    <NavButton>Вернуться на страницу курса!</NavButton>
                </a>
              </Link>
              <DynamicLoadedEditor getEditorText={this.myCallback}/>
              <Mutation 
                mutation={CREATE_LESSON_MUTATION} 
                variables={{
                  coursePageID: id,
                  ...this.state
                }}
                refetchQueries={() =>[{  
                  query: PAGE_LESSONS_QUERY,
                  variables: { id},
              }]}
              >
              {(createLesson, {loading, error}) => (
              <ButtonDiv>
                <SubmitButton onClick={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createLesson();
                    // change the page to the single case page
              
                    Router.push({
                      pathname: '/coursePage',
                      query: {id: id}
                    })
                  }}
                >
                  Создать
                </SubmitButton>
              </ButtonDiv>
                )}
              </Mutation>
            </>
        )
    }
}
