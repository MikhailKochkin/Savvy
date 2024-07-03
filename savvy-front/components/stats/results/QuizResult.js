import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import parse from "html-react-parser";
import NextBlock from "./NextBlock";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.6rem;
  margin: 20px 0;
  h2 {
    margin: 15px 0;
  }
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const SendButton = styled.div`
  font-size: 1.3rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid;
  color: grey;
  border-color: #edefed;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin-right: 20px;
  width: 130px;
  transition: all 0.4s;
  a {
    color: grey;
  }
  &:hover {
    color: #112a62;
    border-color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  div {
    flex: 50%;
    padding: 5px;
    .quizAnswer {
    }
    .standard {
      padding: 0;
    }
    .time {
      margin-top: 5px;
    }
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
      p {
        max-width: 90%;
      }
      .block {
        padding: 15px;
        outline: 0;
        background: #f8f8f8;
        border-radius: 15px;
        margin-bottom: 20px;
      }
    }
  }
`;

const QuizResult = (props) => {
  const [nextId, setNextId] = useState();
  const [nextTask, setNextTask] = useState();

  const {
    quizes,
    student,
    results,
    all_quizes,
    all_tests,
    all_notes,
    problems,
    testResults,
    problemResults,
  } = props;
  moment.locale("ru");

  const slide = () => {
    var my_element = document.getElementById("nextBlock");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const openTask = (id, task) => {
    setNextId(id);
    setNextTask(task);
    // console.log(0, id, task);
    slide();
  };
  return (
    <Container>
      {quizes.length > 0 &&
        quizes.map((q) => (
          <Box>
            <div className="column">
              <h2>Question </h2>
              {parse(q.question)}
              <div className="standard">
                <b>Type: </b>
                {q.type == "FORM" && "Form"}
                {q.type == "TEST" && "Test"}
                {q.type == "GENERATE" && "Generate ideas"}
              </div>
              {q.type?.toLowerCase() !== "generate" && (
                <>
                  <div className="standard">
                    <b>Sample answer:</b>
                  </div>
                  <div className="standard">
                    <b>Correct answer:</b>
                  </div>
                  <div className="standard">{parse(q.answer)}</div>
                </>
              )}
            </div>
            <div className="column">
              <div className="quizAnswer">
                <b>Received answers:</b>
                {results && results.length > 0 ? (
                  results
                    .filter((r) => r.quiz.id == q.id)
                    .map((t) => (
                      <div className="block">
                        {q.type?.toLowerCase() !== "generate" && (
                          <>
                            <div className="standard">
                              {q.type !== "FORM" &&
                                q.type !== "PROMPT" &&
                                (t.correct && t.correct == true
                                  ? "✅ Marked as correct"
                                  : "❌ Marked as wrong")}
                            </div>
                            {q.type == "PROMPT" && console.log("t", t)}
                            <b>Student answer:</b> {t.answer}
                            <div className="standard">
                              <b>Comment:</b> {t.comment}
                            </div>
                            <div className="standard">
                              <b>Hint:</b> {t.hint}
                            </div>
                            <div className="standard">
                              <b>Explanantion:</b> {t.explanation}
                            </div>
                          </>
                        )}
                        {q.type?.toLowerCase() == "generate" && (
                          <>
                            {t.ideasList?.quizIdeas?.map((item, i) => (
                              <div>
                                <div>
                                  {i + 1}. {item.idea} - <b>{item.result}%</b>
                                </div>
                                {item.next_id && (
                                  <SendButton
                                    onClick={(e) =>
                                      openTask(item.next_id, item.next_type)
                                    }
                                  >
                                    Move to task
                                  </SendButton>
                                )}
                              </div>
                            ))}
                            {t.ideasList == null ||
                            t.ideasList?.quizIdeas.length == 0
                              ? "No ideas provided"
                              : null}
                          </>
                        )}
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
      <div id="nextBlock">
        <NextBlock
          task={nextTask}
          id={nextId}
          quizes={quizes}
          student={student}
          results={results}
          all_quizes={all_quizes}
          all_tests={all_tests}
          all_notes={all_notes}
          problems={problems}
          testResults={testResults}
          problemResults={problemResults}
        />
      </div>
    </Container>
  );
};

export default QuizResult;
