import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton } from '../styles/Button';
import AreYouATeacher from '../AreYouATeacher';
import PleaseSignIn from '../PleaseSignIn';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const Textarea = styled.textarea`
    font-size: 1.6rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    line-height: 2.5rem;
    padding: 10px;
    @media (max-width: 800px) {
        width: 400px;
    }
`;

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
              <p>Составление документа происходит по определенным правилам. Если они вам не знакомы, 
                обратитесь к администратору сайта <a href="https://vk.com/id4417564" target="_blank">Михаилу Кочкину</a></p>
              <label htmlFor="text">
                        <Textarea
                            id="text"
                            name="text"
                            placeholder="Текст документа..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            required
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </label>
              <Mutation 
                mutation={CREATE_TEXTEDITOR_MUTATION} 
                variables={{
                    lessonID: id,
                    ...this.state
                }}
                // refetchQueries={() => [{
                //   query: PAGE_LESSONS_QUERY,
                //   variables: { id},
                // }]}
              >
                {(createTextEditor, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createTextEditor();
                      console.log("Вроде бы получилось");
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
