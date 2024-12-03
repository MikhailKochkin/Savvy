import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { Row, ActionButton, Frame, MicroButton } from "../styles/DevPageStyles";

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lessonId: String!
    $ifRight: String
    $ifWrong: String
    $type: String
    $goalType: String
    $name: String
    $answers: ComplexAnswer
  ) {
    createQuiz(
      question: $question
      answer: $answer
      lessonId: $lessonId
      ifRight: $ifRight
      ifWrong: $ifWrong
      type: $type
      goalType: $goalType
      name: $name
      answers: $answers
    ) {
      id
      question
      type
      complexity
      check
      ifRight
      ifWrong
      answer
      next
      name
      goalType
      createdAt
      user {
        id
        name
        surname
      }
      answers
    }
  }
`;

const Styles = styled.div`
  width: 100%;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateQuiz = (props) => {
  const [question, setQuestion] = useState(props.generatedInfo?.question || "");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([
    {
      answer: "",
      next_id: "",
      next_type: "",
      index: 0,
    },
  ]);
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");
  const [type, setType] = useState("TEST");
  const [dataLoaded, setDataLoaded] = useState(true); // new state for managing JSON data loading status
  const [goalType, setGoalType] = useState("EDUCATE");

  const { t } = useTranslation("lesson");

  useEffect(() => {
    if (props.generatedInfo?.question && props.generatedInfo?.answers) {
      setQuestion(props.generatedInfo.question);
      setAnswer(props.generatedInfo.answers.join(", "));
      setAnswers(
        props.generatedInfo.answers.map((a, i) => ({
          answer: a,
          next_id: "",
          next_type: "",
          index: i,
        }))
      );
    }
  }, [props.generatedInfo]);
  const { lessonID } = props;
  const [createQuiz, { loading, error }] = useMutation(CREATE_QUIZ_MUTATION, {
    variables: {
      lessonId: lessonID,
      answer: answer,
      question: question,
      ifRight: ifRight,
      ifWrong: ifWrong,
      type: type,
      answers: {
        answerElements: answers,
      },
    },
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: lessonID },
      },
    ],
    awaitRefetchQueries: true,
  });

  return (
    <Styles>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      {dataLoaded && (
        <>
          <Row>
            <div className="description">{t("type")}</div>
            <div className="action_area">
              <select
                name="types"
                id="types"
                defaultValue={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={null}>Undefined</option>
                <option value="TEST">Question</option>
                <option value="FORM">Form</option>
                <option value="GENERATE">Generate Ideas</option>
                <option value="PROMPT">Check with AI</option>
                <option value="FINDALL">Find All</option>
              </select>
              <div className="explainer">
                This determines how the case study works
              </div>
            </div>
          </Row>
          <Row>
            <div className="description">Goal</div>
            <div className="action_area">
              <select
                name="types"
                id="types"
                defaultValue={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              >
                <option value="EDUCATE">Educate</option>
                <option value="ASSESS">Assess</option>
              </select>
              <div className="explainer">
                This determines how the case study works
              </div>
            </div>
          </Row>
          <Row>
            <div className="description">Question</div>
            <div className="action_area">
              <Frame>
                <DynamicLoadedEditor
                  id="question"
                  name="question"
                  placeholder="Question"
                  value={question}
                  getEditorText={setQuestion}
                />
              </Frame>
              <div className="explainer">
                This determines how the case study works
              </div>
            </div>
          </Row>
          {type !== "GENERATE" && type !== "FINDALL" && (
            <Row>
              <div className="description">Sample Answer</div>
              <div className="action_area">
                <textarea
                  id="answer"
                  name="answer"
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="explainer">
                  This determines how the case study works
                </div>
              </div>
            </Row>
          )}
          {(type == "GENERATE" || type == "FINDALL") && (
            <Row>
              <div className="description">Ideas</div>
              <div className="action_area">
                {answers.map((an, i) => (
                  <textarea
                    value={an.answer}
                    placeholder={`Idea ${i + 1}`}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[i].answer = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                ))}
                <MicroButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (answers.length > 0) {
                      const newAnswers = answers.slice(0, -1);
                      setAnswers(newAnswers);
                    }
                  }}
                >
                  -1
                </MicroButton>
                <MicroButton
                  onClick={(e) => {
                    e.preventDefault();
                    return setAnswers([
                      ...answers,
                      {
                        answer: ``,
                        next_id: "",
                        next_type: "",
                        index: answers.length,
                      },
                    ]);
                  }}
                >
                  +1
                </MicroButton>
                <div className="explainer">
                  This determines how the case study works
                </div>
              </div>
            </Row>
          )}
          <Row>
            <div className="description">Correct answer comments</div>
            <div className="action_area">
              <Frame>
                <DynamicLoadedEditor
                  id="answer"
                  name="answer"
                  value={ifRight}
                  placeholder="This text helps provide feedback if the answer is correct"
                  getEditorText={setIfRight}
                />
              </Frame>
              <div className="explainer">
                This determines how the case study works
              </div>
            </div>
          </Row>
          <Row>
            <div className="description">Incorrect answer comments </div>
            <div className="action_area">
              <Frame>
                <DynamicLoadedEditor
                  id="answer"
                  name="answer"
                  value={ifWrong}
                  placeholder="This text helps provide feedback if the answer is incorrect"
                  getEditorText={setIfWrong}
                />
              </Frame>
              <div className="explainer">
                This determines how the case study works
              </div>
            </div>
          </Row>
        </>
      )}
      <ActionButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          const res = await createQuiz();
          props.getResult(res);
        }}
      >
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Styles>
  );
};

export default CreateQuiz;
