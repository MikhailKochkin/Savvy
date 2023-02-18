import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { CREATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { UPDATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { NEW_SINGLE_LESSON_QUERY } from "./NewSingleLesson";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";

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
    /* flex-direction: column;
    justify-content: center; */
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
          text-align: center
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 450,
    [theme.breakpoints.down("sm")]: {
      width: 315,
    },
    transform: "rotate(90deg)",
    background: "white",
    margin: "2% 0",
  },
  progress: {
    width: "100%",
  },
  button: {
    padding: "2%",
    width: "100%",
    fontSize: "1.4rem",
    fontFamily: "Montserrat",
    textTransform: "none",
    textDecoration: "none",
  },
  textSizeSmall: {
    fontSize: "1.7rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    textTransform: "none",
    fontFamily: "Montserrat",
  },
}));

const Feed = (props) => {
  const [num, setNum] = useState(0);
  // props.my_result &&
  //   props.my_result.progress !== null &&
  //   props.my_result.progress !== 0 &&
  //   props.my_result.progress / props.number_of_tasks < 0.9 &&
  //   !secondRound
  //   ? props.my_result.progress - 1
  //   : 0
  const [result, setResult] = useState(
    props.my_result ? props.my_result.id : null
  );
  const [secondRound, setSecondRound] = useState(false);
  const [progress, setProgress] = useState();
  const [open, setOpen] = useState(false);
  const [complexity, setComplexity] = useState(1);
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation("lesson");

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

  useEffect(() => {
    // setResult(props.my_result ? props.my_result.id : null);
  }, [0]);
  useEffect(() => {
    setResult(props.my_result ? props.my_result.id : null);
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
      props.components.length > num + 1 &&
      props.my_result &&
      props.my_result.progress / props.number_of_tasks < 0.9
    ) {
      if (props.components.length > num + 2) {
        var my_element = document.getElementsByClassName("final")[0];
        my_element &&
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
  }, [props.my_result]);
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
  console.log("move_statuses", props.move_statuses);
  return (
    <>
      <Styles>
        <Content
          open={open}
          className="second"
          angle={props.experience * (360 / props.total)}
        >
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
              <div className="inner">
                {props.experience >= props.total ? "🎉" : props.experience}
              </div>
            </div>
          )}
          <div
            className="arrowmenu"
            onClick={(e) => {
              setOpen(!open);
            }}
          >
            <img className="arrow" src="../../static/burger_menu.svg" />
          </div>
          {result ? (
            <>
              {props.components.slice(0, num + 2).map((c, i) => (
                <Block
                  open={open}
                  show={i === num + 1 ? "final" : "no"}
                  className={i === num + 1 ? "final" : "no"}
                >
                  {/* {props.move_statuses[i] ? "Show" : "No show"} */}
                  {/* {props.move_statuses[i] ? "Show" : "No show"} */}

                  {c}
                  {props.move_statuses[i] && props.showArrow && (
                    <Mutation
                      mutation={UPDATE_LESSONRESULT_MUTATION}
                      variables={{
                        id: result,
                        lessonID: props.lessonID,
                        progress: num + 2,
                      }}
                      refetchQueries={() => [
                        {
                          query: NEW_SINGLE_LESSON_QUERY,
                          variables: { id: props.lessonID },
                        },
                      ]}
                    >
                      {(updateLessonResult, { loading, error }) => {
                        return (
                          <Buttons>
                            {/* Show move button if it is not the last block in the lesson */}
                            {props.components.length > num + 1 && i === num && (
                              <>
                                <div
                                  id="arrow_box"
                                  className="arrow_box"
                                  onClick={async (e) => {
                                    if (
                                      props.components.length - (num + 2) ==
                                      2
                                    ) {
                                      setSecondRound(true);
                                    }
                                    let res2 = move();
                                    let res = await updateLessonResult();
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
                        );
                      }}
                    </Mutation>
                  )}
                </Block>
              ))}
            </>
          ) : (
            <>
              {props.components.slice(0, num + 2).map((c, i) => (
                <Block
                  open={open}
                  show={i === num + 1 ? "final" : "no"}
                  className={i === num + 1 ? "final" : "no"}
                >
                  {c}
                  <div>{result}</div>
                  {props.showArrow && (
                    <Mutation
                      mutation={CREATE_LESSONRESULT_MUTATION}
                      variables={{
                        lessonID: props.lessonID,
                        progress: num + 2,
                      }}
                      refetchQueries={[
                        {
                          query: NEW_SINGLE_LESSON_QUERY,
                          variables: { id: props.lessonID },
                        },
                      ]}
                    >
                      {(createLessonResult, { loading, error }) => {
                        return (
                          <Buttons>
                            {props.components.length > num + 1 && i === num && (
                              <>
                                <div
                                  id="arrow"
                                  className="arrow_box"
                                  onClick={async (e) => {
                                    let res2 = move();
                                    let res = await createLessonResult();

                                    setResult(res.data.createLessonResult.id);
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
                        );
                      }}
                    </Mutation>
                  )}
                </Block>
              ))}
            </>
          )}
          <Stepper>
            {props.me &&
              props.components.length === num + 1 &&
              props.next &&
              props.next.published && (
                <>
                  {visited.length === 0 ? (
                    <Mutation
                      mutation={CREATE_LESSONRESULT_MUTATION}
                      variables={{
                        lessonID: props.next.id,
                        visitsNumber: 1,
                      }}
                      refetchQueries={() => [
                        {
                          query: SINGLE_COURSEPAGE_QUERY,
                          variables: { id: props.coursePageID },
                        },
                      ]}
                    >
                      {(createLessonResult, { loading, error }) => {
                        return (
                          <Link
                            // The user HAS not yet visited the next lesson page
                            href={{
                              pathname: "/lesson",
                              query: {
                                id: props.next.id,
                                type: props.next.type.toLowerCase(),
                              },
                            }}
                          >
                            <a>
                              <Button
                                className={classes.button}
                                onClick={() => {
                                  createLessonResult();
                                }}
                              >
                                Следующий урок
                              </Button>
                            </a>
                          </Link>
                        );
                      }}
                    </Mutation>
                  ) : (
                    <Mutation
                      mutation={UPDATE_LESSONRESULT_MUTATION}
                      variables={{
                        id: visited[0].id,
                        visitsNumber: visited[0].visitsNumber + 1,
                      }}
                      refetchQueries={() => [
                        {
                          query: SINGLE_COURSEPAGE_QUERY,
                          variables: { id: props.coursePageID },
                        },
                      ]}
                    >
                      {(updateLessonResult, { loading, error }) => {
                        return (
                          <Link
                            // The user HAS visited the next lesson page and we update it now
                            href={{
                              pathname: "/lesson",
                              query: {
                                id: props.next.id,
                                type: props.next.type.toLowerCase(),
                              },
                            }}
                          >
                            <a>
                              <Button
                                className={classes.button}
                                onClick={() => {
                                  updateLessonResult();
                                }}
                              >
                                Следующий урок
                              </Button>
                            </a>
                          </Link>
                        );
                      }}
                    </Mutation>
                  )}
                </>
              )}
          </Stepper>
        </Content>
        <MenuColumn open={open} className="lastColumn">
          <div className="container">
            <div className="lesson_number">
              {t("lesson")} {props.lesson_number}.
            </div>
            <div className="lesson_name">{props.lesson_name}</div>
            <div className="lesson_number">
              {t("complexity")} {complexity}
            </div>
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
