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
import Junction from "./questionTypes/Junction";
import { SecondaryButton, Buttons } from "../styles/DevPageStyles";

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
    pushNextElementToProblem,
    problemType,
    type,
    question,
    answer,
    answers,
    goalType,
    lessonID,
    quizID,
    image,
    name,
    jsonStoryString,
    instructorId,
    isScoringShown,
    next,
    passResultToTextEditor,
    getResult: parentGetResult,
    lesson,
    characters,
  } = props;
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // Toggle update mode
  const toggleUpdate = useCallback(() => {
    setUpdate((prev) => !prev);
  }, []);

  // Move to next problem step
  const passQuizDataToParent = (result, type) => {
    if (isMoveMade) return;

    // 1. Text Editor Scenario. Pass result to parent if required
    if (passResultToTextEditor) {
      passResultToTextEditor(result);
    }

    // 2. Problem scenario.

    const handleGetData = (resultBool, branchSourceId = null) => {
      if (!pushNextElementToProblem) return;

      // === Approach 1: Old one – Element knows what element goes next ===
      if (next) {
        const nextStep = next[resultBool] || "finish";
        pushNextElementToProblem([resultBool, nextStep]);
        return;
      }

      // === Approach 2: New one – Problem handles flow logic ===
      // We only pass:
      // 1. resultBool (true/false) –> always true
      // 2. branchSourceId if applicable (e.g., branch scenario)
      pushNextElementToProblem(
        [resultBool, branchSourceId],
        branchSourceId ? "branch" : "regular"
      );
    };
    // Handle move based on problem type
    if (problemType === "ONLY_CORRECT") {
      if (result === "true") {
        handleGetData(true);
        setIsMoveMade(true);
      }
    } else if (problemType === "FLOW") {
      handleGetData(true, result[1]);
    } else {
      if (result[0] === "true" || result[0] === "false") {
        handleGetData(result[0] === "true");
        setIsMoveMade(true);
      }
    }
  };

  const moveBranch = (data) => {
    pushNextElementToProblem([true, next?.true || "finish"]);
  };

  // Pass result up to parent component if needed
  const handleGetResult = (data, type = null) => {
    if (parentGetResult) {
      parentGetResult(data, type);
    }
  };

  const width = props.questionFormat === "mini" ? "100%" : "570px";

  // Components map based on type
  const renderQuizComponent = () => {
    const commonProps = {
      id: quizID,
      question: question || "No question provided.",
      author,
      me,
      story,
      goalType,
      answer,
      answers: answers || [],
      ifWrong,
      ifRight,
      lessonId: lessonID,
      quizId: quizID,
      passQuizDataToParent,
      name,
      image,
      isScoringShown,
    };

    switch (type?.toLowerCase()) {
      case "form":
        return <Form {...commonProps} />;
      case "generate":
        return <Generate {...commonProps} />;
      case "branch":
        return <Junction {...commonProps} />;
      case "prompt":
        return (
          <Prompt
            {...commonProps}
            openQuestionType={openQuestionType}
            instructorId={instructorId}
            studentAnswerPassedFromAnotherComponent={
              studentAnswerPassedFromAnotherComponent
            }
          />
        );
      case "findall":
        return <FindAll {...commonProps} problemType={problemType} />;
      case "complex":
        return (
          <ComplexQuestion
            {...commonProps}
            problemType={problemType}
            isOrderOfAnswersImportant={isOrderOfAnswersImportant}
            shouldAnswerSizeMatchSample={shouldAnswerSizeMatchSample}
            check={check}
          />
        );
      case "call":
        return <CallSimulation {...commonProps} problemType={problemType} />;
      case "test":
      default:
        return (
          <OpenQuestion
            {...commonProps}
            check={check}
            jsonStoryString={jsonStoryString}
            instructorId={instructorId}
            studentAnswerPassedFromAnotherComponent={
              studentAnswerPassedFromAnotherComponent
            }
            openQuestionType={openQuestionType}
          />
        );
    }
  };

  return (
    <Styles width={width} id={quizID}>
      {/* Admin Controls */}
      {me && !story && (
        <Buttons gap="20px" margin="20px 0">
          <SecondaryButton onClick={toggleUpdate}>
            {update ? t("back") : t("update")}
          </SecondaryButton>
          <DeleteSingleQuiz id={me.id} quizID={quizID} lessonID={lessonID} />
        </Buttons>
      )}

      {/* Update Mode */}
      {update && (
        <UpdateQuiz
          quizId={props.id}
          lessonID={lessonID}
          answer={answer}
          answers={answers || []}
          lesson={lesson}
          question={question || "No question provided."}
          name={name}
          characters={characters}
          image={image}
          type={type || undefined}
          isOrderOfAnswersImportant={isOrderOfAnswersImportant}
          shouldAnswerSizeMatchSample={shouldAnswerSizeMatchSample}
          isScoringShown={isScoringShown}
          goalType={goalType}
          complexity={complexity}
          ifRight={ifRight}
          ifWrong={ifWrong}
          next={next}
          check={check}
          getResult={handleGetResult}
          switchUpdate={toggleUpdate}
        />
      )}

      {/* Display Quiz Component based on Type */}
      {!update && renderQuizComponent()}
    </Styles>
  );
};

export default SingleQuiz;
