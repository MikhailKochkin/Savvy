import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { htmlToText } from "html-to-text";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

import UpdateNewConstructor from "./UpdateNewConstructor";
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
  width: ${(props) => (props.story ? "85vw" : "100%")};
  max-width: 1350px;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    padding-right: 0%;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
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
  overflow: auto; // Add this line
  width: 1200px;
  height: auto;
  display: grid;
  background: #fff;
  column-gap: 10px;
  row-gap: 10px;
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
  margin: 30px 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.6rem;
  .tick {
    margin-left: 30px;
  }
  /* min-height: 150px; */
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
  padding: 15px 15px;
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
  flex-basis: 30%;
  margin-top: 55px;
  overflow: auto;
  max-height: 200vh;
  padding: 1%;
  @media (max-width: 800px) {
    max-height: 100%;
    padding: 3%;
  }
`;

const NewConstructor = (props) => {
  const { construction, me, lessonID, story } = props;
  let elements = construction.elements.elements;
  const [check, setCheck] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState(Array(elements.length).fill(""));

  const [update, setUpdate] = useState(false);
  const [variants, setVariants] = useState([]);
  const [answersCheck, setAnswersCheck] = useState(
    elements.map((t) => (t.isTest ? false : true))
  );
  const [startingColumns, setStartingColumns] = useState([]);
  const [currentConfig, setCurrentConfig] = useState([]);
  const [shiverList, setShiverList] = useState([]);
  const [used, setUsed] = useState(
    Array(elements.filter((t) => t.isTest == true).length).fill("")
  );
  const [createConstructionResult, { data, loading, error }] = useMutation(
    CREATE_CONSTRUCTIONRESULT_MUTATION
  );

  const { t } = useTranslation("lesson");
  useEffect(() => {
    let columns = 0;
    const newStartingColumns = elements.map((el) => {
      const start = columns + 1;
      columns += el.size;
      return start;
    });
    setStartingColumns(newStartingColumns);
  }, [elements]);

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
    const vars = shuffle([...props.elements.filter((t) => t.isTest)]);
    setVariants(vars);
  }, []);

  const getAnswer = (val, i, answer) => {
    let new_arr = [...used];
    new_arr[i - 1] = answer;
    setUsed(new_arr);
    let arr = [...answersCheck];
    arr[i] = val;
    setAnswersCheck(arr);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const passResult = (val) => {
    if (answers.filter((an) => an.id == val.id).length == 0) {
      setAnswers([...answers, val]);
    }
  };

  const getInput = (val, index) => {
    let new_input = [...input];
    new_input[index] = val;
    console.log("new_input", new_input);
    setInput(new_input);
  };

  const onCheck = (val, i) => {
    setCurrentConfig([...answersCheck]);
    setShiverList(
      [...answersCheck].map((el) => {
        if (el == false) {
          return (el = true);
        } else {
          return (el = false);
        }
      })
    );
    setCheck(true);
    console.log("answers", answers);
    console.log("input", input);
    // if (!answersCheck.includes(false)) {
    props.getResults(2);
    createConstructionResult({
      variables: {
        answer: "correct",
        attempts: attempts,
        lessonId: lessonID,
        constructionId: construction.id,
        answers: {
          answers,
        },
        elements: { elements: input },
      },
    });

    setTimeout(() => {
      setShiverList(Array(answersCheck.length).fill(false));
    }, 1000);
    setAttempts(attempts + 1);
  };
  return (
    <>
      {story !== true && (
        <BlueButton onClick={(e) => setUpdate(!update)}>
          {!update ? t("update") : t("back")}
        </BlueButton>
      )}
      <Styles>
        {!update && (
          <>
            <Block columns={construction.columnsNum}>
              {elements.map((t, i) => (
                <ConElement
                  passResult={passResult}
                  getInput={getInput}
                  text={t.text}
                  size={t.size}
                  rows={t.rows}
                  borders={t.borders}
                  isTest={t.isTest}
                  className={"header" + i}
                  id={i + 1}
                  i={i}
                  place={t.place}
                  variants={variants}
                  elems={elements}
                  isShown={check}
                  getAnswer={getAnswer}
                  check={check}
                  status={currentConfig[i]}
                  shiver={shiverList[i]}
                  display={t.inDoc}
                />
              ))}
              <ButtonTwo onClick={(e) => onCheck()}>Check</ButtonTwo>
            </Block>
            <Variants>
              {variants.map((option, index) => {
                return (
                  <Box
                    used={used.includes(index + 1)}
                    index={index}
                    option={option.text}
                  />
                );
              })}
            </Variants>
          </>
        )}
        {update && (
          <UpdateNewConstructor
            key={construction.id}
            id={construction.id}
            lessonId={props.lessonID}
            construction={construction}
            complexity={construction.complexity}
            me={me}
            getResult={getResult}
            switchUpdate={switchUpdate}
            passUpdated={passUpdated}
          />
        )}
      </Styles>
    </>
  );
};

const Number_Input = styled.input`
  padding: 5px;
  width: 45px;
  height: 35px;
  border: 1px dashed;
  border-color: #c4c4c4;
  white-space: nowrap;
  font-family: Montserrat;
  font-size: 1.5rem;
  line-height: 1.8;
  margin: 5px 0;
  margin-right: 15px;
