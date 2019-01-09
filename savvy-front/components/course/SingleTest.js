import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import AnswerOption from './AnswerOption';
import DeleteSingleTest from '../DeleteSingleTest';
import User from '../User';

const AnswerComment = styled.p`
  background-color: #90EE90;
  font-size: 1.8rem;
`;

const TestQuestion = styled.div`
  width: 70%;
  border: 1px solid black;
  padding: 2% 5%;
  border-radius:5px;
  margin: 2%;
  list-style-type: none;
  .StyledButton:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .StyledButton input:checked ~ .checkmark {
    background-color: #2196F3;
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
    text-align: center;
  }
  button {
      width: 20%;
  }
`;

const TextBar = styled.div`
  width: 90%;
  font-size: 1.8rem;
  border: 1px solid #112A62;
  padding: 0 2%;
  border-radius: 5px;
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
  handleAnswerSelected(event) {
    if(event.currentTarget.value == 'true') {
      document.getElementById("AnswerComment").textContent ='Правильный ответ!';
      document.getElementById("AnswerComment").style.backgroundColor = "#90EE90";
        setTimeout(function(){
      document.getElementById("AnswerComment") ? document.getElementById("AnswerComment").textContent ='' : null;
      }, 3000);
    } else if(event.currentTarget.value == 'false') {
      document.getElementById("AnswerComment").textContent ='Неправильный ответ!';
      document.getElementById("AnswerComment").style.backgroundColor = "red";
        setTimeout(function(){
      document.getElementById("AnswerComment") ? document.getElementById("AnswerComment").textContent ='' : null;
      }, 1500);
    }
  }
    render() {
      return (
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
                  <AnswerComment id="AnswerComment"></AnswerComment>
                  <h3>{test.question}</h3>
                  {answers2.map((answer) => 
                    <AnswerOption 
                      key={answer.answer} 
                      id={answer}
                      onAnswerSelected={this.handleAnswerSelected}>
                    </AnswerOption>)}
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
      );
    }
  }
  
  export default SingleTest;
  export { SINGLE_TEST_QUERY };