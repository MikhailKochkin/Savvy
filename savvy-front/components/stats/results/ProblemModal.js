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
  max-height: 600px;
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
  max-height: 600px;
  margin: 3% 0;
`;

const Block = styled.div`
  padding: 2% 0;
  margin-bottom: 15px;
  border-bottom: ${(props) =>
    props.final ? "1px solid #edefed" : "1px solid #edefed"};
  background: ${(props) => (props.color ? "#b5e48c" : "#fff")};
`;

const Results = styled.div`
  .question {
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #edefed;
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
    notes,
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

  let arr = [];
  let first_element;

  const getAllIndexes = (arr, val) => {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };

  const checker = (el) => {
    // 2. add element to the queue
    // 3. check if the element has next_elements
    if (
      el == null ||
      el == undefined ||
      el.next == undefined ||
      el.next == null
    )
      return;
    arr.push(el);

    if (
      (el.next.true.type !== null && el.next.true.value !== null) ||
      (el.next.false.type !== null && el.next.false.value)
    ) {
      // 4. find the element
      let new_el;

      if (el.next.true.type.toLowerCase() == "newtest") {
        new_el = newTests.find((t) => t.id == el.next.true.value);
      } else if (el.next.true.type.toLowerCase() == "quiz") {
        new_el = quizes.find((q) => q.id == el.next.true.value);
      } else if (el.next.true.type.toLowerCase() == "note") {
        new_el = notes.find((n) => n.id == el.next.true.value);
      }
      if (new_el) checker(new_el);
    }
    // 4. restart the process
  };

  const solution_builder = () => {
    if (problem.nodeID == null || problem.nodeType == null) {
      return;
    }
    if (problem.nodeType.toLowerCase() == "newtest") {
      first_element = newTests.find((el) => el.id == problem.nodeID);
    } else if (problem.nodeType.toLowerCase() == "quiz") {
      first_element = quizes.find((el) => el.id == problem.nodeID);
    } else if (problem.nodeType.toLowerCase() == "note") {
      first_element = notes.find((el) => el.id == problem.nodeID);
    }
    checker(first_element);
  };

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

  return (
    <Box key={problem.id}>
      <div className="columnOne">
        <b>Case Study: </b>
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
          ? mergedData.map((m) => (
              <Results>
                <div>
                  {m.type.toLowerCase() == "newtest" && (
                    <div className="question">
                      <div>
                        <b>Quiz</b>
                      </div>
                      <div>
                        {parse(
                          newTests.find((nt) => nt.id === m.id).question[0]
                        )}
                      </div>
                      <div>⬇️</div>
                      <>
                        {m.results.map((t) =>
                          t.answerArray ? (
                            <Block>
                              {arraysHaveSameItem(
                                t.answerArray,
                                filterByTruthiness(
                                  newTests.find((nt) => nt.id === m.id).answers,
                                  newTests.find((nt) => nt.id === m.id).correct
                                )
                              )
                                ? "✅"
                                : "❌"}{" "}
                              {t.answerArray.map((item) => parse(item))}(
                              {moment(t.createdAt).format("LLL")})
                            </Block>
                          ) : (
                            <Block>
                              {t.answer ==
                              getAllTrueValues(
                                newTests.find((nt) => nt.id === m.id).answers,
                                newTests.find((nt) => nt.id === m.id).correct
                              ).join(", ")
                                ? "✅"
                                : "❌"}{" "}
                              {stringToArray(t.answer).map(
                                (el) => parse(el) + ", "
                              )}
                              <br />({moment(t.createdAt).format("LLL")})
                            </Block>
                          )
                        )}
                      </>
                    </div>
                  )}
                  {m.type.toLowerCase() == "quiz" && (
                    <div className="question">
                      <div>
                        <b>Question</b>
                      </div>
                      <div>
                        {parse(quizes.find((q) => q.id === m.id).question)}
                      </div>
                      <div className="arrow">⬇️</div>
                      <div>
                        {m.results.map((t) => (
                          <div className="result">
                            <div className="standard">
                              {t.correct && t.correct == true
                                ? "✅ Marked as correct"
                                : "❌ Marked as wrong"}
                            </div>
                            <b>Student answer: </b>
                            {t.answer}
                            <div className="standard">
                              <b>Comment: </b> {t.comment}
                              <br />
                              <b>Hint:</b> {t.hint}
                              <br />
                              <b>Explanation:</b> {t.explanation}
                              <br />
                              <b>Improvement:</b> {t.improvement}
                              {/* {console.log("t", t)} */}
                            </div>
                            <div className="time">
                              {moment(t.createdAt).format("LLL")}{" "}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Results>
            ))
          : null}
      </div>
    </Box>
  );
};

export default ProblemModal;
