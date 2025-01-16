import { useState, useMemo } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";

// MiniTest–style elements
import { MiniAIButton } from "../../styles/commonElements/QuestionStyles";

// Test–style elements
import { Options } from "../styles/testStyles";

import AnswerOption from "../functions/AnswerOption";
const removePTags = (str) => str.replace(/<\/?p>/g, "");

// Styled components used in both parts:
const Styles = styled.div`
  width: 100%;
  font-size: 1.4rem;
  .studentsWording {
    width: 100%;
    margin: 10px 0;
    .studentsWordingHeader {
      margin-bottom: 5px;
      font-size: 1.4rem;
    }
  }
  .correct_text {
    margin: 10px 0;
    font-size: 1.4rem;
    padding: 10px 15px;
    border: 2px solid #cbe7d4;
    border-radius: 10px;
  }
  .incorrect_text {
    margin: 10px 0;
    font-size: 1.4rem;
    padding: 10px 15px;
    border: 2px solid #f3f3f3;
    border-radius: 10px;
  }
`;
const Comment = styled.div`
  border: 2px solid #f3f3f3;
  padding: 7px 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  min-height: 120px;
  max-height: 250px;
  overflow-y: auto;
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

const IntegratedTest = (props) => {
  const {
    // Props shared between components (adjust as needed)
    question,
    // From MiniTest:
    mes, // e.g. a string representing the student’s answer (for the bubble)
    showAnswer,
    correctAnswer,
    // From Test:
    answerState, // "right", "wrong", etc.
    answerOptions, // The answer options array for AnswerOption component
    getTestData, // Function called when an answer option is selected
    revealCorrectAnswer, // Function to reveal the correct answer
    commentsList,
    ifRight,
    ifWrong,
  } = props;

  const { t } = useTranslation("lesson");

  // States from both components:
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const renderCorrectAnswer = showAnswer && (
    <Comment>
      <b>{t("correct_answer")}:</b>
      <div>{parse(sanitizedCorrectAnswer)}</div>
    </Comment>
  );

  const renderButtons = useMemo(() => {
    return (
      <ButtonsBox>
        <MiniAIButton
          className="button"
          id="but1"
          onClick={(e) => {
            e.preventDefault();
            props.passTestData("TEST");
          }}
        >
          {t("check")}
        </MiniAIButton>

        {(answerState === "right" || answerState === "wrong") && (
          <MiniAIButton
            onClick={() => {
              setIsAnswerShown(true);
              revealCorrectAnswer(true);
            }}
          >
            Show correct answer
          </MiniAIButton>
        )}
      </ButtonsBox>
    );
  }, [answerState, revealCorrectAnswer]);

  return (
    <Styles>
      <div className="studentsWording">
        <div className="studentsWordingHeader">
          {question && question[0] ? parse(question[0]) : null}
        </div>
        <Options>
          {mes.map((answer, index) => (
            <AnswerOption
              stop={answerState === "right"}
              answerOption={answerOptions[index]}
              true={props.true[index]}
              hidden={!isAnswerShown}
              key={index}
              answer={answer[0]}
              correct={answer[1]}
              number={index}
              answerState={answerState}
              onAnswerSelected={getTestData}
            />
          ))}
        </Options>
        {renderCorrectAnswer}
      </div>

      {renderButtons}

      {answerState === "right" && (
        <div className="correct_text">
          {/* 1. result indication */}
          {"🎉" + "  " + t("correct") + "!"}
          {/* 2. available comments */}
          {commentsList?.length > 0 &&
            commentsList?.map((com, i) => {
              return com ? parse(com) : null;
            })}
        </div>
      )}
      {answerState === "wrong" && !isAnswerShown && (
        <div className="incorrect_text">
          {/* 1. result indication */}
          {"🔎 " + "  " + t("wrong") + "..."}
          {/* 2. available comments */}
          {commentsList?.length > 0 &&
            commentsList?.map((com, i) => {
              return com ? parse(com) : null;
            })}
        </div>
      )}
    </Styles>
  );
};

export default IntegratedTest;
