import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    border-left: 1px solid #c4c4c4;
    padding-left: 2%;
  }
`;

class TestResult extends Component {
  render() {
    const { newTests, student } = this.props;
    return (
      <Container>
        {newTests.length === 0 && (
          <li>
            <b>Тесты</b> не созданы
          </li>
        )}
        {newTests.length > 0 &&
          newTests.map(test => (
            <Box>
              <li>
                <b>Тест: </b>
                {test.question[0].substring(0, 100) + "..."}
              </li>
              <div>
                {test.testResults.filter(t => t.student.id === student.id)
                  .length > 0 ? (
                  test.testResults
                    .filter(t => t.student.id === student.id)
                    .map(t => <span>{t.answer + ", "}</span>)
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
