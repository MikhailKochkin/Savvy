import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_QUIZ_MUTATION = gql`
  mutation UPDATE_QUIZ_MUTATION(
    $id: String!
    $question: String
    $answer: String
    $check: String
    $complexity: Int
    $ifRight: String
    $ifWrong: String
  ) {
    updateQuiz(
      id: $id
      question: $question
      answer: $answer
      check: $check
      complexity: $complexity
      ifRight: $ifRight
      ifWrong: $ifWrong
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
      createdAt
      user {
        id
        name
        surname
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 5% 0;
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  textarea {
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    height: 100px;
    outline: 0;
    font-family: Montserrat;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.5rem;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 1.5%;
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

const Button = styled.button`
  padding: 1% 2%;
  background: ${(props) => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
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

const Complexity = styled.div`
  select,
  option {
    width: 80%;
    border-radius: 5px;
    margin-top: 3%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateQuiz = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [question, setQuestion] = useState(props.question);
  const [ifRight, setIfRight] = useState(props.ifRight);
  const [ifWrong, setIfWrong] = useState(props.ifWrong);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [check, setCheck] = useState(props.check);
  const [trueVal, setTrueVal] = useState(
    props.next && props.next.true ? props.next.true : ""
  );
  const [falseVal, setFalseVal] = useState(
    props.next && props.next.false ? props.next.false : ""
  );
  const { lessonID, quizId } = props;
  return (
    <Container>
      <select defaultValue={check} onChange={(e) => setCheck(e.target.value)}>
        <option value={undefined}>Не выбран</option>
        <option value={"WORD"}>Дословно</option>
        <option value={"IDEA"}>По смыслу</option>
      </select>
      <Complexity>
        <select
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
        >
          <option value={0}>Выберите сложность</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </Complexity>
      <Comment>
        <DynamicLoadedEditor
          id="question"
          name="question"
          placeholder={"Вопрос"}
          value={question}
          getEditorText={setQuestion}
        />
      </Comment>
      <textarea
        id="answer"
        name="answer"
        placeholder={"Ответ"}
        defaultValue={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Comment>
        <DynamicLoadedEditor
          id="answer"
          name="answer"
          value={ifRight}
          placeholder={"Фидбэк по правильному ответу"}
          getEditorText={setIfRight}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="answer"
          name="answer"
          placeholder={"Фидбэк по неправильному ответу"}
          value={ifWrong}
          getEditorText={setIfWrong}
        />
      </Comment>
      {console.log("quizID", quizId)}
      <Mutation
        mutation={UPDATE_QUIZ_MUTATION}
        variables={{
          id: quizId,
          question: question,
          answer: answer,
          ifRight: ifRight,
          ifWrong: ifWrong,
          complexity,
          check: check,
          next: {
            true: trueVal,
            false: falseVal,
          },
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
      >
        {(updateQuiz, { loading, error }) => (
          <Button
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await updateQuiz();
              props.getResult(res);
              props.switchUpdate();
              props.passUpdated();
            }}
          >
            {loading ? "Сохраняем..." : "Сохранить"}
          </Button>
        )}
      </Mutation>
    </Container>
  );
};

export default UpdateQuiz;
