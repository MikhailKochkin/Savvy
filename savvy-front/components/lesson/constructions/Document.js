import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { htmlToText } from "html-to-text";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import { useTranslation } from "next-i18next";
import Modal from "styled-react-modal";
import Box from "./Box";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonId: String
    $constructionId: String
    $elements: ElementsList
    $answers: ConstructionAnswers
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonId: $lessonId
      constructionId: $constructionId
      elements: $elements
      answers: $answers
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  padding: 100px 50px;
  /* max-width: 950px; */
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

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: blue;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
  /* align-items: stretch; // Stretch to match tallest child */
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  width: 200px;
  height: 50px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
  @media (max-width: 800px) {
    width: 120px;
  }
`;

const Block = styled.div`
  /* overflow: auto; // Add this line */
  width: 940px;
  height: auto;
  display: grid;
  background: #fff;
  column-gap: 10px;
  /* row-gap: 10px; */
  box-shadow: 0px 0px 3px 0px rgb(199 199 199);
  padding: 30px;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 1fr)`;
  }};

  grid-template-rows: auto;
  img {
    width: 100px;
    height: 100px;
  }
  grid-template-rows: auto;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  /* justify-content: flex-start;
  align-items: flex-start; */
  font-size: 1.6rem;
  .comment_yellow {
    border: 2px solid #f3cf95;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 90%;
  }
  .single_option {
    p {
      margin: 3px 0;
    }
  }
  .tick {
    margin-left: 30px;
  }
  width: 100%;
  height: 100%;
  border-top: ${(props) =>
    `1px ${
      props.borders && props.borders.top !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.top !== "none" ? "#98A0A6" : "#fff"}`};
  border-right: ${(props) =>
    `1px ${
      props.borders && props.borders.right !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.right !== "none" ? "#98A0A6" : "#fff"}`};
  border-bottom: ${(props) =>
    `1px ${
      props.borders && props.borders.bottom !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.bottom !== "none" ? "#98A0A6" : "#fff"
    }`};
  border-left: ${(props) =>
    `1px ${
      props.borders && props.borders.left !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.left !== "none" ? "#98A0A6" : "#fff"}`};
  padding: 0px 15px;
  grid-column-start: ${(props) => props.startColumn};
  grid-column-end: span ${(props) => props.size};
  grid-row-end: span ${(props) => props.rows};
  p {
    margin: 0;
  }
  img {
    width: 100%;
    height: auto;
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

  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: ${(props) => (props.shiver ? "shake 1s" : "none")};
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  top: 50px;
  /* height: ${(props) => {
    return `${props.height}px`;
  }}; */
  height: 600px;
  overflow-y: auto; // Handle overflow
  padding: 10px;
  @media (max-width: 800px) {
    max-height: 100%;
    padding: 3%;
  }
`;

const VarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  min-height: 600px;

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const setNullForIsTest = (elements) => {
  return elements.map((element) => {
    if (element.isTest && element.inDoc) {
      // If isTest is true, set the element to null
      return null;
    } else {
      // Otherwise, keep the element unchanged
      return element;
    }
  });
};

const findIsTest = (elements) => {
  let arr = [];
  elements.map((element, i) => {
    if (element.isTest && element.inDoc) {
      // If isTest is true, set the element to null
      return arr.push({
        index: i,
        element: null,
      });
    } else {
      // Otherwise, keep the element unchanged
      return;
    }
  });
  return arr;
};

