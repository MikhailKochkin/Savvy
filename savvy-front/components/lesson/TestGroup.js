import React, { Component } from 'react';
import SingleTest from './SingleTest';

class TestGroup extends Component {
    state = {
        tests: this.props.tests,
    }
    
    render() {
        let arr;
        return (
            <>
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
                    />
                </>
              )}
            </>
        );
    }
}

export default TestGroup;