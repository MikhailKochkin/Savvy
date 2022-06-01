import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lessonId: String!
    $ifRight: String
    $ifWrong: String
    $type: String
  ) {
    createQuiz(
      question: $question
      answer: $answer
      lessonId: $lessonId
      ifRight: $ifRight
      ifWrong: $ifWrong
      type: $type
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

const Form = styled.form`
  font-size: 1.6rem;
  fieldset {
    border: none;
  }
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
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

const AnswerOption = styled.div`
  width: 80%;
  textarea {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    height: 100px;
    width: 100%;
    padding: 1.5%;
    font-size: 1.4rem;
    outline: 0;
    margin-bottom: 3%;
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 30%;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
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

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateQuiz = (props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");
  const [type, setType] = useState("TEST");

  const { lessonID } = props;
  return (
    <>
      <Mutation
        mutation={CREATE_QUIZ_MUTATION}
        variables={{
          lessonId: lessonID,
          answer: answer,
          question: question,
          ifRight: ifRight,
          ifWrong: ifWrong,
          type: type,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(createQuiz, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              document.getElementById("Message").style.display = "block";
              const res = await createQuiz();
              props.getResult(res);
            }}
          >
            <fieldset>
              <Answers>
                <label for="types">Тип задания</label>
                <select
                  name="types"
                  id="types"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="TEST">Тест</option>
                  <option value="FORM">Форма</option>
                </select>

                <AnswerOption>
                  <Comment>
                    <DynamicLoadedEditor
                      id="question"
                      name="question"
                      placeholder="Вопрос"
                      getEditorText={setQuestion}
                    />
                  </Comment>
                  <textarea
                    id="answer"
                    name="answer"
                    placeholder="Ответ"
                    defaultValue={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <Comment id="ifRight">
                    <DynamicLoadedEditor
                      id="answer"
                      name="answer"
                      placeholder="Комментарий в случае правильного ответа"
                      getEditorText={setIfRight}
                    />
                  </Comment>
                  <Comment id="ifWrong">
                    <DynamicLoadedEditor
                      id="answer"
                      name="answer"
                      placeholder="Комментарий в случае неправильного ответа"
                      getEditorText={setIfWrong}
                    />
                  </Comment>
                </AnswerOption>

                <Button type="submit">
                  {loading ? "Сохраняем..." : "Сохранить"}
                </Button>
                <Message id="Message">Вы создали новый вопрос!</Message>
              </Answers>
            </fieldset>
          </Form>
        )}
      </Mutation>
    </>
  );
};

export default CreateQuiz;
