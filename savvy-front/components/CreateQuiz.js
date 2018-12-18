import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';


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
    createTest(
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

const Message = styled.p`
    background-color: #90EE90;
    font-size: 1.8rem;
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
            <>
                <Link href={{
                        pathname: '/coursePage',
                        query: { id }
                    }}>
                    <a>
                        <button>Вернуться на страницу курса!</button>
                    </a>
                </Link>
                <Mutation mutation={CREATE_TEST_MUTATION} 
                variables={{
                        coursePageID: id,
                        ...this.state
                }}>
                {(createTest, {loading, error}) => (
                    <form
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
                            
                            console.log(arr)
                            document.getElementById("Message").textContent ='Вы создали новый тестовый вопрос!';
                            setTimeout(function(){
                                document.getElementById("Message").textContent ='';
                                }, 3000);
                            const res = await createTest();
                            // console.log(paragraph);
                            // paragraph.textContent = "Вы создали новый тестовый вопрос!"
                            // Router.push({
                            //     pathname: '/item',
                            //     query: { id: '/testVar' },
                            //   });
                        }
                    }}
                    >
                        <fieldset>
                            <p>Создайте новый тестовый вопрос. Введите сам вопрос, 
                            4 варианта ответа, из которых только один 
                            должен быть правильным.</p> 
                            <Message id="Message"></Message>            
                            <label htmlFor="question">
                            Вопрос
                            <br/>
                            <input
                                type="text"
                                id="question"
                                name="question"
                                placeholder="Вопрос..."
                                required
                                value={this.state.question}
                                onChange={this.handleChange}
                            />
                            </label>
                            <br/>
                            <label htmlFor="answer">
                            Вариант ответа 1
                            <br/>
                            <input
                                type="text"
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
                            </label>
                            <br/>
                            <label htmlFor="answer2">
                            Вариант ответа 2
                            <br/>
                            <input
                                type="text"
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
                            </label>
                            <br/>
                            <label htmlFor="answer2">
                            Вариант ответа 3
                            <br/>
                            <input
                                type="text"
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
                            </label>
                            <br/>
                            <label htmlFor="answer2">
                            Вариант ответа 4
                            <br/>
                            <input
                                type="text"
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
                            </label>
                            <br/>
                            <button type="submit">Создать</button>
                        </fieldset>
                    </form>
                )}
                </Mutation>
            </>
        )
    }
}

export default CreateQuiz;
