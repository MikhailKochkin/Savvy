import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_NEWTEST_MUTATION = gql`
  mutation CREATE_NEWTEST_MUTATION(
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $ifRight: String
    $ifWrong: String
    $lessonId: String!
  ) {
    createNewTest(
      question: $question
      answers: $answers
      correct: $correct
      ifRight: $ifRight
      ifWrong: $ifWrong
      lessonId: $lessonId
    ) {
      id
    }
  }
`;

const Button = styled.button`
  background: #84bc9c;
  cursor: pointer;
  padding: 1% 2%;
  width: 125px;
  border-radius: 5px;
  margin: 3% 0;
  font-size: 1.6rem;
  color: white;
`;

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1% 2%;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const CustomSelect1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 800px) {
    width: 65%;
  }
  select {
    border: 1px solid #c4c4c4;
    background: none;
    width: 40px;
    font-size: 1.6rem;
  }
`;

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  .question {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 100px;
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

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
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

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateNewTest = (props) => {
  const [num, setNum] = useState(2);
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [correct, setCorrect] = useState([false, false]);
  const [question, setQuestion] = useState();

  const handleArray = (val, i) => {
    let arr = [...answers];
    arr[i] = val;
    return setAnswers(arr);
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

  const { lessonID } = props;
  return (
    <TestCreate>
      <Mutation
        mutation={CREATE_NEWTEST_MUTATION}
        variables={{
          lessonId: lessonID,
          question: [question],
          answers: answers,
          correct: correct,
          ifRight: ifRight,
          ifWrong: ifWrong,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
      >
        {(createNewTest, { loading, error }) => (
          <div>
            <Advice>
              Создайте новый тест. Введите сам вопрос, 2-9 вариантов ответа.
              Количество правильных ответов может быть любым.
            </Advice>
            <Title>Новый тест</Title>
            <CustomSelect1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNum(num + 1);
                  let old_answers = answers;
                  let old_correct = correct;
                  console.log(old_answers, old_correct);
                  setAnswers([...old_answers, ""]);
                  setCorrect([...old_correct, false]);
                }}
              >
                +1 вариант ответа
              </button>
            </CustomSelect1>
            <Comment>
              <DynamicLoadedEditor
                id="question"
                name="question"
                placeholder="Вопрос"
                getEditorText={setIf}
              />
            </Comment>
            <Answers>
              {_.times(num, (i) => {
                let answer = `answer${i + 1}`;
                let val = answers[i];
                return (
                  <AnswerOption id={answer}>
                    <div className="question">
                      <DynamicLoadedEditor
                        index={i + 1}
                        name={i}
                        placeholder={`Вариант ответа ${i + 1}`}
                        value={val}
                        getEditorText={myCallback}
                      />
                    </div>
                    <select
                      defaultValue={false}
                      onChange={(e) => handleCorrect(e.target.value, i)}
                    >
                      <option value={true}>Правильно</option>
                      <option value={false}>Ошибочно</option>
                    </select>
                  </AnswerOption>
                );
              })}
            </Answers>
            <Comment id="ifRight">
              <DynamicLoadedEditor
                id="ifRight"
                name="ifRight"
                placeholder={`Комментарий в случае правильного ответа`}
                getEditorText={setIf}
              />
            </Comment>
            <Comment id="ifWrong">
              <DynamicLoadedEditor
                id="ifWrong"
                name="ifWrong"
                placeholder={`Комментарий в случае неправильного ответа`}
                getEditorText={setIf}
              />
            </Comment>
            <Button
              onClick={async (e) => {
                console.log(0);
                e.preventDefault();
                const res = await setAnswers(answers.filter((an) => an !== ""));
                let arr = correct;
                arr.length = answers.filter((an) => an !== "").length;
                const res2 = await setCorrect(arr);
                createNewTest();
                console.log(1);
                alert("Готово!");
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
            <Message id="Message">Вы создали новый тестовый вопрос!</Message>
          </div>
        )}
      </Mutation>
    </TestCreate>
  );
};

export default CreateNewTest;
