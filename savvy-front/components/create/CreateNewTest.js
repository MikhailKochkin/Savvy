import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Message } from '../styles/Button';
import { SINGLE_LESSON_QUERY } from '../lesson/SingleLesson'

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

const Button = styled.button`
    background: #84BC9C;
    cursor: pointer;
    padding: 1% 2%;
    width: 125px;
    border-radius: 5px;
    font-size: 1.6rem;
    color: white;
`;

const TestCreate = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1% 2%;
`;

const Form = styled.form`
    font-size: 1.6rem;
    background: white;
    fieldset {
        border:none;
        textarea {
            font-size: 1.8rem;
        }
    }
`;

const Answers = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: space-between;
    flex-wrap: wrap; */
    margin-bottom: 3%;
`;

const CustomSelect1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
    @media (max-width: 800px) {
        width: 65%;
    }
    select {
        border: 1px solid #C4C4C4;
        background: none;
        width: 40px;
        font-size: 1.6rem;
    }
`;


const AnswerOption = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2% 0;
    textarea {
        border-radius: 5px;
        border: 1px solid #C4C4C4;
        width: 80%;
        height: 100px;
        padding: 1.5%;
        font-size: 1.4rem;
        outline: 0;
    }
    select {
    width: 20%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 0.5% 1% ;
    /* padding: 0.6em 1.4em 0.5em 0.8em; */
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 2%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
`

const Question = styled.div`
    margin-top: 3%;
    textarea {
        border-radius: 5px;
        border: 1px solid #C4C4C4;
        width: 80%;
        height: 100px;
        padding: 1.5%;
        font-size: 1.4rem;
        outline:0;
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
        answer7: '',
        answer7Correct: false,
        answer8: '',
        answer8Correct: false,
        answer9: '',
        answer9Correct: false,
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

            const arrAnswers = [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5, this.state.answer6, this.state.answer7, this.state.answer8, this.state.answer9]
            const arrCorrect = [this.state.answer1Correct, this.state.answer2Correct, this.state.answer3Correct, this.state.answer4Correct, this.state.answer5Correct, this.state.answer6Correct, this.state.answer7Correct, this.state.answer8Correct, this.state.answer9Correct]
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
                answer7: '',
                answer8: '',
                answer9: '',
                answer1Correct: false,
                answer2Correct: false,
                answer3Correct: false,
                answer4Correct: false,
                answer5Correct: false,
                answer6Correct: false,
                answer7Correct: false,
                answer8Correct: false,
                answer9Correct: false
            });

        }
    onSave = async (e, createNewTest) => {
        e.preventDefault();
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
        const {lessonID} = this.props
        return (
        
                <TestCreate>
                <Mutation 
                    mutation={CREATE_NEWTEST_MUTATION} 
                    variables={{
                        lessonID: lessonID,
                        question: this.state.questions,
                        answers: this.state.answers,
                        correct: this.state.correct,
                    }}
                    refetchQueries={() => [
                        {
                          query: SINGLE_LESSON_QUERY,
                          variables: { id: lessonID }
                        },
                      ]}
                    awaitRefetchQueries={true}
                >

                {(createNewTest, {loading, error}) => (
                    <Form
                        onSubmit={ async e => {
                            e.preventDefault();
                            const res1 = await this.onGenerate(e);
                            const res2 = await this.onSave(e, createNewTest);
                        }}
                    >   
                            <Advice>Создайте новый тестовый вопрос. Введите сам вопрос, 
                                2-6 вариантов ответа. Количество правильных ответов может быть любым.</Advice>  
                            <CustomSelect1>
                                Вариантов ответа:
                                <span></span>
                                <select name="answerNumber" value={this.state.answerNumber} onChange={this.handleSteps}>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </CustomSelect1>
                             
                            <Question>
                            <textarea
                                id="question"
                                name="question"
                                spellCheck={true}
                                placeholder="Вопрос"
                                autoFocus
                                required
                                value={this.state.question}
                                onChange={this.handleChange}
                            />
                            </Question>
                            <Answers>
                                <AnswerOption>
                               
                                    <textarea
                                
                                        id="answer1"
                                        name="answer1"
                                        placeholder="Ответ 1"
                                        required
                                        value={this.state.answer1}
                                        onChange={this.handleChange}
                                    />
                                        <select name="answer1Correct" value={this.state.answer1Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
                                        </select>
                                       
                                  </AnswerOption>
                    
                                <AnswerOption>
                           
                                        <textarea
                                 
                                            spellCheck={true}
                                            id="answer2"
                                            name="answer2"
                                            placeholder="Ответ 2"
                                            required
                                            value={this.state.answer2}
                                            onChange={this.handleChange}
                                        />
                                        <select name="answer2Correct" value={this.state.answer2Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
                                        </select>
                                     
                                </AnswerOption>
                            
                                
                                {this.state.answerNumber > 2 &&
                    
                                <AnswerOption>
                                
                                        <textarea
                            
                                            spellCheck={true}
                                            id="answer3"
                                            name="answer3"
                                            placeholder="Ответ 3"
                                            value={this.state.answer3}
                                            onChange={this.handleChange}
                                        />
                                        <select name="answer3Correct" value={this.state.answer3Correct} onChange={this.handleBooleanChange}>
                                            <option value={true}>Правильно</option>
                                            <option value={false}>Ошибочно</option>
                                        </select>
                                  
                                </AnswerOption>
                                }
                                {this.state.answerNumber > 3 &&

                                    <AnswerOption>
                                    
                                            <textarea
                                     
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
                                        
                                    </AnswerOption>
                                }
                                {this.state.answerNumber > 4 &&
                            
                                    <AnswerOption>
                                            <textarea
                                    
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
                                    </AnswerOption>
                                }
                                {this.state.answerNumber > 5 &&
   
                                    <AnswerOption>
                                            <textarea
                                  
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
                                    </AnswerOption>
                                }
                                {this.state.answerNumber > 6 &&
                   
                              
                                    <AnswerOption>
                                            <textarea
                                          
                                                spellCheck={true}
                                                id="answer7"
                                                name="answer7"
                                                placeholder="Ответ..."
                                                value={this.state.answer7}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer7Correct" value={this.state.answer7Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                    </AnswerOption>
                                }
                                {this.state.answerNumber > 7 &&
                       
                                    <AnswerOption>
                                            <textarea
                                           
                                                spellCheck={true}
                                                id="answer8"
                                                name="answer8"
                                                placeholder="Ответ..."
                                                value={this.state.answer8}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer8Correct" value={this.state.answer8Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                    </AnswerOption>
                                }
                                {this.state.answerNumber > 8 &&
                    
                                    <AnswerOption>
                                  
                                            <textarea
                                         
                                                spellCheck={true}
                                                id="answer9"
                                                name="answer9"
                                                placeholder="Ответ..."
                                                value={this.state.answer9}
                                                onChange={this.handleChange}
                                            />
                                            <select name="answer9Correct" value={this.state.answer9Correct} onChange={this.handleBooleanChange}>
                                                <option value={true}>Правильно</option>
                                                <option value={false}>Ошибочно</option>
                                            </select>
                                    </AnswerOption>
                                }
                            </Answers>
                            <Button type="submit">
                            {loading ? "Сохраняем..." : "Сохранить"}
                            </Button>
                            <Message id="Message">Вы создали новый тестовый вопрос!</Message> 
                  
                    </Form>
                )}
                </Mutation>
                </TestCreate>

        )
    }
}

export default CreateNewTest;
