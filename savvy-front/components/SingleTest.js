import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import AnswerOption from './AnswerOption'

const AnswerComment = styled.p`
  background-color: #90EE90;
  font-size: 1.8rem;
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
    }
  }
`;

class SingleTest extends Component {
  handleAnswerSelected(event) {
    if(event.currentTarget.value == 'true') {
      console.log("Верный ответ!")
      document.getElementById("AnswerComment").textContent ='Правильный ответ!';
      document.getElementById("AnswerComment").style.backgroundColor = "#90EE90";
        setTimeout(function(){
      document.getElementById("AnswerComment") ? document.getElementById("AnswerComment").textContent ='' : null;
      }, 3000);
    } else if(event.currentTarget.value == 'false') {
      console.log("Увы, неправильно...")
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
            id: this.props.id,
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
            console.log(answers2);
            return (
              <>
                <AnswerComment id="AnswerComment"></AnswerComment>
                <h1>{test.question}</h1>
                {answers2.map((answer) => 
                  <AnswerOption 
                    key={answer.answer} 
                    id={answer}
                    onAnswerSelected={this.handleAnswerSelected}>
                  </AnswerOption>)}
              </>
            );
          }}
        </Query>
      );
    }
  }
  
  export default SingleTest;
  export { SINGLE_TEST_QUERY };