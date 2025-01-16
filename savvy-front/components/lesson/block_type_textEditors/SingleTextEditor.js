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

import DeleteSingleTextEditor from "./DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import SingleProblem from "../block_type_problems/SingleProblem";
import SingleQuiz from "../block_type_quizes/SingleQuiz";
import SingleTest from "../block_type_tests/SingleTest";
import Note from "../block_type_notes/Note";
import {
  MiniOpenQuestionFrame,
  MiniAIButton,
} from "../styles/commonElements/QuestionStyles";
import {
  WindowColumn,
  WindowBundle,
  Window,
  IconBlock,
  Progress2,
} from "./styles/TextEditorStyles";
import {
  containsOnlyNumbers,
  compareStrings,
} from "../SimulatorDevelopmentFunctions";
import {
  SecondaryButton,
  Buttons,
  ActionButton,
} from "../styles/DevPageStyles";

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

const TextEditorStyles = styled.div`
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
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }
  .table-wrapper {
    border: 1px solid #d6d6d6;
    width: 640px;
    overflow-x: scroll;
  }
  table {
    width: 640px;
    border-collapse: collapse;
    font-size: 1.6rem;
    p {
      margin: 0;
      margin-bottom: 5px;
    }
    tbody {
      width: 640px;
    }
    tr {
      border: 1px solid #edefed;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
      vertical-align: top;
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

const Comment = styled.div`
  padding: 7px 10px;
  border-radius: 10px;
  border-color: #f3f3f3;
  p {
    margin: 0px;
    margin-bottom: 10px;
  }
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

const wrapTables = (html) => {
  const wrappedHtml = html.replace(
    /<table/g,
    '<div className="table-wrapper"><table'
  );
  return wrappedHtml.replace(/<\/table>/g, "</table></div>");
};
const removePTags = (str) => str.replace(/<\/?p>/g, "");

