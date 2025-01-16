import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";

import DeleteSingleQuiz from "./DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";
import OpenQuestion from "./questionTypes/OpenQuestion";
import Form from "./questionTypes/Form";
import Generate from "./questionTypes/Generate";
import Prompt from "./questionTypes/Prompt";
import FindAll from "./questionTypes/FindAll";
import CallSimulation from "./questionTypes/CallSimulation";
import ComplexQuestion from "./questionTypes/ComplexQuestion";
import { SecondaryButton } from "../styles/DevPageStyles";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "100%"};
  font-weight: 500;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 95%;
    font-size: 1.6rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const SingleQuiz = (props) => {
  const [update, setUpdate] = useState(false);
  const [isMoveMade, setIsMoveMade] = useState(false);

  const { t } = useTranslation("lesson");

  const {
    me,
    story,
    complexity,
    ifWrong,
    ifRight,
    check,
    author,
    isOrderOfAnswersImportant,
    shouldAnswerSizeMatchSample,
    studentAnswerPassedFromAnotherComponent,
    openQuestionType,
  } = props;

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // this function is responsible for moving through the problem
  const onMove = (result) => {
    // helper function to handle getData
    if (props.passResultToTextEditor) {
      props.passResultToTextEditor(result);
    }

    const handleGetData = (resultBool) => {
      if (!props.getData) return;

      const nextStep = props.next?.[resultBool] || "finish";
      props.getData([resultBool, nextStep]);
    };

    if (isMoveMade) {
      return;
    }

    // first we check the type of the problem
    if (props.problemType === "ONLY_CORRECT") {
      if (result === "true") {
        handleGetData(true);
        setIsMoveMade(true);
      }
      // if result is "false", we do nothing
    } else {
      if (result === "true" || result === "false") {
        handleGetData(result === "true");
        setIsMoveMade(true);
      }
    }
  };

  const toggleUpdate = useCallback(() => {
    setUpdate((prev) => !prev);
  }, []);

  const getResult = (data) => {
    props.getResult(data);
  };
  const switchUpdate = () => {
    setUpdate(!update);
  };
  let width;
  if (props.questionFormat == "mini") {
    width = "100%";
  } else {
    width = "570px";
  }

  return (
    <Styles width={width} id={props.quizID}>
      {/* 1. Settings part */}
      {me && !story ? (
        <Buttons>
          <SecondaryButton onClick={toggleUpdate}>
            {!update ? t("update") : t("back")}
          </SecondaryButton>
          <DeleteSingleQuiz
            id={me.id}
            quizID={props.quizID}
            lessonID={props.lessonID}
          />
        </Buttons>
      ) : null}
      {!update && (
        <>
          {(props.type?.toLowerCase() == "test" || props.type === null) && (
            <OpenQuestion
              id={props.quizID}
              question={props.question || "No question provided."}
              author={author}
              me={me}
              check={props.check}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              context={props.context}
              image={props.image}
              jsonStoryString={props.jsonStoryString}
              instructorName={props.instructorName}
              openQuestionType={openQuestionType}
              studentAnswerPassedFromAnotherComponent={
                studentAnswerPassedFromAnotherComponent
              }
              isScoringShown={props.isScoringShown}
            />
          )}
          {props.type?.toLowerCase() == "form" && (
            <Form
              question={props.question || "No question provided."}
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
              isScoringShown={props.isScoringShown}
            />
          )}
          {props.type?.toLowerCase() == "generate" && (
            <Generate
              question={props.question || "No question provided."}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              isScoringShown={props.isScoringShown}
            />
          )}
          {props.type?.toLowerCase() == "prompt" && (
            <Prompt
              question={props.question || "No question provided."}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
              isScoringShown={props.isScoringShown}
            />
          )}
          {props.type?.toLowerCase() == "findall" && (
            <FindAll
              question={props.question || "No question provided."}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
              problemType={props.problemType}
              isScoringShown={props.isScoringShown}
            />
          )}
          {props.type?.toLowerCase() == "complex" && (
            <ComplexQuestion
              question={props.question || "No question provided."}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
              problemType={props.problemType}
              isOrderOfAnswersImportant={isOrderOfAnswersImportant}
              shouldAnswerSizeMatchSample={shouldAnswerSizeMatchSample}
              isScoringShown={props.isScoringShown}
              check={props.check}
            />
          )}
          {props.type?.toLowerCase() == "call" && (
            <CallSimulation
              question={props.question || "No question provided."}
              author={author}
              me={me}
              story={story}
              goalType={props.goalType}
              answer={props.answer}
              answers={props.answers || []}
              ifWrong={props.ifWrong}
              ifRight={props.ifRight}
              lessonId={props.lessonID}
              quizId={props.quizID}
              passResult={onMove}
              name={props.name}
              image={props.image}
              problemType={props.problemType}
              isScoringShown={props.isScoringShown}
            />
          )}
        </>
      )}
      {update && (
        <UpdateQuiz
          quizId={props.id}
          lessonID={props.lessonID}
          answer={props.answer}
          answers={props.answers || []}
          lesson={props.lesson}
          question={props.question || "No question provided."}
          name={props.name}
          image={props.image}
          type={props.type || undefined}
          isOrderOfAnswersImportant={isOrderOfAnswersImportant}
          shouldAnswerSizeMatchSample={shouldAnswerSizeMatchSample}
          isScoringShown={props.isScoringShown}
          goalType={props.goalType}
          complexity={complexity}
          ifRight={ifRight}
          ifWrong={ifWrong}
          next={props.next}
          check={check}
          getResult={getResult}
          switchUpdate={switchUpdate}
        />
      )}
    </Styles>
  );
};

export default SingleQuiz;
