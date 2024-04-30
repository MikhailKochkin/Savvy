import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import {
  ResultCircle,
  MiniOpenQuestionFrame,
  MiniAIButton,
} from "./QuizesStyles";
import { removeSpecialChars } from "../SimulatorDevelopmentFunctions";

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
  border: 2px solid;
  padding: 7px 10px;
  border-radius: 10px;
  border-color: #d9dce0;
  margin-bottom: 15px;
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
  display: ${(props) => (props.display === "true" ? "flex" : "none")};
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
    story,
    author,
    me,
    answer,
    question,
    generating,
    inputColor,
    passAnswer,
    result,
    progress,
    correct,
    explanations,
    getExplanation,
    improvements,
    getImprovements,
    generatingExplanation,
    generatingImprovement,
    studentAnswerPassedFromAnotherComponent,
    explanationsNum,
    improvementsNum,
    AIExplanation,
    AIImprovement,
  } = props;
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const { t } = useTranslation("lesson");
  useEffect(() => {
    passAnswer(studentAnswerPassedFromAnotherComponent);
  }, [studentAnswerPassedFromAnotherComponent]);

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
        {(generatingExplanation || generatingImprovement) && (
          <Progress2>
            <TailSpin width="35" color="#2E80EC" />
          </Progress2>
        )}
        <Progress display={progress}>
          <TailSpin width="35" color="#2E80EC" />
        </Progress>
        {(correct === "false" || correct === "has_flaws") &&
        !generatingExplanation &&
        explanations.length > 0 ? (
          <Comment>{parse(explanations[explanations.length - 1])}</Comment>
        ) : null}
        {(correct === "true" || correct === "looks_true") &&
        !generatingImprovement &&
        improvements.length > 0 ? (
          <Comment>{AIImprovement ? parse(AIImprovement) : null}</Comment>
        ) : null}
        {!hidden && (
          <Comment>
            <b>Correct answer:</b>
            <div> {parse(removeSpecialChars(props.correctAnswer))}</div>
          </Comment>
        )}
      </div>
      <ButtonsBox>
        <MiniAIButton onClick={(e) => props.onAnswer()}>
          {/* {checking ? t("checking") : t("check")} */}
          Check
        </MiniAIButton>
        {(correct === "false" || correct === "has_flaws") && (
          <MiniAIButton onClick={async (e) => getExplanation(e)}>
            {explanations.length == 0
              ? t("explain_what_is_wrong_with_my_answer")
              : t("more_explanations")}
          </MiniAIButton>
        )}
        {correct === "looks_true" && (
          <MiniAIButton onClick={async (e) => getImprovements(e)}>
            {improvements.length == 0
              ? t("what_can_i_improve")
              : t("more_improvements")}
          </MiniAIButton>
        )}
        {(explanationsNum > 1 || improvementsNum > 1 || correct === "true") && (
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
    </Styles>
  );
};

export default MiniQuestion;
