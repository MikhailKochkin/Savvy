import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { Row, ActionButton, Frame, MicroButton } from "../styles/DevPageStyles";

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
`;

const Comment = styled.div`
  margin: 3% 0;
  border-radius: 5px;
  border: 2px solid #dddddd;
  width: 90%;
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
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateQuiz();
      props.getResult(res);
      props.switchUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <div className="description">Id</div>
        <div className="action_area">
          <div className="element_info">{quizId}</div>
        </div>
      </Row>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <Row>
        <div className="description">Checking mode</div>
        <div className="action_area">
          <select
            defaultValue={check}
            onChange={(e) => setCheck(e.target.value)}
          >
            <option value={undefined}>Not chosen</option>
            <option value={"WORD"}>Literally</option>
            <option value={"IDEA"}>By implication</option>
          </select>
          <div className="explainer">
            This determines how the answer of the student is checked
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">{t("type")}</div>
        <div className="action_area">
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
          <div className="explainer">Choose the type of the question</div>
        </div>
      </Row>
      <Row>
        <div className="description">Format</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            defaultValue={goalType}
            onChange={(e) => setGoalType(e.target.value)}
          >
            <option value="EDUCATE">Educate</option>
            <option value="ASSESS">Assess</option>
          </select>
          <div className="explainer">Determine the format of assessment</div>
        </div>
      </Row>
      <Row>
        <div className="description">Is Scoring Shown</div>
        <div className="action_area">
          <select
            defaultValue={isScoringShown ? "true" : "false"}
            onChange={(e) => setIsScoringShown(e.target.value == "true")}
          >
            <option value={"true"}>True</option>
            <option value={"false"}>False</option>
          </select>
          <div className="explainer">Is the scoring show to the student?</div>
        </div>
      </Row>
      {type === "COMPLEX" && (
        <Row>
          <div className="description">Order of ideas</div>
          <div className="action_area">
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
            <div className="explainer">
              {" "}
              Is order of ideas in the answer important?
            </div>
          </div>
        </Row>
      )}
      <Row>
        <div className="description">Size of answer</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            defaultValue={shouldAnswerSizeMatchSample}
            onChange={(e) => setShouldAnswerSizeMatchSample(e.target.value)}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <div className="explainer">
            {" "}
            Should the size of the answer match the sample answer?
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Name</div>
        <div className="action_area">
          <input
            defaultValue={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
          <div className="explainer"></div>
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Image</div>
        <div className="action_area">
          <input
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="explainer"></div>
        </div>
      </Row>
      <Row>
        <div className="description">Question</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="question"
              name="question"
              placeholder={"Question"}
              value={question}
              getEditorText={setQuestion}
            />
          </Frame>
          <div className="explainer"></div>
        </div>
      </Row>
      {type !== "GENERATE" && type !== "FINDALL" && (
        <Row>
          <div className="description">Question</div>
          <div className="action_area">
            <Frame>
              <DynamicLoadedEditor
                id="question"
                name="question"
                placeholder={"Question"}
                value={question}
                getEditorText={setQuestion}
              />
            </Frame>
            <div className="explainer"></div>
          </div>
        </Row>
      )}

      {type !== "GENERATE" && type !== "FINDALL" && (
        <Row>
          <div className="description">Sample Answer</div>
          <div className="action_area">
            <textarea
              id="answer"
              name="answer"
              placeholder={"Answer"}
              defaultValue={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="explainer">
              This determines how the case study works
            </div>
          </div>
        </Row>
      )}
      {(type == "GENERATE" || type == "FINDALL") && (
        <Row>
          <div className="description">Ideas</div>
          <div className="action_area">
            {answers.map((an, i) => (
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
            ))}
            <MicroButton
              onClick={(e) => {
                e.preventDefault();
                if (answers.length > 0) {
                  const newAnswers = answers.slice(0, -1);
                  setAnswers(newAnswers);
                }
              }}
            >
              -1
            </MicroButton>
            <MicroButton
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
            </MicroButton>
            <div className="explainer">
              This determines how the case study works
            </div>
          </div>
        </Row>
      )}
      <Row>
        <div className="description">Correct answer comments</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="answer"
              name="answer"
              value={ifRight}
              placeholder="This text helps provide feedback if the answer is correct"
              getEditorText={setIfRight}
            />
          </Frame>
          <div className="explainer">
            This determines how the case study works
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">Incorrect answer comments </div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="answer"
              name="answer"
              value={ifWrong}
              placeholder="This text helps provide feedback if the answer is incorrect"
              getEditorText={setIfWrong}
            />
          </Frame>
          <div className="explainer">
            This determines how the case study works
          </div>
        </div>
      </Row>
      <ActionButton onClick={handleUpdate}>
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Container>
  );
};

export default UpdateQuiz;
