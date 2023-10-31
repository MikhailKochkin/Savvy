import React, { Component } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.6rem;
  p {
    margin: 5px 0;
  }
  h2 {
    margin: 15px 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    /* border-bottom: 2px solid #edefed; */
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  .answer_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  li {
    flex: 50%;
  }
  div {
    flex: 50%;
    padding: 0;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
`;

const Block = styled.div`
  padding: 2% 0;
  margin-bottom: 15px;
  border-bottom: ${(props) =>
    props.final ? "1px solid #edefed" : "1px solid #edefed"};
  background: ${(props) => (props.color ? "#b5e48c" : "#fff")};
`;

const TestResult = (props) => {
  const getAllTrueValues = (answers, correctInfo) => {
    let arr = [];
    answers.map((an, index) => {
      if (correctInfo[index]) {
        arr.push(an);
      }
    });
    return arr;
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

  const stringToArray = (str) => {
    return str.split(/\s*,\s*/).map((item) => item.trim());
  };

  const { newTests, student, results } = props;
  moment.locale("ru");
  return (
    <Container>
      {newTests.length > 0 &&
        newTests.map((test) => {
          return (
            <Box>
              <div>
                <h2>Quiz </h2>
                {parse(test.question[0])}
                <div>
                  <b>Type:</b> {test.type == "FORM" ? "Form" : "Quiz"}
                </div>
                <div>
                  <ul>
                    {test.answers.map((t, i) => (
                      <li>
                        <div className="answer_box">
                          <div>{parse(t)}</div>{" "}
                          {test.type !== "FORM" && (
                            <div>{test.correct[i] ? "✅" : "❌"}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="column">
                <p>
                  <b>Student's answers: </b>
                </p>
                {results && results.length > 0 ? (
                  results
                    .filter((r) => r.test.id === test.id)
                    .map((t, i) =>
                      t.answerArray ? (
                        <Block final={i == results.length - 1}>
                          {test.type !== "FORM"
                            ? arraysHaveSameItem(
                                t.answerArray,
                                filterByTruthiness(test.answers, test.correct)
                              )
                              ? "✅"
                              : "❌"
                            : null}{" "}
                          {t.answerArray.map((item) => parse(item))}
                          <br />({moment(t.createdAt).format("LLL")})
                        </Block>
                      ) : (
                        <Block final={i == results.length - 1}>
                          {test.type !== "FORM"
                            ? t.answer ==
                              getAllTrueValues(test.answers, test.correct).join(
                                ", "
                              )
                              ? "✅"
                              : "❌"
                            : null}{" "}
                          {stringToArray(t.answer).map(
                            (el) => parse(el) + ", "
                          )}
                          <br />({moment(t.createdAt).format("LLL")})
                        </Block>
                      )
                    )
                ) : (
                  <span>No data found</span>
                )}
              </div>
            </Box>
          );
        })}
    </Container>
  );
};

export default TestResult;
