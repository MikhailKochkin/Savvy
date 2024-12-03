import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import _, { add } from "lodash";
import { useTranslation } from "next-i18next";
import UpdateTest from "./UpdateTest";
import DeleteSingleTest from "./DeleteSingleTest";
import Test from "./types/Test";
import Form from "./types/Form";
import Branch from "./types/Branch";
import { generateHint } from "./functions/AiFunctions";
import { useRouter } from "next/router";
import { SecondaryButton } from "../styles/DevPageStyles";

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION(
    $answer: String
    $answerArray: [String]
    $testID: String
    $lessonID: String
    $result: String
    $type: String
    $hint: String
  ) {
    createTestResult(
      answer: $answer
      testID: $testID
      lessonID: $lessonID
      answerArray: $answerArray
      result: $result
      type: $type
      hint: $hint
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  /* max-width: 650px;
  min-width: 510px; */
  width: 570px;
  background: #fff;

  font-weight: 500;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  margin-bottom: 30px;
`;

const SingleTest = (props) => {
  const {
    exam,
    story,
    ifWrong,
    ifRight,
    me,
    comments,
    miniforum,
    author,
    instructorName,
    name,
    image,
    next,
    type,
  } = props;
  const [answerState, setAnswerState] = useState("think"); // is the answer of the student correct?
  const [answerOptions, setAnswerOptions] = useState(props.length); // how many test options do we have?
  const [answer, setAnswer] = useState([]); // what is the answer?
  const [attempts, setAttempts] = useState(0); // how many attempts to answer correctly did the student make?
  const [answerNums, setAnswerNums] = useState([]); // what is the answer?
  const [isExperienced, setIsExperienced] = useState(false); // has the student already given the correct answer?
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [update, setUpdate] = useState(false); // change quiz view to update view
  const [sent, setSent] = useState(false);
  const [zero, setZero] = useState(false); // zero – no answers have been provided by the student wheck clicking answer
  const [commentsList, setCommentsList] = useState([]);
  const [branchSourceId, setBranchSourceId] = useState(null);
  const [hints, setHints] = useState([]);

  const router = useRouter();
  const { t } = useTranslation("lesson");
  let correctAnswers = props.answers.filter((el, i) => props.true[i]);

  const [createTestResult, { data, loading, error }] = useMutation(
    CREATE_TESTRESULT_MUTATION
  );

  const getTestData = (number, answer, sourceId) => {
    if (type == "TEST" && answerState == "right") return;
    if (type == "FORM" && answerState != "think") return;
    if (type == "BRANCH") {
      handleAnswerSelectedinBranch(number, answer);
      setBranchSourceId(sourceId);
    } else {
      handleAnswerSelected(number, answer);
      setAnswerState("think");
    }
  };

  const handleAnswerSelected = async (number, student_answer) => {
    // 1. Create an array with true / false values to compare the answer of the student and the author
    let answerVar = answerOptions;
    // 2. Which option did the student choose?
    let int = parseInt(number);
    if (!answerNums.includes(int)) {
      let new_arr = [...answerNums];
      new_arr.push(int);
      setAnswerNums(new_arr);
    } else {
      let new_arr = answerNums.filter((el) => el != int);
      setAnswerNums(new_arr);
    }
    // 3. Change the true / false value from step 1 according to the answer of the student in step 2
    answerVar[int] = !answerVar[int];
    // 4. get the array of all the answers of the student
    let answerText = answer;
    // 5. check if the student chose or singled out the option
    if (!answerText.includes(student_answer)) {
      answerText.push(student_answer);
    } else if (answerText.includes(student_answer)) {
      var index = answerText.indexOf(student_answer);
      answerText.splice(index, 1);
    }

    //6. save the results
    if (answerVar.includes(true)) {
      setZero(false);
    }
    setAnswerOptions(answerVar);
    setAnswer(answerText);
  };

  const handleAnswerSelectedinBranch = async (number, student_answer) => {
    // 1. Create a new array with false values
    let newAnswerOptions = new Array(answerOptions.length).fill(false);
    // 2. Which option did the student choose?
    let int = parseInt(number);

    // 3. Set the chosen option to true
    newAnswerOptions[int] = true;

    // 4. Update answerNums to include only the chosen option
    let newAnswerNums = [int];

    // 5. Get the array of all the answers of the student
    let newAnswerText = [student_answer];

    // 6. Save the results
    setZero(false);

    // 7. Update the state with the new answer options, answer text, and answer numbers
    setAnswerOptions(newAnswerOptions);
    setAnswer(newAnswerText);
    setAnswerNums(newAnswerNums);
  };

  // this function adds comments to test options after the student has given an answer
  const addComments = (answerNums) => {
    let comments_arr = [];
    if (comments && comments.length > 0) {
      answerNums.map((num) => comments_arr.push(comments[num]));
    }
    setCommentsList(comments_arr);
  };

  const onSend = async () => {
    if (answerState !== "think") return;
    if (props.moveNext) props.moveNext(props.id);
    if (props.getData) {
      const nextStep = props.next?.[resultBool] || undefined;
      props.getData([true, nextStep], "form");
    }

    addComments(answerNums);
    createTestResult({
      variables: {
        testID: props.id,
        lessonID: props.lessonID,
        answer: answer.join(", "),
        answerArray: answer,
      },
    });
  };

  const provideHint = async (e) => {
    let res = await generateHint(
      "openai",
      props.question[0],
      correctAnswers.join(", "),
      ifWrong,
      hints, // allHints
      router,
      props.context
    );
    setHints([...hints, res.newHint]);

    createTestResult({
      variables: {
        testID: props.id,
        lessonID: props.lessonID,
        answer: answer.join(", "),
        answerArray: answer,
        type: "hint",
        hint: res.newHint,
      },
    });

    return res;
  };

  const onMoveBranch = async () => {
    if (answerState !== "think") return;
    if (props.moveNext) props.moveNext(props.id);
    props.getData ? props.getData([true, branchSourceId], "branch") : null;

    addComments(answerNums);
    createTestResult({
      variables: {
        testID: props.id,
        lessonID: props.lessonID,
        answer: answer.join(", "),
        answerArray: answer,
      },
    });
    setAnswerState("right");
  };

  const onCheck = async () => {
    // Move forward if this is part of a lesson
    if (props.moveNext) props.moveNext(props.id);

    // Check if no answers are selected
    if (answerOptions.every((el) => el === false)) {
      setZero(true);
      return;
    }

    const isCorrect =
      JSON.stringify(answerOptions) === JSON.stringify(props.true);
    const result = isCorrect ? "true" : "false";
    const inputColor = isCorrect
      ? "rgba(50, 172, 102, 0.25)"
      : "rgba(222, 107, 72, 0.5)";
    const nextData =
      props.next && props.next[isCorrect]
        ? [isCorrect, props.next[isCorrect]]
        : [isCorrect, undefined];

    setAnswerState(isCorrect ? "right" : "wrong");
    setInputColor(inputColor);

    // Handle data submission for the first attempt
    if (props.getData && (!isExperienced || attempts === 0)) {
      props.getData(nextData, "test");
    }

    // Save the result if not already experienced
    if (!isExperienced) {
      setIsExperienced(true);
      createTestResult({
        variables: {
          testID: props.id,
          lessonID: props.lessonID,
          answer: answer.join(", "),
          answerArray: answer,
          result,
        },
      });
    }

    // Additional actions
    addComments(answerNums);
    if (props.problemType !== "ONLY_CORRECT") setAttempts(attempts + 1);
    setSent(true);
  };

  const passTestData = (type) => {
    if (type === "TEST") {
      onCheck();
    } else if (type === "FORM") {
      onSend();
    } else if (type === "BRANCH") {
      onMoveBranch();
    }
  };

  const revealCorrectAnswer = () => {
    createTestResult({
      variables: {
        testID: props.id,
        lessonID: props.lessonID,
        answer: answer.join(", "),
        answerArray: answer,
        result: "Reveal correct answer",
      },
    });
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  let mes;
  if (type == "BRANCH") {
    mes = _.zip(
      props.complexTestAnswers.complexTestAnswers.map((el) => el.answer),
      props.true,
      comments ? comments : new Array(props.answers.length).fill(""),
      props.complexTestAnswers.complexTestAnswers.map((el) => el.id)
    );
  } else {
    mes = _.zip(
      props.answers,
      props.true,
      comments ? comments : new Array(props.answers.length).fill("")
    );
  }
  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }

  return (
    <Styles width={width} id={props.id}>
      <Buttons>
        {!exam && story !== true && (
          <SecondaryButton onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </SecondaryButton>
        )}
        {me && !story && !exam && (
          <DeleteSingleTest
            id={me.id}
            testId={props.id}
            lessonId={props.lessonID}
          />
        )}{" "}
      </Buttons>
      {!update && me && (
        <>
          {(type == "TEST" || type == null) && (
            <Test
              story={story}
              me={me}
              image={image}
              instructorName={instructorName}
              author={author}
              question={props.question}
              true={props.true}
              type={type}
              answerState={answerState}
              challenge={props.challenge}
              problemType={props.problemType}
              getData={props.getData}
              next={props.next}
              id={props.id}
              lessonID={props.lessonID}
              mes={mes}
              getTestData={getTestData}
              zero={zero}
              passTestData={passTestData}
              inputColor={inputColor}
              commentsList={commentsList}
              ifRight={ifRight}
              ifWrong={ifWrong}
              revealCorrectAnswer={revealCorrectAnswer}
              correctAnswers={correctAnswers}
              answerOptions={answerOptions}
              context={props.context}
              provideHint={provideHint}
            />
          )}
          {type == "FORM" && (
            <Form
              story={story}
              me={me}
              image={image}
              instructorName={instructorName}
              author={author}
              question={props.question}
              true={props.true}
              type={type}
              answerState={answerState}
              challenge={props.challenge}
              problemType={props.problemType}
              getData={props.getData}
              next={props.next}
              id={props.id}
              lessonID={props.lessonID}
              mes={mes}
              getTestData={getTestData}
              passTestData={passTestData}
              zero={zero}
              commentsList={commentsList}
              answerOptions={answerOptions}
            />
          )}
          {type == "BRANCH" && (
            <Branch
              story={story}
              me={me}
              image={image}
              instructorName={instructorName}
              author={author}
              question={props.question}
              true={props.true}
              type={type}
              answerState={answerState}
              challenge={props.challenge}
              problemType={props.problemType}
              getData={props.getData}
              next={props.next}
              id={props.id}
              lessonID={props.lessonID}
              mes={mes}
              getTestData={getTestData}
              passTestData={passTestData}
              zero={zero}
              commentsList={commentsList}
              answerOptions={answerOptions}
            />
          )}
        </>
      )}
      {update && (
        <UpdateTest
          testID={props.id}
          lessonID={props.lessonID}
          quizes={props.quizes}
          complexity={props.complexity}
          question={props.question}
          comments={props.comments}
          answers={props.answers}
          complexTestAnswers={props.complexTestAnswers}
          correct={props.true}
          name={props.name}
          image={props.image}
          mes={mes}
          type={type}
          next={props.next}
          goal={props.goal}
          ifRight={ifRight}
          ifWrong={ifWrong}
          notes={props.notes}
          tests={props.tests}
          getResult={getResult}
          switchUpdate={switchUpdate}
          answer={answer}
        />
      )}
    </Styles>
  );
};

export default SingleTest;
