import styled from "styled-components";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const CREATE_TQ = gql`
  mutation createTestPractice(
    $tasks: QuestList
    $lessonId: String!
    $introduction: String!
    $solution: String!
  ) {
    createTeamQuest(
      tasks: $tasks
      lessonId: $lessonId
      introduction: $introduction
      solution: $solution
    ) {
      id
      tasks
      introduction
      solution
    }
  }
`;

const Styles = styled.div`
  margin: 10px 0;
`;

const Element = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px dashed #acb5bd;
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

const CreateTeamQuest = (props) => {
  const [tasks, setTasks] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [solution, setSolution] = useState("");

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

  const addQuestElement = (id, type) => {
    let new_el = {
      value: id,
      type: type,
      number: tasks.length,
    };
    console.log("id", id);
    if (tasks.filter((t) => t.value == id).length == 0) {
      let old_tasks = [...tasks];
      let new_tasks = [...old_tasks, new_el];
      setTasks(new_tasks);
    } else {
      let old_tasks = [...tasks];
      let new_tasks = old_tasks.filter((t) => t.value !== id);
      setTasks(new_tasks);
    }
  };

  const [createTestPractice, { data, loading, error }] = useMutation(CREATE_TQ);
  return (
    <Styles>
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={"Introduction to the quest"}
          value={introduction}
          getEditorText={setIntroduction}
        />
      </Comment>
      <p>
        Choose which quizzes and questions you want to include into the quest.
        If you want to add new tests or questions, be sure to to create them
        within the lesson beforehand.
      </p>
      <h2>Quizzes</h2>
      <form>
        {tests.map((t, i) => (
          <Element>
            <input
              type="checkbox"
              id={i}
              name={t.id}
              value={t.id}
              onClick={(e) => addQuestElement(e.target.value, "NewTest")}
            />
            <label for={i}>{t.question[0]}</label>
            <br />
          </Element>
        ))}
        <h2>Questions</h2>

        {quizes.map((q, i) => (
          <Element>
            <input
              type="checkbox"
              id={i}
              name={q.id}
              value={q.id}
              onClick={(e) => addQuestElement(e.target.value, "Quiz")}
            />
            <label for={i}>{q.question}</label>
            <br />
          </Element>
        ))}
        <Comment>
          <DynamicLoadedEditor
            id="question"
            name="question"
            placeholder={"Solution to the quest"}
            value={solution}
            getEditorText={setSolution}
          />
        </Comment>
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            const res = await createTestPractice({
              variables: {
                tasks: { questElements: tasks },
                introduction: introduction,
                solution: solution,
                lessonId: props.lessonId,
              },
            });
            console.log("res", res);
            props.getResult(res);
          }}
        >
          {loading ? t("saving") : t("save")}
        </ButtonTwo>
      </form>
    </Styles>
  );
};

export default CreateTeamQuest;
