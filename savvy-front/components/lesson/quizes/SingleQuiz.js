import { useState, useEffect, useRef } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";
import renderHTML from "react-render-html";
import { CURRENT_USER_QUERY } from "../../User";
import Chat from "../questions/Chat";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $correct: Boolean
  ) {
    createQuizResult(
      answer: $answer
      quiz: $quiz
      lessonId: $lessonId
      correct: $correct
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 650px;
  min-width: 510px; */
  width: 570px;
  font-weight: 500;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    font-size: 1.6rem;
  }
`;

const Options = styled.div`
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
  transition: 0.3s;
  &:hover {
    border: 1px solid #3f51b5;
  }
`;

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
    object-fit: cover;

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
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-bottom: 3%;
  margin-top: ${(props) => (props.story ? "2%" : "0%")};
  p {
    margin: 5px 0;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .video {
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
    background: #ffffff;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2% 3%;
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
  button {
    width: 30%;
    padding: 2%;
    margin-top: 5%;
  }
  @media (max-width: 800px) {
    padding: 0%;
    margin-bottom: 5%;
    button {
      width: 50%;
      padding: 3%;
    }
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const Answer_text = styled.textarea`
  height: 140px;
  min-width: 60%;
  max-width: 70%;
  border: 2px solid;
  border-color: ${(props) => props.inputColor};
  outline: 0;
  resize: none;
  border-radius: 25px;
  padding: 3% 4%;
  line-height: 1.8;
  font-family: Montserrat;
  font-size: 1.6rem;
  margin-bottom: 20px;
`;

const Group = styled.div`
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.inputColor};
  width: 100%;
  pointer-events: ${(props) => (props.progress === "true" ? "none" : "auto")};
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  padding: 0.5% 0;
  margin-bottom: 3%;
  div {
    padding: 0.5% 0;
    cursor: pointer;
  }
`;

const Button1 = styled.div`
  width: 60%;
  text-align: center;
  background: #d2edfd;
  border-radius: 5px;
  cursor: pointer;
  color: #000a60;
  border: none;
  font-size: 1.6rem;
  transition: all 0.3s ease;
  display: ${(props) => (props.correct === "true" ? "none" : "block")};
  pointer-events: ${(props) => (props.correct === "true" ? "none" : "auto")};
  &:hover {
    background: #a5dcfe;
  }
