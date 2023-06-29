import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import Note from "../notes/Note";

const TEAM_RESULTS = gql`
  query questResults($lessonId: String!, $list_of_ids: [String!]) {
    questResults(lessonId: $lessonId, list_of_ids: $list_of_ids) {
      testResults {
        id
        answer
        test {
          id
          question
        }
        student {
          id
          name
          surname
        }
        createdAt
      }
      quizResults {
        id
        correct
        student {
          id
          name
          surname
        }
        quiz {
          id
        }
        answer
        createdAt
      }
    }
  }
`;

const Concealed = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  position: relative;
  .task {
    border-bottom: 2px solid #f3f3f3;
    width: 100%;
    margin-bottom: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
  }
  #open {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    position: absolute;
    box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    -webkit-box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    -moz-box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    border-radius: 10px;
    top: 30%;
    left: 25%;
    img {
      width: 100px;
      margin: 20px 0;
      filter: blur(0px);

      /* Start the shake animation and make the animation last for 0.5 seconds */
    }
    img {
      /* Start the shake animation and make the animation last for 0.5 seconds */
      animation: ${(props) => (props.shiver ? "shake 1s" : "none")};
    }
    @keyframes shake {
      0% {
        transform: translate(1px, 1px) rotate(0deg);
      }
      10% {
        transform: translate(-1px, -2px) rotate(-1deg);
      }
      20% {
        transform: translate(-3px, 0px) rotate(1deg);
      }
      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }
      40% {
        transform: translate(1px, -1px) rotate(1deg);
      }
      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }
      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }
      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }
      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }
      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }
      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }
    #button {
      margin-bottom: 20px;
      border: 1px solid #04377f;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

const Secret = styled.div`
  margin: 0 10px;
  filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")};
`;

const Interactive = (props) => {
  const { tasks, lesson, me, my_team } = props;
  const { t } = useTranslation("lesson");

  let list_of_ids = [];
  my_team.users.map((u) => list_of_ids.push(u.id));
  const { loading, error, data } = useQuery(TEAM_RESULTS, {
    variables: { lessonId: lesson.id, list_of_ids: list_of_ids },
  });
  if (loading) return "";
  props.getResults(data.questResults);
  let completed_tests = data.questResults.testResults;
  let completed_quizzes = data.questResults.quizResults;

  let numbered_users = [];

  my_team.users
    // sort(function (a, b) {
    //   if (a.surname[0] > b.surname[0]) {
    //     return -1;
    //   }
    //   if (b.surname[0] > a.surname[0]) {
    //     return 1;
    //   }
    //   return 0;
    // }).
    .map((us, i) => {
      let num = i % tasks.length;
      let new_us = { ...us };
      new_us["number"] = num;
      numbered_users.push(new_us);
    });

  // console.log("numbered_users", numbered_users);
  return (
    <div>
      {[...tasks].map((com, i) => {
        let el;
        if (com.type.toLowerCase() === "quiz") {
          el = lesson.quizes.find((quiz) => quiz.id === com.value);
          let quizResults = completed_quizzes.filter(
            (ct) => ct.quiz.id == el.id
          );
          let isRevealed =
            me.id == numbered_users.filter((nu) => nu.number == i)[0].id ||
            quizResults.length > 0;

          return (
            <Concealed isRevealed={isRevealed}>
              <div className="task">
                <div>
                  <b>
                    {t("task_for")}:{" "}
                    {numbered_users.filter((nu) => nu.number == i)[0].name}{" "}
                    {numbered_users.filter((nu) => nu.number == i)[0].surname}
                  </b>
                </div>
                <div>
                  Статус задания: {quizResults.length > 0 ? "✅" : "❌"}
                </div>
              </div>
              <Secret isRevealed={isRevealed}>
                <SingleQuiz
                  id={el.id}
                  index={1}
                  key={el.id}
                  type={el.type}
                  check={el.check}
                  question={el.question}
                  answer={el.answer}
                  ifRight={el.ifRight}
                  ifWrong={el.ifWrong}
                  me={me}
                  hidden={true}
                  userData={[]}
                  lessonID={lesson.id}
                  quizID={el.id}
                  user={el.user.id}
                  user_name={el.user}
                  next={el.next}
                  //   getData={updateArray}
                  exam={true}
                  story={true}
                  author={lesson.user}
                  //   getResults={getResults}
                />
              </Secret>
              {!isRevealed && (
                <div id="open">
                  <img src="static/lock.svg" />
                </div>
              )}
            </Concealed>
          );
        } else if (com.type.toLowerCase() === "newtest") {
          el = lesson.newTests.find((test) => test.id === com.value);
          let testResults = completed_tests.filter((ct) => ct.test.id == el.id);

          let isRevealed =
            me.id == numbered_users.filter((nu) => nu.number == i)[0].id ||
            testResults.length > 0;
          console.log("isRevealed", isRevealed, testResults.length > 0);
          return (
            <Concealed isRevealed={isRevealed}>
              <div className="task">
                <div>
                  <b>
                    {t("task_for")}:{" "}
                    {numbered_users.filter((nu) => nu.number == i)[0].name}{" "}
                    {numbered_users.filter((nu) => nu.number == i)[0].surname}
                  </b>
                </div>
                <div>
                  Статус задания: {testResults.length > 0 ? "✅" : "❌"}
                </div>
              </div>
              <Secret isRevealed={isRevealed}>
                <SingleTest
                  key={el.id}
                  id={el.id}
                  testID={el.id}
                  question={el.question}
                  answers={el.answers}
                  true={el.correct}
                  ifRight={el.ifRight}
                  ifWrong={el.ifWrong}
                  user={el.user.id}
                  user_name={el.user}
                  type={el.type}
                  me={me}
                  lessonID={lesson.id}
                  length={Array(el.correct.length).fill(false)}
                  userData={[]}
                  //   getData={updateArray}
                  next={el.next}
                  story={true}
                  exam={true}
                  author={lesson.user}
                  //   getResults={getResults}
                />
              </Secret>
              {!isRevealed && (
                <div id="open">
                  <img src="static/lock.svg" />
                </div>
              )}
            </Concealed>
          );
        }
      })}
    </div>
  );
};

export default Interactive;
