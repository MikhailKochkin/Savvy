import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import { htmlToText } from "html-to-text";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import smoothscroll from "smoothscroll-polyfill";
import { TailSpin } from "react-loader-spinner";

import SingleProblem from "../problems/SingleProblem";
import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import SingleQuiz from "../quizes/SingleQuiz";
import Note from "../notes/Note";
import { MiniOpenQuestionFrame, MiniAIButton } from "../quizes/QuestionStyles";
import {
  containsOnlyNumbers,
  compareStrings,
} from "../SimulatorDevelopmentFunctions";

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
  .question {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 20px;
    .line_top {
      border-top: 1px solid #d0d0d0;
      padding-top: 20px;
    }
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
  h2 {
    line-height: 1.4;
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

const WindowBundle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 15%;
  position: -webkit-sticky;
  position: sticky;
`;
const Window = styled.div`
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
  opacity: 1; // Active opacity
  visibility: visible; // Active visibility
  /* ${(props) =>
    props.active &&
    `
    opacity: 1;  // Active opacity
    visibility: visible;  // Active visibility
  `} */
  .answerBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-top: 1px solid #f3f3f3;
    padding: 10px 15px;
    button {
      background-color: #d2edfd;
      color: #000a60;
      border-radius: 4px;
      border: none;
      box-shadow: none;
      box-sizing: border-box;
      font-family: Montserrat;
      font-weight: 500;
      font-size: 14px;
      /* height: 24px; */
      padding: 8px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        box-shadow: rgb(66 133 244 / 15%) 0px 1px 3px 1px;
        background-color: #a4dbfe;
      }
    }
  }
  .questionBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  .studentsWording {
    width: 100%;
    margin: 10px 0;
    .studentsWordingHeader {
      margin-bottom: 5px;
    }
  }
`;

const Comment = styled.div`
  padding: 7px 10px;
  border-radius: 10px;
  border-color: #f3f3f3;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  margin: 5px 0;
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

