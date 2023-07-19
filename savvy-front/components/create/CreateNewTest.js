import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import _ from "lodash";
import { useTranslation } from "next-i18next";

import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_NEWTEST_MUTATION = gql`
  mutation CREATE_NEWTEST_MUTATION(
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $ifRight: String
    $ifWrong: String
    $comments: [String!]
    $type: String
    $lessonId: String!
  ) {
    createNewTest(
      question: $question
      answers: $answers
      correct: $correct
      ifRight: $ifRight
      comments: $comments
      ifWrong: $ifWrong
      type: $type
      lessonId: $lessonId
    ) {
      id
      answers
      correct
      type
      comments
      complexity
      ifRight
      ifWrong
      next
      question
      createdAt
      user {
        id
      }
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
  .styles {
    width: 100%;
  }
`;

const Generate = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  textarea {
    width: 100%;
    min-height: 170px;
    margin-bottom: 20px;
  }
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
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
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const CustomSelect1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 800px) {
    width: 65%;
  }
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  button {
    border: none;
    cursor: pointer;

    background: none;
    font-family: Montserrat;
  }
`;

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  padding-bottom: 20px;
  border-bottom: 1px dashed #dee2e6;
  .question {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 60px;
    padding: 0.5%;
    font-size: 1.4rem;
    outline: 0;
  }
  .comment {
    border-radius: 5px;
    margin-top: 15px;
    border: 1px solid #c4c4c4;
    width: 80%;
    min-height: 60px;
    padding: 0.5%;
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
  min-height: 60px;
  padding: 0.5%;
  font-size: 1.4rem;
  outline: 0;
  &#ifRight {
    border: 1px solid #c4c4c4;
  }
  &#ifWrong {
    border: 1px solid #c4c4c4;
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
  const [comments, setComments] = useState(["", ""]);
  const [correct, setCorrect] = useState([false, false]);
  const [question, setQuestion] = useState();
  const [type, setType] = useState("TEST");
  const [generating, setGenerating] = useState(false);

  const [input, setInput] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // new state for managing JSON data loading status

  const { t } = useTranslation("lesson");

  const handleArray = (val, i) => {
    let arr = [...answers];
    arr[i] = val;
    return setAnswers(arr);
  };

  const handleArray2 = (val, name, i) => {
    let arr = [...comments];
    arr[i - 1] = val;
    return setComments(arr);
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

  const handleButtonClick = async (e) => {
    try {
      setGenerating(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
           Use this text to create a quiz: ${input}. The result should be a JSON in the following format:
           {"ifRight": "Some text for ifRight state","ifWrong": "Some text for ifWrong state","answers": ["First answer", "Second answer"],"comments": ["First comment", "Second comment"],"correct": [true, false],"question": "Your question text"}, where:
ifRight – explainer text if the student gives the correct answer
ifWrong – explainer text if the student gives the wrong answer
answers – answer options presented to the student. The number can be from 2 to 6.  Ideal number is 4. Every answer must be in HTML format
comments – comments for every answer option. Every comment must be in HTML format
correct – boolean values that show which answer is correct
question – the question must be in HTML format
Describe the question as a case. Give a back story, make it engaging and interesting. Make comments and explainers detailed.
All text should be given in Russian.
            `,
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

      const generated_quiz = JSON.parse(data.result.content);
      setIfRight(generated_quiz.ifRight);
      setIfWrong(generated_quiz.ifWrong);
      setAnswers([...generated_quiz.answers]);
      setComments([...generated_quiz.comments]);
      setCorrect([...generated_quiz.correct]);
      setQuestion(generated_quiz.question);
      setNum(generated_quiz.answers.length);
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
    <TestCreate>
      <Mutation
        mutation={CREATE_NEWTEST_MUTATION}
        variables={{
          lessonId: lessonID,
          question: [question],
          answers: answers,
          correct: correct,
          comments: comments,
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
      >
        {(createNewTest, { loading, error }) => (
          <div className="styles">
            <Generate>
              <textarea
                onChange={handleInputChange}
                placeholder="Enter the quiz context here. Not the question  or the answer. For example: A contract is an agreement giving rise to obligations which are enforced or recognised by law. In common law, there are 3 basic essentials to the creation of a contract: (i) agreement; (ii) contractual intention; and (iii) consideration."
              />
              <button onClick={handleButtonClick}>Generate Quiz</button>
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
              <>
                <label for="types">{t("type")}</label>
                <br />
                <select
                  name="types"
                  id="types"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="TEST">Test</option>
                  <option value="FORM">Form</option>
                </select>

                <Comment>
                  <DynamicLoadedEditor
                    id="question"
                    name="question"
                    placeholder="Question"
                    getEditorText={setIf}
                    value={question}
                  />
                </Comment>
                <Answers>
                  {_.times(num, (i) => {
                    let answer = `answer${i + 1}`;
                    let val = answers[i];
                    let val2 = comments[i];
                    let val3 = correct[i];
                    return (
                      <AnswerOption id={answer}>
                        <div className="question">
                          <DynamicLoadedEditor
                            index={i + 1}
                            name={i}
                            placeholder={`Answer ${i + 1}`}
                            value={val}
                            getEditorText={myCallback}
                          />
                        </div>
                        <select
                          defaultValue={false}
                          value={val3}
                          onChange={(e) => handleCorrect(e.target.value, i)}
                        >
                          <option value={true}>{t("correct")}</option>
                          <option value={false}>{t("wrong")}</option>
                        </select>
                        <div className="comment">
                          <DynamicLoadedEditor
                            index={i + 1}
                            name={i}
                            value={val2}
                            getEditorText={handleArray2}
                            placeholder={`Explainer ${i + 1}`}
                          />
                        </div>
                      </AnswerOption>
                    );
                  })}
                </Answers>
                <CustomSelect1>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setNum(num + 1);
                      let old_answers = answers;
                      let old_correct = correct;
                      let old_comments = comments;

                      setAnswers([...old_answers, ""]);
                      setCorrect([...old_correct, false]);
                      setComments([...old_comments, ""]);
                    }}
                  >
                    +1
                  </button>
                </CustomSelect1>
                <CustomSelect1>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setNum(num - 1);
                      let old_answers = [...answers];
                      let old_correct = [...correct];
                      let old_comments = [...comments];
                      setAnswers([...old_answers].pop());
                      setCorrect([...old_correct].pop());
                      setComments([...old_comments].pop());
                    }}
                  >
                    -1
                  </button>
                </CustomSelect1>
                <Comment id="ifWrong">
                  <DynamicLoadedEditor
                    id="ifWrong"
                    name="ifWrong"
                    value={ifWrong}
                    placeholder={`Explanation`}
                    getEditorText={setIf}
                  />
                </Comment>
                <Comment id="ifRight">
                  <DynamicLoadedEditor
                    id="ifRight"
                    name="ifRight"
                    value={ifRight}
                    placeholder={`Link to the next block`}
                    getEditorText={setIf}
                  />
                </Comment>
                <ButtonTwo
                  onClick={async (e) => {
                    e.preventDefault();
                    const res = await setAnswers(
                      answers.filter((an) => an !== "")
                    );
                    let arr = correct;
                    arr.length = answers.filter((an) => an !== "").length;
                    const res2 = await setCorrect(arr);
                    const res3 = await createNewTest();
                    props.getResult(res3);
                  }}
                >
                  {loading ? t("saving") : t("save")}
                </ButtonTwo>
              </>
            )}
          </div>
        )}
      </Mutation>
    </TestCreate>
  );
};

export default CreateNewTest;
