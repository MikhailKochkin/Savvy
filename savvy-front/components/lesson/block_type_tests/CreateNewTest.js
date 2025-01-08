import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import _ from "lodash";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { Row, ActionButton, Frame, MicroButton } from "../styles/DevPageStyles";

const CREATE_NEWTEST_MUTATION = gql`
  mutation CREATE_NEWTEST_MUTATION(
    $name: String
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $ifRight: String
    $ifWrong: String
    $comments: [String!]
    $type: String
    $lessonId: String!
  ) {
    createNewTest(
      name: $name
      question: $question
      answers: $answers
      correct: $correct
      ifRight: $ifRight
      comments: $comments
      ifWrong: $ifWrong
      type: $type
      lessonId: $lessonId
    ) {
      id
      name
      answers
      correct
      type
      comments
      complexity
      ifRight
      ifWrong
      question
      createdAt
      user {
        id
      }
    }
  }
`;

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1% 2%;
  .styles {
    width: 100%;
  }
`;

const AnswerArea = styled.div`
  width: 75%;
  margin-left: 15px;
  margin-bottom: 20px;
  .answerBox {
    margin-bottom: 20px;
  }
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  .answer_box {
    width: 85%;
  }
  select {
    width: 12% !important;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateNewTest = (props) => {
  const { lessonID, generatedInfo } = props;
  const [name, setName] = useState("");
  const [num, setNum] = useState(2);
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");
  const [answers, setAnswers] = useState(
    generatedInfo?.answers ? [...generatedInfo?.answers] : ["", ""]
  );
  const [comments, setComments] = useState(["", ""]);
  const [correct, setCorrect] = useState(
    generatedInfo?.whichAnswersAreCorrect
      ? [...generatedInfo?.whichAnswersAreCorrect]
      : [false, false]
  );
  const [question, setQuestion] = useState(generatedInfo?.question || "");
  const [type, setType] = useState("TEST");

  const { t } = useTranslation("lesson");

  const handleArray = (val, i) => {
    let arr = [...answers];
    arr[i] = val;
    return setAnswers(arr);
  };

  const handleArray2 = (val, name, i) => {
    let arr = [...comments];
    arr[i - 1] = val;
    return setComments(arr);
  };

  const handleCorrect = (val, i) => {
    let arr = [...correct];
    let value;
    val === "true" ? (value = true) : (value = false);
    arr[i] = value;
    return setCorrect(arr);
  };

  const myCallback = (dataFromChild, name) => {
    handleArray(dataFromChild, name);
  };

  const setIf = (dataFromChild, name) => {
    if (name === "ifRight") {
      setIfRight(dataFromChild);
    } else if (name === "ifWrong") {
      setIfWrong(dataFromChild);
    } else if (name === "question") {
      setQuestion(dataFromChild);
    }
  };

  const [createNewTest, { loading, error }] = useMutation(
    CREATE_NEWTEST_MUTATION,
    {
      variables: {
        lessonId: lessonID,
        question: [question],
        answers: answers,
        correct: correct,
        comments: comments,
        ifRight: ifRight,
        ifWrong: ifWrong,
        type: type,
      },
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
    }
  );

  return (
    <TestCreate>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
          <div className="explainer">The name will be used for navigation</div>
        </div>
      </Row>
      <Row>
        <div className="description">Type</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="TEST">{t("test")}</option>
            <option value="FORM">{t("form")}</option>
            <option value="BRANCH">{t("Branch")}</option>
          </select>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Question</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="question"
              name="question"
              placeholder={t("question")}
              value={question}
              getEditorText={setIf}
            />
          </Frame>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Answers</div>
        <AnswerArea>
          {_.times(num, (i) => {
            let answer = `answer${i + 1}`;
            let val = answers[i];
            let val2 = comments[i];
            let val3 = correct[i];
            return (
              <div className="answerBox">
                <TopRow>
                  <Frame className="answer_box">
                    <DynamicLoadedEditor
                      index={i + 1}
                      name={i}
                      placeholder={`Answer ${i + 1}`}
                      value={val}
                      getEditorText={myCallback}
                    />
                  </Frame>
                  <select
                    defaultValue={false}
                    value={val3}
                    onChange={(e) => handleCorrect(e.target.value, i)}
                  >
                    <option value={true}>✅</option>
                    <option value={false}>❌</option>
                  </select>
                </TopRow>

                <Frame>
                  <DynamicLoadedEditor
                    index={i + 1}
                    name={i}
                    value={val2}
                    getEditorText={handleArray2}
                    placeholder={`Explainer ${i + 1}`}
                  />
                </Frame>
              </div>
            );
          })}
          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              setNum(num - 1);
              let old_answers = [...answers];
              let old_correct = [...correct];
              let old_comments = [...comments];
              setAnswers([...old_answers].pop());
              setCorrect([...old_correct].pop());
              setComments([...old_comments].pop());
            }}
          >
            -1
          </MicroButton>

          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              setNum(num + 1);
              let old_answers = answers;
              let old_correct = correct;
              let old_comments = comments;

              setAnswers([...old_answers, ""]);
              setCorrect([...old_correct, false]);
              setComments([...old_comments, ""]);
            }}
          >
            +1
          </MicroButton>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </AnswerArea>
      </Row>
      <Row>
        <div className="description">Correct answer comments</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="ifRight"
              name="ifRight"
              value={ifRight}
              placeholder={`Link to the next block`}
              getEditorText={setIf}
            />
          </Frame>
          {/* <div className="explainer">
            This determines how the case study works
          </div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Incorrect answer comments </div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="ifWrong"
              name="ifWrong"
              value={ifWrong}
              placeholder={`Explanation`}
              getEditorText={setIf}
            />
          </Frame>
          {/* <div className="explainer">
            This determines how the case study works
          </div> */}
        </div>
      </Row>
      <ActionButton
        onClick={async (e) => {
          e.preventDefault();
          setAnswers(answers.filter((an) => an !== ""));
          let arr = correct;
          arr = arr.slice(0, answers.filter((an) => an !== "").length);
          setCorrect(arr);
          const res3 = await createNewTest();
          props.getResult(res3);
        }}
      >
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </TestCreate>
  );
};

export default CreateNewTest;
