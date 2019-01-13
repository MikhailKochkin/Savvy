import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import AnswerOption from './AnswerOption';
import DeleteSingleTest from '../DeleteSingleTest';
import User from '../User';
import Right from  './Right'
import Wrong from  './Wrong'
import { Message } from '../styles/Button';

const Question = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
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

const TextBar = styled.div`
  width: 90%;
  font-size: 1.8rem;
  border: 2px solid #C0D6DF;
  padding: 0 2%;
  border-radius: 5px;
  ul {
    list-style-type: none;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const SideBar = styled.div`
  margin-left: 2%;
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
`;

const SINGLE_TEST_QUERY = gql`
  query SINGLE_TEST_QUERY($id: ID!) {
    test(where: { id: $id }) {
        id
        answer1
        answer1Correct
        answer2
        answer2Correct
        answer3
        answer3Correct
        answer4
        answer4Correct
        question
        user {
          id
        }
    }
  }
`;

class SingleTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
        answerState: 'think',
      }

    this.answerState = ''
    }
    // onLesson = () => {this.setState({page: "lesson", button1: true, button2: false, button3: false})}
    handleAnswerSelected = (event) => {
      if(event.currentTarget.value === 'true') {
        this.setState({answerState: "right"})
      } else if(event.currentTarget.value === 'false') {
        this.setState({answerState: "wrong"})
      }

    }
    render() {
      switch(this.state.answerState) {
        case "think":
        this.answerState = "";
            break;
        case "right":
            this.answerState = 
              <Right>
                Правильно!
              </Right>
            break;
        case "wrong":
            this.answerState = 
              <Wrong>
                Неправильно!
              </Wrong>
            break;
        default:
            this.answerState = "";
            break;
        }
      return (
        <User>
          {({data: {me}}) => (
          <Query
            query={SINGLE_TEST_QUERY}
            variables={{
              id: this.props.test.id,
            }}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              if (!data.test) return <p>No Test Found for {this.props.id}</p>;
              const test = data.test;
              const answers = [
                {
                  answer: test.answer1,
                  type: test.answer1Correct
                },
                {
                  answer: test.answer2,
                  type: test.answer2Correct
                },
                {
                  answer: test.answer3,
                  type: test.answer3Correct
                },
                {
                  answer: test.answer4,
                  type: test.answer4Correct
                }
              ]
              const answers2 = [];
              for (let o of answers) {
                if (Object.values(o)[0] !== '') {
                  answers2.push(o)
                }
              }
              return (
                <ProblemBox>
                  <TextBar>
                    {this.answerState}
                    <Question>{test.question}</Question>
                    {answers2.map((answer) =>
                      <ul>
                        <AnswerOption 
                          key={answer.answer} 
                          id={answer}
                          onAnswerSelected={this.handleAnswerSelected}>
                        </AnswerOption>
                    </ul>)}
                  </TextBar>
                  <SideBar>
                  { me && me.id === test.user.id ?
                      <DeleteSingleTest
                        id={test.id}
                        coursePageId={this.props.coursePageId}
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
      );
    }
  }
  
  export default SingleTest;
  export { SINGLE_TEST_QUERY };