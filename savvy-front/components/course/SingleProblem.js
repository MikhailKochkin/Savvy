import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import DeleteSingleProblem from '../DeleteSingleProblem';
import User from '../User';

const SINGLE_PROBLEM_QUERY = gql`
  query SINGLE_PROBLEM_QUERY($id: ID!) {
    problem(where: { id: $id }) {
        id
        text
        hints
        solution
        answer
        user {
          id
        }
        createdAt
    }
  }
`;

const ProblemBox = styled.div`
  border: none;
  border-radius:5px;
  margin: 2%;
  padding: 2%;
  width: 90%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: left;
  }
  button {
      width: 20%;
  }
`;

const SideBar = styled.div`
  margin-left: 2%;
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
`;

const TextBar = styled.div`
  width: 800px;
  font-size: 1.8rem;
  border: 1px solid #112A62;
  padding: 0 2%;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
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
        <User>
          {({data: {me}}) => (
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
                  <SideBar>
                  { me && me.id === problem.user.id ?
                    <DeleteSingleProblem
                      id={this.props.problem.id}
                      lessonID={this.props.lessonID}
                    />
                    :
                    null
                  }  
                  </SideBar>
                </ProblemBox>
                  );
                }}
              </Query>
            )}
          </User>
        </>
      );
    }
  }
  
  export default SingleProblem;
  export { SINGLE_CASE_QUERY };

