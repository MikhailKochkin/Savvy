import React, { Component } from 'react';
import styled from 'styled-components';
import AnswerOption from '../lesson/AnswerOption';
import DeletePointATest from '../delete/DeletePointATest';
import Right from  '../lesson/Right'
import Wrong from  '../lesson/Wrong'

const Question = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`;

const TextBar = styled.div`
  width: 100%;
  font-size: 1.8rem;
  border: 1px solid #C0D6DF;
  padding: 0 2%;
  border-radius: 5px;
  ul {
    list-style-type: none;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Center = styled.div`
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

class SingleTest extends Component {
    state = {
        answerState: 'think',
      }

    answerState = ''

    handleAnswerSelected = (event) => {
      if(event.currentTarget.value === 'true') {
        this.setState({answerState: "right"})
      } else if(event.currentTarget.value === 'false') {
        this.setState({answerState: "wrong"})
      }

    }
    render() {
      const answers = [
        {
          answer: this.props.data.answer1,
          type: this.props.data.answer1Correct
        },
        {
          answer: this.props.data.answer2,
          type: this.props.data.answer2Correct
        },
        {
          answer: this.props.data.answer3,
          type: this.props.data.answer3Correct
        },
        {
          answer: this.props.data.answer4,
          type: this.props.data.answer4Correct
        }
      ]
      const answers2 = [];
      for (let o of answers) {
        if (Object.values(o)[0] !== '') {
          answers2.push(o)
        }
      }
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
              <Center>
                  <TextBar>
                    {this.answerState}
                    <Question>{this.props.data.question}</Question>
                    {answers2.map((answer) =>
                      <ul>
                        <AnswerOption 
                          key={answer.answer} 
                          id={answer}
                          onAnswerSelected={this.handleAnswerSelected}>
                        </AnswerOption>
                    </ul>)}
                  </TextBar>
                  { this.props.me && this.props.me.id === this.props.data.user.id ?
                      <DeletePointATest
                        id={this.props.data.id}
                        // lessonId={this.props.lessonId}
                      /> 
                      :
                      null
                  }
              </Center>
              );

    }
  }
  
  export default SingleTest;