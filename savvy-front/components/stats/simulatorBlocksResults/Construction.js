import React, { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import dayjs from "dayjs";

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.6rem;
  .comment {
    background: #d2fde1;
    color: #3e3e3e;
    padding: 3px;
  }
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

const Block = styled.div`
  overflow: auto; // Add this line
  width: 1000px;
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

const Construction = (props) => {
  const { elems, construction, id, student_results, resultId, s } = props;
  return (
    <>
      <div className="time">{dayjs(s.createdAt).format("LLL")} </div>
      <Block id={id} columns={construction.columnsNum}>
        {elems.map((t, i) => {
          if (t) {
            return (
              <ConElement
                text={t.text}
                size={t.size}
                rows={t.rows}
                borders={t.borders}
                isTest={t.isTest}
                className={"header" + i}
                id={i + 1}
                i={i}
                place={t.place}
                construction={construction}
                elems={elems}
                // isShown={check}
                // check={check}
                // status={currentConfig[i]}
                // shiver={shiverList[i]}
                display={t.inDoc}
              />
            );
          } else {
            return <p>No answer given</p>;
          }
        })}
      </Block>
    </>
  );
};

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
      {text ? parse(text) : <p>Empty</p>}
      {props.construction?.elements?.elements[i].isTest &&
        text == props.construction?.elements?.elements[i]?.text && (
          <span className="tick">✅</span>
        )}
      {props.construction?.elements?.elements[i].isTest &&
        text !== props.construction?.elements?.elements[i]?.text && (
          <span className="tick">❌</span>
        )}
    </Element>
  );
};

export default Construction;
