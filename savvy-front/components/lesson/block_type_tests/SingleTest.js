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
import MiniTest from "./types/MiniTest";
import { generateHint } from "./functions/AiFunctions";
import { useRouter } from "next/router";
import { SecondaryButton, Buttons } from "../styles/DevPageStyles";

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
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const SingleTest = (props) => {
  const {
    id,
    lessonID,
    question,
    story,
    ifWrong,
    ifRight,
    me,
    comments,
    author,
    type,
    context,
    challenge,
    problemType,
    passStudentAnswertoDocument,
    pushNextElementToProblem,
    may_i_edit,
    characters,
    instructorId,
  } = props;

  const [answerState, setAnswerState] = useState("think"); // is the answer of the student correct? "right", "wrong", "think"
  const [optionsChosenByStudentArray, setOptionsChosenByStudentArray] =
    useState(props.length); // track currently chosn options
  const [answer, setAnswer] = useState([]); // what is the student answer?
  const [
    indexesOfOptionsChosenByStudentsArray,
    setIndexesOfOptionsChosenByStudentsArray,
  ] = useState([]); // array with the indexes of the options chosen by the student
  const [attempts, setAttempts] = useState(0); // how many attempts to answer correctly did the student make?
  const [hasCorrectAnswerBeenGiven, setHasCorrectAnswerBeenGiven] =
    useState(false);
  const [inputColor, setInputColor] = useState("#f3f3f3"); // the color of the borders of the bubble with the student answer
  const [isUpdateModeOn, setIsUpdateModeOn] = useState(false); // change quiz view to update view
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
    let answerVar = optionsChosenByStudentArray;
    console.log("answerVar", answerVar);
    // 2. Which option did the student choose?
    let int = parseInt(number);
    if (!indexesOfOptionsChosenByStudentsArray.includes(int)) {
      let new_arr = [...indexesOfOptionsChosenByStudentsArray];
      new_arr.push(int);
      setIndexesOfOptionsChosenByStudentsArray(new_arr);
    } else {
      let new_arr = indexesOfOptionsChosenByStudentsArray.filter(
        (el) => el != int
      );
      setIndexesOfOptionsChosenByStudentsArray(new_arr);
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
    setOptionsChosenByStudentArray(answerVar);
    setAnswer(answerText);
  };

  const handleAnswerSelectedinBranch = async (number, student_answer) => {
    // 1. Create a new array with false values
    let newAnswerOptions = new Array(optionsChosenByStudentArray.length).fill(
      false
    );
    // 2. Which option did the student choose?
    let int = parseInt(number);

    // 3. Set the chosen option to true
    newAnswerOptions[int] = true;

    // 4. Update indexesOfOptionsChosenByStudentsArray to include only the chosen option
    let newAnswerNums = [int];

    // 5. Get the array of all the answers of the student
    let newAnswerText = [student_answer];

    // 6. Save the results
    setZero(false);

    // 7. Update the state with the new answer options, answer text, and answer numbers
    setOptionsChosenByStudentArray(newAnswerOptions);
    setAnswer(newAnswerText);
    setIndexesOfOptionsChosenByStudentsArray(newAnswerNums);
  };

  // this function adds comments to test options after the student has given an answer
  const addComments = (indexesOfOptionsChosenByStudentsArray) => {
    let comments_arr = [];
    if (comments && comments.length > 0) {
      indexesOfOptionsChosenByStudentsArray.map((num) =>
        comments_arr.push(comments[num])
      );
    }
    setCommentsList(comments_arr);
  };

  const onSend = async () => {
    if (answerState !== "think") return;
    if (props.moveNext) props.moveNext(props.id);
    if (pushNextElementToProblem) {
      const nextStep = props.next?.[resultBool] || undefined;
      pushNextElementToProblem([true, nextStep], "form");
    }

    addComments(indexesOfOptionsChosenByStudentsArray);
    setAnswerState("right");
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
    pushNextElementToProblem
      ? pushNextElementToProblem([true, branchSourceId], "branch")
      : null;

    addComments(indexesOfOptionsChosenByStudentsArray);
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
    if (optionsChosenByStudentArray.every((el) => el === false)) {
      setZero(true);
      return;
    }

    const isCorrect =
      JSON.stringify(optionsChosenByStudentArray) ===
      JSON.stringify(props.true);
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
    if (
      pushNextElementToProblem &&
      (!hasCorrectAnswerBeenGiven || attempts === 0)
    ) {
      pushNextElementToProblem(nextData, "test");
    }
    // Save the result if not already experienced
    if (!hasCorrectAnswerBeenGiven) {
      setHasCorrectAnswerBeenGiven(true);
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
    addComments(indexesOfOptionsChosenByStudentsArray);
    if (props.problemType !== "ONLY_CORRECT") setAttempts(attempts + 1);
    const firstCorrect = mes.find((el) => el[1] === true);
    if (isCorrect && passStudentAnswertoDocument) {
      passStudentAnswertoDocument(firstCorrect ? firstCorrect[0] : "");
      return;
      // passStudentAnswertoDocument(answer);
    }
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
    setIsUpdateModeOn(!isUpdateModeOn);
  };

  const getResult = (data) => {
    props.getResult ? props.getResult(data) : null;
  };
  let mes;
  if (type == "BRANCH" && props.complexTestAnswers) {
    mes = _.zip(
      props.complexTestAnswers?.complexTestAnswers.map((el) => el.answer),
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

  // Define a common set of props for the TEST component
  const commonTestProps = {
    id,
    lessonID,
    instructorId,
    story,
    me,
    author,
    question, // props.question
    true: props.true, // correctness
    type,
    problemType,
    answerState,
    challenge,
    next,
    characters,
    mes,
    getTestData,
    zero,
    passTestData,
    inputColor,
    commentsList,
    ifRight,
    ifWrong,
    correctAnswers,
    optionsChosenByStudentArray,
    context,
    answerOptions: optionsChosenByStudentArray,

    getData: pushNextElementToProblem,
    revealCorrectAnswer,
    provideHint,
  };

  return (
    <Styles width={width} id={props.id}>
      {may_i_edit && (
        <Buttons gap="10px" margin="0 0 20px 0">
          <SecondaryButton onClick={(e) => setIsUpdateModeOn(!isUpdateModeOn)}>
            {!isUpdateModeOn ? t("update") : t("back")}
          </SecondaryButton>
          <DeleteSingleTest
            id={me.id}
            testId={props.id}
            lessonId={props.lessonID}
          />
        </Buttons>
      )}
      {!isUpdateModeOn && me && (
        <>
          {(type === "TEST" || type == null) && <Test {...commonTestProps} />}

          {type === "FORM" && <Form {...commonTestProps} />}

          {type === "BRANCH" && <Branch {...commonTestProps} />}

          {type === "MINI" && <MiniTest {...commonTestProps} />}
        </>
      )}
      {isUpdateModeOn && (
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
          characters={characters}
          instructorId={instructorId}
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
