import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery, gql } from "@apollo/client";
import _ from "lodash";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Auth from "../auth/Auth.js";
import AnswerQuestions from "./AnswerQuestions";
import { CREATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { UPDATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { NEW_SINGLE_LESSON_QUERY } from "./NewSingleLesson";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";
import PagePurchase from "./PagePurchase.js";
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
  align-items: flex-start;
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
        width: 45px;
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
          font-family: Montserrat;
          color: #c2c2c2;
          font-size: 1.4rem;
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

const MenuColumn = styled.div`
  width: ${(props) => (props.open ? "25vw" : "0px")};
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
  transition: width 0.3s ease; /* Add this line for smooth transition */
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
        /* margin-top: 10px;*/
        margin-left: 20px;
        border: 1px solid #c2c2c2;
        color: #c2c2c2;
        width: 35px;
        height: 35px;
        border-radius: 12px;
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
          font-family: Montserrat;
          font-size: 1.6rem;
          font-weight: 500;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          text-indent: 0.01px;
          text-align-last: center;
          text-align: center;
          text-overflow: "";
          cursor: pointer;
          /* &:hover {
            color: #1a2980;
          } */
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

const Complexity = styled.div`
  margin-bottom: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Progress = styled.input`
  width: 100%;
  height: 8px;
  margin-top: 10px;
  background: linear-gradient(
    to right,
    #3f51b5,
    #3f51b5 ${(props) => props.progress},
    #f0f0f0 ${(props) => props.progress},
    #f0f0f0
  );
  appearance: none;
  outline: none;
  transition: background 0.2s, box-shadow 0.2s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #3f51b5;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #3f51b5;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
`;

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
  width: ${(props) => (props.open ? "75vw" : "100vw")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Section = styled.div`
  height: 100%;
  width: ${(props) => props.sectionWidth};
  background: ${(props) => props.sectionColor};
  border-right: ${(props) =>
    props.sectionColor === "#3f51b5" ? "1px solid #fff" : "1px solid #C7C7C7"};
  cursor: pointer;
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
    margin-top: 5px;
    padding: 0px 5px;
    border-radius: 5px;
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
    notes,
    chats,
    step,
  } = props;
  const { t } = useTranslation("lesson");
  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );
  let lessonElements;
  let next_lesson = false;

  if (props.me.id == "clkvdew14837181f13vcbbcw0x") {
    lessonElements = [...props.components.slice(0, openSize), <Auth />];
    next_lesson = false;
  } else if (
    !props.openLesson &&
    me.new_subjects.filter((sbj) => sbj.id == coursePageId).length == 0 &&
    me.coursePages.filter((c) => c.id == coursePageId).length == 0 &&
    me.co_coursePages.filter((c) => c.id == coursePageId).length == 0 &&
    !me.permissions.includes("ADMIN")
  ) {
    lessonElements = [
      props.components.slice(0, 2),
      <PagePurchase
        coursePageId={coursePageId}
        me={me}
        coursePage={coursePage}
        lesson_structure={lesson_structure}
        lessonId={lessonId}
      />,
    ];
    next_lesson = false;
  } else {
    lessonElements = props.components;
    next_lesson = true;
  }

  const [num, setNum] = useState(step ? parseInt(step) - 1 : 0);
  const [result, setResult] = useState(
    props.my_result ? props.my_result : null
  );
  const [secondRound, setSecondRound] = useState(false);
  const totalSections = lessonElements.length;
  const sectionWidth = 100 / totalSections + "%";
  const [open, setOpen] = useState(false);
  const [complexity, setComplexity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);
  const passMenuChange = () => {
    setOpen(!open);
  };
  const [linkMenuOpen, setLinkMenuOpen] = useState(false);

  let hasLessonBeenFinished =
    result?.progress == lesson_structure.length &&
    lesson_structure &&
    result?.progress
      ? true
      : false;

  const move = async (e) => {
    if (lessonElements.length > num + 1) {
      const data = await setNum(num + 1);
      props.passStep(num + 1);
      if (lessonElements[num + 1].props.complexity > complexity) {
        setComplexity(lessonElements[num + 1].props.complexity);
        setVisible(true);
        setTimeout(function () {
          setVisible(false);
        }, 3000);
      } else if (lessonElements[num + 1].props.complexity < complexity) {
        setComplexity(lessonElements[num + 1].props.complexity);
      }
      if (lessonElements.length > num + 2) {
        var my_element =
          document.getElementsByClassName("final")[0].previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (lessonElements.length === num + 2) {
        var my_element =
          document.getElementsByClassName("no")[
            document.getElementsByClassName("no").length - 1
          ];
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  const search = async (num) => {
    if (lessonElements.length > num + 1) {
      const data = setNum(num + 1);
      if (lessonElements.length > num + 2) {
        var my_element =
          document.getElementsByClassName("final")[0].previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (lessonElements.length === num + 2) {
        var my_element =
          document.getElementsByClassName("no")[
            document.getElementsByClassName("no").length - 1
          ];
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  let visited;
  if (props.me && props.next && props.next.lessonResults) {
    visited = props.next.lessonResults.filter(
      (l) => l.student.id === props.me.id
    );
  } else {
    visited = [];
  }

  useEffect(() => {
    if (step == 0) {
      setResult(props.my_result ? props.my_result : null);

      setNum(
        num > 0
          ? num
          : props.my_result &&
            props.my_result.progress !== null &&
            props.my_result.progress !== 0 &&
            props.my_result.progress / props.number_of_tasks < 0.9
          ? props.my_result.progress - 1
          : 0
      );
      setSecondRound(true);
      if (
        lessonElements.length > num + 1 &&
        props.my_result &&
        props.my_result.progress / props.number_of_tasks < 0.9
      ) {
        if (lessonElements.length > num + 2) {
          var my_element = document.getElementsByClassName("final")[0];
          my_element &&
            my_element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
        } else if (lessonElements.length === num + 2) {
          var my_element =
            document.getElementsByClassName("no")[
              document.getElementsByClassName("no").length - 1
            ];
          my_element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    }
  }, [props.my_result]);

  useEffect(() => {
    var my_element =
      document.getElementsByClassName("no")[
        document.getElementsByClassName("no").length - 1
      ];
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [props.step, props.stats_data]);

  let other_simulators = props.lesson.coursePage.lessons
    .filter(
      (les) =>
        les.published == true && les.type !== "REGULAR" && les.id !== lessonId
    )
    .sort((a, b) => a.number > b.number);

  return (
    <>
      <Styles>
        <MenuColumn open={open} className="lastColumn">
          <div className="container">
            <div className="top_line">
              <div className="lesson_name">
                {props.lesson_number}. {props.lesson_name}
              </div>
              <div className="close-button" onClick={(e) => setOpen(false)}>
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
                  <div id="text">{t("choose_section")}</div>
                  <div id="button_square">
                    <select
                      id="num"
                      name="num"
                      value={num - 1}
                      onChange={(e) => search(parseInt(e.target.value))}
                    >
                      {lessonElements.map((el, i) => (
                        <option key={i + "option3"} value={i - 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bar" style={{ display: "flex" }}>
                  {lessonElements.map((el, i) => (
                    <Section
                      key={i + "section"}
                      sectionWidth={sectionWidth}
                      sectionColor={i <= num ? "#3f51b5" : "#f0f0f0"}
                      onClick={() => search(i)}
                    />
                  ))}
                </div>
              </div>
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
              </SimulatorLinks>
            )}
          </div>
        </MenuColumn>
        <Content
          open={open}
          className="second"
          angle={props.experience * (360 / props.total)}
        >
          {/* <CustomProgressBar myResult={num} lessonItems={lesson_structure} /> */}
          {/* <Message visible={visible}>
            <div id="message_text">
              🚀 {t("level_up")} {complexity}
            </div>
          </Message> */}

          <Navigation
            i_am_author={props.i_am_author}
            lesson={props.lesson}
            me={me}
            width={props.width}
            passMenuChange={passMenuChange}
          />
          {props.hasSecret && (
            <div
              className="arrowmenu2"
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <div className="inner">
                {props.experience >= props.total ? "🎉" : props.experience}
              </div>
            </div>
          )}
          {result && !hasLessonBeenFinished ? (
            <Border>
              {/*  We have lesson result */}
              {lessonElements.slice(0, num + 2).map((c, i) => (
                <Block
                  key={i + "block"}
                  open={open}
                  show={i === num + 1 ? "final" : "no"}
                  className={i === num + 1 ? "final" : "no"}
                >
                  {c}
                  {props.move_statuses[i] && props.showArrow && (
                    <Buttons>
                      {/* Show move button if it is not the last block in the lesson */}
                      {lessonElements.length > num + 1 && i === num && (
                        <>
                          <div
                            id="arrow_box"
                            className="arrow_box"
                            onClick={async (e) => {
                              if (lessonElements.length - (num + 2) == 2) {
                                setSecondRound(true);
                              }
                              let res2 = move();
                              let res = await updateLessonResult({
                                variables: {
                                  id: result.id,
                                  lessonID: props.lessonID,
                                  progress: num + 2,
                                },
                              });
                              // }
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
          ) : (
            <Border>
              {/*  We don't have lesson result */}
              {lessonElements.slice(0, num + 2).map((c, i) => (
                <Block
                  key={i + "block2"}
                  open={open}
                  show={i === num + 1 ? "final" : "no"}
                  className={i === num + 1 ? "final" : "no"}
                >
                  {c}
                  {props.showArrow && (
                    <Buttons>
                      {lessonElements.length > num + 1 && i === num && (
                        <>
                          <div
                            id="arrow"
                            className="arrow_box"
                            onClick={async (e) => {
                              let res2 = move();
                              if (
                                props.me.id !== "clkvdew14837181f13vcbbcw0x"
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
          )}
          {props.me.id !== "clkvdew14837181f13vcbbcw0x" && (
            <Stepper>
              {" "}
              {props.me &&
                next_lesson &&
                lessonElements.length === num + 1 &&
                props.next &&
                props.next.published && (
                  <>
                    {visited.length === 0 ? (
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
                    ) : (
                      <Link
                        legacyBehavior
                        // The user HAS visited the next lesson page and we update it now
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
                  </>
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
