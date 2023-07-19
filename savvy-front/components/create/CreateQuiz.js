import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
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

const Generate = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #adb5bd;
  width: 100%;
  textarea {
    width: 100%;
    min-height: 170px;
    margin-bottom: 20px;
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
    min-height: 200px;
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
  const [input, setInput] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // new state for managing JSON data loading status
  const [generating, setGenerating] = useState(false);

  const { t } = useTranslation("lesson");

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      setGenerating(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
           Use this text to create an open question based on this information: ${input} to a student. The result must be a json in the following format:
{"ifRight": "Some text for ifRight state","ifWrong": "Some text for ifWrong state","answer": "answer","question": "question text"}, where:
ifRight – explainer text if the student gives the correct answer
ifWrong – explainer text if the student gives the wrong answer
answer – is a sample answer to which student answer will be compared
question – the question to the student. It must be in HTML format
Write the question as a case. Give a back story, make it engaging and interesting. Make comments and explainers detailed. The question must be straight and require a detailed answer (ideally it should be 1-2 sentences). 
All text must be in Russian.`,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setGenerating(false);

      const generated_question = JSON.parse(data.result.content);
      setIfRight(generated_question.ifRight);
      setIfWrong(generated_question.ifWrong);
      setQuestion(generated_question.question);
      setAnswer(generated_question.answer);
      setDataLoaded(true);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

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
          <Form>
            <fieldset>
              <Generate>
                <textarea
                  onChange={handleInputChange}
                  placeholder="Enter the question context (no the answer or the question itself) data here"
                />
                <button onClick={handleButtonClick}>Generate question</button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDataLoaded(true);
                  }}
                >
                  Create yourself
                </button>
                {generating && (
                  <div>Generating... It can take up to 30 seconds.</div>
                )}
              </Generate>
              {dataLoaded && (
                <Answers>
                  <label for="types">{t("type")}</label>
                  <select
                    name="types"
                    id="types"
                    defaultValue={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="TEST">Question</option>
                    <option value="FORM">Form</option>
                  </select>

                  <AnswerOption>
                    <Comment>
                      <DynamicLoadedEditor
                        id="question"
                        name="question"
                        placeholder="Question"
                        value={question}
                        getEditorText={setQuestion}
                      />
                    </Comment>
                    <textarea
                      id="answer"
                      name="answer"
                      placeholder="Answer"
                      value={answer}
                      // defaultValue={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <Comment id="ifRight">
                      <DynamicLoadedEditor
                        id="answer"
                        name="answer"
                        value={ifRight}
                        placeholder="Explainer if the answer is right"
                        getEditorText={setIfRight}
                      />
                    </Comment>
                    <Comment id="ifWrong">
                      <DynamicLoadedEditor
                        id="answer"
                        name="answer"
                        value={ifWrong}
                        placeholder="Explainer if the answer is wrong"
                        getEditorText={setIfWrong}
                      />
                    </Comment>
                  </AnswerOption>

                  <ButtonTwo
                    type="submit"
                    onClick={async (e) => {
                      e.preventDefault();
                      // document.getElementById("Message").style.display = "block";
                      const res = await createQuiz();
                      props.getResult(res);
                    }}
                  >
                    {loading ? t("saving") : t("save")}
                  </ButtonTwo>
                  {/* <Message id="Message">Вы создали новый вопрос!</Message> */}
                </Answers>
              )}
            </fieldset>
          </Form>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateQuiz;
