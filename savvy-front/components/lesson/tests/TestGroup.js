import React, { Component } from "react";
import SingleTest from "./SingleTest";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 5%;
`;

class TestGroup extends Component {
  state = {
    tests: this.props.tests,
    completed: 0,
    handIn: false,
  };

  render() {
    let arr;
    return (
      <Styles>
        {this.state.tests.map((test, index) => {
          let arr = Array(test.correct.length).fill(false);
          return (
            <>
              <SingleTest
                id={test.id}
                testID={test.id}
                question={test.question}
                num={index + 1}
                type={test.type}
                answers={test.answers}
                true={test.correct}
                length={arr}
                ifRight={test.ifRight}
                ifWrong={test.ifWrong}
                next={test.next}
                user={test.user.id}
                user_name={test.user}
                me={this.props.me}
                lessonID={this.props.lessonID}
                userData={this.props.testResults}
                quizes={this.props.quizes}
                notes={this.props.notes}
                tests={this.props.tests}
              />
            </>
          );
        })}
      </Styles>
    );
  }
}

export default TestGroup;
