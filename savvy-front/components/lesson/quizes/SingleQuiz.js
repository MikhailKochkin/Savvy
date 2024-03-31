import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";

import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";
import Chat from "../questions/Chat";
import NextQuestions from "./NextQuestions";
import OpenQuestion from "./OpenQuestion";
import Form from "./Form";
import Generate from "./Generate";
import Prompt from "./Prompt";
import FindAll from "./FindAll";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 570px;
  font-weight: 500;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    font-size: 1.6rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const SingleQuiz = (props) => {
  const [nextQuestions, setNextQuestions] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const onMove = (result) => {
    // 1. if the data is sent for the first time
    // 2. and if we get the right answer
    if (result === "true" && props.getData) {
      // 3. and if this quiz is a part of an exam
      props.getData(
        props.next && props.next.true
          ? [true, props.next.true]
          : [true, { type: "finish" }],
        "true"
      );
    }
    // 2. and if we get the wrong answer
    else if (result === "false" && props.getData) {
      // 3. and if this quiz is a part of an exam
      // 4. we transfer the "false" data to the exam component
      props.getData(
        props.next && props.next.false
          ? [false, props.next.false]
          : [false, { type: "finish" }]
      );
    }
  };

  const { t } = useTranslation("lesson");

  const {
    me,
    user,
    exam,
    story,
    complexity,
    ifWrong,
    ifRight,
    check,
    miniforum,
    lesson,
    author,
    answers,
  } = props;

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <Styles width={width} id={props.quizID}>
      {/* 1. Settings part */}
      <Buttons>
        {!exam && !story && (
          <button onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </button>
        )}
        {me && !props.exam && !props.story ? (
          <DeleteSingleQuiz
            id={me.id}
            quizID={props.quizID}
            lessonID={props.lessonID}
          />
        ) : null}
      </Buttons>
      {!update && (
        <>
          {props.type?.toLowerCase() == "test" && (
            <OpenQuestion
              id={props.quizID}
              question={props.question}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
            />
          )}
          {props.type?.toLowerCase() == "form" && (
            <Form
              question={props.question}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
            />
          )}
          {props.type?.toLowerCase() == "generate" && (
            <Generate
              question={props.question}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
            />
          )}
          {props.type?.toLowerCase() == "prompt" && (
            <Prompt
              question={props.question}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
            />
          )}
          {props.type?.toLowerCase() == "findall" && (
            <FindAll
              question={props.question}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
            />
          )}
        </>
      )}
      {nextQuestions && nextQuestions.length > 0 && (
        <NextQuestions
          nextQuestions={nextQuestions}
          lesson={lesson}
          me={me}
          author={author}
        />
      )}
      {update && (
        <UpdateQuiz
          quizId={props.id}
          lessonID={props.lessonID}
          answer={props.answer}
          answers={props.answers}
          lesson={props.lesson}
          question={props.question}
          name={props.name}
          image={props.image}
          type={props.type}
          goalType={props.goalType}
          complexity={complexity}
          ifRight={ifRight}
          ifWrong={ifWrong}
          next={props.next}
          check={check}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </Styles>
  );
};

export default SingleQuiz;
