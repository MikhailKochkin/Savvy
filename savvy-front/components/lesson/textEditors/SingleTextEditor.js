import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
import { htmlToText } from "html-to-text";
// import { withStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import { CURRENT_USER_QUERY } from "../../User";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $wrong: String
    $correct: String
    $guess: String!
    $lessonId: String
    $textEditorId: String
    $type: String
    $result: Boolean
  ) {
    createTextEditorResult(
      attempts: $attempts
      wrong: $wrong
      correct: $correct
      guess: $guess
      lessonId: $lessonId
      textEditorId: $textEditorId
      type: $type
      result: $result
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-bottom: 20px;
  width: ${(props) => (props.width ? "95vw" : "100%")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #f8f9fa;
  padding: 2% 0;
`;

const TextBar = styled.div`
  width: 100%;
  font-size: 1.6rem;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.6rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  .flag {
    color: #008489;
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
    }
    th {
      border: 1px solid #edefed;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
    }
  }
  .edit {
    width: 90px;
    font-size: 1.6rem;
    line-height: 1.8;
    font-family: Montserrat;
    border: none;
    outline: 0;
    resize: none;
    color: #393939;
    overflow: hidden;
    height: auto;
    background: #bef1ed;
    padding: 3px 3px;
  }
  .mini_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
  .show_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
  .blocked {
    pointer-events: none;
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
`;

const Window = styled.div`
  top: 15%;
  position: -webkit-sticky;
  position: sticky;
  margin-left: -10px;
  margin-bottom: 20px;
  min-height: 80px;
  border-radius: 10px;
  width: 320px;
  line-height: 1.4;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  opacity: 0; // Initial opacity
  visibility: hidden; // Initial visibility
  transition: opacity 0.3s ease-in-out; // Transition effect
  ${(props) =>
    props.active &&
    `
    opacity: 1;  // Active opacity
    visibility: visible;  // Active visibility
  `}
  .answerBox {
    border-top: 1px solid #dadce0;
    padding: 10px 15px;
    button {
      background-color: rgb(26, 115, 232);
      color: rgb(255, 255, 255);
      border-radius: 4px;
      border: none;
      box-shadow: none;
      box-sizing: border-box;
      font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
        sans-serif;
      font-weight: 500;
      font-size: 14px;
      height: 24px;
      padding: 3px 12px 5px;
      margin-top: 8px;
      cursor: pointer;
      &:hover {
        box-shadow: rgb(66 133 244 / 15%) 0px 1px 3px 1px;
        background-color: rgb(43, 125, 233);
      }
    }
  }
  .questionBox {
    padding: 10px 15px;
    .icon {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .nameBlock {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .name {
      margin-left: 8px;
    }

    .cancelBlock {
      height: 100%;
      transition: 0.5s;
      border-radius: 50%;
      padding: 1%;
      cursor: pointer;
      &:hover {
        background: #ecf5fe;
      }
    }
    .cancel {
      margin: 5px;
      height: 15px;
      width: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  margin: 5px 0;
`;

const Input = styled.input`
  font-family: Montserrat;
  border: 1px solid;
  border: ${(props) => {
    if (props.color == true || props.color == false) {
      return "2px solid";
    } else {
      return "1px solid";
    }
  }};

  border-radius: 5px;
  outline: 0;
  padding: 5px 7px;
  width: 100%;
  border-color: ${(props) => {
    if (props.color == true) {
      return "rgba(50, 172, 102, 0.75)";
    } else if (props.color == false) {
      return "rgba(222, 107, 72, 0.5)";
    } else {
      return "#dadce0";
    }
  }};
`;

const EditText = styled.div`
  color: rgb(17, 17, 17);
  width: ${(props) => (props.story ? "940px" : "840px")};
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  padding: 5% 8%;
  margin: 55px auto 45px;
  @media (max-width: 1250px) {
    width: 750px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const WindowColumn = styled.div`
  height: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 35%;
`;

const BlueButton = styled.button`
  width: 180px;
  background: #3b5bb3;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

// const StyledButton = withStyles({
//   root: {
//     marginRight: "2%",
//     fontSize: "1.6rem",
//     textTransform: "none",
//     maxHeight: "40px",
//   },
// })(Button);

function containsOnlyNumbers(str) {
  const regex = /^[0-9]+$/;
  return regex.test(str);
}

function compareStrings(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return false;
    }
  }

  return true;
}

const SingleTextEditor = (props) => {
  // const [text, setText] = useState(props.textEditor.text);
  const [attempts, setAttempts] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState();
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState();
  const [showFeedback, setShowFeedback] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState();
  const [quizResult, setQuizResult] = useState("no");
  const [quizGuess, setQuizQuess] = useState("");
  const [errorAnswer, setErrorAnswer] = useState();
  const [correctErrorOption, setCorrectErrorOption] = useState();
  const [wrongErrorOption, setWrongErrorOption] = useState();
  const [chosenElement, setChosenElement] = useState();
  const [checking, setChecking] = useState(false);
  const [shown, setShown] = useState(false);
  const [result, setResult] = useState(false);
  const [update, setUpdate] = useState(false);
  const [type, setType] = useState("");
  const [mistakesShown, setMistakesShown] = useState(false);

  const { t } = useTranslation("lesson");

  const [createTextEditorResult, { data, loading, error }] = useMutation(
    CREATE_TEXTEDITORRESULT_MUTATION
  );

  const total = props.textEditor.totalMistakes;

  const check = async (e) => {
    e.persist();
    e.target.className = "blocked";
    setShown(true);
    let answer1 = htmlToText(correctErrorOption.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    });
    let answer2 = htmlToText(errorAnswer.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    }).replace(/\_/g, "");
    let data = {
      answer1: answer1,
      answer2: answer2,
    };
    // console.log(
    //   "answers",
    //   containsOnlyNumbers(answer1),
    //   containsOnlyNumbers(answer2)
    // );

    let el = document.getElementById(chosenElement);
    e.target.innerHTML = "Checking...";
    let r;
    if (containsOnlyNumbers(answer1) && containsOnlyNumbers(answer2)) {
      r = compareStrings(answer1, answer2);
      if (
        !e.target.nextSibling ||
        (e.target.nextSibling && e.target.nextSibling.innerHTML !== "Show")
      ) {
        let button2 = document.createElement("button");
        button2.innerHTML = "Show";
        button2.className = "show_button";
        button2.addEventListener("click", show);
        e.target.after(button2);
      }
      if (r) {
        setResult(true);
        props.getResults(1);
        el.style.background = "#D9EAD3";
        e.target.style.display = "none";
        return true;
      } else {
        setResult(false);
        el.style.background = "#FCE5CD";
        e.target.innerHTML = "Check";
        e.target.className = "mini_button";
        setTimeout(() => (el.style.background = "#bef1ed"), 3000);
        return false;
      }
    } else {
      r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          if (
            !e.target.nextSibling ||
            (e.target.nextSibling && e.target.nextSibling.innerHTML !== "Show")
          ) {
            let button2 = document.createElement("button");
            button2.innerHTML = "Show";
            button2.className = "show_button";
            button2.addEventListener("click", show);
            e.target.after(button2);
          }
          if (parseFloat(res.res) > 69) {
            setResult(true);
            props.getResults(1);
            el.style.background = "#D9EAD3";
            e.target.style.display = "none";
            return true;
          } else {
            setResult(false);
            el.style.background = "#FCE5CD";
            e.target.innerHTML = "Check";
            e.target.className = "mini_button";
            if (res.comment) {
              alert(res.comment);
            }
            setTimeout(() => (el.style.background = "#bef1ed"), 3000);
            return false;
          }
        })
        .catch((err) => console.log(err));
    }

    setShown(false);
    return r;
  };

  // check the corrections to the errors

  // check the guesses to the quizes
  const quizCheck = async (e) => {
    setChecking(true);
    let data = {
      answer1: quiz.answer,
      answer2: quizGuess,
    };

    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (parseFloat(res.res) > 69) {
          setQuizResult(true);
          setChecking(false);
          return true;
        } else {
          setQuizResult(false);
          setChecking(false);
          return false;
        }
      })
      .catch((err) => console.log(err));

    return r;
  };

  // start interaction with the piece of text
  const onMouseClick = (e) => {
    console.log("feedback data", e.target.getAttribute("feedback"));
    if (e.target.getAttribute("feedback")) {
      setErrorFeedback(e.target.getAttribute("feedback"));
    }
    let z = document.createElement("span");
    let id = uuidv4();
    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute("data-initial", e.target.getAttribute("error_data"));
    z.setAttribute("id", id);
    z.addEventListener("input", changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);
    let button = document.createElement("button");
    button.innerHTML = "Check";
    button.className = "mini_button";
    button.tabIndex = 0;
    // button.addEventListener("click", check);
    z.after(button);
    let wrong_option = htmlToText(e.target.innerHTML, {
      wordwrap: false,
      uppercase: false,
    });
    setErrorAnswer("");
    setCorrectErrorOption(
      e.target.getAttribute("error_data") || e.target.getAttribute("data")
    );
    setWrongErrorOption(wrong_option);
    setChosenElement(id);
  };

  // ???
  const changeState = (e) => {
    setErrorAnswer(e.target.innerHTML);
  };

  // ???
  const onReveal = (e) => {
    let span = document.createElement("span");
    span.innerHTML = ` (${e.target.getAttribute("data")})`;
    if (
      e.target.nextSibling == null ||
      (e.target.nextSibling &&
        span.innerHTML !== e.target.nextSibling.innerHTML)
    ) {
      e.target.className = "edit";
      e.target.after(span);
      span.className = "edit";
    }
  };

  // ???
  const show = (e) => {
    e.preventDefault();
    e.target.previousSibling.previousSibling.innerHTML =
      e.target.previousSibling.previousSibling.getAttribute("data-initial");
    e.target.style.pointerEvents = "none";
    e.target.previousSibling.style.display = "none";
    e.target.style.display = "none";
    e.target.previousSibling.previousSibling.contentEditable = false;
    e.target.previousSibling.previousSibling.style.pointerEvents = "none";
  };

  // ???
  const onShow = () => {
    const elements = document
      .getElementById(props.textEditor.id + 1)
      .querySelectorAll("#id, .quiz, .editor_note");
    if (mistakesShown) {
      elements.forEach((element) => {
        element.classList.remove("edit");
      });
    } else {
      elements.forEach((element) => {
        element.className = "edit";
      });
    }
    setMistakesShown(!mistakesShown);
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

  const { textEditor, me, lessonID, story, complexity, text } = props;
  return (
    <>
      {me &&
        (me.id === textEditor.user.id || me.permissions.includes("ADMIN")) &&
        !story && (
          <>
            <button onClick={(e) => setUpdate(!update)}>
              {update ? t("back") : t("update")}
            </button>
            <DeleteSingleTextEditor
              id={props.textEditor.id}
              lessonID={props.lessonID}
            />
          </>
        )}
      <Styles id={textEditor.id + 1} width={story}>
        {!update && (
          <div>
            <TextBar id={textEditor.id}>
              <EditText story={story}>
                <div
                  onClick={async (e) => {
                    console.log("clicked");
                    console.log(
                      "e.target.getAttribute(class)",
                      e.target.getAttribute("class")
                    );
                    console.log(
                      "type",
                      e.target.getAttribute("type"),
                      e.target.parentElement.getAttribute("type")
                    );
                    // update the number of attempts made by the student
                    setAttempts(attempts + 1);
                    if (e.target.getAttribute("class") == "mini_button") {
                      const ch = await check(e);
                      console.log("feedback", errorFeedback);

                      if (errorFeedback) {
                        setShowFeedback(true);
                      }
                      setTimeout(() => {
                        const res2 = createTextEditorResult({
                          variables: {
                            lessonId: props.lessonID,
                            textEditorId: props.textEditor.id,
                            attempts: attempts,
                            correct: correctErrorOption,
                            wrong: wrongErrorOption,
                            type: "error",
                            guess: errorAnswer,
                            result: ch,
                          },
                        });
                      }, 1000);
                    }
                    // 1. Comment / Note
                    if (
                      e.target.getAttribute("type") === "note" ||
                      e.target.parentElement.getAttribute("type") === "note"
                    ) {
                      console.log("note", note);
                      let val =
                        e.target.getAttribute("type") === "note"
                          ? e.target.getAttribute("text")
                          : e.target.parentElement.getAttribute("text");
                      if (e.target.tagName !== "BUTTON") {
                        e.target.className = "edit";
                      }
                      setShowNote(true);
                      setNote(val);
                      setType("note");
                      setTimeout(() => {
                        const res2 = createTextEditorResult({
                          variables: {
                            lessonId: props.lessonID,
                            textEditorId: props.textEditor.id,
                            attempts: attempts,
                            correct: val,
                            wrong: "",
                            type: "note",
                            guess: "opened",
                            result: true,
                          },
                        });
                      }, 3000);
                    }
                    // 2. Error
                    if (
                      e.target.id === "id" ||
                      e.target.getAttribute("type") === "error" ||
                      e.target.parentElement.getAttribute("type") === "error"
                    ) {
                      console.log("error");
                      if (total > 0) {
                        const res2 = onMouseClick(e);
                        console.log("1", 1);
                      } else if (props.total == 0 || props.total == null) {
                        const res3 = onReveal(e);
                      }
                      setType("error");
                    }
                    // 3. Quiz. Provide the student with data, quiz part of text
                    if (
                      e.target &&
                      (e.target.getAttribute("type") === "quiz" ||
                        (e.target.parentElement &&
                          e.target.parentElement.getAttribute("type") ===
                            "quiz"))
                    ) {
                      // 1.1 add styles to the text with a mistake
                      e.target.className = "edit";
                      // 1.2 add data necessary tp prove student with feedback to state
                      setShowQuiz(true);
                      setQuiz({
                        question:
                          e.target.getAttribute("type") === "quiz"
                            ? e.target.getAttribute("question")
                            : e.target.parentElement.getAttribute("question"),
                        answer:
                          e.target.getAttribute("type") === "quiz"
                            ? e.target.getAttribute("answer")
                            : e.target.parentElement.getAttribute("answer"),
                        ifRight:
                          e.target.getAttribute("type") === "quiz"
                            ? e.target.getAttribute("ifRight")
                            : e.target.parentElement.getAttribute("ifRight"),
                        ifWrong:
                          e.target.getAttribute("type") === "quiz"
                            ? e.target.getAttribute("ifWrong")
                            : e.target.parentElement.getAttribute("ifWrong"),
                      });
                      setType("quiz");
                    }
                  }}
                >
                  {parse(text)}
                </div>
              </EditText>
            </TextBar>
            <Buttons>
              <BlueButton onClick={onShow} variant="contained" color="primary">
                {mistakesShown ? "Hide" : "Show"}
              </BlueButton>
            </Buttons>
          </div>
        )}
        {(showQuiz || showNote || showFeedback) && (
          <WindowColumn>
            {/* {showNote && ( */}
            <Window active={showNote}>
              <div className="questionBox">
                <IconBlock>
                  <div className="nameBlock">
                    <img className="icon" src="../../static/hipster.svg" />
                    <div className="name">BeSavvy</div>
                  </div>
                  <div
                    className="cancelBlock"
                    onClick={(e) => setShowNote(false)}
                  >
                    <img className="cancel" src="../../static/cancel.svg" />
                  </div>
                </IconBlock>
              </div>
              <div className="answerBox">
                <Comment>{note}</Comment>
              </div>
            </Window>
            <Window active={showFeedback}>
              <div className="questionBox">
                <IconBlock>
                  <div className="nameBlock">
                    <img className="icon" src="../../static/hipster.svg" />
                    <div className="name">BeSavvy</div>
                  </div>
                  <div
                    className="cancelBlock"
                    onClick={(e) => setShowFeedback(false)}
                  >
                    <img className="cancel" src="../../static/cancel.svg" />
                  </div>
                </IconBlock>
              </div>
              <div className="answerBox">
                <Comment>{errorFeedback}</Comment>
              </div>
            </Window>
            {/* )} */}
            {/* {showQuiz && ( */}
            <Window active={showQuiz}>
              <div className="questionBox">
                <IconBlock>
                  <div className="nameBlock">
                    <img className="icon" src="../../static/hipster.svg" />
                    <div className="name">BeSavvy</div>
                  </div>
                  <div
                    className="cancelBlock"
                    onClick={(e) => setShowQuiz(false)}
                  >
                    <img className="cancel" src="../../static/cancel.svg" />
                  </div>
                </IconBlock>
                <div>{quiz && quiz.question}</div>
              </div>
              <div className="answerBox">
                <Input
                  color={quizResult}
                  onChange={(e) => {
                    setQuizQuess(e.target.value);
                  }}
                />
                <button
                  onClick={async (e) => {
                    const res = await quizCheck();
                    setTimeout(() => {
                      const res2 = createTextEditorResult({
                        variables: {
                          lessonId: props.lessonID,
                          textEditorId: props.textEditor.id,
                          attempts: attempts,
                          correct: quiz.answer,
                          wrong: quizGuess,
                          type: "quiz",
                          guess: quizGuess,
                          result: res,
                        },
                      });
                    }, 3000);
                  }}
                >
                  {checking ? t("checking") : t("check")}
                </button>
                {quizResult === false && <Comment>{quiz.ifWrong}</Comment>}
                {quizResult === true && <Comment>{quiz.ifRight}</Comment>}
              </div>
            </Window>
            {/* )} */}
          </WindowColumn>
        )}
      </Styles>
      {update && (
        <UpdateTextEditor
          lessonID={lessonID}
          id={props.textEditor.id}
          goal={props.textEditor.goal}
          text={text}
          complexity={complexity}
          totalMistakes={total}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </>
  );
};

SingleTextEditor.propTypes = {
  lessonID: PropTypes.string.isRequired,
  textEditor: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
};

export default SingleTextEditor;
