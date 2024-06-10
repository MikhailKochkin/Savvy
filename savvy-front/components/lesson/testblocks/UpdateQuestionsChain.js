import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const UPDATE_TEST_PRACTICE = gql`
  mutation updateTestPractice(
    $id: String!
    $tasksNum: Int!
    $tasks: [String!]
    # $text: String!
    # $lessonId: String!
    $intro: String!
    $successText: String!
    $failureText: String!
  ) {
    updateTestPractice(
      id: $id
      tasksNum: $tasksNum
      tasks: $tasks
      #   text: $text
      #   lessonId: $lessonId
      intro: $intro
      successText: $successText
      failureText: $failureText
    ) {
      id
      tasks
      tasksNum
      intro
      successText
      failureText
    }
  }
`;

const Styles = styled.div`
  margin: 10px 0;
`;

const Element = styled.div`
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;

const Comment = styled.div`
  margin: 3% 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  width: 100%;
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
  max-width: 180px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateQuestionsChain = (props) => {
  const [tasks, setTasks] = useState(props.testPractice.tasks || []);
  const [number, setNumber] = useState(props.testPractice.tasksNum || 5);
  const [intro, setIntro] = useState(props.testPractice.intro || "");
  const [successText, setSuccessText] = useState(
    props.testPractice.successText || ""
  );
  const [failureText, setFailureText] = useState(
    props.testPractice.failureText || ""
  );

  const tests = props.lesson.newTests;
  const quizes = props.lesson.quizes;
  const { t } = useTranslation("lesson");

  const addTest = (e) => {
    if (!tasks.includes(e.target.value)) {
      let old_tasks = [...tasks];
      let new_tasks = [...old_tasks, e.target.value];
      setTasks(new_tasks);
    } else {
      let old_tasks = [...tasks];
      let new_tasks = old_tasks.filter((t) => t !== e.target.value);
      setTasks(new_tasks);
    }
  };

  const [updateTestPractice, { data, loading, error }] =
    useMutation(UPDATE_TEST_PRACTICE);

  return (
    <Styles>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <Comment>
        <DynamicLoadedEditor
          id="intro"
          name="intro"
          placeholder={"Introduction explaining the task"}
          value={intro}
          getEditorText={setIntro}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="successText"
          name="successText"
          placeholder={"Text for successful students"}
          value={successText}
          getEditorText={setSuccessText}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="failureText"
          name="failureText"
          placeholder={"Text for failed students"}
          value={failureText}
          getEditorText={setFailureText}
        />
      </Comment>
      <p>{t("selectTestsAndQuestions")}</p>
      <h2>{t("tests")}</h2>
      <form>
        {tests.map((t, i) => (
          <Element key={t.id}>
            <input
              type="checkbox"
              id={`test_${i}`}
              name={t.id}
              value={t.id}
              checked={tasks.includes(t.id)}
              onChange={(e) => addTest(e)}
            />
            <label htmlFor={`test_${i}`}>{t.question[0]}</label>
            <br />
          </Element>
        ))}
        <h2>{t("questions")}</h2>

        {quizes.map((q, i) => (
          <Element key={q.id}>
            <input
              type="checkbox"
              id={`quiz_${i}`}
              name={q.id}
              value={q.id}
              checked={tasks.includes(q.id)}
              onChange={(e) => addTest(e)}
            />
            <label htmlFor={`quiz_${i}`}>{q.question}</label>
            <br />
          </Element>
        ))}
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            const res = await updateTestPractice({
              variables: {
                id: props.testPractice.id,
                tasksNum: parseInt(number),
                tasks: tasks,
                // text: "Test",
                // lessonId: props.lessonId,
                intro: intro,
                successText: successText,
                failureText: failureText,
              },
            });
            props.onUpdate(res);
          }}
        >
          {loading ? t("updating") : t("update")}
        </ButtonTwo>
      </form>
    </Styles>
  );
};

export default UpdateQuestionsChain;
