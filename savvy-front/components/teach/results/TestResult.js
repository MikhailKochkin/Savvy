import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  li {
    flex: 50%;
  }
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
`;

class TestResult extends Component {
  getAllIndexes = (arr, val) => {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };
  render() {
    const { newTests, student } = this.props;
    return (
      <Container>
        {/* {newTests.length === 0 && (
          <span>
            <b>Тесты</b> не созданы
          </span>
        )} */}
        {newTests.length > 0 &&
          newTests.map(test => (
            <Box>
              <div>
                <b>Тест: </b>
                {test.question[0]}
              </div>
              <div className="column">
                Правильный ответ:
                {this.getAllIndexes(test.correct, true).map(i => (
                  <li>{test.answers[i]}</li>
                ))}
              </div>
              <div className="column">
                {test.testResults.filter(t => t.student.id === student.id)
                  .length > 0 ? (
                  test.testResults
                    .filter(t => t.student.id === student.id)
                    .map(t => <li>{t.answer}</li>)
                ) : (
                  <span>Не выполнен</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default TestResult;
