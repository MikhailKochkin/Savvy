import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1%;
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
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
`;

class QuizResult extends Component {
  render() {
    const { quizes, student } = this.props;
    return (
      <Container>
        {quizes.length > 0 &&
          quizes.map((q) => (
            <Box>
              <div>
                <b>Вопрос: </b>
                {q.question}
              </div>
              <div className="column">{`Правильный ответ: ${q.answer}`}</div>
              <div className="column">
                <div>Полученные ответы:</div>
                {q.quizResults.filter((t) => t.student.id === student.id)
                  .length > 0 ? (
                  q.quizResults
                    .filter((t) => t.student.id === student.id)
                    .map((t) => (
                      <li>
                        {t.answer}{" "}
                        {t.correct && (t.correct ? "Правильно" : "Неверно")}
                        {console.log(t)}
                      </li>
                    ))
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
