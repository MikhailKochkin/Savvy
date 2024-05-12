import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import {
  ResultCircle,
  MiniOpenQuestionFrame,
  MiniAIButton,
} from "../QuestionStyles";
import { removeSpecialChars } from "../../SimulatorDevelopmentFunctions";

const Styles = styled.div`
  font-size: 1.4rem;
  .studentsWording {
    width: 100%;
    margin: 10px 0;
    .studentsWordingHeader {
      margin-bottom: 5px;
      font-size: 1.4rem;
    }
  }
`;

const StudentAnswerBubble = styled.div`
  border: none;
  width: 90%;
  padding: 7px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  min-height: 35px;
`;

const Comment = styled.div`
  border: 2px solid #f3f3f3;
  padding: 7px 10px;
  border-radius: 10px;
  border-color: #f3f3f3;
  margin-bottom: 15px;
  height: 250px;
  overflow-y: auto; /* Add overflow property to make it scrollable */
  p {
    margin: 8px 0;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-top: 1px solid #dadce0;
  padding-top: 10px;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const MiniQuestion = (props) => {
  const {
    id,
    question,
    hints,
    inputColor,
    passAnswer,
    result,
    progress,
    correctnessLevel,
    explanations,
    getExplanation,
    getHint,
    improvements,
    getImprovements,
    studentAnswerPassedFromAnotherComponent,
    explanationsNum,
    improvementsNum,
    isAnswerBeingChecked,
  } = props;

  const [hidden, setHidden] = useState(true);
  const [generatingHint, setGeneratingHint] = useState(false);
  const [generatingExplanation, setGeneratingExplanation] = useState(false);
  const [generatingImprovement, setGeneratingImprovement] = useState(false);

  const { t } = useTranslation("lesson");

  useEffect(() => {
    passAnswer(studentAnswerPassedFromAnotherComponent);
  }, [studentAnswerPassedFromAnotherComponent]);

  const renderHint = () => {
    if (!generatingHint && hints.length > 0) {
      return (
        <Comment>
          <div>
            <b>Hint:</b>
          </div>
          {parse(hints[hints.length - 1])}
        </Comment>
      );
    }
    return null;
  };

  const renderExplanation = () => {
    if (!generatingExplanation && explanations.length > 0) {
      return (
        <Comment>
          <div>
            <b>Explanation:</b>
          </div>
          {parse(explanations[explanations.length - 1])}
        </Comment>
      );
    }
    return null;
  };

  const renderImprovement = () => {
    if (!generatingImprovement && improvements.length > 0) {
      return (
        <Comment>
          <div>
            <b>Improvement idea:</b>
          </div>
          {parse(improvements[improvements.length - 1])}
        </Comment>
      );
    }
    return null;
  };

  const renderCorrectAnswer = () => {
    if (!hidden) {
      return (
        <Comment>
          <b>Correct answer:</b>
          <div>{parse(removeSpecialChars(props.correctAnswer))}</div>
        </Comment>
      );
    }
    return null;
  };

  const renderButtons = () => {
    return (
      <ButtonsBox>
        <MiniAIButton onClick={(e) => props.onAnswer()}>Check</MiniAIButton>
        <MiniAIButton
          onClick={async (e) => {
            setGeneratingHint(true);
            let res = await getHint(e);
            setGeneratingHint(false);
          }}
        >
          {t("i_need_a_hint")}
        </MiniAIButton>
        {(correctnessLevel === "completely_wrong" ||
          correctnessLevel === "wrong" ||
          correctnessLevel === "slightly_wrong") && (
          <MiniAIButton
            onClick={async (e) => {
              setGeneratingExplanation(true);
              let res = await getExplanation(e);
              setGeneratingExplanation(false);
            }}
          >
            {explanations.length == 0
              ? t("explain_what_is_wrong_with_my_answer")
              : t("more_explanations")}
          </MiniAIButton>
        )}
        {correctnessLevel === "looks_true" && (
          <MiniAIButton
            onClick={async (e) => {
              setGeneratingImprovement(true);
              let res = await getImprovements(e);
              setGeneratingImprovement(false);
            }}
          >
            {improvements.length == 0
              ? t("what_can_i_improve")
              : t("more_improvements")}
          </MiniAIButton>
        )}
        {(explanationsNum > 1 ||
          improvementsNum > 1 ||
          correctnessLevel === "true") && (
          <MiniAIButton
            onClick={async (e) => {
              setHidden(false);
              props.revealCorrectAnswer();
            }}
          >
            Show correct answer
          </MiniAIButton>
        )}
      </ButtonsBox>
    );
  };

  return (
    <Styles id={id} key={"mini_question_" + id}>
      <div className="studentsWording">
        <div className="studentsWordingHeader">{parse(question)}</div>
        <MiniOpenQuestionFrame inputColor={inputColor}>
          <StudentAnswerBubble>
            {studentAnswerPassedFromAnotherComponent}
          </StudentAnswerBubble>
          {result && (
            <ResultCircle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("answer_above_65")}
              data-tooltip-place="right"
              inputColor={inputColor}
            >
              {parseInt(result)}
            </ResultCircle>
          )}
        </MiniOpenQuestionFrame>
        {renderHint()}
        {(generatingExplanation || generatingImprovement || generatingHint) && (
          <Progress2>
            <TailSpin width="35" color="#2E80EC" />
          </Progress2>
        )}
        {isAnswerBeingChecked && (
          <Progress>
            <TailSpin width="35" color="#2E80EC" />
          </Progress>
        )}
        {renderExplanation()}
        {renderImprovement()}
        {renderCorrectAnswer()}
      </div>
      {renderButtons()}
    </Styles>
  );
};

export default MiniQuestion;
