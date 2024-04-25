import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useMutation, useQuery, gql } from "@apollo/client";
import _ from "lodash";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ReactResizeDetector from "react-resize-detector";

import Auth from "../auth/Auth.js";
import AnswerQuestions from "./AnswerQuestions";
import TranslateText from "./TranslateText";
import { CREATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { UPDATE_LESSONRESULT_MUTATION } from "./LessonHeader";
// import PagePurchase from "./PagePurchase.js";
import calculateSum from "../../functions.js";
import Navigation from "./Navigation";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  .arrow_box {
    z-index: 4;
    cursor: pointer;
    padding: 10px 2%;
    width: 60px;
    margin-right: 15px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    &:hover {
      background: #dde1f8;
    }
  }
  .arrow {
    width: 25px;
  }
  a {
    width: 30%;
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100vw;
  .firstColumn {
    width: 4vw;
    transition: 0.5s;
    top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .slider {
      position: -webkit-sticky;
      position: sticky;
      top: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .levelup {
        width: 150px;
        font-size: 1.8rem;
        text-align: center;
      }
      .num {
        margin-top: 10px;
        border: 1px solid #c2c2c2;
        color: #c2c2c2;
        /* width: 45px; */
        height: 45px;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          border: 1px solid #1a2980;
        }
        select {
          border: none;
          display: inline-block;
          background: none;
          outline: 0;
          width: 90%;
          color: #c2c2c2;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          text-indent: 0.01px;
          text-overflow: "";
          cursor: pointer;
        }
        option {
          color: #c2c2c2;
          &:hover {
            color: #1a2980;
          }
        }
      }
    }
    .menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transition: 0.5s;
      top: 10px;
    }
  }
  .third {
    max-width: 1vw;
    display: flex;
    align-items: center;
    transition: 0.5s;
    top: 10px;
    position: -webkit-sticky;
    position: sticky;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const MenuColumn = styled.div`
  width: ${(props) => (props.open ? "25vw" : "0")};
  max-width: 400px;
  min-width: 300px;
  display: ${(props) => (props.open ? "flex" : "none")};
  height: 100vh;
  background: #fbfbfa;
  border-right: 1px solid #efefee;
  border-top: 1px solid #efefee;
  position: -webkit-sticky;
  position: sticky;
  overflow-y: auto; /* Enable vertical scrolling */
  top: 0%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: width 0.3s ease; // Add this line for smooth transition
  animation: ${(props) => (props.open ? fadeIn : fadeOut)} 0.5s ease-in-out;
  @media (max-width: 800px) {
    width: ${(props) => (props.open ? "100vw" : "0px")};
  }
  .container {
    width: 85%;
    position: relative;
    transition: margin 0.3s ease; /* Add this line for smooth transition */
    margin: 0px 0;
    margin-top: 30px;
    .navigate_block {
      margin: 15px 0;
    }
    .top_line {
      margin-bottom: 20px;
    }
    .lesson_number {
      color: #8a8a8a;
      text-align: center;
      font-weight: 500;
      font-size: 1.8rem;
    }
    .lesson_name {
      text-align: left;
      font-size: 2.4rem;
      font-weight: 600;
      margin-top: 10px;
      line-height: 1.3;
      width: 90%;
    }
    .navigate {
      margin-top: 10px;
      font-weight: 500;
      line-height: 1.3;
      font-size: 1.6rem;
      display: flex;
      padding: 5px 5px;
      flex-direction: row;
      justify-content: flex-start;
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      &:hover {
        background-color: #ebebea;
        cursor: pointer;
      }
    }
    .icon {
      width: 20px;
      margin-right: 10px;
    }
    .bar {
      margin-top: 15px;
      height: 5px;
      width: 100%;
      background: #b6bce2;
    }
    .questions {
      font-size: 2rem;
      font-weight: 600;
      margin-top: 50px;
      line-height: 1.3;
    }
    .go_to_chat {
      width: 70%;
      font-weight: 500;
      line-height: 1.3;
      margin: 10px 0;
      font-size: 1.6rem;
    }
    .close-button {
      position: absolute;
      top: 15px; /* Adjust the top value as needed */
      right: -15px; /* Adjust the right value as needed */
      width: 25px;
      height: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      &:hover {
        background-color: #ebebea;
        border-radius: 5px;
      }
      img {
        width: 18px;
        cursor: pointer;
        transition: 0.3s;
      }
    }
    .nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      #text {
        max-width: 215px;
        font-weight: 500;
        line-height: 1.3;
        font-size: 1.6rem;
      }
      #button_square {
        border: 1px solid #c2c2c2;
        color: #c2c2c2;
        padding: 10px;
        height: 35px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        cursor: pointer;
        transition: 0.5s;
        width: 100%;

        select {
          border: none;
          display: inline-block;
          background: none;
          outline: 0;
          width: 100%;
          font-family: Montserrat;
          font-size: 1.6rem;
          font-weight: 500;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          text-indent: 0.01px;
          text-align-last: left;
          text-align: left;
          text-overflow: "";
          cursor: pointer;
        }
        option {
          color: #c2c2c2;
          &:hover {
            color: #1a2980;
          }
        }
      }
    }
  }
`;

const Border = styled.div``;

const Block = styled.div`
  min-height: 50vh;
  display: ${(props) => (props.show === "final" ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.open ? "70vw" : "100vw")};
  @media (max-width: 800px) {
    /* width: ${(props) => (props.open ? "0vw" : "95vw")}; */
  }
`;

const Stepper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .next_lesson_link {
    border: none;
  }
`;

const SimpleButton = styled.button`
  width: 230px;
  height: 40px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Content = styled.div`
  /* width: ${(props) => (props.open ? "75vw" : "100vw")}; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  .arrowmenu {
    cursor: pointer;
    padding: 10px 2%;
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border-radius: 50%;
    border: 2px solid #dde1f8;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    position: fixed;
    background: #fff;
    bottom: 15px;
    right: 0;
    z-index: 4;
    &:hover {
      background: #dde1f8;
    }
  }
  .arrowmenu2 {
    cursor: pointer;
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    position: fixed;
    transition: 0.3s ease;
    background: ${(props) => {
      if (props.angle >= 360) {
        return `conic-gradient(#ffb703 0deg ${props.angle + "deg"}, #ade8f4 ${
          props.angle + "deg"
        } 360deg)`;
      } else {
        return `conic-gradient(#023e8a 0deg ${props.angle + "deg"}, #ade8f4 ${
          props.angle + "deg"
        } 360deg)`;
      }
    }};

    /* background: conic-gradient(#023e8a 0deg 90deg, #ade8f4 90deg 360deg); */
    border: 1px solid black;
    bottom: 15px;
    left: 15px;
    z-index: 4;
    &:hover {
      /* background: #dde1f8; */
    }
    .inner {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: 1px solid black;
      background: ${(props) => (props.angle >= 360 ? "#fff" : "#dcf0f4")};

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      font-weight: 700;
    }
  }
  .arrow {
    width: 30px;
  }
  h1 {
    max-width: 650px;
    line-height: 1.4;
    font-weight: 600;
  }
  @media (max-width: 1650px) {
    .arrowmenu {
      width: 60px;
      height: 60px;
    }
    .arrowmenu2 {
      width: 60px;
      height: 60px;
      .inner {
        width: 48px;
        height: 48px;
      }
    }
    .arrow {
      width: 25px;
    }
  }
  @media (max-width: 800px) {
    width: ${(props) => (props.open ? "0vw" : "100vw")};
    display: ${(props) => (props.open ? "none" : "flex")};
  }
`;

const ProgressBarContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background: #fff;
  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;
    .timeLeft {
      min-width: 160px;
      text-align: center;
    }
    .container {
      width: 500px;
      height: 14px;
      border-radius: 8px;
      padding: 2px;
      border: 1px solid #e5e5e5;
      margin-right: 15px;
    }
  }
  @media (max-width: 800px) {
    height: 70px;

    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80%;
      .timeLeft {
        margin-top: 5px;
      }
      .container {
        width: 100%;
        height: 14px;
        border-radius: 8px;
        padding: 2px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
    }
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #3f51b5;
  width: ${(props) => props.progress};
  transition: all 0.5s;
  border-radius: 4px;
`;

const TranslationBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 1.4rem;
  .translationBlockRow {
    border-bottom: 1px solid #efefee;
    margin-bottom: 5px;
    padding-bottom: 5px;
    line-height: 1.4;
    select {
      font-size: 1.4rem;
      outline: none;
      line-height: 1.3;
      font-family: Montserrat;
      padding: 0.4em 1.6em 0.4em 0.6em;
      max-width: 100%;
      box-sizing: border-box;
      margin-left: 2%;
      margin-bottom: 0.5%;
      border: 1px solid #c5c5c5;
      border-radius: 4px;
      background: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
        linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 0.65em auto, 100%;
    }
  }
`;

const SimulatorLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 5px;
  .simulator_row_link {
    display: flex;
    flex-direction: row;
    transition: width 0.3s ease; /* Add this line for smooth transition */
    margin: 8px 0;
    padding: 0px 5px;
    border-radius: 5px;
    line-height: 1.5;
    &:hover {
      background-color: #ebebea;
      cursor: pointer;
    }
    .arrow_icon {
      width: 12px;
      margin-right: 10px;
    }
  }
`;

const Feed = (props) => {
  const {
    me,
    coursePageId,
    coursePage,
    lesson_structure,
    lessonId,
    openSize,
    step,
  } = props;
  const { t } = useTranslation("lesson");

  let lessonElements;
  let next_lesson = false;

  if (props.me.id == "clkvdew14837181f13vcbbcw0x") {
    lessonElements = [
      ...props.components.slice(0, openSize),
      <Auth id="buy_section" type="inside_lesson" />,
    ];
    next_lesson = false;
  } else {
    lessonElements = props.components;
    next_lesson = true;
  }
  const [width, setWidth] = useState(0);
  const onResize = (width) => setWidth(width);
  const [num, setNum] = useState(step ? parseInt(step) - 1 : 0);
  const [result, setResult] = useState(
    props.my_result ? props.my_result : null
  );
  const [open, setOpen] = useState(width < 500 ? false : true);
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openTranslation, setOpenTranslation] = useState(false);
  const [translationMode, setTranslationMode] = useState(false);
  const [translationLanguage, setTranslationLanguage] = useState("French");
  const [linkMenuOpen, setLinkMenuOpen] = useState(false);

  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );

  // 1. Open menu functionality

  const passMenuChange = () => {
    setOpen(!open);
    setTranslationMode(false);
  };

  // 2. Move through the lesson functionality for the arrow button

  const move = async (id) => {
    setNum(num + 1);
    // this search returns
    setTimeout(() => {
      var my_element = document.getElementById(id);
      if (my_element) {
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 200);
  };

  // 4. Move through the lesson through the navigation function in the menu

  const search = async (num, id) => {
    setNum(num + 1);
    // Postpone the execution of the following code by 0.5 seconds (500 milliseconds)
    setTimeout(() => {
      var my_element = document.getElementById(id);
      if (my_element) {
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 500);
  };

  // 4. Determine screen width

  useEffect(() => {
    setOpen(width < 500 ? false : true);
  }, [width]);

  // 6. Find the place where the student has stopped last time and navigate to it

  useEffect(() => {
    if (
      lessonElements.length > num + 1 &&
      props.my_result &&
      props.my_result.progress / props.number_of_tasks !== 1
    ) {
      setResult(props.my_result ? props.my_result : null);
      setNum(
        num > 0
          ? num
          : props.my_result &&
            props.my_result.progress !== null &&
            props.my_result.progress !== 0 &&
            props.my_result.progress / props.number_of_tasks !== 1
          ? props.my_result.progress - 1
          : 0
      );
      let destination_element_id =
        lessonElements[props.my_result.progress - 1]?.props?.id;
      setTimeout(() => {
        var my_element = document.getElementById(destination_element_id);
        if (my_element) {
          my_element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 1000);
    }
  }, [props.my_result]);

  let other_simulators = props.lesson.coursePage.lessons
    .filter(
      (les) =>
        les.published == true && les.type !== "REGULAR" && les.id !== lessonId
    )
    .sort((a, b) => a.number - b.number);

  if (
    !props.i_am_student &&
    !props.i_am_author &&
    !me.permissions.includes("ADMIN")
  ) {
    other_simulators = other_simulators.filter((sim) => sim.open);
  }

  const handleToggleTranslation = () => {
    setTranslationMode(!translationMode);
  };
  return (
    <>
      <Styles>
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
        <MenuColumn open={open} className="lastColumn">
          <div className="container">
            <div className="top_line">
              <div className="lesson_name">
                {props.lesson_number}. {props.lesson_name}
              </div>
              <div
                className="close-button"
                onClick={(e) => {
                  setOpen(false);
                  setTranslationMode(false);
                }}
              >
                <img src="../static/close-lg.svg" />
              </div>
            </div>

            <div
              className="navigate"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("navigate_around")}
              onClick={(e) => setOpenNavigation(!openNavigation)}
            >
              <img className="icon" src="/static/navigation.svg" />
              <div>{t("navigate")}</div>
            </div>
            {openNavigation && (
              <div className="navigate_block">
                <div className="nav">
                  <br />
                  <div id="button_square">
                    <select
                      id="num"
                      name="num"
                      value={num - 1}
                      onChange={(e) => {
                        const selectedOption =
                          e.target.options[e.target.selectedIndex];
                        search(
                          parseInt(e.target.value),
                          selectedOption.getAttribute("elementid")
                        );
                      }}
                    >
                      {lesson_structure.map((el, i) => (
                        <option
                          key={i + "option3"}
                          value={i - 1}
                          elementId={el.id}
                        >
                          {i + 1}.{" "}
                          {el.type.toLowerCase() == "chat"
                            ? `${
                                props.lesson.chats.find((ch) => ch.id == el.id)
                                  .name
                                  ? props.lesson.chats.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Chat"
                              }`
                            : null}
                          {el.type.toLowerCase() == "shot"
                            ? `${
                                props.lesson.shots.find((ch) => ch.id == el.id)
                                  .name
                                  ? props.lesson.shots.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Deck"
                              }`
                            : null}
                          {el.type.toLowerCase() == "note"
                            ? `${
                                props.lesson.notes.find((ch) => ch.id == el.id)
                                  .name
                                  ? props.lesson.notes.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Longread"
                              }`
                            : null}
                          {el.type.toLowerCase() == "newtest"
                            ? `${
                                props.lesson.newTests.find(
                                  (ch) => ch.id == el.id
                                ).name
                                  ? props.lesson.newTests.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Quiz"
                              }`
                            : null}
                          {el.type.toLowerCase() == "quiz"
                            ? `${
                                props.lesson.quizes.find((ch) => ch.id == el.id)
                                  .name
                                  ? props.lesson.quizes.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Question"
                              }`
                            : null}
                          {el.type.toLowerCase() == "problem"
                            ? `${
                                props.lesson.problems.find(
                                  (ch) => ch.id == el.id
                                ).name
                                  ? props.lesson.problems.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Case Study"
                              }`
                            : null}
                          {el.type.toLowerCase() == "texteditor"
                            ? `${
                                props.lesson.texteditors.find(
                                  (ch) => ch.id == el.id
                                ).name
                                  ? props.lesson.texteditors.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Text Editor"
                              }`
                            : null}
                          {el.type.toLowerCase() == "construction"
                            ? `${
                                props.lesson.constructions.find(
                                  (ch) => ch.id == el.id
                                ).name
                                  ? props.lesson.constructions.find(
                                      (ch) => ch.id == el.id
                                    ).name
                                  : "Doc Builder"
                              }`
                            : null}
                          {el.type.toLowerCase() == "testpractice" &&
                            "Chain of questions"}
                          {el.type.toLowerCase() == "forum" ? `Q&A` : null}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div
              className="navigate"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("translate")}
              onClick={(e) => {
                setOpenTranslation(!openTranslation);
                setTranslationMode(false);
              }}
            >
              <img className="icon" src="/static/translate.svg" />
              <div>Translate</div>
            </div>
            {openTranslation && (
              <TranslationBlock>
                <div className="translationBlockRow">
                  <label htmlFor="translationCheckbox">
                    Turn on translation:
                  </label>
                  <input
                    type="checkbox"
                    id="translationCheckbox"
                    checked={translationMode}
                    onChange={handleToggleTranslation}
                  />
                </div>
                <div className="translationBlockRow">
                  <label htmlFor="translationSelect">Choose language:</label>
                  <select
                    id="translationSelect"
                    onChange={(e) => setTranslationLanguage(e.target.value)}
                  >
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="German">German</option>
                    <option value="Russian">Russian</option>
                    <option value="Turkish">Turkish</option>
                  </select>
                </div>
                {translationMode && (
                  <div className="translationBlockRow">
                    Now just select any text in the lesson and it willl be
                    translated below.
                  </div>
                )}
                {translationMode && (
                  <TranslateText
                    textToBeTranslated={props.textToBeTranslated}
                    translationLanguage={translationLanguage}
                  />
                )}
              </TranslationBlock>
            )}

            {/* <div className="questions">{t("have_questions")}</div> */}
            {/* <AnswerQuestions notes={notes} chats={chats} /> */}
            {/* <div className="go_to_chat">{t("chat_help")}</div>
            <button onClick={(e) => search(lessonElements.length - 2)}>
              {t("get_to_chat")}
            </button> */}
            {/* <br /> */}
            <div
              className="navigate"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("find_related")}
              onClick={(e) => setLinkMenuOpen(!linkMenuOpen)}
            >
              <img className="icon" src="/static/menu-blocks.svg" />
              <div>{t("other_simulators")}</div>
            </div>

            {linkMenuOpen && (
              <SimulatorLinks>
                {other_simulators.map((s) => (
                  <a
                    href={`https://besavvy.app/ru/lesson?id=${s.id}&type=story`}
                    target="_blank"
                  >
                    <div className="simulator_row_link">
                      {" "}
                      <img
                        className="arrow_icon"
                        src="/static/right-arrow.svg"
                      />
                      <div>{s.name}</div>
                    </div>
                  </a>
                ))}
                {other_simulators.length == 0 ? (
                  <div className="simulator_row_link">
                    {" "}
                    <div>No other simulators built yet</div>
                  </div>
                ) : null}
              </SimulatorLinks>
            )}
          </div>
        </MenuColumn>
        <Content
          open={open}
          className="second"
          angle={props.experience * (360 / props.total)}
        >
          {width > 800 && (
            <CustomProgressBar myResult={num} lessonItems={lesson_structure} />
          )}
          <Navigation
            i_am_author={props.i_am_author}
            lesson={props.lesson}
            me={me}
            width={width}
            passMenuChange={passMenuChange}
            page="simulator"
          />
          <Border>
            {lessonElements.slice(0, num + 2).map((c, i) => (
              <Block
                key={i + "block"}
                open={open}
                show={i === num + 1 ? "final" : "no"}
                className={i === num + 1 ? "final" : "no"}
              >
                {c}
                {props.move_statuses[i] && (
                  <Buttons>
                    {/* Show move button if it is not the last block in the lesson */}
                    {lessonElements.length > num + 1 && i === num && (
                      <>
                        <div
                          id="arrow_box"
                          className="arrow_box"
                          onClick={async (e) => {
                            let res2 = move(lessonElements[i + 1]?.props?.id);
                            if (result) {
                              let res = await updateLessonResult({
                                variables: {
                                  id: result.id,
                                  lessonID: props.lessonID,
                                  progress: num + 2,
                                },
                              });
                            } else if (
                              !result &&
                              props.me?.id !== "clkvdew14837181f13vcbbcw0x"
                            ) {
                              let res = await createLessonResult({
                                variables: {
                                  lessonID: props.lessonID,
                                  progress: num + 2,
                                },
                              });
                              setResult(res.data.createLessonResult);
                            }
                          }}
                        >
                          <img
                            className="arrow"
                            src="../../static/down-arrow.svg"
                          />
                        </div>
                      </>
                    )}
                  </Buttons>
                )}
              </Block>
            ))}
          </Border>
          {props.me.id !== "clkvdew14837181f13vcbbcw0x" && (
            <Stepper>
              {" "}
              {props.me &&
                next_lesson &&
                lessonElements.length === num + 1 &&
                props.next &&
                props.next.published && (
                  <Link
                    legacyBehavior
                    href={{
                      pathname: "/lesson",
                      query: {
                        id: props.next.id,
                        type: props.next.type.toLowerCase(),
                      },
                    }}
                  >
                    <a className="next_lesson_link">
                      <SimpleButton>{t("next_lesson")}</SimpleButton>
                    </a>
                  </Link>
                )}
            </Stepper>
          )}
        </Content>
      </Styles>
    </>
  );
};

const CustomProgressBar = ({ myResult, lessonItems }) => {
  let lesson_length = calculateSum(lessonItems);
  let time_coef = lesson_length / lessonItems.length;

  const progress = myResult
    ? (((myResult + 1) * time_coef) / lesson_length) * 100
    : 0;

  let time_left = parseInt(lesson_length - (myResult + 1) * time_coef);
  let time_passed = parseInt(myResult * time_coef);

  const router = useRouter();
  const { t } = useTranslation("lesson");

  return (
    <ProgressBarContainer>
      <div className="box">
        <div className="container">
          <ProgressBar progress={progress + "%"} />
        </div>
        <div className="timeLeft">
          {time_left > 0
            ? router.locale == "ru"
              ? `Осталось ${time_left} мин.`
              : `${time_left} mins left`
            : t("lesson_is_done")}
        </div>
      </div>
    </ProgressBarContainer>
  );
};

export default Feed;
