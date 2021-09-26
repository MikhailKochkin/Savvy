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

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

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

const Styles = styled.div`
  width: 650px;
  /* width: ${(props) => props.width}; */
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const TextBar = styled.div`
  width: ${(props) => (props.story ? "100%" : "100%")};
  font-size: 1.6rem;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0;
    transition: 0.3s;
    cursor: pointer;
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
    align-items: flex-start;
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
  margin: 0;
  margin-bottom: 3%;
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

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #c4c4c4;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  height: 50px;
`;

const SingleTest = (props) => {
  const [answerState, setAnswerState] = useState("think"); // is the answer of the student correct?
  const [answerOptions, setAnswerOptions] = useState(props.length); // how many test options do we have?
  const [answer, setAnswer] = useState([]); // what is the answer?
  const [attempts, setAttempts] = useState(0); // how many attempts to answer correctly did the student make?
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [update, setUpdate] = useState(false);
  const [sent, setSent] = useState(false);
  const [zero, setZero] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reveal, setReveal] = useState("");

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
          // document.querySelector(".button").disabled = true;
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
    };
    const res2 = await res();
  };

  const onCheck = async () => {
    if (attempts == 0) {
      const res = () => {
        if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
          setAnswerState("right");
          setInputColor("rgba(50, 172, 102, 0.25)");
          // 1. if the data is sent for the first time
          if (props.getData) {
            // 2. and if this quiz is a part of an exam
            props.getData(
              props.next && props.next.true
                ? [true, props.next.true]
                : [true, { type: "finish" }],
              "true"
            );
          }
        } else {
          setAnswerState("wrong");
          setInputColor("rgba(222, 107, 72, 0.5)");
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
      };
      const res2 = await res();
    } else {
      const res = () => {
        if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
          setAnswerState("right");
          setInputColor("rgba(50, 172, 102, 0.25)");
        } else {
          setAnswerState("wrong");
          setInputColor("rgba(222, 107, 72, 0.5)");
        }
      };
      const res2 = await res();
    }

    const res1 = await setAttempts(attempts + 1);

    setSent(true);
  };

  const { exam, story, ifWrong, ifRight, me, user_name, author } = props;
  const mes = _.zip(props.answers, props.true);
  let userData;
  me
    ? (userData = props.userData
        .filter((el) => el.testID === props.id)
        .filter((el) => el.student.id === me.id))
    : (userData = 1);
  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <Styles width={width}>
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
            <IconBlock>
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}{" "}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </IconBlock>
          </div>
          <div className="answer">
            <IconBlock>
              <img className="icon" src="../../static/flash.svg" />
              <div className="name">{me.name}</div>
            </IconBlock>
            <Options>
              {mes.map((answer, index) => (
                <AnswerOption
                  true={props.true[index]}
                  hidden={hidden}
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
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </div>
          )}
          {/* 
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
          )} */}

          <Group>
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
                      const res0 = await createTestResult();
                    }
                  }}
                >
                  {props.t("check")}
                </MiniButton>
              )}
            </Mutation>
          </Group>
          {zero && (
            <div className="question">
              <div className="question_text">Выберите хотя бы один вариант</div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </div>
          )}
          {answerState === "right" && (
            <Question inputColor={inputColor}>
              <div className="question_text">
                {props.type != "FORM" && props.t("correct") + "! "}
                {ifRight && ifRight !== "<p></p>" && renderHTML(ifRight)}{" "}
              </div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </Question>
          )}
          {answerState === "wrong" && (
            <Question inputColor={inputColor}>
              <div className="question_text">
                {props.type != "FORM" && props.t("wrong") + "... "}
                {ifWrong && ifWrong !== "<p></p>" && renderHTML(ifWrong)}{" "}
              </div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </Question>
          )}
          {answerState == "wrong" && (
            <>
              <div className="question">
                <div className="question_text">Показать правильный ответ?</div>
                <IconBlock>
                  {author && author.image != null ? (
                    <img className="icon" src={author.image} />
                  ) : (
                    <img className="icon" src="../../static/hipster.svg" />
                  )}{" "}
                  <div className="name">
                    {author && author.name ? author.name : "BeSavvy"}
                  </div>
                </IconBlock>
              </div>

              <div className="answer">
                <IconBlock>
                  <img className="icon" src="../../static/flash.svg" />
                  <div className="name">{me.name}</div>
                </IconBlock>{" "}
                <OptionsGroup>
                  <Option onClick={(e) => setHidden(false)}>
                    {props.t("yes")}
                  </Option>
                  {/* <Option onClick={(e) => setHidden(true)}>
                    {props.t("no")}
                  </Option> */}
                </OptionsGroup>
              </div>
              {hidden == false && (
                <div className="question">
                  <div className="question_text">
                    Я подсветил зеленым правильные варианты ответа. Посмотри на
                    первоначальный вопрос.
                  </div>
                  <IconBlock>
                    {author && author.image != null ? (
                      <img className="icon" src={author.image} />
                    ) : (
                      <img className="icon" src="../../static/hipster.svg" />
                    )}{" "}
                    <div className="name">
                      {author && author.name ? author.name : "BeSavvy"}
                    </div>
                  </IconBlock>
                </div>
              )}
            </>
          )}
        </TextBar>
      )}
      {update && (
        <UpdateTest
          testID={props.id}
          lessonID={props.lessonID}
          quizes={props.quizes}
          complexity={props.complexity}
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
    </Styles>
  );
};

export default withTranslation("tasks")(SingleTest);
