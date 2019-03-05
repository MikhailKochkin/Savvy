import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import DeleteSingleProblem from '../DeleteSingleProblem';
import User from '../User';

const TextBar = styled.div`
  width: 50%;
  font-size: 1.8rem;
  border: 1px solid #C0D6DF;
  padding: 0 2%;
  border-radius: 5px;
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

const Solution = styled.p`
    display: ${props => props.display ? "block" : "none" };
`;

const Hints = styled.p`
    display: ${props => props.display ? "block" : "none"  };
`;

const Answer = styled.p`
    display: ${props => props.display ? "block" : "none"  };
`;

class SingleProblem extends Component {
    state={
        revealSolution: false,
        revealHints: false,
        revealAnswer: false,
    }
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

    render() {
      moment.locale('ru');
      const problem = this.props.data;
      const me = this.props.me;
        return (
                <Center>
                  <TextBar>
                    <p><strong>Текст задачи:</strong> {problem.text}</p>
                    
                    <p><strong>Подсказки:</strong> </p> 
                    <button onClick={this.onToggleHints}>
                        {this.state.revealHints ? "Закрыть" : "Открыть"}
                    </button>
                    <Hints display={this.state.revealHints}>
                        {problem.hints}
                    </Hints>
                    
                    <p><strong>Решение:</strong></p>
                    <button onClick={this.onToggleSolution}>
                        {this.state.revealSolution ? "Закрыть" : "Открыть"}
                    </button>
                    <Solution display={this.state.revealSolution}>
                        {problem.solution}
                    </Solution>

                    <p><strong>Ответ:</strong></p>
                    <button onClick={this.onToggleAnswer}>
                        {this.state.revealAnswer ? "Закрыть" : "Открыть"}
                    </button>
                    <Answer display={this.state.revealAnswer}>
                        {problem.answer}
                    </Answer>
                  </TextBar>
                  { me && me.id === problem.user.id ?
                    <DeleteSingleProblem
                      id={this.props.data.id}
                      lessonId={this.props.lessonID}
                    />
                    :
                    null
                  }  
                </Center>
                );
              }
            }
  
  export default SingleProblem;
  export { SINGLE_CASE_QUERY };

