import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import _, { add } from "lodash";
import { useTranslation } from "next-i18next";
import UpdateTest from "./UpdateTest";
import DeleteSingleTest from "../../delete/DeleteSingleTest";
import Test from "./types/Test";
import Form from "./types/Form";
import Branch from "./types/Branch";

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION(
    $answer: String
    $answerArray: [String]
    $testID: String
    $lessonID: String
    $result: String
  ) {
    createTestResult(
      answer: $answer
      testID: $testID
      lessonID: $lessonID
      answerArray: $answerArray
      result: $result
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

  const { t } = useTranslation("lesson");

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

    if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
      setAnswerState("right");
      // 1. if the data is sent for the first time
      if (props.getData) {
        // 2. and if this quiz is a part of an exam
        props.getData(
          props.next && props.next.true
            ? [true, props.next.true]
            : [true, { type: "finish" }],
          "true"
        );
        document.querySelector(".button").disabled = true;
      }
    } else {
      setAnswerState("wrong");
      // 1. if the data is sent for the first time
      if (props.getData) {
        // 2. and if this quiz is a part of an exam
        props.getData(
          props.next && props.next.false
            ? [false, props.next.false]
            : [false, { type: "finish" }]
        );
      }
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

  const onCheck = async () => {
    // 1. if this test is a part of a lesson, move forward when you get an answer
    // There are 2 types of movement funcitions:
    // 1.1 moveNext - move through the lesson
    // 1.2 getData - move through the problem

    if (props.moveNext) props.moveNext(props.id);

    // 2. Here starts the logic that defines how the test is checked and what follows after that
    // Criteria for that:
    // 2.1. answer is correct
    // 2.2. # of attempts to answer the question
    // 2.3. type of the problem

    // the logic is: if the type of the problem is "ONLY_CORRECT", than the student can give as many as possible wrong answers, but only one correct answer.
    // getData is fired only once when the student gives correct answer
    if (answerOptions.every((el) => el == false)) {
      setZero(true);
      return;
    }
    if (props.problemType === "ONLY_CORRECT") {
      if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
        setAnswerState("right");
        setInputColor("rgba(50, 172, 102, 0.25)");
        // 1. if the data is sent for the first time
        if (props.getData && !isExperienced) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next && props.next.true
              ? [true, props.next.true]
              : [true, { type: "finish" }],
            "true"
          );
        }
        // save answers until you get the right one
        if (!isExperienced) {
          setIsExperienced(true);
          createTestResult({
            variables: {
              testID: props.id,
              lessonID: props.lessonID,
              answer: answer.join(", "),
              answerArray: answer,
              result: "true",
            },
          });
        }
      } else {
        setAnswerState("wrong");
        setInputColor("rgba(222, 107, 72, 0.5)");
        createTestResult({
          variables: {
            testID: props.id,
            lessonID: props.lessonID,
            answer: answer.join(", "),
            answerArray: answer,
            result: "false",
          },
        });
        // for this type of problems we allow to give as many incorrect answers as needed without moving forward in the problem
      }
    } else {
      // this scenario is fired if we have another type of the problem or the test is not a part of the problem at all
      if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
        setAnswerState("right");
        setInputColor("rgba(50, 172, 102, 0.25)");
        // 1. if the data is sent for the first time
        if (props.getData && attempts == 0) {
          props.getData(
            props.next && props.next.true
              ? [true, props.next.true]
              : [true, { type: "finish" }],
            "true"
          );
        }
        if (!isExperienced) {
          setIsExperienced(true);
          createTestResult({
            variables: {
              testID: props.id,
              lessonID: props.lessonID,
              answer: answer.join(", "),
              answerArray: answer,
              result: "true",
            },
          });
        }
      } else {
        setAnswerState("wrong");
        setInputColor("rgba(222, 107, 72, 0.5)");
        // 1. if the data is sent for the first time
        if (props.getData && attempts == 0) {
          props.getData(
            props.next && props.next.false
              ? [false, props.next.false]
              : [false, { type: "finish" }]
          );
        }
        if (!isExperienced) {
          setIsExperienced(true);
          createTestResult({
            variables: {
              testID: props.id,
              lessonID: props.lessonID,
              answer: answer.join(", "),
              answerArray: answer,
              result: "false",
            },
          });
        }
      }
    }

    // 3. prepare comments
    addComments(answerNums);

    if (props.problemType !== "ONLY_CORRECT") {
      setAttempts(attempts + 1);
    }
    setSent(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
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

  let correctAnswers = props.answers.filter((el, i) => props.true[i]);

  return (
    <Styles width={width} id={props.id}>
      {!exam && story !== true && (
        <button onClick={(e) => setUpdate(!update)}>
          {!update ? t("update") : t("back")}
        </button>
      )}
      {me && !story && !exam && (
        <DeleteSingleTest
          id={me.id}
          testId={props.id}
          lessonId={props.lessonID}
        />
      )}{" "}
      {!update && me && (
        <>
          {type == "TEST" && (
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
          passUpdated={passUpdated}
          answer={answer}
        />
      )}
    </Styles>
  );
};

export default SingleTest;