const SingleTextEditor = (props) => {
  const { textEditor, me, lessonID, story, complexity, text, lesson } = props;

  const [attempts, setAttempts] = useState(0); // number of attempts to dinf concealed information

  // states for the side windows
  const [isNoteWindowShown, setIsNoteWindowShown] = useState(false); // is the window with a note shown?
  const [isErrorWindowShown, setIsErrorWindowShown] = useState(false); // is the window where error can be fixed shown?
  const [isQuizWindowShown, setIsQuizWindowShown] = useState(false); // is the window with a mini quiz shown?
  const [showFeedback, setShowFeedback] = useState(false); // ??

  // state for managing the extraction of tasks out of the text
  const [currentlyActiveStringinNotes, setCurrentlyActiveStringinNotes] =
    useState(""); // source text the click on which reveals the comment / note
  const [note, setNote] = useState(); // note text
  const [noteId, setNoteId] = useState(); // note text
  const [problemId, setProblemId] = useState(); // case study id
  const [errorId, setErrorId] = useState(); // we use this data to find a mini quiz once the error is clicked
  const [quizId, setQuizId] = useState();

  const [miniQuiz, setMiniQuiz] = useState();
  const [miniTest, setMiniTest] = useState();

  // state for managing errors (probably necessary for older versions of this component)
  const [errorFeedback, setErrorFeedback] = useState(); // ???
  const [errorAnswer, setErrorAnswer] = useState(); // new wording provided by the student to fix the error
  const [correctErrorOption, setCorrectErrorOption] = useState(); // sample wording used to check the answer
  const [wrongErrorOption, setWrongErrorOption] = useState(); // ??
  const [result, setResult] = useState(null); // is the new wording correct?

  const [chekingAnswer, setChekingAnswer] = useState(false); // used for the loading widget while the wording is being checked
  const [update, setUpdate] = useState(false); // update the text editor
  const [type, setType] = useState(""); // what type of indormation have we found in the document?

  const [mistakesShown, setMistakesShown] = useState(false); // are all the errors outlined on the Show button click

  const { t } = useTranslation("lesson");
  const total = props.textEditor.totalMistakes;

  const [createTextEditorResult, { data, loading, error }] = useMutation(
    CREATE_TEXTEDITORRESULT_MUTATION
  );

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const slide = (id) => {
    var my_element = document.getElementById(id);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (errorId) {
      let newMiniQuiz = props.lesson?.quizes?.find(
        (quiz) => quiz.id == errorId
      );
      if (newMiniQuiz) {
        setMiniQuiz(newMiniQuiz);
      }
    } else {
      null;
    }
  }, [errorId]);

  useEffect(() => {
    if (quizId) {
      let newMiniTest = props.lesson?.newTests?.find(
        (test) => test.id == quizId
      );
      if (newMiniTest) {
        setMiniTest(newMiniTest);
      }
    } else {
      null;
    }
  }, [quizId]);

  let miniNote;
  if (noteId) {
    miniNote = props.lesson?.notes?.find((note) => note.id == noteId);
  } else {
    null;
  }

  // old function for older use cases
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

      setChekingAnswer(false);

      return comparisonResult;
    } else {
      const fetchResult = await fetchChecker(data);
      setChekingAnswer(false);

      return fetchResult;
    }
  };

  // old function for older use cases
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

  // used for old cases when the information is revealed
  // when it is clicked on
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

  // Handle click events on the document
  //(handles all types of use cases:
  // from very old ones to the newest –> elementid)
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
      if (e.target.getAttribute("type") == "error") {
        z.setAttribute("errorid", e.target.getAttribute("elementid"));
      } else if (e.target.getAttribute("type") == "quiz") {
        z.setAttribute("quizid", e.target.getAttribute("elementid"));
      }
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

  // this function is automatically added to the edited text to
  // pass all changes to the state
  const changeState = (e) => {
    setErrorAnswer(e.target.innerHTML);
  };

  // Show all parts of the text that contain hidden information
  const onShow = () => {
    const elements = document
      .getElementById(props.textEditor.id + 1)
      .querySelectorAll(
        ".editor_note, .editor_error, [error_data], .editor_problem"
      );
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

  const passResultToTextEditor = (val) => {
    setResult(val);
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

  const passStudentAnswertoDocument = (val) => {
    let editedText = document.querySelector(`[quizId=${quizId}]`);
    if (editedText) {
      editedText.style.backgroundColor = "rgba(50, 172, 102, 0.3)";
      editedText.innerText = removePTags(val);
    }
  };

  return (
    <>
      {me &&
        (me.id === textEditor.user.id ||
          me.permissions.includes("ADMIN") ||
          lesson.user.id == me.id) &&
        !story && (
          <Buttons margin="15px 0">
            <SecondaryButton onClick={(e) => setUpdate(!update)}>
              {update ? t("back") : t("update")}
            </SecondaryButton>
            <DeleteSingleTextEditor
              id={props.textEditor.id}
              lessonID={props.lessonID}
            />
          </Buttons>
        )}
      {!update && (
        <TextEditorStyles id={textEditor.id + 1} width={story}>
          <div>
            {/* The document itself */}
            <TextBar id={textEditor.id}>
              <EditText story={story}>
                <div
                  // All the logic of what happens to the text when clicked is handled here
                  onClick={async (e) => {
                    // 0. Increment the number of attempts made by the student
                    setAttempts((prev) => prev + 1);

                    // 1. Extract commonly used attributes and elements for cleaner code
                    const target = e.target;
                    const parent = target.parentElement;
                    const type =
                      target.getAttribute("type") ||
                      parent?.getAttribute("type");
                    const elementId = target.getAttribute("elementid");
                    const innerText = target.innerHTML;

                    // 2. Update the DB => new click on the doc
                    const createResult = (
                      type,
                      correct = "",
                      wrong = "",
                      guess = "",
                      result = true,
                      delay = 1000
                    ) => {
                      setTimeout(() => {
                        createTextEditorResult({
                          variables: {
                            lessonId: props.lessonID,
                            textEditorId: props.textEditor.id,
                            attempts,
                            correct,
                            wrong,
                            type,
                            guess,
                            result,
                          },
                        });
                      }, delay);
                    };

                    // Old use case. Handle mini-button clicks to check the answer and give feedback
                    if (target.classList.contains("mini_button")) {
                      const ch = await check(e);
                      if (errorFeedback) setShowFeedback(true); // Show feedback if errorFeedback is enabled
                      createResult(
                        "error",
                        correctErrorOption,
                        wrongErrorOption,
                        errorAnswer,
                        ch
                      );
                      return;
                    }

                    // 3.There are 4 types of interactions:
                    // 3.1. Note interactions –> open note window
                    // 3.2. Error interactions -> open error window
                    // 3.3. Quiz interactions -> open quiz window
                    // 3.4. Problem interactions -> slide to case study
                    // They are all handled below

                    // 3.1. Note interactions –> open note window

                    if (type === "note") {
                      setIsNoteWindowShown(true);
                      setCurrentlyActiveStringinNotes(innerText); // Store the active note string
                      setNoteId(elementId); // Store note ID for reference
                      setType("note"); // Set interaction type to 'note'
                      setNote(
                        target.getAttribute("text") ||
                          parent.getAttribute("text")
                      ); // Retrieve note content
                      target.className = "edit"; // Mark as editable
                      createResult(
                        "note",
                        target.getAttribute("text") || "",
                        "",
                        "opened",
                        true,
                        3000
                      ); // Log the note interaction
                      return;
                    }

                    // 3.2 Error interactions -> open error window

                    if (type === "error" || target.id === "id") {
                      setIsErrorWindowShown(true);
                      setErrorAnswer(innerText); // Store error text
                      setErrorId(elementId); // Store error ID
                      setType("error"); // Set interaction type to 'error'
                      total > 0 ? onMouseClick(e) : onReveal(e); // Execute appropriate action based on `total`
                      return;
                    }

                    // 3.3. Quiz interactions -> open quiz window

                    if (type === "quiz") {
                      setIsQuizWindowShown(true);
                      setQuizId(elementId); // Store error ID
                      setType("quiz"); // Set interaction type to 'error'
                      total > 0 ? onMouseClick(e) : onReveal(e); // Execute appropriate action based on `total`
                      return;
                    }

                    // 3.4. Problem interactions -> slide to case study

                    if (type === "problem") {
                      target.className = "edit"; // Mark problem text as editable
                      setType("problem"); // Set interaction type to 'problem'
                      setProblemId(elementId); // Store problem ID
                      setTimeout(() => slide(elementId), 500); // Transition to the case study
                      return;
                    }

                    // 3.5 Logic to reopen error and quiz windows once closed for the same source text

                    if (
                      target.classList.contains("edit") &&
                      !["note", "problem"].includes(type)
                    ) {
                      if (target.hasAttribute("errorid")) {
                        setErrorAnswer(innerText); // Store the user's answer
                        setErrorId(target.getAttribute("errorid")); // Store the error ID
                        setMiniQuiz(
                          props.lesson.quizes.find(
                            (quiz) => quiz.id === target.getAttribute("errorid")
                          )
                        ); // Find related quiz
                        setCorrectErrorOption(
                          target.getAttribute("data-initial")
                        ); // Store correct option for feedback

                        setIsErrorWindowShown(true); // Show the error feedback window
                        setResult(null); // Reset result state
                      } else if (target.hasAttribute("quizid")) {
                        setQuizId(target.getAttribute("quizid")); // Store the error ID
                        setMiniTest(
                          props.lesson.newTests.find(
                            (quiz) => quiz.id === target.getAttribute("quizid")
                          )
                        ); // Find related quiz
                        setIsQuizWindowShown(true); // Show the error feedback window
                        setResult(null); // Reset result state
                      }
                    }
                  }}
                >
                  {/* Render the text content */}
                  {parse(wrapTables(text))}
                </div>
              </EditText>
            </TextBar>
            {/* The button to reveal hidden information in the document */}
            {/* <Buttons>
              <ActionButton
                onClick={onShow}
                variant="contained"
                color="primary"
              >
                {mistakesShown ? "Hide" : "Show"}
              </ActionButton>
            </Buttons> */}
          </div>

          {/* All comments and logic are now presented in the WindowColumn */}
          {(isErrorWindowShown ||
            isNoteWindowShown ||
            isQuizWindowShown ||
            showFeedback) && (
            <WindowColumn>
              <WindowBundle>
                {isNoteWindowShown && (
                  <Window>
                    <div className="questionBox">
                      <IconBlock>
                        <div className="nameBlock">
                          <img
                            className="icon"
                            src="../../static/hipster.svg"
                          />
                          <div className="name">BeSavvy</div>
                        </div>
                        <div
                          className="cancelBlock"
                          onClick={(e) => setIsNoteWindowShown(false)}
                        >
                          <img
                            className="cancel"
                            src="../../static/cancel.svg"
                          />
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
                            story={true}
                          />
                        ) : note ? (
                          parse(note)
                        ) : null}
                      </Comment>
                    </div>
                  </Window>
                )}
                {isErrorWindowShown && (
                  <Window>
                    <div className="questionBox">
                      <IconBlock>
                        <div className="nameBlock">
                          <img
                            className="icon"
                            src="../../static/hipster.svg"
                          />
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
                          <img
                            className="cancel"
                            src="../../static/cancel.svg"
                          />
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
                {isQuizWindowShown && (
                  <Window>
                    <div className="questionBox">
                      <IconBlock>
                        <div className="nameBlock">
                          <img
                            className="icon"
                            src="../../static/hipster.svg"
                          />
                          <div className="name">BeSavvy</div>
                        </div>
                        <div
                          className="cancelBlock"
                          onClick={(e) => {
                            setResult(null);
                            setIsQuizWindowShown(false);
                          }}
                        >
                          <img
                            className="cancel"
                            src="../../static/cancel.svg"
                          />
                        </div>
                      </IconBlock>

                      {miniTest ? (
                        <SingleTest
                          id={quizId}
                          key={quizId}
                          testID={quizId}
                          lessonID={props.lessonID}
                          question={miniTest.question}
                          answers={miniTest.answers}
                          true={miniTest.correct}
                          ifRight={miniTest.ifRight}
                          ifWrong={miniTest.ifWrong}
                          user={miniTest.user.id}
                          user_name={miniTest.user}
                          name={miniTest.name}
                          image={miniTest.image}
                          complexTestAnswers={miniTest.complexTestAnswers}
                          comments={miniTest.comments}
                          type={miniTest.type}
                          goalType={miniTest.goalType}
                          me={props.me}
                          length={Array(miniTest.correct.length).fill(false)}
                          userData={[]}
                          testFormat="mini"
                          story={true}
                          passStudentAnswertoDocument={
                            passStudentAnswertoDocument
                          }
                        />
                      ) : null}
                    </div>
                  </Window>
                )}
              </WindowBundle>
            </WindowColumn>
          )}
        </TextEditorStyles>
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
      {update && (
        <UpdateTextEditor
          lessonID={lessonID}
          lesson={lesson}
          id={props.textEditor.id}
          goal={props.textEditor.goal}
          text={text}
          context={props.context}
          name={props.textEditor.name}
          complexity={complexity}
          totalMistakes={total}
          getResult={getResult}
          switchUpdate={switchUpdate}
          me={me}
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
};

export default SingleTextEditor;
