import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

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

const Styles = styled.div`
  width: 100%;
`;

const Form = styled.form`
  font-size: 1.6rem;
  fieldset {
    border: none;
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

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  select {
    width: 25%;
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

const AnswerOption = styled.div`
  width: 80%;
  textarea {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    height: 60px;
    width: 100%;
    font-family: Montserrat;
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
  min-height: 60px;
  padding: 0.5%;
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
  const { t } = useTranslation("lesson");

  const { lessonID } = props;
  return (
    <Styles>
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
                  <option value="TEST">Вопрос</option>
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

                <ButtonTwo type="submit">
                  {loading ? t("saving") : t("save")}
                </ButtonTwo>
                <Message id="Message">Вы создали новый вопрос!</Message>
              </Answers>
            </fieldset>
          </Form>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateQuiz;