`;

const ConElement = (props) => {
  const [size, setSize] = useState(props.size);
  const [value, setValue] = useState();
  const [correct, setCorrect] = useState(null);
  const [answer, setAnswer] = useState();
  const [shown, setShown] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [chosenElement, setChosenElement] = useState();
  const [result, setResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const {
    elems,
    isTest,
    text,
    i,
    startColumn,
    borders,
    rows,
    check,
    isShown,
    variants,
    place,
    status,
    shiver,
    display,
    passResult,
    getInput,
  } = props;
  const onCheck = (e) => {
    getInput(variants[e.target.value - 1], i);
    setValue(parseInt(e.target.value));
    // if (
    //   variants[e.target.value - 1] &&
    //   place == variants[e.target.value - 1].place
    // ) {
    //   setCorrect(true);
    //   props.getAnswer(true, i, parseInt(e.target.value));
    // } else {
    //   setCorrect(false);
    //   props.getAnswer(false, i, parseInt(e.target.value));
    // }
  };

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
        if (parseFloat(res.res) > 69) {
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
        } else if (parseFloat(res.res) > 55 && parseFloat(res.res) <= 69) {
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
            alert(res.comment);
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
    // button.addEventListener("click", check);
    z.after(button);
    let wrong_option = htmlToText(e.target.innerHTML, {
      wordwrap: false,
      uppercase: false,
    });
    setAnswer("");
    setCorrectAnswer(e.target.getAttribute("comment"));
    // setWrongErrorOption(wrong_option);
    setChosenElement(id);
  };

  const changeState = (e) => {
    setAnswer(e.target.innerHTML);
  };

  const show = (e) => {
    e.preventDefault();
    console.log("show e.target", e.target.previousSibling.previousSibling);
    e.target.previousSibling.previousSibling.innerHTML =
      e.target.previousSibling.previousSibling.getAttribute("data-initial");
    e.target.style.pointerEvents = "none";
    e.target.previousSibling.style.display = "none";
    e.target.style.display = "none";
    e.target.previousSibling.previousSibling.contentEditable = false;
    e.target.previousSibling.previousSibling.style.pointerEvents = "none";
  };

  return (
    <Element
      shiver={shiver}
      isTest={isTest}
      correct={correct}
      check={check}
      size={size}
      rows={rows}
      display={display}
      borders={borders}
      colored={text !== "<p></p>"}
    >
      {isTest && (
        <Number_Input
          type="number"
          value={value}
          onChange={(e) => onCheck(e)}
        />
      )}
      {isTest && (
        <div
          onClick={(e) => {
            if (e.target.getAttribute("class") == "mini_button") {
              const ch = checkAnswer(e);
            }
            if (e.target.getAttribute("type") === "comment") {
              onMouseClick(e);
            }
          }}
        >
          {variants[value - 1]
            ? parse(variants[value - 1].text)
            : parse("<p></p>")}
        </div>
      )}
      {!isTest && <div>{parse(text)}</div>}
      {status == true && correct == true && isShown && (
        <span className="tick">✅</span>
      )}
    </Element>
  );
};

export default NewConstructor;
