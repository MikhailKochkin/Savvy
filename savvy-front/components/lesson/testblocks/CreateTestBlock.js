import styled from "styled-components";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const CREATE_TEST_PRACTICE = gql`
  mutation createTestPractice(
    $tasksNum: Int!
    $tasks: [String!]
    $text: String!
    $lessonId: String!
    $intro: String!
    $successText: String!
    $failureText: String!
  ) {
    createTestPractice(
      tasksNum: $tasksNum
      tasks: $tasks
      text: $text
      lessonId: $lessonId
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

const CreateTestBlock = (props) => {
  const [tasks, setTasks] = useState([]);
  const [number, setNumber] = useState(5);
  const [intro, setIntro] = useState("");
  const [successText, setSuccessText] = useState("");
  const [failureText, setFailureText] = useState("");

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

  const [createTestPractice, { data, loading, error }] =
    useMutation(CREATE_TEST_PRACTICE);
  return (
    <Styles>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={"Introduction explaining the task"}
          value={intro}
          getEditorText={setIntro}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={"Text for successful students"}
          value={successText}
          getEditorText={setSuccessText}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={"Text for failed students"}
          value={failureText}
          getEditorText={setFailureText}
        />
      </Comment>
      <p>
        Выберите, какие тесты и вопросы вы хотите включить в испытание. Если вы
        хотите добавить новые тесты или вопросы, не забудьте предварительно
        создать их внутри урока.{" "}
      </p>
      <h2>Тесты</h2>
      <form>
        {tests.map((t, i) => (
          <Element>
            <input
              type="checkbox"
              id={i}
              name={t.id}
              value={t.id}
              onClick={(e) => addTest(e)}
            />
            <label for={i}>{t.question[0]}</label>
            <br />
          </Element>
        ))}
        <h2>Вопросы</h2>

        {quizes.map((q, i) => (
          <Element>
            <input
              type="checkbox"
              id={i}
              name={q.id}
              value={q.id}
              onClick={(e) => addTest(e)}
            />
            <label for={i}>{q.question}</label>
            <br />
          </Element>
        ))}
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            const res = await createTestPractice({
              variables: {
                tasksNum: parseInt(number),
                tasks: tasks,
                text: "Тест",
                lessonId: props.lessonId,
                intro: intro,
                successText: successText,
                failureText: failureText,
              },
            });
            props.getResult(res);
          }}
        >
          {loading ? t("saving") : t("save")}
        </ButtonTwo>
      </form>
    </Styles>
  );
};

export default CreateTestBlock;