const WindowColumn = styled.div`
  height: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 10%;
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

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const SingleTextEditor = (props) => {
  const { textEditor, me, lessonID, story, complexity, text, lesson } = props;

  const [attempts, setAttempts] = useState(0); // number of attempts to dinf concealed information

  const [isNoteWindowShown, setIsNoteWindowShown] = useState(false); // is the window with a note shown?
  const [isErrorWindowShown, setIsErrorWindowShown] = useState(false); // is the window where error can be fixed shown?
  const [showFeedback, setShowFeedback] = useState(false); // ??

  const [currentlyActiveStringinNotes, setCurrentlyActiveStringinNotes] =
    useState(""); // source text the click on which reveals the comment / note
  const [note, setNote] = useState(); // note text
  const [noteId, setNoteId] = useState(); // note text
  const [problemId, setProblemId] = useState(); // case study id
  const [errorId, setErrorId] = useState(); // ???

  const [errorFeedback, setErrorFeedback] = useState(); // ???
  const [errorAnswer, setErrorAnswer] = useState(); // new wording provided by the student to fix the error
  const [correctErrorOption, setCorrectErrorOption] = useState(); // sample wording used to check the answer
  const [wrongErrorOption, setWrongErrorOption] = useState(); // ??
  const [result, setResult] = useState(null); // is the new wording correct?
  const [miniQuiz, setMiniQuiz] = useState();

  const [chekingAnswer, setChekingAnswer] = useState(false); // used for the loading widget while the wording is being checked
  const [update, setUpdate] = useState(false); // update the text editor
  const [type, setType] = useState(""); // what type of indormation have we found in the document?

  const [mistakesShown, setMistakesShown] = useState(false); // are all the errors outlined on the Show button click

  const { t } = useTranslation("lesson");

  useEffect(() => {
    smoothscroll.polyfill();
  });

  const [createTextEditorResult, { data, loading, error }] = useMutation(
    CREATE_TEXTEDITORRESULT_MUTATION
  );

  const total = props.textEditor.totalMistakes;

  useEffect(() => {
    if (errorId) {
      let newMiniQuiz = props.lesson.quizes.find((quiz) => quiz.id == errorId);
      setMiniQuiz(newMiniQuiz);
    } else {
      null;
    }
  }, [errorId]);

  let miniNote;
  if (noteId) {
    miniNote = props.lesson.notes.find((note) => note.id == noteId);
  } else {
    null;
  }

  const evaluateErrorFix = async (e) => {
    setChekingAnswer(true);
    const answer1 = htmlToText(correctErrorOption.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    });

    const answer2 = htmlToText(errorAnswer.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    }).replace(/\_/g, "");
    const data = {
      answer1: answer1,
      answer2: answer2,
    };

    if (containsOnlyNumbers(answer1) && containsOnlyNumbers(answer2)) {
      const comparisonResult = compareStrings(answer1, answer2);
      setResult(comparisonResult);
      if (comparisonResult) {
        props.getResults(1);
      }
      setChekingAnswer(false);

      return comparisonResult;
    } else {
      const fetchResult = await fetchChecker(data);
      setChekingAnswer(false);

      return fetchResult;
    }
  };

  const fetchChecker = async (data) => {
    try {
      const response = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      if (parseFloat(res.res) > 65) {
        setResult(true);
        return true;
      } else {
        setResult(false);
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle click events on the document
  const onMouseClick = (e) => {
    if (e.target.getAttribute("feedback")) {
      setErrorFeedback(e.target.getAttribute("feedback"));
    }
    let z = document.createElement("span");
    let id = uuidv4();
    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute(
      "data-initial",
      e.target.getAttribute("error_data")
        ? e.target.getAttribute("error_data")
        : e.target.getAttribute("error_text")
    );
    if (e.target.getAttribute("elementid")) {
      z.setAttribute("errorid", e.target.getAttribute("elementid"));
    }
    z.setAttribute("id", id);
    z.addEventListener("input", changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);
    let wrong_option = htmlToText(e.target.innerHTML, {
      wordwrap: false,
      uppercase: false,
    });
    setCorrectErrorOption(
      e.target.getAttribute("error_text") ||
        e.target.getAttribute("error_data") ||
        e.target.getAttribute("data")
    );
    setWrongErrorOption(wrong_option);
  };

  // this function is automatically added to the edited text to pass all changes to the state
  const changeState = (e) => {
    setErrorAnswer(e.target.innerHTML);
  };

  // used for old cases when the indormation is revealed when it is clicked on
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

  // Show all parts of the text that contain hidden information
  const onShow = () => {
    const elements = document
      .getElementById(props.textEditor.id + 1)
      .querySelectorAll(
        ".editor_note, .editor_error, [error_data], .editor_problem"
      );
    console.log(elements);
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

  const slide = (id) => {
    var my_element = document.getElementById(id);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const passResultToTextEditor = (val) => {
    setResult(val);
    console.log(val);
    let editedText = document.querySelector(`[errorId=${errorId}]`);
    if (val == "true") {
      editedText.style.backgroundColor = "rgba(50, 172, 102, 0.3)";
      editedText.contentEditable = "false";
    } else {
      editedText.style.backgroundColor = "rgba(222, 107, 72, 0.3)";
      setTimeout(() => {
        editedText.style.backgroundColor = "#BEF1ED";
      }, [2500]);
    }
  };

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
            {/* The document itself */}
            <TextBar id={textEditor.id}>
              <EditText story={story}>
                <div
                  onClick={async (e) => {
                    // update the number of attempts made by the student
                    setAttempts(attempts + 1);
                    if (e.target.getAttribute("class") == "mini_button") {
                      const ch = await check(e);

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
                    if (
                      e.target.classList.contains("edit") &&
                      isErrorWindowShown == false
                    ) {
                      setErrorAnswer(e.target.innerHTML);
                    }
                    // 1. Comment / Note
                    if (
                      e.target.getAttribute("type") === "note" ||
                      e.target.parentElement.getAttribute("type") === "note"
                    ) {
                      let val =
                        e.target.getAttribute("type") === "note"
                          ? e.target.getAttribute("text")
                          : e.target.parentElement.getAttribute("text");
                      if (e.target.tagName !== "BUTTON") {
                        e.target.className = "edit";
                      }
                      setIsNoteWindowShown(true);
                      setCurrentlyActiveStringinNotes(e.target.innerHTML);
                      setNote(val);
                      setNoteId(e.target.getAttribute("elementid"));
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
                      setIsErrorWindowShown(true);
                      setErrorAnswer(e.target.innerHTML);
                      setResult(null);
                      setErrorId(e.target.getAttribute("elementid"));

                      if (total > 0) {
                        const res2 = onMouseClick(e);
                      } else if (props.total == 0 || props.total == null) {
                        const res3 = onReveal(e);
                      }
                      setType("error");
                    }

                    if (
                      e.target.classList.contains("edit") &&
                      e.target.getAttribute("type") !== "note" &&
                      e.target.parentElement?.getAttribute("type") !== "note" &&
                      e.target.getAttribute("type") !== "problem" &&
                      e.target.parentElement?.getAttribute("type") !== "problem"
                    ) {
                      setErrorAnswer(e.target.innerHTML);
                      let newMiniQuiz = props.lesson.quizes.find(
                        (quiz) => quiz.id == e.target.getAttribute("errorid")
                      );
                      setErrorId(e.target.getAttribute("errorid"));

                      setMiniQuiz(newMiniQuiz);
                      setCorrectErrorOption(
                        e.target.getAttribute("data-initial")
                      );
                      setIsErrorWindowShown(true);
                      setResult(null);
                    }

                    // 3. Case Study. Transition to Case Study.

                    if (
                      e.target &&
                      (e.target.getAttribute("type") === "problem" ||
                        (e.target.parentElement &&
                          e.target.parentElement.getAttribute("type") ===
                            "problem"))
                    ) {
                      // 1.1 add styles to the text with a mistake
                      e.target.className = "edit";
                      // 1.2 add data necessary tp prove student with feedback to state
                      setType("problem");
                      setProblemId(e.target.getAttribute("elementid"));
                      setTimeout(() => {
                        slide(e.target.getAttribute("elementid"));
                      }, 500);
                    }
                  }}
                >
                  {parse(text)}
                </div>
              </EditText>
            </TextBar>
            {/* The button to reveal hidden information in the document */}
            <Buttons>
              <BlueButton onClick={onShow} variant="contained" color="primary">
                {mistakesShown ? "Hide" : "Show"}
              </BlueButton>
            </Buttons>
          </div>
        )}
        {/* All comments are now presented in the WindowColumn */}
        {(isErrorWindowShown || isNoteWindowShown || showFeedback) && (
          <WindowColumn>
            <WindowBundle>
              {isNoteWindowShown && (
                <Window>
                  <div className="questionBox">
                    <IconBlock>
                      <div className="nameBlock">
                        <img className="icon" src="../../static/hipster.svg" />
                        <div className="name">BeSavvy</div>
                      </div>
                      <div
                        className="cancelBlock"
                        onClick={(e) => setIsNoteWindowShown(false)}
                      >
                        <img className="cancel" src="../../static/cancel.svg" />
                      </div>
                    </IconBlock>
                  </div>
                  <div className="answerBox">
                    <Comment>
                      <i>"{currentlyActiveStringinNotes}"</i>
                    </Comment>
                  </div>
                  <div className="answerBox">
                    <Comment>
                      {console.log(miniNote)}
                      {miniNote && miniNote.text ? (
                        <Note
                          text={miniNote.text}
                          name={miniNote.name}
                          me={me}
                          user={lesson.user.id}
                          note={miniNote}
                          author={lesson.user}
                          id={miniNote.id}
                          complexity={miniNote.complexity}
                          lessonID={lesson.id}
                          miniforum={null}
                          getResult={null}
                          passUpdated={null}
                          story={true}
                        />
                      ) : note ? (
                        parse(note)
                      ) : null}
                    </Comment>
                  </div>
                </Window>
              )}
              {/* <Window active={showFeedback}>
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
              </Window> */}
              {isErrorWindowShown && (
                <Window>
                  <div className="questionBox">
                    <IconBlock>
                      <div className="nameBlock">
                        <img className="icon" src="../../static/hipster.svg" />
                        <div className="name">BeSavvy</div>
                      </div>
                      <div
                        className="cancelBlock"
                        onClick={(e) => {
                          setResult(null);
                          setErrorAnswer("");
                          setIsErrorWindowShown(false);
                        }}
                      >
                        <img className="cancel" src="../../static/cancel.svg" />
                      </div>
                    </IconBlock>
                    {!miniQuiz ? (
                      <div className="studentsWording">
                        <div className="studentsWordingHeader">
                          {t("make_changes_to_the_text")}
                        </div>
                        {errorAnswer !== "" && (
                          <MiniOpenQuestionFrame
                            inputColor={
                              result === null
                                ? "rgba(0, 0, 0, 0.1)"
                                : result === true
                                ? "rgba(50, 172, 102, 1)"
                                : "rgba(222, 107, 72, 0.5)"
                            }
                          >
                            {errorAnswer ? parse(errorAnswer) : null}
                          </MiniOpenQuestionFrame>
                        )}

                        {chekingAnswer && (
                          <Progress2>
                            <TailSpin width="35" color="#2E80EC" />
                          </Progress2>
                        )}
                        <MiniAIButton
                          onClick={(e) => {
                            evaluateErrorFix(e);
                          }}
                        >
                          {t("check")}
                        </MiniAIButton>
                        <MiniAIButton
                          onClick={(e) => {
                            alert(correctErrorOption);
                          }}
                        >
                          {t("show")}
                        </MiniAIButton>
                      </div>
                    ) : null}
                    {miniQuiz ? (
                      <SingleQuiz
                        id={errorId}
                        key={errorId}
                        complexity={miniQuiz.complexity}
                        question={miniQuiz.question}
                        answer={miniQuiz.answer}
                        answers={miniQuiz.answers}
                        type={miniQuiz.type}
                        goalType={miniQuiz.goalType}
                        check={miniQuiz.check}
                        me={me}
                        story={true}
                        ifRight={miniQuiz.ifRight}
                        ifWrong={miniQuiz.ifWrong}
                        name={miniQuiz.name}
                        instructorName={miniQuiz.instructorName}
                        image={miniQuiz.image}
                        hidden={true}
                        lesson={lesson}
                        lessonID={lesson.id}
                        quizID={miniQuiz.id}
                        user={miniQuiz.user.id}
                        user_name={miniQuiz.user}
                        author={lesson.user}
                        miniforum={null}
                        getResults={null}
                        passUpdated={null}
                        getResult={null}
                        passResultToTextEditor={passResultToTextEditor}
                        openQuestionType="mini"
                        questionFormat="mini"
                        studentAnswerPassedFromAnotherComponent={errorAnswer}
                      />
                    ) : null}
                  </div>
                </Window>
              )}
            </WindowBundle>
          </WindowColumn>
        )}
      </Styles>
      {update && (
        <UpdateTextEditor
          lessonID={lessonID}
          id={props.textEditor.id}
          goal={props.textEditor.goal}
          text={text}
          context={props.context}
          name={props.textEditor.name}
          complexity={complexity}
          totalMistakes={total}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
      {type == "problem" && problemId && (
        <SingleProblem
          key={problemId}
          problem={lesson.problems.find((pr) => pr.id == problemId)}
          complexity={
            lesson.problems.find((pr) => pr.id == problemId).complexity
          }
          lessonID={lesson.problems.find((pr) => pr.id == problemId)}
          me={me}
          story={true}
          lesson={lesson}
          author={lesson.user}
        />
      )}
    </>
  );
};

SingleTextEditor.propTypes = {
  // A string representing the ID of the lesson
  lessonID: PropTypes.string.isRequired,

  // An object representing the text editor data
  textEditor: PropTypes.shape({
    // A string representing the ID of the text editor
    id: PropTypes.string.isRequired,
    // An object representing the user who created the text editor
    user: PropTypes.shape({
      // A string representing the ID of the user
      id: PropTypes.string.isRequired,
    }).isRequired,
    // A number representing the total number of mistakes in the text editor
    totalMistakes: PropTypes.number.isRequired,
    // A string representing the goal of the text editor
    goal: PropTypes.string,
    // A string representing the name of the text editor
    name: PropTypes.string,
  }).isRequired,

  // An object representing the current user
  me: PropTypes.shape({
    // A string representing the ID of the current user
    id: PropTypes.string.isRequired,
    // An array of strings representing the permissions of the current user
    permissions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,

  // A boolean indicating whether the text editor is part of a story or not
  story: PropTypes.bool,

  // A number representing the complexity level of the text editor
  complexity: PropTypes.number,

  // A string representing the text content of the text editor
  text: PropTypes.string.isRequired,

  // An object representing the lesson data
  lesson: PropTypes.shape({
    // An array of objects representing the problems in the lesson
    problems: PropTypes.arrayOf(
      PropTypes.shape({
        // A string representing the ID of the problem
        id: PropTypes.string.isRequired,
        // A number representing the complexity of the problem
        complexity: PropTypes.number.isRequired,
      })
    ),
    // An object representing the user who created the lesson
    user: PropTypes.shape({
      // A string representing the ID of the user
      id: PropTypes.string.isRequired,
    }),
  }),
  context: PropTypes.string, // A string representing the context of the text editor
  getResult: PropTypes.func, // A function to handle the result of the text editor
  passUpdated: PropTypes.func, // A function to handle the update of the text editor
};

export default SingleTextEditor;
