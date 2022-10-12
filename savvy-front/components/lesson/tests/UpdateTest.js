import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_TEST_MUTATION = gql`
  mutation UPDATE_TEST_MUTATION(
    $id: String!
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $comments: [String!]
    $complexity: Int
    $type: String
    $ifRight: String
    $ifWrong: String
  ) {
    updateNewTest(
      id: $id
      question: $question
      answers: $answers
      correct: $correct
      comments: $comments
      complexity: $complexity
      ifRight: $ifRight
      ifWrong: $ifWrong
      type: $type
    ) {
      id
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

const Styles = styled.div`
  margin: 20px 0;
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

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  border-bottom: 1px solid #adb5bd;
  padding-bottom: 20px;
  .question {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 50px;
    padding: 1.5%;
    font-size: 1.4rem;
    outline: 0;
  }
  .comment {
    border-radius: 5px;
    margin-top: 15px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 50px;
    padding: 1.5%;
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
  min-height: 100px;
  padding: 1.5%;
  font-size: 1.4rem;
  outline: 0;
  &#ifRight {
    border: 1px solid #84bc9c;
  }
  &#ifWrong {
    border: 1px solid #de6b48;
  }
`;

const Complexity = styled.div`
  select,
  option {
    width: 80%;
    border-radius: 5px;
    margin: 3% 0;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
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

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateTest = (props) => {
  const [options, setOptions] = useState(props.mes);
  const [answers, setAnswers] = useState(props.answers);
  const [comments, setComments] = useState(
    props.comments ? props.comments : new Array(props.answers.length).fill("")
  );
  const [correct, setCorrect] = useState(props.correct);
  const [question, setQuestion] = useState(props.question[0]);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [ifRight, setIfRight] = useState(props.ifRight);
  const [ifWrong, setIfWrong] = useState(props.ifWrong);
  const [type, setType] = useState(props.type);

  const { t } = useTranslation("lesson");

  const handleArray = (val, name, i) => {
    let arr = [...answers];
    arr[i - 1] = val;
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

  const setIf = (dataFromChild, name) => {
    if (name === "ifRight") {
      setIfRight(dataFromChild);
    } else if (name === "ifWrong") {
      setIfWrong(dataFromChild);
    } else if (name === "question") {
      setQuestion(dataFromChild);
    }
  };

  const { testID, mes, lessonID } = props;
  console.log("options", options, answers, comments);
  return (
    <Styles>
      <label for="types">{t("type")}</label>{" "}
      <select
        name="types"
        id="types"
        defaultValue={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="TEST">{t("test")}</option>
        <option value="FORM">{t("form")}</option>
      </select>
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={t("question")}
          value={question}
          getEditorText={setIf}
        />
      </Comment>
      <Complexity>
        <select
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
        >
          <option value={0}>{t("difficulty")}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </Complexity>
      <Answers>
        {options.map((answer, i) => {
          let an = `answer${i + 1}`;
          return (
            <AnswerOption id={an}>
              <div className="question">
                <DynamicLoadedEditor
                  index={i + 1}
                  name={i}
                  value={answer[0]}
                  getEditorText={handleArray}
                  placeholder={`Вариант ответа ${i + 1}`}
                />
              </div>
              <select
                defaultValue={answer[1]}
                onChange={(e) => handleCorrect(e.target.value, i)}
              >
                <option value={true}>{t("correct")}!</option>
                <option value={false}>{t("wrong")}...</option>
              </select>
              <div className="comment">
                <DynamicLoadedEditor
                  index={i + 1}
                  name={i}
                  value={answer[2]}
                  getEditorText={handleArray2}
                  placeholder={`Комментарий к варианту ответа ${i + 1}`}
                />
              </div>
            </AnswerOption>
          );
        })}
      </Answers>
      <CustomSelect1>
        <button
          onClick={(e) => {
            e.preventDefault();
            let old_options = [...options];
            let popped = old_options.pop();
            setOptions([...old_options]);
            let old_answers = [...answers];
            old_answers.pop();
            let old_correct = [...correct];
            old_correct.pop();
            let old_comments = [...comments];
            old_comments.pop();
            setAnswers([...old_answers]);
            setCorrect([...old_correct]);
            setComments([...old_comments]);
          }}
        >
          -1
        </button>
      </CustomSelect1>
      <CustomSelect1>
        <button
          onClick={(e) => {
            e.preventDefault();
            setOptions([...options, ["", false, ""]]);
          }}
        >
          +1
        </button>
      </CustomSelect1>
      <Comment>
        <DynamicLoadedEditor
          id="ifRight"
          name="ifRight"
          value={ifRight}
          placeholder={t("feedback_positive")}
          getEditorText={setIf}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="ifWrong"
          name="ifWrong"
          value={ifWrong}
          placeholder={t("feedback_negative")}
          getEditorText={setIf}
        />
      </Comment>
      <Mutation
        mutation={UPDATE_TEST_MUTATION}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
        variables={{
          id: testID,
          question: [question],
          answers: answers,
          correct: correct,
          comments: comments,
          complexity,
          type,
          ifRight: ifRight,
          ifWrong: ifWrong,
        }}
      >
        {(updateNewTest, { loading, error }) => (
          <ButtonTwo
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              const res = await updateNewTest();
              props.getResult(res);
              props.switchUpdate();
              props.passUpdated();
            }}
          >
            {loading ? t("saving") : t("save")}
          </ButtonTwo>
        )}
      </Mutation>
    </Styles>
  );
};

export default UpdateTest;
