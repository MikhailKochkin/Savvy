import React, { Component } from 'react';
import SingleProblem from './SingleProblem';
import styled from 'styled-components';

const Title = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');
  font-family: 'Comfortaa', cursive;
  font-size: 2.2rem;
  font-weight: bold;
  color: #112962;

`;

const Button = styled.button`
        border: none;
        background: none;
    a {
        text-decoration: none;
        display: inline-block;
        padding: 8px 16px;
      
    }

    a:hover {
    background-color: #112862;
    color: white;
    }

    .previous {
    background-color: #f1f1f1;
    color: black;
    text-align: center;
    }

    .next {
    background-color: #f1f1f1;
    color: black;
    }

    .round {
    border-radius: 50%;
    }

`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;

const Advice = styled.p`
    font-size: 1.8rem;
    margin: 1% 4%;
    background: #FEFAE9;
    border-left: 6px solid #F0C40F;
    padding: 2% 4%;
`;

class ProblemGroup extends Component {
    state = {
        shown: false,
        num: 0
    }
    onNext = () => {
        if(this.state.num < this.props.problems.length - 1) {
        this.setState(prevState => ({
            num : prevState.num + 1
        }))}
    }
    onPrev = () => {
        if(this.state.num > 0) {
        this.setState(prevState => ({
            num : prevState.num - 1
        }))}
    }
    render() {
        const userData = this.props.problemResults.filter(result => result.student.id === this.props.me.id)
        const id = this.props.problems[this.state.num]
        return (
            <>
                <Advice><b>Совет</b>: чтобы увидеть ответ на задачу, вам нужно 
                сначала дать собственный ответ. Для этого введите его в форму ниже и 
                нажмите на кнопку "Сдать задачу". После этого при нажатии на раздел "Ответ", 
                вам откроется ответ на задачу. </Advice>
                <Title>Задача {this.state.num + 1} из {this.props.problems.length}</Title>
                <Buttons>
                <Button 
                        onClick = {this.onPrev}
                    >
                        <a href="#" className="previous">&#8249;</a>
                    </Button>
                    <Button 
                        onClick = {this.onNext}
                    >
                        <a href="#" className="next">&#8250;</a>
                    </Button>
                    
                </Buttons>
                
                <SingleProblem key={id.id} problem={id} lessonID={this.props.lessonID} me={this.props.me} userData={userData}/>
            </>
        );
    }
}

export default ProblemGroup;