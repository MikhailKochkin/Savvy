import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
// import { PAGE_TESTS_QUERY } from '../course/CoursePage';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton, Message } from '../styles/Button';
import AreYouATeacher from '../AreYouATeacher';
import PleaseSignIn from '../PleaseSignIn';

const CREATE_TEST_MUTATION = gql`
  mutation CREATE_TEST_MUTATION(
    $question: String!
    $answer1: String!
    $answer1Correct: String!
    $answer2: String!
    $answer2Correct: String!
    $answer3: String
    $answer3Correct: String 
    $answer4: String
    $answer4Correct: String
    $coursePageID: ID!
  ) {
    createPointATest(
      question: $question 
      answer1: $answer1
      answer1Correct: $answer1Correct
      answer2: $answer2 
      answer2Correct: $answer2Correct
      answer3: $answer3
      answer3Correct: $answer3Correct
      answer4: $answer4 
      answer4Correct: $answer4Correct
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

// const PAGE_TESTS_QUERY = gql`
//   query PAGE_TESTS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
//     tests(where: {lessonID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
//       id
//       user {
//           id
//       }
//     }
//   }
// `;

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
        answer1: '',
        answer1Correct: 'false',
        answer2: '',
        answer2Correct: 'false',
        answer3: '',
        answer3Correct: 'false',
        answer4: '',
        answer4Correct: 'false',
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
                    mutation={CREATE_TEST_MUTATION} 
                    variables={{
                        coursePageID: id,
                        ...this.state
                    }}
                //     refetchQueries={() =>[{  
                //         query: PAGE_TESTS_QUERY,
                //         variables: { id}
                // }]}
                >

                {(createPointATest, {loading, error}) => (
                    <Form
                    onSubmit={ async e => {
                        e.preventDefault();
                        const arrTest = [this.state.answer1Correct, this.state.answer2Correct, this.state.answer3Correct, this.state.answer4Correct]
                        const arrTest2 = []
                        for (let o of arrTest) {
                            o === 'true' ? arrTest2.push(o) : null
                        }
                        if(arrTest2.length > 1) {
                            alert("There should be only one true answer")
                        } else if(arrTest2.length === 0) {
                            alert("There should be at least one true answer")
                        } else {
                        const arr = [];
                        arr.push(
                            {
                                question: this.state.question,
                                answers: [
                                    {
                                        type: this.state.answer1Correct,
                                        content: this.state.answer1
                                    },
                                    {
                                        type: this.state.answer2Correct,
                                        content: this.state.answer2
                                    },
                                    {
                                        type: this.state.answer3Correct,
                                        content: this.state.answer3
                                    },
                                    {
                                        type: this.state.answer4Correct,
                                        content: this.state.answer4
                                    }
                                ]
                            }
                            )
                            const { name } = e.target;
                            this.setState({
                                question: '',
                                answer1: '',
                                answer2: '',
                                answer3: '',
                                answer4: '',
                            });

                            // document.getElementById("Message").textContent ='Вы создали новый тестовый вопрос!';
                            document.getElementById("Message").style.display ='block'
                            setTimeout(function(){
                                document.getElementById("Message") ? document.getElementById("Message").style.display ='none' : 'none'
                                }, 4000);
                            
                            const res = await createPointATest();
                        }
                    }}
                    >   
                            <p>Создайте новый тестовый вопрос для проверки начального уровня участника курса. Введите сам вопрос, 
                                2-4 варианта ответа, из которых только один 
                                должен быть правильным.</p>  
                            <fieldset>          
                            <label htmlFor="question">
                            Вопрос
                            <br/>
                            <textarea
                                id="question"
                                name="question"
                                cols={60}
                                rows={4}
                                spellCheck={true}
                                placeholder="Вопрос..."
                                autoFocus
                                required
                                value={this.state.question}
                                onChange={this.handleChange}
                            />
                            </label>
                            <Answers>
                                <label htmlFor="answer">
                                Вариант ответа 1
                                  <AnswerOption>
                                    <CustomSelect>
                                    <textarea
                                        cols={40}
                                        rows={4}
                                        id="answer1"
                                        name="answer1"
                                        placeholder="Ответ..."
                                        required
                                        value={this.state.answer1}
                                        onChange={this.handleChange}
                                    />
                                        <select name="answer1Correct" value={this.state.answer1Correct} onChange={this.handleChange}>
                                            <option value="true">Правильно</option>
                                            <option value="false">Ошибочно</option>
                                        </select>
                                    </CustomSelect>
                                  </AnswerOption>
                                </label>
                               
                                <label htmlFor="answer2">
                                Вариант ответа 2
                              
                                <AnswerOption>
                                    <CustomSelect>
                                        <textarea
                                            cols={40}
                                            rows={4}
                                            spellCheck={true}
                                            id="answer2"
                                            name="answer2"
                                            placeholder="Ответ..."
                                            required
                                            value={this.state.answer2}
                                            onChange={this.handleChange}
                                        />
                                        <select name="answer2Correct" value={this.state.answer2Correct} onChange={this.handleChange}>
                                            <option value="true">Правильно</option>
                                            <option value="false">Ошибочно</option>
                                        </select>
                                    </CustomSelect>
                                </AnswerOption>
                                </label>
                                <label htmlFor="answer2">
                                Вариант ответа 3
                             
                                <AnswerOption>
                                    <CustomSelect>
                                        <textarea
                                            cols={40}
                                            rows={4}
                                            spellCheck={true}
                                            id="answer3"
                                            name="answer3"
                                            placeholder="Ответ..."
                                            value={this.state.answer3}
                                            onChange={this.handleChange}
                                        />
                                        <select name="answer3Correct" value={this.state.answer3Correct} onChange={this.handleChange}>
                                            <option value="true">Правильно</option>
                                            <option value="false">Ошибочно</option>
                                        </select>
                                    </CustomSelect>
                                </AnswerOption>
                                </label>
                                
                                <label htmlFor="answer2">
                                Вариант ответа 4
                                    <AnswerOption>
                                        <CustomSelect>
                                            <textarea
                                                cols={40}
                                                rows={4}
                                                spellCheck={true}
                                                id="answer4"
                                                name="answer4"
                                                placeholder="Ответ..."
                                                value={this.state.answer4}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer4Correct" value={this.state.answer4Correct} onChange={this.handleChange}>
                                                <option value="true">Правильно</option>
                                                <option value="false">Ошибочно</option>
                                            </select>
                                        </CustomSelect>
                                    </AnswerOption>
                                </label>
                            </Answers>
                            <SubmitButton type="submit">Создать</SubmitButton>
                            <Message id="Message">Вы создали новый тестовый вопрос!</Message> 
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
