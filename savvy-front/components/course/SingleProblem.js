import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';

const SINGLE_PROBLEM_QUERY = gql`
  query SINGLE_PROBLEM_QUERY($id: ID!) {
    problem(where: { id: $id }) {
        id
        text
        hints
        solution
        answer
        createdAt
    }
  }
`;

const ProblemBox = styled.div`
  border: 1px solid black;
  border-radius:5px;
  margin: 2%;
  padding: 2%;
  width: 90%;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: center;
  }
  button {
      width: 20%;
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
      return (
        <>
          <Query
            query={SINGLE_PROBLEM_QUERY}
            variables={{
              id: this.props.problem.id,
            }}
          >
            {({ data, error, loading }) => {
              // if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              // if (!data.lesson) return <p>No Lesson Found for {this.props.id}</p>;
              const problem = data.problem;
              moment.locale('ru');
              return (
                <ProblemBox>
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
                </ProblemBox>
              );
            }}
          </Query>
        </>
      );
    }
  }
  
  export default SingleProblem;
  export { SINGLE_CASE_QUERY };

