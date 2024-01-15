import { NEW_SINGLE_LESSON_QUERY } from "./DemoLesson";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ReactTooltip from "react-tooltip";
import calculateSum from "../../functions.js";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  .arrow_box {
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
      border: 1px solid red;
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
  width: ${(props) => (props.open ? "30vw" : "0px")};
  display: ${(props) => (props.open ? "flex" : "none")};
  height: 100vh;
  background: #fff;
  border-left: 1px solid #d4d4d4;
  position: -webkit-sticky;
  position: sticky;
  top: 0%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 800px) {
    width: ${(props) => (props.open ? "100vw" : "0px")};
  }
  .container {
    width: 80%;
    margin: 40px 0;
    .lesson_number {
      color: #8a8a8a;
      text-align: center;
      font-weight: 500;
      font-size: 1.8rem;
    }
    .lesson_name {
      text-align: center;
      font-size: 2.4rem;
      font-weight: 600;
      margin-top: 10px;
      line-height: 1.3;
    }
    .bar {
      margin-top: 30px;
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
      margin-top: 10px;

      font-size: 1.6rem;
    }
    button {
      border: 1px solid #c2c2c2;
      border-radius: 12px;
      padding: 3% 4%;
      cursor: pointer;
      margin-top: 10px;
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
      transition: 0.5s;

      &:hover {
        border: 1px solid #1a2980;
      }
    }
    .nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      margin-top: 30px;
      #text {
        max-width: 215px;
        font-weight: 500;
        line-height: 1.3;
        font-size: 1.6rem;
      }
      #button_square {
        margin-top: 10px;
        margin-left: 20px;
        border: 1px solid #c2c2c2;
        color: #c2c2c2;
        width: 45px;
        height: 45px;
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

const Progress = styled.div`
  height: 100%;
  background: #3f51b5;
  width: ${(props) => props.progress};
  transition: all 0.5s;
`;

const Block = styled.div`
  min-height: 50vh;
  display: ${(props) => (props.show === "final" ? "none" : "flex")};
  flex-direction: column;
  justify-content: flex-start;
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
`;

const Content = styled.div`
  width: ${(props) => (props.open ? "70vw" : "100vw")};
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
  }
`;

const Message = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 2.5%;
  font-size: 1.8rem;
  #message_text {
    background: #8a2387; /* fallback for old browsers */
    width: 32%;
    background: -webkit-linear-gradient(
      to right,
      #f27121,
      #e94057,
      #8a2387
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f27121,
      #e94057,
      #8a2387
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
    border-radius: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: visibility 0.5s linear, opacity 0.5s linear;
  }
  @media (max-width: 800px) {
    #message_text {
      width: 90%;
    }
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

