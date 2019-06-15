import React, { Component } from 'react';
import SingleQuiz from './SingleQuiz';

class QuizGroup extends Component {
    state = {
        tests: this.props.quizes,
    }
    render() {
        return (
            <>
            {this.props.quizes.map((quiz, index) =>
            <>
                <SingleQuiz
                    question = {quiz.question}
                    answer={quiz.answer}
                    num={index + 1}
                /> 
            </>
            )}
            </>
        );
    }
}

export default QuizGroup;