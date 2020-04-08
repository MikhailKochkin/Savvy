import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lessonID: ID!
    $ifRight: String
    $ifWrong: String
  ) {
    createQuiz(
      question: $question
      answer: $answer
      lessonID: $lessonID
      ifRight: $ifRight
      ifWrong: $ifWrong
    ) {
      id
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
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const CreateQuiz = props => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");

  const { lessonID } = props;
  return (
    <>
      <Mutation
        mutation={CREATE_QUIZ_MUTATION}
        variables={{
          lessonID: lessonID,
          answer: answer,
          question: question,
          ifRight: ifRight,
          ifWrong: ifWrong
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(createQuiz, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              document.getElementById("Message").style.display = "block";
              setTimeout(function() {
                document.getElementById("Message")
                  ? (document.getElementById("Message").style.display = "none")
                  : "none";
              }, 1500);

              const res = await createQuiz();
            }}
          >
            <fieldset>
              <Answers>
                <Advice>
                  Создайте новый вопрос. Введите сам вопрос, ответ на него, а
                  также (при необходимости) пояснения на случай правильного и
                  неправильного ответов.
                </Advice>
                <Title>Новый вопрос</Title>
                <AnswerOption>
                  <textarea
                    cols={60}
                    rows={6}
                    id="question"
                    name="question"
                    required
                    placeholder="Вопрос"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                  />
                  <textarea
                    cols={60}
                    rows={6}
                    spellCheck={true}
                    id="answer"
                    name="answer"
                    placeholder="Ответ"
                    required
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                  <textarea
                    cols={60}
                    rows={6}
                    spellCheck={true}
                    id="answer"
                    name="answer"
                    placeholder="Комментарий в случае правильного ответа"
                    value={ifRight}
                    onChange={e => setIfRight(e.target.value)}
                  />
                  <textarea
                    cols={60}
                    rows={6}
                    spellCheck={true}
                    id="answer"
                    name="answer"
                    placeholder="Комментарий в случае  неправильного ответа"
                    value={ifWrong}
                    onChange={e => setIfWrong(e.target.value)}
                  />
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
