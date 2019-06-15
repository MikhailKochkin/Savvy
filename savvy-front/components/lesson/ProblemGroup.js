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

`

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
        const id = this.props.problems[this.state.num]
        return (
            <>
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
                
                <SingleProblem key={id.id} problem={id} lessonID={this.props.lessonID} me={this.props.me}/>
    
            </>
        );
    }
}

export default ProblemGroup;