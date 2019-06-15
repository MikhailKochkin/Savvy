import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import AnswerOption from './AnswerOption';
import DeleteSingleTest from '../delete/DeleteSingleTest';
import Right from  './Right'
import Wrong from  './Wrong'

const Question = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #112962;
`;

const TextBar = styled.div`
  width: 85%;
  font-size: 1.8rem;
  border-bottom: 1px solid #C0D6DF;
  padding-top: 2%;
  margin-top: 2%;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Button = styled.button`
    padding:  1.5% 3%;
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 3%;
    margin-bottom: 3%;
    color: #FFFDF7;
    background: ${props => props.promo ? "#FF6663" : "#5DAE76"};
    border: solid 1px white;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    &:hover{
        background-color: #294D4A;
    }
`;

class SingleTest extends Component {
    state = {
        answers: this.props.answers,
        true: this.props.true,
        answerState: 'think',
        answerOptions: this.props.length,
        correct: false,
      }

    answerState = '';
  
    handleAnswerSelected = (e) => {
      let answerVar = this.state.answerOptions;
      let int = parseInt(e.target.getAttribute("number"));
      answerVar[int] = !answerVar[int]
      this.setState({answerOptions: answerVar})
      // localStorage.setItem(name, value)
    }

    onCheck = () => {
      if(JSON.stringify(this.state.answerOptions) == JSON.stringify(this.state.true)){
        this.setState({answerState: 'right'})
      } else {
        this.setState({answerState: 'wrong'})
      }
    }

    nextQuestion = () => {
        this.props.getQuestionInfo(true);
    }
    render() {
      const mes = _.zip(this.state.answers, this.state.true);
      switch(this.state.answerState) {
        case "think":
        this.answerState = "";
            break;
        case "right":
            this.answerState = <Right>Правильно!</Right>
            break;
        case "wrong":
            this.answerState = <Wrong>Неправильно!</Wrong>
            break;
        default:
            this.answerState = "";
            break;
        }
      return (
              <>
                  <TextBar>
                    {this.answerState}
                    <Question>{this.props.num}. {this.props.question}</Question>
                    {mes.map((answer, index) =>  
                      <ul>
                        <AnswerOption 
                          key={index}
                          question={answer[0]} 
                          correct={answer[1]}
                          number={index}
                          onAnswerSelected={this.handleAnswerSelected}>
                        </AnswerOption>
                    </ul>
                    )}
                    <Button onClick={this.onCheck}>Проверить</Button><br/>
                  </TextBar>
                  
                  { this.props.me && this.props.me.id === this.props.user ?
                      <DeleteSingleTest
                        id={this.props.me.id}
                        testId={this.props.testId}
                        lessonId={this.props.lessonId}
                      /> 
                      :
                      null
                  }
              </>
              );
    }
  }
  
  export default SingleTest;
  export { SINGLE_TEST_QUERY };