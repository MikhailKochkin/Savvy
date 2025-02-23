import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";

import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import {
  Question,
  Answer_text,
  Button1,
  Frame,
} from "../../styles/commonElements/QuestionStyles";
import IconBlockElement from "../../styles/commonElements/IconBlockElement";

const Group = styled.div`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  pointer-events: ${(props) => (props.progress === "true" ? "none" : "auto")};
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  padding: 0.5% 0;
  margin-bottom: 20px;
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const FullPrompt = (props) => {
  const {
    author,
    me,
    story,
    instructorId,
    characters,
    answerText,
    passAnswerText,
  } = props;
  const [generating, setGenerating] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [recommendation, setRecommendation] = useState(null);

  const { t } = useTranslation("lesson");

  return (
    <Question story={story}>
      {/* 1 Question part */}
      <div className="question_box">
        <div className="question_text">{parse(props.question)}</div>
        <IconBlockElement
          instructorId={instructorId}
          author={author}
          characters={characters}
        />
      </div>
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      {/* 2. Answer bubble part */}
      <>
        <div className="answer">
          <IconBlockElement me={me} />
          <Frame inputColor="#F3F3F3">
            <Answer_text
              type="text"
              required
              value={answerText}
              onChange={(e) => {
                passAnswerText(e.target.value);
                autoResizeTextarea(e);
              }}
              onInput={autoResizeTextarea}
              placeholder="..."
            />
          </Frame>
        </div>
        <Group>
          <Button1
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
          </Button1>
        </Group>
      </>
      {/* 3. Comment bubble */}
      <div id={`ideal_answer_${props.id}`}></div>
      {!hidden && (
        <div className="question_box" id={`ideal_answer_${props.id}`}>
          <div className="question_text">{recommendation}</div>
          <IconBlockElement
            instructorId={instructorId}
            author={author}
            characters={characters}
          />
        </div>
      )}
    </Question>
  );
};

export default FullPrompt;
