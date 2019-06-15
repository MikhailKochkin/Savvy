import React, { Component } from 'react';
import styled from 'styled-components';
import Right from  './Right'
import Wrong from  './Wrong'
import { NavButton, SubmitButton } from '../styles/Button';

const Styles = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-bottom: 3%;
    margin-top: 3%;
    font-size: 1.8rem;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const Question = styled.div`
    display: flex;
    flex-direction: column;
    flex: 50%;
    padding: 2%;
    input {
        height: 40px;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;
        margin-top: 5%;
    }
    button {
        width: 30%;
        padding: 2%;
        margin-top: 5%;
    }
    @media (max-width: 800px) {
        padding: 0%;
        margin-bottom: 5%;
        input {

        }
        button {
            width: 50%;
            padding: 3%;
        }
    }
`;

const Answer = styled.div`
    flex: 50%;
    border: 1px solid #C0D6DF;
    color: black;
    padding: 2%;
`;

class SingleQuiz extends Component {
    state = { 
        hidden: true,
        // testFormat: this.props.testFormat,
        testFormat: false,
        answer: '',
        correct: ''
    }
    onAnswer = (e) => {
        this.setState(prevState => ({ hidden: !prevState.hidden}))
        if(this.props.answer.toLowerCase()  === this.state.answer.toLowerCase() ) {
            // console.log(this.props.answer.includes(this.state.answer.toLowerCase()))
            this.setState({ correct: 'true'})
        } else {
            this.setState({ correct: 'false'})
        }
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    render() {
        return (
          <>
            <Styles>
                <Question>
                    {this.props.num}. {this.props.question}
                    <input
                        type="text"
                        name="answer"
                        placeholder="Напишите ответ"
                        required
                        onChange={this.handleChange}
                    />
                    <NavButton onClick={this.onAnswer}>Ответить</NavButton>
                </Question>
                <Answer>
                    <p>Ответ:</p>
                    <p hidden = {this.state.hidden}>{this.props.answer}</p>
                    {this.state.correct === 'true' && <Right>Правильно</Right>}
                    {this.state.correct === 'false' && <Wrong>Ошибка</Wrong>}
                </Answer>
            </Styles>
          </>
        );
    }
}

export default SingleQuiz;