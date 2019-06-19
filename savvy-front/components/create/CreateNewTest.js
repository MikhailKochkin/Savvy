import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
// import { PAGE_TESTS_QUERY } from '../course/CoursePage';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton, Message } from '../styles/Button';
import AreYouATeacher from '../auth/AreYouATeacher';
import PleaseSignIn from '../auth/PleaseSignIn';

const CREATE_NEWTEST_MUTATION = gql`
  mutation CREATE_NEWTEST_MUTATION(
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $lessonID: ID!
  ) {
    createNewTest(
      question: $question 
      answers: $answers
      correct: $correct
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const Form = styled.form`
    font-size: 1.8rem;
    background: white;
    padding: 4%;
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

const CustomSelect1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 29%;
    @media (max-width: 800px) {
        width: 65%;
  }
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

class CreateNewTest extends Component {
    state = {
        question: '',
        questions: '',
        answers: '',
        correct: '',
        answer1: '',
        answer1Correct: false,
        answer2: '',
        answer2Correct: false,
        answer3: '',
        answer3Correct: false,
        answer4: '',
        answer4Correct: false,
        answer5: '',
        answer5Correct: false,
        answer6: '',
        answer6Correct: false,
        answerNumber: 2,
      };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
      }

    handleBooleanChange = e => {
        let val
        e.preventDefault();
        const { name, value } = e.target;
        if(value === "true") { val = true } else { val = false }
        this.setState({[name]: val});
    }

    handleSteps = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const val = parseInt(value)
        this.setState({[name]: val});
    };
    onGenerate = (e) => {
            e.preventDefault();

            const arrAnswers = [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5, this.state.answer6]
            const arrCorrect = [this.state.answer1Correct, this.state.answer2Correct, this.state.answer3Correct, this.state.answer4Correct, this.state.answer5Correct, this.state.answer6Correct]
            const arrAnswers2 = []; 
            const arrCorrect2 = [];
            const arrQuestion  = [];
            arrQuestion.push(this.state.question);
            arrAnswers.map(item => item !== "" ? arrAnswers2.push(item) : null);
            for(var i = 0; i < arrAnswers2.length; i++){arrCorrect2.push(arrCorrect[i])};

            this.setState({answers: arrAnswers2 , correct: arrCorrect2, questions: arrQuestion })
            this.setState({
                question: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: '',
                answer6: '',
                answer1Correct: false,
                answer2Correct: false,
                answer3Correct: false,
                answer4Correct: false,
                answer5Correct: false,
                answer6Correct: false
            });

        }
    onSave = async (e, createNewTest) => {
        e.preventDefault();
        console.log(this.state.correct)
        if (!this.state.correct.includes(true)) {
            alert("Должен быть хотя бы один правильный ответ!")
        } else {
        document.getElementById("Message").style.display ='block'
        setTimeout(function(){
            document.getElementById("Message") ? document.getElementById("Message").style.display ='none' : 'none'
        }, 4000);

        const res = await createNewTest();
      }
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
                    mutation={CREATE_NEWTEST_MUTATION} 
                    variables={{
                        lessonID: id,
                        question: this.state.questions,
                        answers: this.state.answers,
                        correct: this.state.correct,
                    }}
                    // refetchQueries={() =>[{  
                    //     query: PAGE_TESTS_QUERY,
                    //     variables: { id}
                    // }]}
                >

                {(createNewTest, {loading, error}) => (
                    <Form
                        onSubmit={ async e => {
                            e.preventDefault();
                            const res1 = await this.onGenerate(e);
                            const res2 = await this.onSave(e, createNewTest);
                        }}
                    >   
                            <p>Создайте новый тестовый вопрос. Введите сам вопрос, 
                                2-6 вариантов ответа. Количество правильных ответов может быть любым.</p>  
                            <CustomSelect1>
                                Количество вариантов ответа:
                                <span></span>
                                <select name="answerNumber" value={this.state.answerNumber} onChange={this.handleSteps}>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </CustomSelect1>
                            <fieldset>          
                            <label htmlFor="question">
                            Вопрос
                            <br/>
                            <textarea
                                id="question"
                                name="question"
                                cols={40}
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
                                <label htmlFor="answer1">
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
                                        <select name="answer1Correct" value={this.state.answer1Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
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
                                        <select name="answer2Correct" value={this.state.answer2Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
                                        </select>
                                    </CustomSelect>
                                </AnswerOption>
                                </label>
                                
                                {this.state.answerNumber > 2 &&
                                <label htmlFor="answer3">
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
                                        <select name="answer3Correct" value={this.state.answer3Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
                                        </select>
                                    </CustomSelect>
                                </AnswerOption>
                                </label>}
                                {this.state.answerNumber > 3 &&
                                <label htmlFor="answer4">
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
                                            <select name="answer4Correct" value={this.state.answer4Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                        </CustomSelect>
                                    </AnswerOption>
                                </label>}
                                {this.state.answerNumber > 4 &&
                                <label htmlFor="answer5">
                                Вариант ответа 5
                                    <AnswerOption>
                                        <CustomSelect>
                                            <textarea
                                                cols={40}
                                                rows={4}
                                                spellCheck={true}
                                                id="answer5"
                                                name="answer5"
                                                placeholder="Ответ..."
                                                value={this.state.answer5}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer5Correct" value={this.state.answer5Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                        </CustomSelect>
                                    </AnswerOption>
                                </label>}
                                {this.state.answerNumber > 5 &&
                                <label htmlFor="answer6">
                                Вариант ответа 6
                                    <AnswerOption>
                                        <CustomSelect>
                                            <textarea
                                                cols={40}
                                                rows={4}
                                                spellCheck={true}
                                                id="answer6"
                                                name="answer6"
                                                placeholder="Ответ..."
                                                value={this.state.answer6}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer6Correct" value={this.state.answer6Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                        </CustomSelect>
                                    </AnswerOption>
                                </label>}
                            </Answers>
                            <SubmitButton type="submit">
                                Создать
                            </SubmitButton>
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

export default CreateNewTest;
