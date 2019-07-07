import React, { Component } from 'react';
import SingleTest from './SingleTest';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const Button = styled.button`
    padding: 1% 2%;
    background: #F79101;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
    margin: 2% 0;
    cursor: pointer;
    &:hover {
        background: #F26915;;
    }
`;

const Advice = styled.p`
    font-size: 1.8rem;
    margin: 1% 4%;
    background: #FEFAE9;
    border-left: 6px solid #F0C40F;
    padding: 2% 4%;
`;

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION(
    $answer: String
    $lessonID: ID
  ) {
    createTestResult(
      answer: $answer
      lessonID: $lessonID
    ) {
      id
    }
  }
`;


class TestGroup extends Component {
    state = {
        tests: this.props.tests,
        completed: 0,
        handIn: false
    }

    myCallback = () => {
        this.setState(prevState => ({completed: prevState.completed + 1}))
    }
    
    render() {
        let arr;
        return (
            <>
            <Advice><b>Совет</b>: чтобы преподаватель увидел, что вы выполнили задания, вам нужно сделать следущее. 
                Ответьте правильно на все вопросы, самостоятельно или с помощью подсказок.
                После этого в самом низу страницы появится кнопка "Сохранить". Только после того, как вы на нее нажмете,
                преподаватель получит информацию, что вы выполнили все задания этого типа.</Advice>
            {this.state.tests.map((test, index) =>
                <> 
                    {arr = Array(test.correct.length).fill(false)}
                    <SingleTest
                        question = {test.question}
                        num = {index + 1}
                        answers={test.answers}
                        true={test.correct}
                        length={arr}
                        user = {test.user.id}
                        me = {this.props.me}
                        testId={test.id}
                        lessonId={this.props.lessonId}
                        getTestData={this.myCallback}
                    />
                </>
              )}
              <Mutation 
                mutation={CREATE_TESTRESULT_MUTATION} 
                variables={{
                      lessonID: this.props.lessonId,
                      answer: "Completed"
                }}
              >
            {(createTestResult, {loading, error}) => (
                <>
              {this.state.tests.length === this.state.completed && 
                <Button onClick={
                    async e => {
                        // Stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await createTestResult();
                        const res2 = await this.setState({ handIn: true })
                        // change the page to the single case page
                        console.log("успех!")
                        }
                }>{!this.state.handIn ? "Сохранить" : "Готово!"}</Button>
             }
             </>
            )}
              </Mutation>
            </>
        );
    }
}

export default TestGroup;