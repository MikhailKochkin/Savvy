import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { use } from "i18next";

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lessonId: String!
    $ifRight: String
    $ifWrong: String
    $type: String
    $goalType: String
    $name: String
    $answers: ComplexAnswer
  ) {
    createQuiz(
      question: $question
      answer: $answer
      lessonId: $lessonId
      ifRight: $ifRight
      ifWrong: $ifWrong
      type: $type
      goalType: $goalType
      name: $name
      answers: $answers
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
      name
      goalType
      createdAt
      user {
        id
        name
        surname
      }
      answers
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
    margin-bottom: 3%;
  }
`;

const AnswerBlock = styled.div`
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

const AnswerOption = styled.div`
  margin: 3% 0;
  width: 100%;
  min-height: 60px;
  padding: 15px;
  font-size: 1.4rem;
  outline: 0;
  background: #f8f8f8;
  border-radius: 15px;

  .answerRow {
    display: flex;
    flex-direction: row;
    .row1 {
      margin-right: 10px;
    }
  }
  input,
  textarea {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    min-height: 50px;
    width: 100%;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 10px;
    margin-bottom: 5px;
  }
`;

const Comment = styled.div`
  margin-bottom: 3%;
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

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateQuiz = (props) => {
  const [question, setQuestion] = useState(props.generatedInfo?.question || "");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([
    {
      answer: "",
      next_id: "",
      next_type: "",
      index: 0,
    },
  ]);
  const [ifRight, setIfRight] = useState("");
  const [ifWrong, setIfWrong] = useState("");
  const [type, setType] = useState("TEST");
  const [dataLoaded, setDataLoaded] = useState(true); // new state for managing JSON data loading status
  const [goalType, setGoalType] = useState("EDUCATE");

  const { t } = useTranslation("lesson");

  useEffect(() => {
    if (props.generatedInfo.question && props.generatedInfo.answers) {
      setQuestion(props.generatedInfo.question);
      setAnswer(props.generatedInfo.answers.join(", "));
      setAnswers(
        props.generatedInfo.answers.map((a, i) => ({
          answer: a,
          next_id: "",
          next_type: "",
          index: i,
        }))
      );
    }
  }, [props.generatedInfo]);
  const { lessonID } = props;
  const [createQuiz, { loading, error }] = useMutation(CREATE_QUIZ_MUTATION, {
    variables: {
      lessonId: lessonID,
      answer: answer,
      question: question,
      ifRight: ifRight,
      ifWrong: ifWrong,
      type: type,
      answers: {
        answerElements: answers,
      },
    },
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: lessonID },
      },
    ],
    awaitRefetchQueries: true,
  });

  return (
    <Styles>
      <Form>
        <fieldset>
          <NameInput
            defaultValue={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          {dataLoaded && (
            <Answers>
              <label htmlFor="types">{t("type")}</label>
              <select
                name="types"
                id="types"
                defaultValue={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={null}>Undefined</option>
                <option value="TEST">Question</option>
                <option value="FORM">Form</option>
                <option value="GENERATE">Generate Ideas</option>
                <option value="PROMPT">Check with AI</option>
                <option value="FINDALL">Find All</option>
              </select>
              <select
                name="types"
                id="types"
                defaultValue={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              >
                <option value="EDUCATE">Educate</option>
                <option value="ASSESS">Assess</option>
              </select>
              <AnswerBlock>
                <Comment>
                  <DynamicLoadedEditor
                    id="question"
                    name="question"
                    placeholder="Question"
                    value={question}
                    getEditorText={setQuestion}
                  />
                </Comment>
                {type !== "GENERATE" && type !== "FINDALL" && (
                  <textarea
                    id="answer"
                    name="answer"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                )}
                {(type == "GENERATE" || type == "FINDALL") && (
                  <>
                    <label htmlFor="types">Ideas</label>
                    {answers.map((an, i) => (
                      <AnswerOption key={i}>
                        <label className="answerOptionLabel">
                          Answer Option №{i + 1}
                        </label>
                        <textarea
                          value={an.answer}
                          placeholder={`Answer`}
                          onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[i].answer = e.target.value;
                            setAnswers(newAnswers);
                          }}
                        />
                      </AnswerOption>
                    ))}
                  </>
                )}
                {(type == "GENERATE" || type == "FINDALL") && (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (answers.length > 0) {
                          const newAnswers = answers.slice(0, -1);
                          setAnswers(newAnswers);
                        }
                      }}
                    >
                      -1
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        return setAnswers([
                          ...answers,
                          {
                            answer: ``,
                            next_id: "",
                            next_type: "",
                            index: answers.length,
                          },
                        ]);
                      }}
                    >
                      +1
                    </button>
                  </>
                )}

                <Comment>
                  <DynamicLoadedEditor
                    id="answer"
                    name="answer"
                    value={ifRight}
                    placeholder="This text helps provide feedback if the answer is correct"
                    getEditorText={setIfRight}
                  />
                </Comment>
                <Comment>
                  <DynamicLoadedEditor
                    id="answer"
                    name="answer"
                    value={ifWrong}
                    placeholder="This text helps provide feedback if the answer is incorrect"
                    getEditorText={setIfWrong}
                  />
                </Comment>
              </AnswerBlock>

              <ButtonTwo
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await createQuiz();
                  props.getResult(res);
                }}
              >
                {loading ? t("saving") : t("save")}
              </ButtonTwo>
            </Answers>
          )}
        </fieldset>
      </Form>
    </Styles>
  );
};

export default CreateQuiz;