`;

const Progress = styled.div`
  display: ${(props) => (props.display === "true" ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 0 0 2% 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  transition: ease-in 0.4s;
  &:hover {
    border: 1px solid blue;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const Block = styled.div`
  display: ${(props) => (props.display === "true" ? "block" : "none")};
  #comment {
    margin-bottom: 2%;
  }
`;

const SingleQuiz = (props) => {
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [correct, setCorrect] = useState(""); // is the answer by the student correct?
  const [update, setUpdate] = useState(false);
  const [sent, setSent] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [hint, setHint] = useState(null); // give the hint to the student
  const [showComment, setShowComment] = useState(false); // give the comment to the answer of the student
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [isExperienced, setIsExperienced] = useState(false);
  const [message, setMessage] = useState("");
  const [recognition, setRecognition] = useState(null);

  const { t } = useTranslation("lesson");
  const router = useRouter();

  function guessAlphabet(str) {
    // Removing <p> at the beginning of the string if it exists
    if (str.startsWith("<p>")) {
      str = str.slice(3);
    }

    // Limiting the check to the first 5 characters
    for (let i = 0; i < Math.min(str.length, 5); i++) {
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 122) return "Latin";
      if (code >= 1040 && code <= 1103) return "Cyrillic";
    }

    return "Unknown";
  }

  const onAnswer = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        if (!isExperienced) {
          props.getResults(2);
          setIsExperienced(true);
        }
        setCorrect("true");
        setInputColor("rgba(50, 172, 102, 0.25)");
        onMove("true");
      } else {
        setCorrect("false");
        setInputColor("rgba(222, 107, 72, 0.5)");
        onMove("false");
      }
    } else {
      const r = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (parseFloat(res.res) > 65) {
            if (!isExperienced) {
              props.getResults(2);
              setIsExperienced(true);
            }
            console.log(res);
            setCorrect("true");
            setInputColor("rgba(50, 172, 102, 0.25)");
            onMove("true");
          } else {
            setCorrect("false");
            setInputColor("rgba(222, 107, 72, 0.5)");
            if (typeof res.comment === "string") {
              if (router.locale == "ru") {
                setHint(res.comment);
              } else {
                if (res.comment == "Дайте более развернутый ответ") {
                  setHint("Give a more detailed answer.");
                } else {
                  setHint("Give a shorter answer.");
                }
              }
            }
            onMove("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onSend = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        setCorrect("true");
        onMove("true");
      } else {
        setCorrect("false");
        onMove("false");
      }
    } else {
      const r = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (parseFloat(res.res) > 65) {
            console.log(res);
            setCorrect("true");
            onMove("true");
          } else {
            setCorrect("false");

            if (typeof res.comment === "string") {
              if (router.locale == "ru") {
                setHint(res.comment);
              } else {
                if (res.comment == "Дайте более развернутый ответ") {
                  setHint("Give a more detailed answer.");
                } else {
                  setHint("Give a shorter answer.");
                }
              }
            }
            onMove("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onMove = (result) => {
    // 1. if the data is sent for the first time
    if (!sent) {
      // 2. and if we get the right answer
      if (result === "true" && props.getData) {
        // 3. and if this quiz is a part of an exam
        props.getData(
          props.next && props.next.true
            ? [true, props.next.true]
            : [true, { type: "finish" }],
          "true"
        );
      }
      // 2. and if we get the wrong answer
      else if (result === "false" && props.getData) {
        // 3. and if this quiz is a part of an exam
        // 4. we transfer the "false" data to the exam component
        props.getData(
          props.next && props.next.false
            ? [false, props.next.false]
            : [false, { type: "finish" }]
        );
      }
      setSent(true);
    }
  };

  const startListening = () => {
    const newRecognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    newRecognition.lang =
      guessAlphabet(props.question) == "Cyrillic" ? "ru-RU" : "en-US";
    newRecognition.interimResults = false;
    newRecognition.maxAlternatives = 1;

    newRecognition.start();

    newRecognition.onresult = function (event) {
      setAnswer(event.results[0][0].transcript);
    };

    newRecognition.onspeechend = function () {
      newRecognition.stop();
    };

    newRecognition.onerror = function (event) {
      console.error("Error occurred in recognition: " + event.error);
    };

    setRecognition(newRecognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const {
    me,
    user,
    exam,
    story,
    complexity,
    ifWrong,
    ifRight,
    check,
    miniforum,
    author,
  } = props;

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <Mutation
      mutation={CREATE_QUIZRESULT_MUTATION}
      variables={{
        quiz: props.quizID,
        lessonId: props.lessonID,
        answer: answer,
        correct: correct === "true",
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(createQuizResult, { loading, error }) => (
        <Styles width={width}>
          <Buttons>
            {!exam && !story && (
              <StyledButton onClick={(e) => setUpdate(!update)}>
                {!update ? t("update") : t("back")}
              </StyledButton>
            )}
            {me && !props.exam && !props.story ? (
              <DeleteSingleQuiz
                id={me.id}
                quizID={props.quizID}
                lessonID={props.lessonID}
              />
            ) : null}
          </Buttons>
          {!update && (
            <>
              <Question story={story}>
                <div className="question_box">
                  <div className="question_text">
                    {renderHTML(props.question)}
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
                  </IconBlock>{" "}
                </div>
                <div className="answer">
                  <IconBlock>
                    <div className="icon2">
                      {me.surname
                        ? `${me.name[0]}${me.surname[0]}`
                        : `${me.name[0]}${me.name[1]}`}
                    </div>{" "}
                    <div className="name">{me.name}</div>
                  </IconBlock>{" "}
                  <Answer_text
                    type="text"
                    required
                    inputColor={inputColor}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="..."
                  />
                </div>
                <Progress display={progress}>
                  <CircularProgress />
                </Progress>
                <Group progress={progress} correct={correct}>
                  <Button1
                    inputColor={inputColor}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (props.type === "FORM") {
                        const res1 = await onSend();
                      } else {
                        const res = await onAnswer();
                      }
                      setProgress("false");
                      const res0 = await createQuizResult();
                    }}
                    correct={correct}
                  >
                    {t("check")}
                  </Button1>
                  <Circle onClick={startListening}>
                    <BiMicrophone
                      className="icon"
                      value={{ className: "react-icons" }}
                    />
                  </Circle>
                  <Circle onClick={stopListening} disabled={!recognition}>
                    <BiMicrophoneOff
                      className="icon"
                      value={{ className: "react-icons" }}
                    />
                  </Circle>
                  {/* <button onClick={startListening}>Start listening</button> */}
                </Group>

                {correct === "true" && (
                  <div className="question_box">
                    <div className="question_text">
                      {!props.type != "FORM" && "🎉 " + t("correct")}!{" "}
                      {ifRight && ifRight !== "<p></p>" && renderHTML(ifRight)}{" "}
                      {!props.challenge &&
                        !props.type != "FORM" &&
                        t("show_correct")}
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
                {correct === "false" && (
                  <div className="question_box">
                    <div className="question_text">
                      {props.type != "FORM" && "🔎  " + t("wrong") + "..."}
                      <br />
                      {ifWrong &&
                        ifWrong !== "<p></p>" &&
                        renderHTML(ifWrong)}{" "}
                      {hint !== null &&
                        hint !== 0 &&
                        props.type != "FORM" &&
                        hint}
                      <br />
                      {!props.challenge &&
                        props.type != "FORM" &&
                        t("show_correct")}
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
                {!props.challenge && correct !== "" && props.type != "FORM" && (
                  <>
                    <div className="answer">
                      <IconBlock>
                        <div className="icon2">
                          {me.surname
                            ? `${me.name[0]}${me.surname[0]}`
                            : `${me.name[0]}${me.name[1]}`}
                        </div>{" "}
                        <div className="name">{me.name}</div>
                      </IconBlock>{" "}
                      <Options>
                        <Option onClick={(e) => setHidden(false)}>
                          {t("yes")}
                        </Option>
                      </Options>
                    </div>
                  </>
                )}
                {!hidden && (
                  <div className="question_box">
                    <div className="question_text">
                      {t("correct_answer")}: {renderHTML(props.answer)}
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
                    </IconBlock>{" "}
                  </div>
                )}
              </Question>
            </>
          )}
          {miniforum && <Chat me={me} miniforum={miniforum} />}
          {update && (
            <UpdateQuiz
              quizId={props.id}
              lessonID={props.lessonID}
              answer={props.answer}
              question={props.question}
              complexity={complexity}
              ifRight={ifRight}
              ifWrong={ifWrong}
              next={props.next}
              check={check}
              getResult={getResult}
              switchUpdate={switchUpdate}
              passUpdated={passUpdated}
            />
          )}
        </Styles>
      )}
    </Mutation>
  );
};

export default SingleQuiz;
