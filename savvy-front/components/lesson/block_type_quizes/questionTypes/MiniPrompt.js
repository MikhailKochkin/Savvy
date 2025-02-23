import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import {
  MiniOpenQuestionFrame,
  MiniAIButton,
} from "../../styles/commonElements/QuestionStyles";

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
  min-height: 120px;

  max-height: 250px;
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

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const MiniQuestion = (props) => {
  const { id, answerText, question, studentAnswerPassedFromAnotherComponent } =
    props;
  const [generating, setGenerating] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [recommendation, setRecommendation] = useState(null);
  const { t } = useTranslation("lesson");

  const renderRecommendation = () => {
    if (!generating && recommendation) {
      return <Comment>{recommendation ? parse(recommendation) : null}</Comment>;
    }
    return null;
  };

  const renderButtons = () => {
    return (
      <ButtonsBox>
        <MiniAIButton
          onClick={async (e) => {
            e.preventDefault();
            if (answerText == "") {
              alert("No input found");
            } else {
              setGenerating(true);
              const res1 = await props.generateFeedback(e);
              setRecommendation(res1.feedback);
              setGenerating(false);
              setHidden(false);
            }
          }}
        >
          {t("check")}
        </MiniAIButton>
      </ButtonsBox>
    );
  };

  return (
    <Styles id={id} key={"mini_question_" + id}>
      <div className="studentsWording">
        <div className="studentsWordingHeader">{parse(question)}</div>
        <MiniOpenQuestionFrame inputColor="#F3F3F3">
          <StudentAnswerBubble>
            {parse(studentAnswerPassedFromAnotherComponent)}
          </StudentAnswerBubble>
        </MiniOpenQuestionFrame>
        {generating && (
          <Progress2>
            <TailSpin width="35" color="#2E80EC" />
          </Progress2>
        )}
        {renderRecommendation()}
      </div>
      {renderButtons()}
    </Styles>
  );
};

export default MiniQuestion;
