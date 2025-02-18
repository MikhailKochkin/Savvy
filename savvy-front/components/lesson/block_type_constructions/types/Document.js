import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { useMutation, gql } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import { useTranslation } from "next-i18next";

import Box from "../functions/Box";
import SingleQuiz from "../../block_type_quizes/SingleQuiz";
import {
  WindowColumn,
  WindowBundle,
  Window,
  IconBlock,
} from "../../block_type_textEditors/styles/TextEditorStyles";
import {
  OuterContainer,
  ButtonTwo,
  Block,
  Element,
  Variants,
  VarContainer,
  InputBlock,
  StyledModal,
} from "../styles/ConstructionStyles";
import {
  findIsTest,
  setNullForIsTest,
  compareArrays,
  shuffle,
} from "../functions/ConstructionFunctions";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonId: String
    $constructionId: String
    $elements: ConstructionElementsListInput # $answers: ConstructionAnswers
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonId: $lessonId
      constructionId: $constructionId
      elements: $elements # answers: $answers
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  padding: 100px 50px;
  display: flex;
  background: #f8f9fa;
  margin-bottom: 4%;
  font-size: 1.6rem;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  h2 {
    line-height: 1.2;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    padding-right: 0%;
    padding: 0;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
`;

const NewConstructor = (props) => {
  const { construction, me, lessonID, story } = props;
  let elements = construction.elements?.elements
    ? construction.elements?.elements
    : [];

  // Open the Modal window with answer options
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
  // Get info about the answer chosen by the student from the Modal window
  const [activeBlock, setActiveBlock] = useState(null);
  // Count the # of clicks on check button
  const [attempts, setAttempts] = useState(0);
  // Info about the answers chosen by the student used for design purposes in the Modal Window
  const [elementsInUse, setElementsInUse] = useState();
  // Start checking student answers
  const [startCheckingProcedure, setStartCheckingProcedure] = useState(false);
  const [checkMode, setCheckMode] = useState("learn");
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  // DIFFERENT COLLECTIONS OF ELEMENTS
  // the data of the constructor
  const [input, setInput] = useState(setNullForIsTest(elements));
  // answer varinats in the right column
  const [variants, setVariants] = useState([]);
  // can we show the student if their results are (in)correct?
  const [isResultShown, setIsResultShown] = useState(false);
  // smth to do with the width / height of the window column
  const [heightInPixels, setHeightInPixels] = useState(200); // Initialize state

  // we use this data to find a mini quiz once the error is clicked
  const [errorId, setErrorId] = useState();
  // is the window where error can be fixed shown?
  const [isErrorWindowShown, setIsErrorWindowShown] = useState(false);
  // const [errorFeedback, setErrorFeedback] = useState(); // ???
  // new wording provided by the student to fix the error
  const [errorAnswer, setErrorAnswer] = useState();
  const [result, setResult] = useState(null);
  // sample wording used to check the answer
  const [correctErrorOption, setCorrectErrorOption] = useState();
  const [type, setType] = useState("");
  // what type of information have we found in the document?
  const [miniQuiz, setMiniQuiz] = useState();

  const [createConstructionResult, { data, loading, error }] = useMutation(
    CREATE_CONSTRUCTIONRESULT_MUTATION
  );
  const { t } = useTranslation("lesson");
  const toggleModal = (e) => setIsModalWindowOpen(!isModalWindowOpen);

  const changeState = (e) => {
    setErrorAnswer(e.target.innerHTML);
  };

  useEffect(() => {
    // 1. slide smoothly
    smoothscroll.polyfill();
    // 2. shuffle elements in the right column
    const vars = shuffle([...props.elements.filter((t) => t.isTest)]);
    setVariants(vars);
    // 3. Change width of the right column
    const el = document.getElementById("con_block");
    setElementsInUse(findIsTest(elements));
    if (el) {
      const height = el.clientHeight;
      setHeightInPixels(height); // Set state
    }
  }, []);

  useEffect(() => {
    if (errorId && !miniQuiz) {
      let newMiniQuiz = props.lesson?.quizes?.find(
        (quiz) => quiz.id == errorId
      );
      setMiniQuiz(newMiniQuiz);
    } else {
      null;
    }
  }, [errorId]);

  const onCheck = (val, i) => {
    setIsResultShown(true);
    setCheckMode("check");
    // 2. the new data structure? Input?
    setAttempts(attempts + 1);
    if (compareArrays(elements, input)) setIsButtonHidden(true);
    let updatedInput = [...input].map((el) => {
      if (el == null) {
        return null;
      } else {
        let newEl = { ...el };
        delete newEl.__typename;
        newEl.borders = {
          top: el.borders?.top,
          right: el.borders?.right,
          bottom: el.borders?.bottom,
          left: el.borders?.left,
        };
        return newEl;
      }
    });
    createConstructionResult({
      variables: {
        answer: "",
        attempts: attempts,
        lessonId: lessonID,
        constructionId: construction.id,
        elements: {
          elements: updatedInput,
        },
      },
    });
  };

  const passElementValue = (val) => {
    setStartCheckingProcedure(false);
    setCheckMode("learn");

    let newEl = [...elements].find((el) => el.text == val);
    let newInput = [...input];
    newInput[activeBlock] = newEl;
    setInput(newInput);
    let newElementsInUse = [...elementsInUse];
    newElementsInUse.find((el) => el.index == activeBlock).element = newEl;
    setElementsInUse(newElementsInUse);
    setIsModalWindowOpen(false);
    setIsResultShown(false);
  };

  const onMouseClick = (e) => {
    let z = document.createElement("span");
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
    z.addEventListener("input", changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);
  };

  const passModalOpen = (val) => {
    setIsModalWindowOpen(true);
  };

  const passActiveBlock = (index) => {
    setActiveBlock(index);
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

  return (
    <Styles id={"construction_" + construction.id}>
      <OuterContainer
        onClick={async (e) => {
          // 2. Error

          const target = e.target;
          const parent = target.parentElement;
          const type =
            target.getAttribute("type") || parent?.getAttribute("type");

          const elementId = target.getAttribute("elementid");
          const innerText = target.innerHTML;

          if (type === "error" || target.id === "id") {
            setIsErrorWindowShown(true);
            setErrorAnswer(innerText); // Store error text
            setErrorId(elementId); // Store error ID
            setType("error"); // Set interaction type to 'error'
            onMouseClick(e); // Execute appropriate action based on `total`
            return;
          }

          if (e.target.classList.contains("edit")) {
            setErrorAnswer(e.target.innerHTML);
            let newMiniQuiz = props.lesson?.quizes?.find(
              (quiz) => quiz.id == e.target.getAttribute("errorid")
            );
            setErrorId(e.target.getAttribute("errorid"));
            setMiniQuiz(newMiniQuiz);
            setCorrectErrorOption(e.target.getAttribute("data-initial"));
            setIsErrorWindowShown(true);
            setResult(null);
          }
        }}
      >
        <Block id="con_block" columns={construction.columnsNum}>
          {[...elements].map((t, i) => (
            <ConElement
              // 1. Element itself + elements
              el={t}
              elems={elements}
              id={i + 1}
              i={i}
              key={i}
              // 2. Element design options
              text={t.text}
              size={t.size}
              rows={t.rows}
              borders={t.borders}
              place={t.place}
              display={t.inDoc}
              // 3. Element logic
              isTest={t.isTest}
              type={construction.type}
              allCorrect={compareArrays(elements, input)}
              isCorrect={elements[i]?.text == input[i]?.text}
              // 4. Checking logic
              isResultShown={isResultShown}
              startCheckingProcedure={startCheckingProcedure}
              mode={checkMode}
              // shuffled elements in the right column. We will need this data to check if the chosen variant is in the right position.
              variants={variants}
              inputSingleElement={input[i]}
              passModalOpen={passModalOpen}
              passActiveBlock={passActiveBlock}
            />
          ))}
          {!isButtonHidden && (
            <ButtonTwo onClick={(e) => onCheck()}>{t("check")}</ButtonTwo>
          )}
        </Block>
        <StyledModal
          isOpen={isModalWindowOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <VarContainer>
            <Variants height={heightInPixels ? heightInPixels : 500}>
              {variants.map((option, index) => {
                return (
                  <Box
                    key={index}
                    index={index}
                    option={option.text}
                    passElementValue={passElementValue}
                    elementsInUse={elementsInUse}
                  />
                );
              })}
            </Variants>
          </VarContainer>
        </StyledModal>
      </OuterContainer>
      {isErrorWindowShown && (
        <WindowColumn>
          <WindowBundle>
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
                    lesson={props.lesson}
                    lessonID={props.lesson?.id}
                    quizID={miniQuiz.id}
                    user={miniQuiz.user.id}
                    user_name={miniQuiz.user}
                    author={props.lesson?.user}
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
          </WindowBundle>
        </WindowColumn>
      )}
    </Styles>
  );
};

const ConElement = (props) => {
  const [size, setSize] = useState(props.size);
  const [isFinished, setIsFinished] = useState(false);
  let sign = "";
  const {
    isResultShown,
    isTest,
    text,
    i,
    borders,
    rows,
    display,
    allCorrect,
    isCorrect,
    inputSingleElement,
    mode,
  } = props;

  useEffect(() => {
    if (isCorrect && mode == "check") {
      setIsFinished(true);
    }
  }, [isCorrect, mode]);

  let border;

  if (!isTest) {
    border = "none";
    sign = "";
  } else if (!inputSingleElement) {
    border = "1px dashed #c4c4c4";
    sign = "";
  } else if (isTest && isCorrect && mode == "check") {
    border = "2px dashed #00B600";
    sign = "✅";
  } else if (isTest && !isCorrect && mode == "check") {
    border = "1px dashed #c4c4c4";
    sign = "❌";
  } else if (isTest && !isFinished) {
    border = "1px dashed #c4c4c4";
    sign = "";
  } else if (isFinished) {
    border = "2px dashed #00B600";
    sign = "✅";
  } else {
    border = "none";
    sign = "";
  }

  return (
    <Element
      isTest={isTest}
      size={size}
      rows={rows}
      display={display}
      borders={borders}
      colored={text !== "<p></p>"}
    >
      <InputBlock
        border={border}
        isTest={isTest}
        onClick={(e) => {
          if (!props.isCorrect) {
            props.passModalOpen(true);
            props.passActiveBlock(i);
          } else {
          }
        }}
      >
        {isTest && (
          <>
            <div className="single_option">
              {inputSingleElement
                ? parse(inputSingleElement.text)
                : parse("<p></p>")}
            </div>
            {sign}
            {isTest && isResultShown && (
              <div className="single_option_comment">
                {mode == "check" && inputSingleElement?.comment ? (
                  <div className="comment_yellow">
                    {parse(inputSingleElement?.comment)}
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
        {!isTest && <div className="single_option">{parse(text)}</div>}
      </InputBlock>
    </Element>
  );
};

export default NewConstructor;
