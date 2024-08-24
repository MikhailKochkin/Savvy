import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Block from "./Block";
import UpdateQuestionsChain from "./UpdateQuestionsChain";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  min-height: 50vh;
  margin: 50px 0;
  /* width: 90%; */
  width: 620px;

  img {
    width: 100%;
  }
  button {
    background-color: #b9adff;
    border-radius: 5px;
    border: 1px solid #b9adff;
    color: #fff;
    height: 40px;
    width: 250px;
    font-size: 1.7rem;
    font-family: Montserrat;
    cursor: pointer;
    margin-top: 20px;
    transition: all ease-in 0.3s;
    &:hover {
      background: #8b78ff;
      border: 1px solid #8b78ff;
    }
  }
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Box = styled.div`
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const shuffle = (array) => {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const TestPractice = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  let tests = [...props.tests];
  let quizes = [...props.quizes];
  const passResult = (val) => {};
  let filtered_tests = tests.filter((t) =>
    props.testPractice.tasks.includes(t.id)
  );
  let filtered_quizes = quizes.filter((q) =>
    props.testPractice.tasks.includes(q.id)
  );
  const { t } = useTranslation("lesson");

  const shuffled_tasks = shuffle([...filtered_tests, ...filtered_quizes]);

  const sliced_tasks = shuffled_tasks.slice(0, props.testPractice.tasksNum);
  const restart = () => setStart(false);

  const [start, setStart] = useState(false);

  let width;
  if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <>
      {!start && (
        <Container width={width} id={props.testPractice.id}>
          <img src="/static/test_pattern.svg" />
          <h2>{t("practice")}</h2>
          <div>
            {props.testPractice.intro
              ? parse(props.testPractice.intro)
              : t("practice_explainer")}
          </div>
          <button onClick={(e) => setStart(true)}>{t("start")}</button>
        </Container>
      )}
      {start && (
        <Container>
          <Block
            id={props.testPractice.id}
            tasks={sliced_tasks}
            passResult={passResult}
            tasksNum={props.testPractice.tasksNum}
            successText={props.testPractice.successText}
            failureText={props.testPractice.failureText}
            lesson={props.lesson}
            me={props.me}
            restart={restart}
            quizResults={props.quizResults}
            testResults={props.testResults}
            context={props.context}
          />
        </Container>
      )}
      {!props.story && (
        <button onClick={(e) => setIsUpdated(!isUpdated)}>Update</button>
      )}
      {isUpdated && (
        <UpdateQuestionsChain
          testPractice={props.testPractice}
          lesson={props.lesson}
          isUpdated={isUpdated}
          lessonId={props.lesson.id}
        />
      )}
    </>
  );
};

export default TestPractice;
