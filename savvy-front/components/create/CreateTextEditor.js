import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { SubmitButton } from '../styles/Button';
import AreYouATeacher from '../auth/AreYouATeacher';
import PleaseSignIn from '../auth/PleaseSignIn';

const CREATE_TEXTEDITOR_MUTATION = gql`
  mutation CREATE_TEXTEDITOR_MUTATION(
    $name: String!
    $text: String!
    $totalMistakes: Int
    $lessonID: ID!
  ) {
    createTextEditor(
      name: $name
      text: $text
      totalMistakes: $totalMistakes 
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const Width = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const DynamicLoadedEditor = dynamic(
  import('../editor/TextEditor'),
  {
    loading: () => (<p>Загрузка...</p>),
    ssr: false
  }
)

export default class CreateTextEditor extends Component {
    state = {
        name: "Test",
        text: '',
    }

    myCallback = (dataFromChild) => {
      this.setState({ 
        text: dataFromChild
      });
    }
    handleChange = e => {
      const { name, value } = e.target;
      this.setState({[name]: value})
    };
  
    render() {
        const {id} = this.props
        return (
        <PleaseSignIn>
          <AreYouATeacher
              subject={this.props.id}
          >
            <Width>
              <h2>Составьте свой редактор документа</h2>
              <DynamicLoadedEditor getEditorText={this.myCallback}/>
           
              <Mutation 
                mutation={CREATE_TEXTEDITOR_MUTATION} 
                variables={{
                    lessonID: id,
                    ...this.state
                }}
      
              >
                {(createTextEditor, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createTextEditor();
                      Router.push({
                        pathname: '/lesson',
                        query: {id: id}
                      })
                    }}
                  >
                  Отправить на страницу курса
                  </SubmitButton>
                )}
              </Mutation>
            </Width>
          </AreYouATeacher>
        </PleaseSignIn>
        )
    }
}
