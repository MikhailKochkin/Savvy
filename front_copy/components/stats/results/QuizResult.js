import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import renderHTML from "react-render-html";

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
    padding: 0;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
      .block {
        padding: 2% 0;
        border-bottom: 1px solid #edefed;
      }
    }
  }
`;

class QuizResult extends Component {
  render() {
    const { quizes, student, results } = this.props;
    moment.locale("ru");
    return (
      <Container>
        {quizes.length > 0 &&
          quizes.map((q) => (
            <Box>
              <div>
                <b>Question: </b>
                {renderHTML(q.question)}
              </div>
              <div className="column">
                <div>
                  <b>Correct answer:</b>
                </div>{" "}
                {renderHTML(q.answer)}
              </div>
              <div className="column">
                <div>Received answers:</div>
                {results && results.length > 0 ? (
                  results
                    .filter((r) => r.quiz.id == q.id)
                    .map((t) => (
                      <div className="block">
                        {t.answer}{" "}
                        {t.correct &&
                          (t.correct == true ? <u>Correct</u> : "Wrong ")}{" "}
                        ({moment(t.createdAt).format("LLL")})
                      </div>
                    ))
                ) : (
                  <span>Not done</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default QuizResult;
