import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

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

class ProblemResults extends Component {
  render() {
    const { problems, student } = this.props;
    return (
      <Container>
        {problems.length === 0 && (
          <li>
            <b>Задачи</b> не созданы
          </li>
        )}
        {problems.length > 0 &&
          problems.map(problem => (
            <Box>
              <li>
                <b>Задача: </b>
                {renderHTML(`${problem.text.substring(0, 100)}`)}
              </li>
              <div>
                {problem.problemResults.filter(t => t.student.id === student.id)
                  .length > 0 ? (
                  problem.problemResults
                    .filter(t => t.student.id === student.id)
                    .map(t => <span>{renderHTML(t.answer)}</span>)
                ) : (
                  <span>Не выполнена</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default ProblemResults;
