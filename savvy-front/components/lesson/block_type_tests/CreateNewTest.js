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
      next
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

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const CustomSelect1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 800px) {
    width: 65%;
  }
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  button {
    border: none;
    cursor: pointer;

    background: none;
    font-family: Montserrat;
  }
`;

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  padding-bottom: 20px;
  border-bottom: 1px dashed #dee2e6;
  .question {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 60px;
    padding: 0.5%;
    font-size: 1.4rem;
    outline: 0;
  }
  .comment {
    border-radius: 5px;
    margin-top: 15px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 60px;
    padding: 0.5%;
    font-size: 1.4rem;
    outline: 0;
  }
  select {
    width: 20%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 0.5% 1%;
    /* padding: 0.6em 1.4em 0.5em 0.8em; */
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 2%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const Comment = styled.div`
  margin-top: 3%;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  width: 80%;
  min-height: 60px;
  padding: 0.5%;
  font-size: 1.4rem;
  outline: 0;
  &#ifRight {
    border: 1px solid #c4c4c4;
  }
  &#ifWrong {
    border: 1px solid #c4c4c4;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
  padding-bottom: 20px;
  .number {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    font-size: 1.4rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // width: 110px;
    height: 25px;
    margin-right: 15px;
    padding: 0 20px;
    button {
      border: none;
      cursor: pointer;
      background: none;
      font-size: 1.2rem;
      font-family: Montserrat;
    }
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
  const [answers, setAnswers] = useState(generatedInfo?.answers || ["", ""]);
  const [comments, setComments] = useState(["", ""]);
  const [correct, setCorrect] = useState(
    generatedInfo?.whichAnswersAreCorrect || [false, false]
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
