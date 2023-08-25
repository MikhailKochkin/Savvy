import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import parse from "html-react-parser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.6rem;
  margin: 80px 0;
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
    padding: 5px;
    .standard {
      padding: 0;
    }
    .time {
      margin-top: 5px;
    }
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

const QuizResult = (props) => {
  const { quizes, student, results } = props;
  moment.locale("ru");
  return (
    <Container>
      {quizes.length > 0 &&
        quizes.map((q) => (
          <Box>
            <div>
              <b>Question: </b>
              {parse(q.question)}
              <div className="standard">
                <b>Type:</b> {q.type == "FORM" ? "Form" : "Quiz"}
              </div>
              <div className="standard">
                <b>Sample answer:</b>
              </div>
              <div className="standard">
                <b>Correct answer:</b>
              </div>
              <div className="standard">{parse(q.answer)}</div>
            </div>
            <div className="column">
              <div>
                <b>Received answers:</b>
                {results && results.length > 0 ? (
                  results
                    .filter((r) => r.quiz.id == q.id)
                    .map((t) => (
                      <div className="block">
                        <div className="standard">
                          {q.type !== "FORM" &&
                            (t.correct && t.correct == true
                              ? "✅ Marked as correct"
                              : "❌ Marked as wrong")}
                        </div>
                        {t.answer}
                        <div className="standard">
                          <b>Comment:</b> {t.comment}
                        </div>
                        <div className="time">
                          {moment(t.createdAt).format("LLL")}{" "}
                        </div>
                      </div>
                    ))
                ) : (
                  <span>Not done</span>
                )}
              </div>
            </div>
          </Box>
        ))}
    </Container>
  );
};

export default QuizResult;
