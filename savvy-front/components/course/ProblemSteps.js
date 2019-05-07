import React, { Component } from 'react';
import styled from 'styled-components';

const Li = styled.li`
    list-style: none;
    border-bottom: 1px solid #112963;
    font-size: 1.6rem;
    /* border-radius: 10px; */
    width: 90%;
    animation-name: fadein;
    animation-duration: 1s;
    padding: 2%;
    margin-bottom: 1%;
    @keyframes fadein {
        from {opacity: 0;}
        to {opacity: 1;}
    }
`;

const Arrow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    margin-bottom: 1%;
    animation-name: fadein;
    animation-duration: 2s;
    @keyframes fadein {
        from {opacity: 0;}
        to {opacity: 1;}
    }
`;

class test extends Component {
    state = {
        steps: this.props.steps,
        revealLevel: 0,
    }
    add = () => {
        if(this.state.revealLevel < this.state.steps.length){
            this.setState((prevState) => ({
                revealLevel: prevState.revealLevel + 1
            }))
        }
        
    }
    conceal = () => {
        if(this.state.revealLevel > 0){
            this.setState((prevState) => ({
                revealLevel: prevState.revealLevel - 1
            }))
        }
    }

    generate = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState(prevState => ({
            data: [...prevState.data, value]

        }));
    }

    handleName = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
      }
    render() {
        var steps = []
        for(var i = 0; i < this.state.revealLevel; i++){
            steps.push(`${i + 1}. ${this.state.steps[i]}`)
        }
        return (
            <div>
                <p>Всего шагов решения: {this.state.steps.length} </p>
                <ul>
                    {steps.map((step, index) => (
                    <>
                        <Li key={index}>{step}</Li>
                        {steps.length > index + 1 ? <Arrow key={index + 1000}><span>⬇️</span></Arrow> : null}
                    </>
                    ))}
                    {steps.length == this.state.steps.length ? <h4>Задача решена!</h4> : null}
                </ul>
                <button onClick={this.add}>+</button>
                <button onClick={this.conceal}>-</button>
            </div>
        );
    }
}

export default test;