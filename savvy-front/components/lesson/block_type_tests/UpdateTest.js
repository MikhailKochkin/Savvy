import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { v4 as uuidv4 } from "uuid";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import {
  Row,
  ActionButton,
  Frame,
  MicroButton,
  SecondaryButton,
  Buttons,
} from "../styles/DevPageStyles";

const UPDATE_TEST_MUTATION = gql`
  mutation UPDATE_TEST_MUTATION(
    $id: String!
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
    $comments: [String!]
    $complexTestAnswers: ComplexTestAnswersInput
    $goal: String
    $complexity: Int
    $type: String
    $instructorName: String
    $name: String
    $image: String
    $ifRight: String
    $ifWrong: String
  ) {
    updateNewTest(
      id: $id
      question: $question
      answers: $answers
      correct: $correct
      comments: $comments
      complexTestAnswers: $complexTestAnswers
      goal: $goal
      complexity: $complexity
      ifRight: $ifRight
      ifWrong: $ifWrong
      type: $type
      instructorName: $instructorName
      name: $name
      image: $image
    ) {
      id
      answers
      correct
      type
      goal
      complexTestAnswers {
        complexTestAnswers {
          id
          answer
        }
      }
      comments
      complexity
      ifRight
      ifWrong
      question
      instructorName
      name
      image
      createdAt
      user {
        id
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

const AnswerArea = styled.div`
  width: 75%;
  margin-left: 15px;
  margin-bottom: 20px;
  .answerBox {
    margin-bottom: 20px;
  }
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  .answer_box {
    width: 85%;
  }
  .correct_box {
    margin-bottom: 0;
  }
  select {
    width: 12% !important;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateTest = (props) => {
  const [options, setOptions] = useState(props.mes);
  const [answers, setAnswers] = useState(props.answers);
  const [complexAnswers, setComplexAnswers] = useState(
    props.complexTestAnswers?.complexTestAnswers
      ? props.complexTestAnswers.complexTestAnswers
      : props.answers.map((an) => ({ id: uuidv4(), answer: an }))
  );
  const [comments, setComments] = useState(
    props.comments ? props.comments : new Array(props.answers.length).fill("")
  );
  const [whichCommentIsGenerated, setWhichCommentIsGenerated] = useState(null);
  const [correct, setCorrect] = useState(props.correct);
  const [question, setQuestion] = useState(props.question[0]);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [goal, setGoal] = useState(props.goal);
  const [ifRight, setIfRight] = useState(props.ifRight);
  const [ifWrong, setIfWrong] = useState(props.ifWrong);
  const [type, setType] = useState(props.type);
  const [image, setImage] = useState(props.image ? props.image : null);
  const [name, setName] = useState(props.name ? props.name : null);
  const [instructorName, setInstructorName] = useState(
    props.instructorName ? props.instructorName : null
  );
  const { t } = useTranslation("lesson");

  const handleArray = (val, name, i) => {
    let arr = [...answers];
    arr[i - 1] = val;
    let complex_arr = [...complexAnswers];
    complex_arr[i - 1] = { id: complex_arr[i - 1].id, answer: val };
    setAnswers(arr);
    setComplexAnswers(complex_arr);
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

  const setIf = (dataFromChild, name) => {
    if (name === "ifRight") {
      setIfRight(dataFromChild);
    } else if (name === "ifWrong") {
      setIfWrong(dataFromChild);
    } else if (name === "question") {
      setQuestion(dataFromChild);
    }
  };

  const { testID, lessonID } = props;
  const [updateNewTest, { loading, error }] = useMutation(
    UPDATE_TEST_MUTATION,
    {
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
    }
  );

  const generateExplanation = async (e, i, question, answer, isCorrect) => {
    e.preventDefault();
    let generateExplanationPrompt = `
      You are developing a comment for one of the questions of the quiz.
      The quiz questions is """${question}"""
      The answer is """${answer}""". 
      It is ${isCorrect}.

      Write a plain and simple two sentence explanation why this answer is ${isCorrect}. 
      Add <p> tags to the result.  

    `;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: generateExplanationPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newExplanation = data.result.content;
        return newExplanation;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <div className="description">Id</div>
        <div className="action_area">
          <div className="element_info">{testID}</div>
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
          <div className="explainer">The name will be used for navigation</div>
        </div>
      </Row>
      <Row>
        <div className="description">Type</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="TEST">{t("test")}</option>
            <option value="FORM">{t("form")}</option>
            <option value="BRANCH">{t("Branch")}</option>
            <option value="MINI">{t("mini")}</option>
          </select>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Goal</div>
        <div className="action_area">
          <textarea onChange={(e) => setGoal(e.target.value)}>{goal}</textarea>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Name</div>
        <div className="action_area">
          <input
            defaultValue={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />{" "}
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Image</div>
        <div className="action_area">
          <input
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Question</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="question"
              name="question"
              placeholder={t("question")}
              value={question}
              getEditorText={setIf}
            />
          </Frame>
          {/* <div className="explainer">The name will be used for navigation</div> */}
        </div>
      </Row>
      <Row>
        <div className="description">Answers</div>
        <AnswerArea>
          {options.map((answer, i) => {
            let an = `answer${i + 1}`;
            return (
              <div className="answerBox">
                <TopRow>
                  <Frame className="answer_box">
                    <DynamicLoadedEditor
                      index={i + 1}
                      name={i}
                      value={answer[0]}
                      getEditorText={handleArray}
                      placeholder={`Answer option ${i + 1}`}
                    />
                  </Frame>
                  <select
                    className="correct_box"
                    defaultValue={answer[1]}
                    onChange={(e) => handleCorrect(e.target.value, i)}
                  >
                    <option value={true}>✅</option>
                    <option value={false}>❌</option>
                  </select>
                </TopRow>
                {whichCommentIsGenerated !== i ? (
                  <TopRow>
                    <Frame>
                      <DynamicLoadedEditor
                        index={i + 1}
                        name={i}
                        value={comments[i]}
                        getEditorText={handleArray2}
                        placeholder={`Comment to answer option ${i + 1}`}
                      />
                    </Frame>
                    <Buttons margin="0 0 0 19px">
                      <SecondaryButton
                        onClick={async (e) => {
                          e.preventDefault();
                          setWhichCommentIsGenerated(i);
                          const newExplanation = await generateExplanation(
                            e,
                            i,
                            question,
                            answers[i],
                            correct[i]
                          );

                          let newComments = [...comments];

                          newComments[i] = newExplanation;
                          setComments(newComments);
                          setWhichCommentIsGenerated(null);
                        }}
                      >
                        AI
                      </SecondaryButton>
                    </Buttons>
                  </TopRow>
                ) : (
                  "..."
                )}
              </div>
            );
          })}
          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              let old_options = [...options];
              let popped = old_options.pop();
              setOptions([...old_options]);
              let old_answers = [...answers];
              old_answers.pop();
              let old_correct = [...correct];
              old_correct.pop();
              let old_comments = [...comments];
              old_comments.pop();
              let old_complexAnswers = [...complexAnswers];
              old_complexAnswers.pop();
              setComplexAnswers([...old_complexAnswers]);
              setAnswers([...old_answers]);
              setCorrect([...old_correct]);
              setComments([...old_comments]);
            }}
          >
            -1
          </MicroButton>

          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              setOptions([...options, ["", false, ""]]);
              setAnswers([...answers, ""]);
              setCorrect([...correct, false]);
              setComments([...comments, ""]);
              setComplexAnswers([
                ...complexAnswers,
                {
                  id: uuidv4(),
                  answer: "",
                },
              ]);
            }}
          >
            +1
          </MicroButton>
        </AnswerArea>
      </Row>
      <Row>
        <div className="description">Correct answer comments</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="ifRight"
              name="ifRight"
              value={ifRight}
              placeholder={t("feedback_positive")}
              getEditorText={setIf}
            />
          </Frame>
        </div>
      </Row>
      <Row>
        <div className="description">Incorrect answer comments </div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="ifWrong"
              name="ifWrong"
              value={ifWrong}
              placeholder={t("feedback_negative")}
              getEditorText={setIf}
            />
          </Frame>
        </div>
      </Row>
      <ActionButton
        onClick={async (e) => {
          e.preventDefault();
          const res = await updateNewTest({
            variables: {
              id: testID,
              question: [question],
              answers: answers,
              correct: correct,
              comments: comments,
              complexity,
              complexTestAnswers: {
                complexTestAnswers: complexAnswers.map((answer) => ({
                  id: answer.id,
                  answer: answer.answer,
                })),
              },
              type,
              goal,
              name,
              image,
              ifRight: ifRight,
              ifWrong: ifWrong,
            },
          });
          props.getResult(res);
          props.switchUpdate();
        }}
      >
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Container>
  );
};

export default UpdateTest;
