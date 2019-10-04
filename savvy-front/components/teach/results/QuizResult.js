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

class QuizResult extends Component {
  render() {
    const { quizes, student } = this.props;
    return (
      <Container>
        {quizes.length === 0 && (
          <li>
            <b>Вопросы</b> не созданы
          </li>
        )}
        {quizes.length > 0 &&
          quizes.map(q => (
            <Box>
              <li>
                <b>Вопрос: </b>
                {q.question.substring(0, 100) + "..."}
                {/* {console.log(q)} */}
              </li>
              <div>
                {q.quizResults.filter(t => t.student.id === student.id).length >
                0 ? (
                  q.quizResults
                    .filter(t => t.student.id === student.id)
                    .map(t => <span>{t.answer}, </span>)
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

export default QuizResult;
