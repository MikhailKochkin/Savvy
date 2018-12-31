import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { PAGE_PROBLEMS_QUERY } from '../course/CoursePage';
import { NavButton, SubmitButton } from '../styles/Button';

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $hints: String
    $solution: String
    $answer: String!
    $coursePageID: ID!
  ) {
    createProblem(
        text: $text
        hints: $hints
        solution: $solution
        answer: $answer
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

const Textarea = styled.textarea`
    font-size: 1.6rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    line-height: 2.5rem;
    padding: 10px;
    @media (max-width: 800px) {
        width: 400px;
    }
`;

const Solution = styled.p`
    display: ${props => props.display ? "block" : "none" };
`;

const Hints = styled.p`
    display: ${props => props.display ? "block" : "none"  };
`;

const Answer = styled.p`
    display: ${props => props.display ? "block" : "none"  };
`;

const ChooseButtons = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ChooseButton = styled.button`
    font-size: 1.6rem;
    border: ${props => props.active ? "2px solid #0E78C6" : "2px solid #fff"};
    color: ${props => props.active ? "#0E78C6" : "white"};
    background-color: ${props => props.active ? "white" : "#0E78C6"};
    padding: 1% 1%;
    margin: 0 0.5%;
    width: 200px;
    @media (max-width: 800px) {
        margin: 1% 0;
        padding: 2% 1%;
    }
`;

class CreateProblem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            button: 'text',
            button1: true,
            button2: false,
            button3: false,
            button4: false,
            text: localStorage.getItem('text') || '',
            hints: localStorage.getItem('hints') || '',
            solution: localStorage.getItem('solution') || '',
            answer: localStorage.getItem('answer') || '',
            revealSolution: false,
            revealHints: false,
            revealAnswer: false,
        }
        this.puzzleStage = ''
    }

    onText = () => this.setState({ button: 'text', button1: true, button2: false, button3: false, button4: false })
    onHints = () => this.setState({ button: 'hints', button1: false, button2: true, button3: false, button4: false})
    onSolution = () => this.setState({ button: 'solution', button1: false, button2: false, button3: true, button4: false})
    onAnswer = () => this.setState({ button: 'answer', button1: false, button2: false, button3: false, button4: true})

    onToggleHints = () => {
        this.setState(prevState => ({
            revealHints: !prevState.revealHints
        }))
    }

    onToggleSolution = () => {
        this.setState(prevState => ({
            revealSolution: !prevState.revealSolution
        }))
    }

    onToggleAnswer = () => {
        this.setState(prevState => ({
            revealAnswer: !prevState.revealAnswer
        }))
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
        localStorage.setItem(name, value)
      };
    
    render() {
        const {id} = this.props.query
        switch(this.state.button) {
            case "text":
            this.puzzleStage = 
                <label htmlFor="text">
                    <Textarea
                        id="text"
                        name="text"
                        placeholder="Условия задачи..."
                        cols={80}
                        rows={10}
                        spellcheck={true}
                        autoFocus
                        required
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                </label>
                break;
            case "hints":
                this.puzzleStage = 
                    <label htmlFor="hints">
                        <Textarea
                            id="hints"
                            name="hints"
                            placeholder="Подсказка..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            value={this.state.hints}
                            onChange={this.handleChange}
                        />
                    </label>
                break;
            case "solution":
                this.puzzleStage = 
                    <label htmlFor="solution">
                        <Textarea
                            id="solution"
                            name="solution"
                            placeholder="Решение..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            value={this.state.solution}
                            onChange={this.handleChange}
                        />
                    </label>
                break;
            case "answer":
                this.puzzleStage = 
                    <label htmlFor="answer">
                        <Textarea
                            id="answer"
                            name="answer"
                            placeholder="Ответ на задачу..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            required
                            value={this.state.answer}
                            onChange={this.handleChange}
                        />
                    </label>
                break;
            default:
                this.puzzleStage = 
                    <label htmlFor="text">
                        <Textarea
                            id="text"
                            name="text"
                            placeholder="Текст задачи..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            required
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </label>
                break;
            }

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
                <h1>Создайте новую задачу для вашего курса</h1>
                <Message id="Message"></Message>  
                <ChooseButtons>
                    <ChooseButton onClick={this.onText} active={this.state.button1}>
                        Шаг 1. Условия
                    </ChooseButton>
                    <ChooseButton onClick={this.onHints} active={this.state.button2}>
                        Шаг 2. Подсказки
                    </ChooseButton>
                    <ChooseButton onClick={this.onSolution} active={this.state.button3}>
                        Шаг 3. Решение
                    </ChooseButton>
                    <ChooseButton onClick={this.onAnswer} active={this.state.button4}>
                        Шаг 4. Ответ
                    </ChooseButton>
                </ChooseButtons>
                <h1>{this.puzzleStage}</h1>
                <Mutation 
                    mutation={CREATE_PROBLEM_MUTATION} 
                    variables={{
                        coursePageID: id,
                        ...this.state
                    }}
                    refetchQueries={() =>[{  
                        query: PAGE_PROBLEMS_QUERY,
                        variables: { id}
                    }]}   
                >
                {(createProblem, {loading, error}) => (
                    <SubmitButton onClick={ async e => {
                        e.preventDefault()
                        const res = await createProblem()
                        document.getElementById("Message").textContent ='Вы создали новую задачу!';
                            setTimeout(function(){
                                document.getElementById("Message") ? document.getElementById("Message").textContent ='' : null;
                                }, 3000);
                        localStorage.removeItem('text')
                        localStorage.removeItem('hints')
                        localStorage.removeItem('solution')
                        localStorage.removeItem('answer')
                    }}
                    >
                        Создать
                    </SubmitButton>
                )}
                </Mutation>
                <h1>Задача будет выглядеть так:</h1>
                <p><strong>Условия задачи:</strong> {this.state.text}</p>
                
                <p><strong>Подсказки:</strong> </p> 
                <button onClick={this.onToggleHints}>
                    {this.state.revealHints ? "Закрыть" : "Открыть"}
                </button>
                <Hints display={this.state.revealHints}>
                    {this.state.hints}
                </Hints>
                
                <p><strong>Решение:</strong></p>
                <button onClick={this.onToggleSolution}>
                    {this.state.revealSolution ? "Закрыть" : "Открыть"}
                </button>
                <Solution display={this.state.revealSolution}>
                    {this.state.solution}
                </Solution>

                <p><strong>Ответ:</strong></p>
                <button onClick={this.onToggleAnswer}>
                    {this.state.revealAnswer ? "Закрыть" : "Открыть"}
                </button>
                <Answer display={this.state.revealAnswer}>
                    {this.state.answer}
                </Answer>
            </>
        );
    }
}

export default CreateProblem;