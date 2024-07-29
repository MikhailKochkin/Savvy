import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";

import {
  EditorInfoSection,
  NameInput,
  SimpleButton,
  BlueButton,
} from "../SimulatorDevelopmentStyles";

import { MiniAIButton } from "./QuestionStyles";

const UPDATE_QUIZ_MUTATION = gql`
  mutation UPDATE_QUIZ_MUTATION(
    $id: String!
    $question: String
    $answer: String
    $check: String
    $complexity: Int
    $type: String
    $goalType: String
    $ifRight: String
    $ifWrong: String
    $instructorName: String
    $isScoringShown: Boolean
    $name: String
    $image: String
    $answers: ComplexAnswer
    $isOrderOfAnswersImportant: Boolean
    $shouldAnswerSizeMatchSample: Boolean
  ) {
    updateQuiz(
      id: $id
      question: $question
      answer: $answer
      check: $check
      complexity: $complexity
      type: $type
      goalType: $goalType
      ifRight: $ifRight
      ifWrong: $ifWrong
      answers: $answers
      name: $name
      instructorName: $instructorName
      isScoringShown: $isScoringShown
      image: $image
      isOrderOfAnswersImportant: $isOrderOfAnswersImportant
      shouldAnswerSizeMatchSample: $shouldAnswerSizeMatchSample
    ) {
      id
      question
      type
      complexity
      check
      ifRight
      ifWrong
      answer
      answers
      next
      goalType
      createdAt
      name
      image
      isOrderOfAnswersImportant
      shouldAnswerSizeMatchSample
      isScoringShown
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
    div {
      width: 50%;
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

const Input = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  font-family: Montserrat;
  font-weight: 500;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateQuiz = (props) => {
  const { lessonID, quizId, lesson } = props;

  const [answer, setAnswer] = useState(props.answer);
  const [question, setQuestion] = useState(props.question);
  const [name, setName] = useState(props.name);
  const [instructorName, setInstructorName] = useState(props.instructorName);
  const [image, setImage] = useState(props.image);
  const [ifRight, setIfRight] = useState(props.ifRight);
  const [ifWrong, setIfWrong] = useState(props.ifWrong);
  const [type, setType] = useState(props.type);
  const [goalType, setGoalType] = useState(props.goalType);
  const [answers, setAnswers] = useState(
    props.answers ? props.answers.answerElements : []
  );
  const [isOrderOfAnswersImportant, setIsOrderOfAnswersImportant] = useState(
    props.isOrderOfAnswersImportant
  );
  const [shouldAnswerSizeMatchSample, setShouldAnswerSizeMatchSample] =
    useState(props.shouldAnswerSizeMatchSample);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [isScoringShown, setIsScoringShown] = useState(props.isScoringShown);
  const [check, setCheck] = useState(props.check);

  const { t } = useTranslation("lesson");

  const [updateQuiz, { loading, error }] = useMutation(UPDATE_QUIZ_MUTATION, {
    variables: {
      id: quizId,
      question: question,
      answer: answer,
      ifRight: ifRight,
      ifWrong: ifWrong,
      complexity,
      check: check,
      type: type,
      instructorName: instructorName,
      name: name,
      image: image,
      goalType: goalType,
      shouldAnswerSizeMatchSample: shouldAnswerSizeMatchSample,
      isOrderOfAnswersImportant: isOrderOfAnswersImportant,
      isScoringShown: isScoringShown,
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
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateQuiz();
      props.getResult(res);
      props.switchUpdate();
      props.passUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <EditorInfoSection>
        <h3 className="label">ID: {quizId}</h3>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Name</h3>
        <div className="comment">The name will be used for navigation</div>
        <NameInput
          defaultValue={name}
          placeholder="Undefined"
          onChange={(e) => setName(e.target.value)}
        />
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Checking mode</h3>

        <select defaultValue={check} onChange={(e) => setCheck(e.target.value)}>
          <option value={undefined}>Not chosen</option>
          <option value={"WORD"}>Literally</option>
          <option value={"IDEA"}>By implication</option>
        </select>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">{t("type")}</h3>
        <select
          name="types"
          id="types"
          defaultValue={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value={null}>Undefined</option>
          <option value="TEST">Question</option>
          <option value="FINDALL">Find All</option>
          <option value="COMPLEX">Complex</option>
          <option value="FORM">Form</option>
          <option value="GENERATE">Generate Ideas</option>
          <option value="PROMPT">Check with AI</option>
          {/* <option value="CALL">Call Simulation</option> */}
        </select>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Format</h3>
        <select
          name="types"
          id="types"
          defaultValue={goalType}
          onChange={(e) => setGoalType(e.target.value)}
        >
          <option value="EDUCATE">Educate</option>
          <option value="ASSESS">Assess</option>
        </select>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Is Scoring Shown</h3>
        <select
          defaultValue={isScoringShown ? "true" : "false"}
          onChange={(e) => setIsScoringShown(e.target.value == "true")}
        >
          <option value={"true"}>True</option>
          <option value={"false"}>False</option>
        </select>
      </EditorInfoSection>
      {type === "COMPLEX" && (
        <EditorInfoSection>
          <h3 className="label">Order of ideas</h3>
          <div className="comment">
            Is order of ideas in the answer important?
          </div>
          <select
            name="types"
            id="types"
            defaultValue={isOrderOfAnswersImportant}
            onChange={(e) =>
              setIsOrderOfAnswersImportant(e.target.value === "true")
            }
          >
            <option value={"false"}>No</option>
            <option value={"true"}>Yes</option>
          </select>
        </EditorInfoSection>
      )}
      <EditorInfoSection>
        <h3 className="label">Size of answer</h3>
        <div className="comment">
          Should the size of the answer match the sample answer?
        </div>
        <select
          name="types"
          id="types"
          defaultValue={shouldAnswerSizeMatchSample}
          onChange={(e) => setShouldAnswerSizeMatchSample(e.target.value)}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Instructor Name</h3>
        <input
          defaultValue={name}
          onChange={(e) => setInstructorName(e.target.value)}
        />
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">Instructor Image</h3>

        <input
          defaultValue={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">The Question</h3>
        <Comment>
          <DynamicLoadedEditor
            id="question"
            name="question"
            placeholder={"Question"}
            value={question}
            getEditorText={setQuestion}
          />
        </Comment>
      </EditorInfoSection>
      <EditorInfoSection>
        <h3 className="label">The Sample Answer</h3>
        {type !== "GENERATE" && type !== "FINDALL" && type !== "COMPLEX" && (
          <textarea
            id="answer"
            name="answer"
            placeholder={"Answer"}
            defaultValue={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
        {/* {(type == "GENERATE" || type == "FINDALL" || type == "COMPLEX") && ( */}
        <>
          {/* <label for="types">Ideas</label> */}
          {answers.map((an, i) => (
            <AnswerOption key={i}>
              {/* <label className="answerOptionLabel">{i + 1}</label> */}
              <textarea
                value={an.answer}
                placeholder={`Answer`}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[i] = {
                    ...newAnswers[i],
                    answer: e.target.value,
                  }; // Create a new object for the specific element and update its property
                  setAnswers(newAnswers);
                }}
              />
              {/* <div className="answerRow">
                  <div className="row1">
                    <label className="answerOptionLabel">Next task type</label>
                    <br />
                    <select
                      name="types"
                      id="types"
                      defaultValue={answers[i]?.next_type}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[i].next_type = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    >
                      <option value={null}></option>
                      <option value="quiz">Question</option>
                      <option value="newTest">Quiz</option>
                      <option value="problem">Case Study</option>
                    </select>
                  </div>
                  <div>
                    <label className="answerOptionLabel">Next task id</label>
                    <br />
                    <select
                      name="types"
                      id="types"
                      defaultValue={answers[i]?.next_id}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[i].next_id = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    >
                      {answers[i].next_type.toLowerCase() == "quiz" &&
                        lesson.quizes.map((q) => (
                          <option value={q.id}>{q.question}</option>
                        ))}
                      {answers[i].next_type.toLowerCase() == "newtest" &&
                        lesson.newTests.map((t) => (
                          <option value={t.id}>{t.question[0]}</option>
                        ))}
                      {answers[i].next_type.toLowerCase() == "problem" &&
                        lesson.problems.map((p) => (
                          <option value={p.id}>{p.text}</option>
                        ))}
                    </select>
                    {/* <input
                    value={an.next_id}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[i].next_id = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  /> 
                  </div>
                </div> */}
            </AnswerOption>
          ))}
        </>
        {/* )} */}
        {/* {(type == "GENERATE" || type == "FINDALL" || type == "COMPLEX") && ( */}
        <>
          <MiniAIButton
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
          </MiniAIButton>
          <MiniAIButton
            onClick={(e) => {
              e.preventDefault();
              if (answers.length > 0) {
                // Remove the last item from the answers array
                const newAnswers = answers.slice(0, -1);
                setAnswers(newAnswers);
              }
            }}
          >
            -1
          </MiniAIButton>
        </>
        {/* )} */}
      </EditorInfoSection>
      <Comment>
        <DynamicLoadedEditor
          id="answer"
          name="answer"
          value={ifRight}
          placeholder={"Explainer for the right answer"}
          getEditorText={setIfRight}
        />
      </Comment>
      <Comment>
        <DynamicLoadedEditor
          id="answer"
          name="answer"
          placeholder={"Explainer for the wrong answer"}
          value={ifWrong}
          getEditorText={setIfWrong}
        />
      </Comment>
      <BlueButton onClick={handleUpdate}>
        {loading ? t("saving") : t("save")}
      </BlueButton>
    </Container>
  );
};

export default UpdateQuiz;