const Feed = (props) => {
  const { me, coursePageId, coursePage, lesson_structure, lessonId } = props;

  const [open, setOpen] = useState(false);
  const [num, setNum] = useState(
    props.my_result &&
      props.my_result.progress !== null &&
      props.my_result.progress !== 0 &&
      props.my_result.progress / props.number_of_tasks < 0.9
      ? props.my_result.progress - 1
      : 0
  );
  const [isDimmed, setIsDimmed] = useState(false); // For dimming the background
  const [complexity, setComplexity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [currentTooltip, setCurrentTooltip] = useState(0);

  // const classes = useStyles();
  const { t } = useTranslation("lesson");
  const getResults = (el) => {
    // console.log("res2", el);
  };
  const move = async (e) => {
    if (props.components.length > num + 1) {
      const data = await setNum(num + 1);
      if (props.components[num + 1].props.complexity > complexity) {
        setComplexity(props.components[num + 1].props.complexity);
        setVisible(true);
        setTimeout(function () {
          setVisible(false);
        }, 3000);
      } else if (props.components[num + 1].props.complexity < complexity) {
        setComplexity(props.components[num + 1].props.complexity);
      }
      if (props.components.length > num + 2) {
        var my_element =
          document.getElementsByClassName("final")[0].previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (props.components.length === num + 2) {
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
    if (props.components.length > num + 1) {
      const data = await setNum(num + 1);
      if (props.components.length > num + 2) {
        var my_element =
          document.getElementsByClassName("final")[0].previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (props.components.length === num + 2) {
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

  // let color;
  // if (props.components[num].props.complexity == 1) {
  //   color = "#55a630";
  // } else if (props.components[num].props.complexity == 2) {
  //   color = "#3a86ff";
  // } else if (props.components[num].props.complexity == 3) {
  //   color = "#f4d35e";
  // } else if (props.components[num].props.complexity == 4) {
  //   color = "#f95738";
  // } else if (props.components[num].props.complexity == 5) {
  //   color = "#201C35";
  // } else {
  //   color = "#55a630";
  // }
  return (
    <>
      <Styles>
        <Content
          open={open}
          className="second"
          angle={props.experience * (360 / props.total)}
        >
          <CustomProgressBar myResult={num} lessonItems={lesson_structure} />
          <Message visible={visible}>
            <div id="message_text">
              🚀 {t("level_up")} {complexity}
            </div>
          </Message>
          {props.hasSecret && (
            <div
              className="arrowmenu2"
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <div className="inner">{props.experience}</div>
            </div>
          )}
          <div
            id="tooltip2"
            data-tip={!props.me ? "This button enables the menu" : undefined}
            className="arrowmenu"
            onClick={(e) => {
              setOpen(!open);
            }}
          >
            <img className="arrow" src="../../static/burger_menu.svg" />
            {!props.me && (
              <ReactTooltip place="top" type="dark" effect="float" />
            )}
          </div>
          {props.components.slice(0, num + 2).map((c, i) => (
            <Block
              open={open}
              show={i === num + 1 ? "final" : "no"}
              className={i === num + 1 ? "final" : "no"}
            >
              {c}
              <Buttons>
                {props.components.length > num + 1 && i === num && (
                  <>
                    <div
                      id="tooltip1"
                      className="arrow_box"
                      data-tip="This button enables you to move through the lesson"
                      onClick={(e) => {
                        // if (props.my_result.progress < num + 2) {
                        //   let res = updateLessonResult();
                        // }
                        let res2 = move();
                      }}
                    >
                      <img
                        className="arrow"
                        src="../../static/down-arrow.svg"
                      />
                      {!props.me && (
                        <ReactTooltip place="top" type="dark" effect="float" />
                      )}
                    </div>
                  </>
                )}
              </Buttons>
            </Block>
          ))}
        </Content>
        <MenuColumn open={open} className="lastColumn">
          <div className="container">
            <div className="lesson_number">
              {t("lesson")} {props.lesson_number}.
            </div>
            <div className="lesson_name">{props.lesson_name}</div>
            {/* <div className="lesson_number">
              {t("complexity")} {complexity}
            </div> */}
            <div className="bar">
              <Progress
                className="progress"
                progress={
                  parseInt((100 * (num + 1)) / props.components.length) + "%"
                }
              ></Progress>
            </div>
            <div className="nav">
              <div id="text">{t("choose_section")}</div>
              <div id="button_square">
                <select
                  id="num"
                  name="num"
                  value={num - 1}
                  onChange={(e) => search(parseInt(e.target.value))}
                >
                  {props.components.map((el, i) => (
                    <option value={i - 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="questions">{t("have_questions")}</div>
            <div className="go_to_chat">{t("chat_help")}</div>
            <button onClick={(e) => search(props.components.length - 2)}>
              {t("get_to_chat")}
            </button>
            <br />
            <button onClick={(e) => setOpen(false)}>{t("close_menu")}</button>
          </div>
        </MenuColumn>
      </Styles>
    </>
  );
};

export default Feed;

const CustomProgressBar = ({ myResult, lessonItems }) => {
  let lesson_length = calculateSum(lessonItems);
  let time_coef = lesson_length / lessonItems.length;

  const progress = myResult
    ? (((myResult + 1) * time_coef) / lesson_length) * 100 > 100
      ? 100
      : (((myResult + 1) * time_coef) / lesson_length) * 100
    : 0;

  let time_left =
    parseInt(lesson_length - (myResult + 1) * time_coef) < 0
      ? 0
      : parseInt(lesson_length - (myResult + 1) * time_coef);

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
