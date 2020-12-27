import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import renderHTML from "react-render-html";
import AnswerOption from "./AnswerOption";
import UpdateTest from "./UpdateTest";
import DeleteSingleTest from "../../delete/DeleteSingleTest";
import { CURRENT_USER_QUERY } from "../../User";
import { withTranslation } from "../../../i18n";

const StyledButton = withStyles({
  root: {
    width: "15%",
    height: "45px",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const CREATE_TESTRESULT_MUTATION = gql`
  mutation CREATE_TESTRESULT_MUTATION(
    $answer: String
    $testID: String
    $lessonID: String
  ) {
    createTestResult(answer: $answer, testID: $testID, lessonID: $lessonID) {
      id
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
`;

const TextBar = styled.div`
  width: ${(props) => (props.story ? "100%" : "95%")};
  font-size: 1.6rem;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  .question {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 5px 0;
    }
    img {
      width: 100%;
    }
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.5rem;
    padding-left: 5px;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    border: 2px solid;
    border-color: ${(props) => props.inputColor};
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 5px 0;
    }
    img {
      width: 100%;
    }
  }
`;

const Group = styled.div`
  display: ${(props) => (props.answerState === "right" ? "none" : "flex")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0.5%;
  margin: 3% 0;
`;

const MiniButton = styled.div`
  pointer-events: ${(props) =>
    props.answerState === "right" ? "none" : "auto"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 60%;
  text-align: center;
  background: #d2edfd;
  border-radius: 5px;
  color: #000a60;
  border: none;
  padding: 0.5% 0;
  margin-top: 20px;
  font-size: 1.6rem;
  display: ${(props) => (props.answerState === "right" ? "none" : "block")};
  &:hover {
    background: #a5dcfe;
  }
`;

const SingleTest = (props) => {
  const [answerState, setAnswerState] = useState("think"); // is the answer of the student correct?
  const [answerOptions, setAnswerOptions] = useState(props.length); // how many test options do we have?
  const [answer, setAnswer] = useState([]); // what is the answer?
  const [attempts, setAttempts] = useState(false); // how many attempts to answer correctly did the student make?
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [update, setUpdate] = useState(false);
  const [sent, setSent] = useState(false);
  const [zero, setZero] = useState(false);

  const getTestData = (number, answer) => {
    handleAnswerSelected(number, answer);
  };

  const handleAnswerSelected = async (number, student_answer) => {
    // 1. Create an array with true / false values to compare the answer of the student and the author
    let answerVar = answerOptions;
    // 2. Which option did the student choose?
    let int = parseInt(number);
    // 3. Change the true / false value from step 1 according to the answer of the student in step 2
    answerVar[int] = !answerVar[int];
    // 4. get the array of all the answers of the student
    let answerText = answer;
    // 5. check if the student chose or singled out the option
    function change() {
      if (!answerText.includes(student_answer)) {
        answerText.push(student_answer);
      } else if (answerText.includes(student_answer)) {
        var index = answerText.indexOf(student_answer);
        answerText.splice(index, 1);
      }
    }
    const res = await change();
    //6. save the results
    const res1 = await setAnswerOptions(answerVar);
    const res2 = await setAnswer(answerText);
  };

  const onSend = async () => {
    const res = () => {
      if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
        // 1. if the data is sent for the first time
        if (!sent && props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next ? [true, props.next.true] : [true, { type: "finish" }],
            "true"
          );
          // document.querySelector(".button").disabled = true;
        }
      } else {
        // 1. if the data is sent for the first time
        if (!sent && props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next ? [false, props.next.false] : [false, { type: "finish" }]
          );
        }
      }
    };
    const res2 = await res();
  };

  const onCheck = async () => {
    const res1 = await setAttempts(attempts + 1);
    const res = () => {
      if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
        setAnswerState("right");
        setInputColor("rgba(50, 172, 102, 0.25)");
        // 1. if the data is sent for the first time
        if (!sent && props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next ? [true, props.next.true] : [true, { type: "finish" }],
            "true"
          );
        }
      } else {
        setAnswerState("wrong");
        setInputColor("rgba(222, 107, 72, 0.5)");
        // 1. if the data is sent for the first time
        if (!sent && props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next ? [false, props.next.false] : [false, { type: "finish" }]
          );
        }
      }
    };
    const res2 = await res();
    setSent(true);
  };

  const { exam, story, ifWrong, ifRight, me, user_name } = props;
  const mes = _.zip(props.answers, props.true);
  let userData;
  let student_name;
  let author_name;
  if (me) {
    if (me.name && me.surname) {
      student_name = (me.name.charAt(0) + me.surname.charAt(0)).toUpperCase();
    } else {
      student_name = (me.name.charAt(0) + me.name.charAt(1)).toUpperCase();
    }
  } else {
    student_name = "СТ";
  }
  if (user_name && user_name.name && user_name.surname) {
    author_name = (
      user_name.name.charAt(0) + user_name.surname.charAt(0)
    ).toUpperCase();
  } else if (user_name && user_name.name) {
    author_name = (
      user_name.name.charAt(0) + user_name.name.charAt(1)
    ).toUpperCase();
  } else {
    author_name = "НА";
  }
  me
    ? (userData = props.userData
        .filter((el) => el.testID === props.id)
        .filter((el) => el.student.id === me.id))
    : (userData = 1);
  return (
    <>
      {!exam && story !== true && (
        <StyledButton onClick={(e) => setUpdate(!update)}>
          {!update ? props.t("update") : props.t("back")}
        </StyledButton>
      )}
      {me && me.id === props.user && !story && !exam && (
        <DeleteSingleTest
          id={me.id}
          testId={props.id}
          lessonId={props.lessonID}
        />
      )}{" "}
      {!update && (
        <TextBar className="Test" story={story}>
          <div className="question">
            <div className="question_text">{renderHTML(props.question[0])}</div>
            <div className="question_name">{author_name}</div>
          </div>
          <div className="answer">
            <div className="answer_name">{student_name}</div>
            <Options>
              {mes.map((answer, index) => (
                <AnswerOption
                  key={index}
                  answer={answer[0]}
                  correct={answer[1]}
                  number={index}
                  onAnswerSelected={getTestData}
                />
              ))}
            </Options>
          </div>
          {zero && (
            <div className="question">
              <div className="question_text">Выберите хотя бы один вариант</div>
              <div className="question_name">{author_name}</div>
            </div>
          )}
          {answerState === "right" && (
            <Question inputColor={inputColor}>
              <div className="question_text">{props.t("correct")}!</div>
              <div className="question_name">{author_name}</div>
            </Question>
          )}
          {answerState === "right" && ifRight && ifRight !== "<p></p>" && (
            <Question inputColor={inputColor}>
              <div className="question_text">{renderHTML(ifRight)}</div>
              <div className="question_name">{author_name}</div>
            </Question>
          )}
          {answerState === "wrong" && (
            <Question inputColor={inputColor}>
              <div className="question_text">{props.t("wrong")}...</div>
              <div className="question_name">{author_name}</div>
            </Question>
          )}
          {answerState === "wrong" && ifWrong && ifWrong !== "<p></p>" && (
            <Question inputColor={inputColor}>
              <div className="question_text">{renderHTML(ifWrong)}</div>
              <div className="question_name">{author_name}</div>
            </Question>
          )}

          <Group answerState={answerState}>
            <Mutation
              mutation={CREATE_TESTRESULT_MUTATION}
              variables={{
                testID: props.id,
                lessonID: props.lessonID,
                answer: answer.join(", "),
              }}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(createTestResult, { loading, error }) => (
                <MiniButton
                  answerState={answerState}
                  // block={block}
                  className="button"
                  id="but1"
                  onClick={async (e) => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    if (answer.length < 1) {
                      setZero(true);
                    } else {
                      if (props.type === "FORM") {
                        console.log(0);
                        const res1 = await onSend();
                      } else {
                        console.log(1);
                        const res = await onCheck();
                      }
                      if (userData.length === 0) {
                        const res0 = await createTestResult();
                      }
                    }
                  }}
                >
                  {props.t("check")}
                </MiniButton>
              )}
            </Mutation>
          </Group>
        </TextBar>
      )}
      {update && (
        <UpdateTest
          testID={props.id}
          lessonID={props.lessonID}
          quizes={props.quizes}
          question={props.question}
          answers={props.answers}
          correct={props.true}
          mes={mes}
          next={props.next}
          ifRight={ifRight}
          ifWrong={ifWrong}
          notes={props.notes}
          tests={props.tests}
        />
      )}
    </>
  );
};

export default withTranslation("tasks")(SingleTest);
