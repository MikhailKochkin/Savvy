import React, { useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import Modal from "styled-react-modal";
import moment from "moment";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 2%;
  font-size: 1.6rem;
  h2 {
    margin: 15px 0;
    line-height: 1.4;
  }
  div {
    flex: 50%;
    .final_answer {
      margin-top: 20px;
    }
    &.columnOne {
      padding: 0 30px;
    }
    &.column {
      padding: 0 30px;
      border-left: 1px solid #edefed;
    }
  }
  img {
    width: 300px;
  }
  .no {
    color: red;
  }
  .answer_box {
    background: #e8e8e4;
    width: 95%;
  }
`;

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  overflow: scroll;
  padding: 3% 2%;
  width: 50%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Button = styled.button`
  text-align: center;
  background: #ffffff;
  border: 1px solid #112a62;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin: 1% 0;
  color: #112a62;
  font-size: 1.6rem;
  a {
    color: #112a62;
  }
`;

const Span = styled.div`
  margin: 3% 0;
`;

const Block = styled.div`
  padding: 2% 0;
  margin-bottom: 15px;
  line-height: 1.6;
  border-bottom: ${(props) =>
    props.final ? "1px solid #edefed" : "1px solid #edefed"};
  background: ${(props) => (props.color ? "#b5e48c" : "#fff")};
`;

const Results = styled.div`
  .question {
    padding: 20px 0;
    margin-bottom: 20px;
    /* border-bottom: 1px solid #edefed; */
  }
  .standard {
    line-height: 1.6;
  }
  .question_text {
    line-height: 1.6;
  }
  .time {
    color: grey;
    font-size: 1.3rem;
    margin-top: 3px;
  }
  .arrow {
    margin: 20px 0;
  }
  .result {
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #edefed;
  }
`;

const ProblemModal = (props) => {
  moment.locale("ru");

  const {
    problem,
    student,
    results,
    newTests,
    quizes,
    chats,
    testResults,
    quizResults,
  } = props;

  const exercises =
    problem.steps && problem.steps.problemItems
      ? problem.steps.problemItems
      : [];
  const res = [...testResults, ...quizResults];

  const getAllTrueValues = (answers, correctInfo) => {
    let arr = [];
    answers.map((an, index) => {
      if (correctInfo[index]) {
        arr.push(an);
      }
    });
    return arr;
  };

  // Find results for a given exercise
  const findResultsForExercise = (exerciseId) => {
    return res.filter((result) => {
      return (
        (result.test && result.test.id === exerciseId) ||
        (result.quiz && result.quiz.id === exerciseId)
      );
    });
  };

  // Merge exercises with their corresponding results
  const mergedData = exercises.map((exercise) => {
    return {
      ...exercise,
      results: findResultsForExercise(exercise.id),
    };
  });

  const arraysHaveSameItem = (arr1, arr2) => {
    // First, check if both arrays are of the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Sort both arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    // Check if every item in the first array is the same as the corresponding item in the second array
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  };

  const filterByTruthiness = (arr1, arr2) => {
    return arr1.filter((item, index) => arr2[index]);
  };

  const removePTags = (htmlString) => {
    return htmlString?.replace(/<\/?p>/g, "");
  };

  return (
    <Box key={problem.id}>
      <div className="columnOne">
        <h2>Case Study </h2>
        {parse(`${problem.text}`)}
        <div className="final_answer">
          <b>Final answer</b>
        </div>
        {results && results.length > 0 ? (
          results
            .filter((t) => t.problem.id === problem.id)
            .map((t) => (
              <>
                <Span>
                  {parse(t.answer)} {moment(t.createdAt).format("LLL")}
                </Span>
              </>
            ))
        ) : (
          <span>No data</span>
        )}
      </div>
      <div className="column">
        <div>
          <b>Step-by-step solution:</b>
        </div>
        {mergedData.length > 0
          ? mergedData.map((m) => {
              let stepType = m.type.toLowerCase();
              let el;
              if (stepType === "newtest") {
                el = newTests.find((nt) => nt.id === m.id);
              } else if (stepType === "quiz") {
                el = quizes.find((q) => q.id === m.id);
              } else if (stepType === "chat") {
                el = chats.find((q) => q.id === m.id);
              }
              let subtype = el?.type?.toLowerCase();
              let results = m.results;
              return (
                <Results>
                  <div>
                    {m.type.toLowerCase() == "newtest" && (
                      <div className="question">
                        <div>
                          <b>Quiz</b>
                        </div>
                        <div>{parse(el.question[0])}</div>
                        {/* <div>⬇️</div> */}
                        <>
                          {m.results.map((result) =>
                            result.answerArray ? (
                              <Block>
                                {result.answerArray.map((item) =>
                                  removePTags(item)
                                )}{" "}
                                {arraysHaveSameItem(
                                  result.answerArray,
                                  filterByTruthiness(
                                    newTests.find((nt) => nt.id === m.id)
                                      .answers,
                                    newTests.find((nt) => nt.id === m.id)
                                      .correct
                                  )
                                )
                                  ? "✅"
                                  : "❌"}{" "}
                                <div className="time">
                                  {moment(result.createdAt).format("LLL")}{" "}
                                </div>
                              </Block>
                            ) : (
                              <Block>
                                {result.answer ==
                                getAllTrueValues(
                                  newTests.find((nt) => nt.id === m.id).answers,
                                  newTests.find((nt) => nt.id === m.id).correct
                                ).join(", ")
                                  ? "✅"
                                  : "❌"}{" "}
                                {stringToArray(result.answer).map(
                                  (el) => parse(el) + ", "
                                )}
                                <div className="time">
                                  {moment(result.createdAt).format("LLL")}{" "}
                                </div>
                              </Block>
                            )
                          )}
                        </>
                      </div>
                    )}
                    {m.type.toLowerCase() == "quiz" && (
                      <div className="question">
                        <div>
                          <b>Open Question:</b>
                        </div>
                        <div className="question_text">
                          {parse(el.question)}
                        </div>
                        <div className="standard">
                          <b>Type:</b> {subtype}
                        </div>
                        {/* <div className="arrow">⬇️</div> */}
                        <div>
                          <b>Answers:</b>
                        </div>
                        <div>
                          {results.map((result) => (
                            <div className="result">
                              {subtype == "test" ? (
                                <>
                                  <div className="standard"></div>
                                  <b>Student answer: </b>
                                  {result.answer}
                                  <div className="standard">
                                    <b>Comment: </b> {result.comment}{" "}
                                    {result.correct && result.correct == true
                                      ? "✅"
                                      : "❌"}
                                    <br />
                                    <b>Hint:</b> {result.hint}
                                    <br />
                                    <b>Explanation:</b> {result.explanation}
                                    <br />
                                    <b>Improvement:</b> {result.improvement}
                                  </div>
                                </>
                              ) : null}

                              {subtype == "form" ? (
                                <>
                                  <div className="standard">
                                    {result.answer}
                                  </div>
                                </>
                              ) : null}

                              {(subtype == "generate" ||
                                subtype == "findall") && (
                                <>
                                  {result.ideasList?.quizIdeas?.map(
                                    (item, i) => (
                                      <div>
                                        <div>
                                          {i + 1}. {item.idea} –{" "}
                                          <b>{item.result}%</b>{" "}
                                          {parseFloat(item.result) > 60
                                            ? "✅"
                                            : "❌"}
                                        </div>
                                        {item.next_id && (
                                          <SendButton
                                            onClick={(e) =>
                                              openTask(
                                                item.next_id,
                                                item.next_type
                                              )
                                            }
                                          >
                                            Move to task
                                          </SendButton>
                                        )}
                                      </div>
                                    )
                                  )}
                                  {result.ideasList == null ||
                                  result.ideasList?.quizIdeas.length == 0
                                    ? "No ideas provided"
                                    : null}
                                </>
                              )}
                              <div className="time">
                                {moment(result.createdAt).format("LLL")}{" "}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {m.type.toLowerCase() == "quiz" && <div>Chat</div>}
                  </div>
                </Results>
              );
            })
          : null}
      </div>
    </Box>
  );
};

export default ProblemModal;
