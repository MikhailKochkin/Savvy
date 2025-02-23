import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";

import {
  guessAlphabet,
  autoResizeTextarea,
} from "../../SimulatorDevelopmentFunctions";
import IconBlockElement from "../../styles/commonElements/IconBlockElement";
import {
  Question,
  Answer_text,
  Frame,
  Button1,
} from "../../styles/commonElements/QuestionStyles";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $correct: Boolean
    $comment: String
    $hint: String
    $explanation: String
    $improvement: String
    $ideasList: QuizIdeasInput
  ) {
    createQuizResult(
      answer: $answer
      quiz: $quiz
      lessonId: $lessonId
      correct: $correct
      comment: $comment
      hint: $hint
      explanation: $explanation
      improvement: $improvement
      ideasList: $ideasList
    ) {
      id
    }
  }
`;

const Group = styled.div`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  pointer-events: ${(props) => (props.progress === "true" ? "none" : "auto")};
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  padding: 0.5% 0;
  margin-bottom: 20px;
`;

const OpenQuestion = (props) => {
  const { author, me, story, passQuizDataToParent, instructorId, characters } =
    props;
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [sent, setSent] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [recognition, setRecognition] = useState(null);
  const [startSpeech, setStartSpeech] = useState(false);

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const { t } = useTranslation("lesson");

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  const onSend = async (e) => {
    if (!sent) {
      createQuizResult({
        variables: {
          quiz: props.quizId,
          lessonId: props.lessonId,
          answer: answer,
          correct: false,
          comment: `Form question`,
        },
      });
      passQuizDataToParent(["true", undefined], "form");
      setHidden(false);
      setSent(true);
    }
  };

  const startListening = () => {
    const newRecognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    newRecognition.lang =
      guessAlphabet(props.question) === "Cyrillic" ? "ru-RU" : "en-US";
    newRecognition.interimResults = false;
    newRecognition.maxAlternatives = 1;

    newRecognition.start();
    setStartSpeech(true);

    newRecognition.onresult = function (event) {
      setAnswer(answer + " " + event.results[0][0].transcript);
    };

    newRecognition.onspeechend = function () {
      newRecognition.stop();
    };

    newRecognition.onerror = function (event) {
      if (event.error === "no-speech") {
        console.log("No speech detected.");
        // Handle the "no-speech" error gracefully, if needed
      } else {
        console.error("Error occurred in recognition: " + event.error);
      }
    };

    setRecognition(newRecognition);
  };

  const stopListening = () => {
    setStartSpeech(false);

    if (recognition) {
      recognition.stop();
    }
  };

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
      {/* 2. Answer bubble part */}
      <>
        <div className="answer">
          <IconBlockElement me={me} />
          <Frame inputColor="#F3F3F3">
            <Answer_text
              type="text"
              required
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
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
              const res1 = await onSend();
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
          <div className="question_text">{t("saved_answer")}</div>
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

export default OpenQuestion;
