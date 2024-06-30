import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import _, { add } from "lodash";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";

import AnswerOption from "./AnswerOption";
import UpdateTest from "./UpdateTest";
import DeleteSingleTest from "../../delete/DeleteSingleTest";
import { CURRENT_USER_QUERY } from "../../User";
import Chat from "../questions/Chat";

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

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    height: 55px;
    width: 55px;
    object-fit: cover;
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
    line-height: 1.4rem;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
  p {
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
  .video {
    /* border: 1px solid #000000;
    background: #000000;
    border-radius: 10px;
    overflow: hidden;
    z-index: 1; */
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  .question_box {
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
    object-fit: cover;

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
    object-fit: cover;

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
    font-size: 1.6rem;
    .video {
      height: 356px;
      width: 200px;
    }
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
    object-fit: cover;

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
  background: #fff;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  /* height: 50px; */
  transition: 0.3s;
  &:hover {
    border: 1px solid #3f51b5;
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
  const [hidden, setHidden] = useState(true); // the correct answer is hidden
  const [revealExplainer, setRevealExplainer] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const { t } = useTranslation("lesson");

  const [createTestResult, { data, loading, error }] = useMutation(
    CREATE_TESTRESULT_MUTATION
  );

  const getTestData = (number, answer) => {
    handleAnswerSelected(number, answer);
    setAnswerState("think");
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

  // this function adds comments to test options after the student has given an answer
  const addComments = (answerNums) => {
    let comments_arr = [];
    if (comments && comments.length > 0) {
      answerNums.map((num) => comments_arr.push(comments[num]));
    }
    setCommentsList(comments_arr);
  };

  const onSend = async () => {
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
    // createTestResult({
    //   variables: {
    //     testID: props.id,
    //     lessonID: props.lessonID,
    //     answer: answer.join(", "),
    //     answerArray: answer,
    //   },
    // });
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

    // the logic is: if the type of the problem is "ONLY_CORRECT", than the student can give as many aspossible wrong answers, but only one correct answer.
    // getData is fired only once when the student gives correct answer

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
        setShowAnswer(true);
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

  const mes = _.zip(
    props.answers,
    props.true,
    comments ? comments : new Array(props.answers.length).fill("")
  );
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
      {/* 1. Вопрос студенту и варианты ответа */}
      {!update && me && (
        <TextBar className="Test" story={story}>
          <div className="question_box">
            <div className="question_text">{parse(props.question[0])}</div>
            <IconBlockElement
              image={image}
              instructorName={instructorName}
              author={author}
            />
          </div>
          <div className="answer">
            <IconBlock>
              <div className="icon2">
                {me &&
                  (me.image ? (
                    <img className="icon" src={me.image} />
                  ) : me.surname ? (
                    `${me.name[0]}${me.surname[0]}`
                  ) : (
                    `${me.name[0]}${me.name[1]}`
                  ))}
              </div>
              <div className="name">{me?.name}</div>
            </IconBlock>
            <Options>
              {mes.map((answer, index) => (
                <AnswerOption
                  true={props.true[index]}
                  hidden={!showAnswer}
                  key={index}
                  answer={answer[0]}
                  correct={answer[1]}
                  number={index}
                  onAnswerSelected={getTestData}
                />
              ))}
            </Options>
          </div>
          {/* 2. Студент не выбрал ни одного из вариантов. Просим дать ответ  */}

          {zero && (
            <div className="question_box">
              <div className="question_text">{t("choose_option")}</div>
              <IconBlockElement
                image={image}
                instructorName={instructorName}
                author={author}
              />
            </div>
          )}

          {/* 3. Кнопка ответа  */}

          <Group>
            {!showAnswer && (
              <MiniButton
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
                      const res1 = await onSend();
                    } else {
                      const res = await onCheck();
                    }
                  }
                }}
              >
                {t("check")}
              </MiniButton>
            )}
          </Group>

          {/* 4. Верный ответ. Поздравляем студента, даем комментарий к правильному варианту, объясняем, что делать дальше.  */}

          {props.type !== "FORM" && answerState === "right" && (
            <Question inputColor={inputColor}>
              <div className="question_text">
                {"🎉" + "  " + t("correct") + "!"}
                {commentsList.length > 0 &&
                  commentsList.map((com, i) => {
                    return com ? parse(com) : null;
                  })}
                {ifRight && ifRight !== "<p></p>" && parse(ifRight)}{" "}
              </div>
              <IconBlockElement
                image={image}
                instructorName={instructorName}
                author={author}
              />
            </Question>
          )}

          {/* 5. Неправильный ответ. Говорим об этом, даем комментарии к неправильным вариантам*/}

          {props.type != "FORM" && answerState === "wrong" && (
            <Question inputColor={inputColor}>
              <div className="question_text">
                {"🔎 " + "  " + t("wrong") + "..."}
                {commentsList.length > 0 &&
                  commentsList.map((com, i) => {
                    return com ? parse(com) : null;
                  })}
              </div>
              <IconBlockElement
                image={image}
                instructorName={instructorName}
                author={author}
              />
            </Question>
          )}

          {/* 6. Работаем с формами */}
          {props.type == "FORM" &&
            (answerState === "wrong" || answerState === "right") &&
            (ifWrong || ifRight || commentsList.length > 0) && (
              <Question inputColor={inputColor}>
                <div className="question_text">
                  {commentsList.length > 0 &&
                    commentsList.map((com, i) => {
                      return com ? parse(com) : null;
                    })}
                  {answerState === "wrong" && parse(ifWrong)}
                  {answerState === "right" && parse(ifRight)}
                </div>
                <IconBlockElement
                  image={image}
                  instructorName={instructorName}
                  author={author}
                />
              </Question>
            )}

          {/* 7. Неправильный ответ. Спрашиваем показать ли правильный вариант?*/}

          {!props.challenge &&
            answerState == "wrong" &&
            props.type !== "FORM" && (
              <>
                <div className="question_box">
                  <div className="question_text">{t("show_correct")}</div>
                  <IconBlockElement
                    image={image}
                    instructorName={instructorName}
                    author={author}
                  />
                </div>

                <div className="answer">
                  <IconBlock>
                    {/* <img className="icon" src="../../static/flash.svg" /> */}
                    <div className="icon2">
                      {me &&
                        (me.image ? (
                          <img className="icon" src={me.image} />
                        ) : me.surname ? (
                          `${me.name[0]}${me.surname[0]}`
                        ) : (
                          `${me.name[0]}${me.name[1]}`
                        ))}
                    </div>
                    <div className="name">{me?.name}</div>
                  </IconBlock>{" "}
                  <OptionsGroup>
                    <Option
                      onClick={(e) => {
                        setShowAnswer(true);
                        setIsExperienced(true);
                        setAnswerState("think");

                        if (props.problemType === "ONLY_CORRECT") {
                          props.getData(
                            props.next && props.next.true
                              ? [true, props.next.true]
                              : [true, { type: "finish" }],
                            "true"
                          );
                        }
                        createTestResult({
                          variables: {
                            testID: props.id,
                            lessonID: props.lessonID,
                            answer: answer.join(", "),
                            answerArray: answer,
                            result: "answerOpened",
                          },
                        });
                      }}
                    >
                      {t("yes")}
                    </Option>
                  </OptionsGroup>
                </div>
                {showAnswer && (
                  <div className="question_box">
                    <div className="question_text">{t("outline_color")}</div>
                    <IconBlockElement
                      image={image}
                      instructorName={instructorName}
                      author={author}
                    />
                  </div>
                )}
              </>
            )}
        </TextBar>
      )}
      {miniforum && <Chat me={me} miniforum={miniforum} />}
      {update && (
        <UpdateTest
          testID={props.id}
          lessonID={props.lessonID}
          quizes={props.quizes}
          complexity={props.complexity}
          question={props.question}
          comments={props.comments}
          answers={props.answers}
          correct={props.true}
          name={props.name}
          image={props.image}
          mes={mes}
          type={props.type}
          next={props.next}
          goal={props.goal}
          ifRight={ifRight}
          ifWrong={ifWrong}
          notes={props.notes}
          tests={props.tests}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </Styles>
  );
};

const IconBlockElement = ({ image, instructorName, author }) => {
  return (
    <IconBlock className="icon-block">
      {image ? (
        <img className="icon" src={image} alt="Icon" />
      ) : author && author.image != null ? (
        <img className="icon" src={author.image} alt="Author Icon" />
      ) : (
        <img
          className="icon"
          src="../../static/hipster.svg"
          alt="Default Icon"
        />
      )}
      <div className="name">
        {instructorName
          ? instructorName
          : author && author.name
          ? author.name
          : "BeSavvy"}
      </div>
    </IconBlock>
  );
};

export default SingleTest;
