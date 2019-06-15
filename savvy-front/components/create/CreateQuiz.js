import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { NavButton, SubmitButton, Message } from '../styles/Button';
import AreYouATeacher from '../auth/AreYouATeacher';
import PleaseSignIn from '../auth/PleaseSignIn';

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lang: String!
    $lessonID: ID!
  ) {
    createQuiz(
      question: $question 
      answer: $answer
      lang: $lang
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const Form = styled.form`
    font-size: 1.8rem;
    fieldset {
        border:none;
        textarea {
            font-size: 1.8rem;
        }
    }
`;

const Answers = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 3%;
`;

const CustomSelect = styled.div`

`;

const AnswerOption = styled.div`
    display: flex;
    flex-direction: column;
    select {
        width: 30%;
        font-size: 1.4rem;
        margin-top: 5%;
        margin: 3%;
    }
    ${CustomSelect} {
        width: 30%;
        border-radius: 3px;
    }
    ${CustomSelect} select {
        width: 100%;
        border: none;
        box-shadow: none;
        background: #0878C6;
        color: white;
    }
    ${CustomSelect} select:focus {
        outline: none;
    }
`;

class CreateQuiz extends Component {
    state = {
        question: '',
        answer: '',
        lang: 'Russian',
      };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    render() {
        const {id} = this.props
        return (
            <PleaseSignIn>
                <AreYouATeacher
                    subject={this.props.id}
                >
                {/* <Link href={{
                        pathname: '/coursePage',
                        query: { id }
                    }}>
                    <a>
                        <NavButton>На страницу курса</NavButton>
                    </a>
                </Link> */}
                <Mutation 
                    mutation={CREATE_QUIZ_MUTATION} 
                    variables={{
                        lessonID: id,
                        ...this.state
                    }}
                    // refetchQueries={() =>[{  
                    //     query: PAGE_TESTS_QUERY,
                    //     variables: { id}
                    // }]}
                >

                {(createQuiz, {loading, error}) => (
                    <Form
                        onSubmit={ async e => {
                            e.preventDefault();
                            document.getElementById("Message").style.display ='block'
                            setTimeout(function(){
                                document.getElementById("Message") ? document.getElementById("Message").style.display ='none' : 'none'
                                }, 4000);
                            const res = await createQuiz();
                        }}
                    >   
                            <p>Создайте новый вопрос. Введите сам вопрос и ответ на него. Все очень просто.</p>  
                            <fieldset>          
                    
                            <Answers>
                                <label htmlFor="question">
                                Вопрос
                                  <AnswerOption>
                                    <CustomSelect>
                                    <textarea
                                        cols={40}
                                        rows={4}
                                        id="question"
                                        name="question"
                                        placeholder="Вопрос..."
                                        required
                                        value={this.state.question}
                                        onChange={this.handleChange}
                                    />
                                        <select name="language" value={this.state.language} onChange={this.handleChange}>
                                            <option value="true">Русский</option>
                                            <option value="false">Английский</option>
                                        </select>
                                    </CustomSelect>
                                  </AnswerOption>
                                </label>
                               
                                <label htmlFor="answer">
                                Ответ
                              
                                <AnswerOption>
                                    <CustomSelect>
                                        <textarea
                                            cols={40}
                                            rows={4}
                                            spellCheck={true}
                                            id="answer"
                                            name="answer"
                                            placeholder="Ответ..."
                                            required
                                            value={this.state.answer}
                                            onChange={this.handleChange}
                                        />
                                    </CustomSelect>
                                  </AnswerOption>
                                </label>
                               
                            </Answers>
                            <SubmitButton type="submit">
                                Создать
                            </SubmitButton>
                            <Message id="Message">Вы создали новый вопрос!</Message> 
                        </fieldset>
                    </Form>
                )}
                </Mutation>
            </AreYouATeacher>
          </PleaseSignIn>
        )
    }
}

export default CreateQuiz;
