import styled from "styled-components";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_TEST_PRACTICE = gql`
  mutation createTestPractice(
    $tasksNum: Int!
    $tasks: [String!]
    $text: String!
    $lessonId: String!
  ) {
    createTestPractice(
      tasksNum: $tasksNum
      tasks: $tasks
      text: $text
      lessonId: $lessonId
    ) {
      id
    }
  }
`;

const Styles = styled.div``;

const Element = styled.div`
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;

const CreateTestBlock = (props) => {
  const [tasks, setTasks] = useState([]);
  const [number, setNumber] = useState(5);

  const tests = props.lesson.newTests;
  const quizes = props.lesson.quizes;

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
        <button
          onClick={async (e) => {
            e.preventDefault();
            const res = await createTestPractice({
              variables: {
                tasksNum: number,
                tasks: tasks,
                text: "Тест",
                lessonId: props.lessonId,
              },
            });
            alert("Сохранили!");
          }}
        >
          Сохранить
        </button>
      </form>
    </Styles>
  );
};

export default CreateTestBlock;