const NewConstructor = (props) => {
  const { construction, me, lessonID, story } = props;
  const compareArrays = (arr1, arr2) => {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Loop through the arrays to compare the 'text' property
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] && arr2[i]) {
        if (arr1[i].text !== arr2[i].text) {
          return false;
        }
      } else if (!arr1[i] && !arr2[i]) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);
  const elements = construction.elements.elements;
  const [attempts, setAttempts] = useState(0); // Count the # of clicks on check button
  const [elementsInUse, setElementsInUse] = useState();
  const [startCheckingProcedure, setStartCheckingProcedure] = useState(false);
  const [mode, setMode] = useState("learn");
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  // DIFFERENT COLLECTIONS OF ELEMENTS
  // the data of the constructor
  const [input, setInput] = useState(setNullForIsTest(elements));
  // optional elements in the right column
  const [variants, setVariants] = useState([]);
  // can we show the student if their results are (in)correct
  const [isResultShown, setIsResultShown] = useState(false);
  // smth to do with the width / height of the elements
  const [heightInPixels, setHeightInPixels] = useState(200); // Initialize state

  const [createConstructionResult, { data, loading, error }] = useMutation(
    CREATE_CONSTRUCTIONRESULT_MUTATION
  );

  const { t } = useTranslation("lesson");

  const toggleModal = (e) => setIsOpen(!isOpen);

  const shuffle = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
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

  const onCheck = (val, i) => {
    setIsResultShown(true);
    setMode("check");
    // 2. the new data structure? Input?
    setAttempts(attempts + 1);
    if (compareArrays(elements, input)) setIsButtonHidden(true);
    createConstructionResult({
      variables: {
        answer: "",
        attempts: attempts,
        lessonId: lessonID,
        constructionId: construction.id,
        elements: { elements: input },
      },
    });
  };

  const passElementValue = (val) => {
    setStartCheckingProcedure(false);
    setMode("learn");

    let newEl = [...elements].find((el) => el.text == val);
    let newInput = [...input];
    newInput[activeBlock] = newEl;
    setInput(newInput);
    let newElementsInUse = [...elementsInUse];
    newElementsInUse.find((el) => el.index == activeBlock).element = newEl;
    setElementsInUse(newElementsInUse);
    setIsOpen(false);
    setIsResultShown(false);
  };

  const passModalOpen = (val) => {
    setIsOpen(true);
  };

  const passActiveBlock = (index) => {
    setActiveBlock(index);
  };

  return (
    <Styles id={"construction_" + construction.id}>
      <OuterContainer>
        <Block id="con_block" columns={construction.columnsNum}>
          {[...elements].map((t, i) => (
            <ConElement
              // 1. Element itself + elements
              el={t}
              elems={elements}
              id={i + 1}
              i={i}
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
              mode={mode}
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
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <VarContainer>
            <Variants height={heightInPixels ? heightInPixels : 500}>
              {variants.map((option, index) => {
                return (
                  <Box
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
    </Styles>
  );
};

const InputBlock = styled.div`
  padding: 5px;
  width: 90%;
  min-height: ${(props) => (props.isTest ? "75px" : "25px")};
  border: ${(props) => props.border};
  /* white-space: nowrap; */
  font-family: Montserrat;
  font-size: 1.6rem;
  line-height: 1.8;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ConElement = (props) => {
  //  Element design
  const [size, setSize] = useState(props.size);
  // Element number – used to check with the correct version
  const [value, setValue] = useState(0);
  const [reveal, setReveal] = useState(true);

  // logic for checking added text
  const [shown, setShown] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [chosenElement, setChosenElement] = useState();
  const [result, setResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState();
  let sign = "";
  const {
    isResultShown,
    isTest,
    text,
    i,
    borders,
    rows,
    el,
    elems,
    display,
    passResult,
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

  const checkAnswer = async (e) => {
    e.persist();
    e.target.className = "blocked";
    setShown(true);
    let answer1 = htmlToText(correctAnswer.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    });
    let answer2 = htmlToText(answer.toLowerCase(), {
      wordwrap: false,
      uppercase: false,
    }).replace(/\_/g, "");
    let data = {
      answer1: answer1,
      answer2: answer2,
    };

    let el = document.getElementById(chosenElement);
    e.target.innerHTML = "Checking...";
    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
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
        if (parseFloat(res.res) > 65) {
          setResult(true);
          el.style.background = "#D9EAD3";
          e.target.style.display = "none";
          let new_res = {
            correctAnswer: correctAnswer,
            studentAnswer: answer,
            res: res.res,
            id: uuidv4(),
          };
          setAnswers([...answers, new_res]);
          passResult(new_res);
          return true;
        } else if (parseFloat(res.res) > 55 && parseFloat(res.res) <= 65) {
          setResult(true);
          el.style.background = "#ffd166";
          e.target.style.display = "none";
          let new_res = {
            correctAnswer: correctAnswer,
            studentAnswer: answer,
            res: res.res,
            id: uuidv4(),
          };
          passResult(new_res);
          setAnswers([...answers, new_res]);
          setTimeout(() => (el.style.background = "#bef1ed"), 3000);
          return true;
        } else {
          setResult(false);
          el.style.background = "#FCE5CD";
          e.target.innerHTML = "Check";
          e.target.className = "mini_button";
          if (res.comment) {
            if (res.comment == "Дайте более развернутый ответ") {
              setHint("Try giving a more detailed answer.");
            } else {
              setHint("Try giving a shorter answer.");
            }
          }
          let new_res = {
            correctAnswer: correctAnswer,
            studentAnswer: answer,
            res: res.res,
            id: uuidv4(),
          };
          passResult(new_res);
          setAnswers([...answers, new_res]);
          setTimeout(() => (el.style.background = "#bef1ed"), 3000);
          return false;
        }
      })
      .catch((err) => console.log(err));
    setShown(false);
    return r;
  };

  const onMouseClick = (e) => {
    let z = document.createElement("span");
    let id = uuidv4();
    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute("data-initial", e.target.getAttribute("comment"));
    z.setAttribute("id", id);
    z.addEventListener("input", changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);
    let button = document.createElement("button");
    button.innerHTML = "Check";
    button.className = "mini_button";
    button.tabIndex = 0;
    z.after(button);
    let wrong_option = htmlToText(e.target.innerHTML, {
      wordwrap: false,
      uppercase: false,
    });
    setAnswer("");
    setCorrectAnswer(e.target.getAttribute("comment"));
    setChosenElement(id);
  };

  const changeState = (e) => {
    setAnswer(e.target.innerHTML);
  };

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
    console.log("wrong");
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
          console.log("click");
          if (!props.isCorrect) {
            props.passModalOpen(true);
            props.passActiveBlock(i);
          } else {
          }
        }}
      >
        {isTest && (
          <>
            <div
              className="single_option"
              onClick={(e) => {
                if (allCorrect) {
                  if (e.target.getAttribute("class") == "mini_button") {
                    const ch = checkAnswer(e);
                  }
                  if (e.target.getAttribute("type") === "comment") {
                    onMouseClick(e);
                  }
                }
              }}
            >
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

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  width: 600px;
  min-height: 600px;
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export default NewConstructor;
