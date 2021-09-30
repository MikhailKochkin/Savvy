import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { NEW_SINGLE_LESSON_QUERY } from "./DemoLesson";
// import { withTranslation } from "../../i18n";

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  .arrow_box {
    cursor: pointer;
    padding: 10px 2%;
    width: 60px;
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
    .bar {
      height: 400px;
      width: 5px;
      background: #b6bce2;
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
  width: 100%;
  background: #3f51b5;
  height: ${(props) => props.progress};
  transition: all 0.5s;
`;

const Block = styled.div`
  min-height: 50vh;
  display: ${(props) => (props.show === "final" ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95vw;
`;

const Stepper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 96vw;
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
  const [num, setNum] = useState(
    props.my_result &&
      props.my_result.progress !== null &&
      props.my_result.progress !== 0 &&
      props.my_result.progress / props.number_of_tasks < 0.9
      ? props.my_result.progress - 1
      : 0
  );
  const [complexity, setComplexity] = useState(1);
  const [visible, setVisible] = useState(false);

  const classes = useStyles();

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
  if (props.next && props.next.lessonResults) {
    visited = props.next.lessonResults.filter(
      (l) => l.student.id === props.me.id
    );
  } else {
    visited = [];
  }

  useEffect(() => {
    if (
      props.components.length > num + 1 &&
      props.my_result &&
      props.my_result.progress / props.number_of_tasks < 0.9
    ) {
      if (props.components.length > num + 2) {
        var my_element =
          document.getElementsByClassName("final")[0].previousSibling;
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
  }, [0]);
  let color;
  if (props.components[num].props.complexity == 1) {
    color = "#55a630";
  } else if (props.components[num].props.complexity == 2) {
    color = "#3a86ff";
  } else if (props.components[num].props.complexity == 3) {
    color = "#f4d35e";
  } else if (props.components[num].props.complexity == 4) {
    color = "#f95738";
  } else if (props.components[num].props.complexity == 5) {
    color = "#201C35";
  } else {
    color = "#55a630";
  }

  // let complex_messages = [
  //   "💪🏻 Усложняем задание",
  //   "🤟🏻 Давайте попробуем что-то поинтереснее",
  //   "✈️ Новый уровень сложности",
  //   "🧨 Немного усложним задачу",
  //   "🕹 Level up",
  // ];

  // const randomIntFromInterval = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };
  return (
    <>
      <Message visible={visible}>
        <div id="message_text">💪🏻 Немного усложним задачу</div>
      </Message>
      <Styles>
        <div className="firstColumn">
          <div className="slider">
            <Complexity color={color}></Complexity>
            <div className="bar">
              <Progress
                className="progress"
                progress={
                  parseInt((100 * (num + 1)) / props.components.length) + "%"
                }
              ></Progress>
            </div>
            <div className="num">
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
        </div>
        <Content className="second">
          <>
            {props.components.slice(0, num + 2).map((c, i) => (
              <Block
                show={i === num + 1 ? "final" : "no"}
                className={i === num + 1 ? "final" : "no"}
              >
                {c}
                <>
                  {props.components.length > num + 1 && i === num && (
                    <div
                      className="arrow_box"
                      onClick={(e) => {
                        let res2 = move();
                      }}
                    >
                      <img
                        className="arrow"
                        src="../../static/down-arrow.svg"
                      />
                    </div>
                  )}
                </>
              </Block>
            ))}
          </>
          <Stepper>
            {props.me &&
              props.components.length === num + 1 &&
              props.next &&
              props.next.published && (
                <>
                  (
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
                      <Button className={classes.button} onClick={() => {}}>
                        Следующий урок
                      </Button>
                    </a>
                  </Link>
                  )
                </>
              )}
          </Stepper>
        </Content>
      </Styles>
    </>
  );
};

// export default withTranslation("story")(Feed);
export default Feed;
