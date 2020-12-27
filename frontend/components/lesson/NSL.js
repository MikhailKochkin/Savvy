import React, { useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import Link from "next/link";
import styled from "styled-components";
import PleaseSignIn from "../auth/PleaseSignIn";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import StoryEx from "./StoryEx";
import { useUser } from "../User";
import Panel from "./Panel";
import Reload from "./Reload";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #112a62; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 10vh;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  width: 100%;
  font-size: 2.3rem;
  span {
    margin: 0 3%;
    margin-right: 3%;
  }
  #back {
    &:hover {
      color: #e4e4e4;
    }
    cursor: pointer;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 1%;
  }
`;

const Head2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  span {
    color: #3ddc97;
    cursor: pointer;
    &:hover {
      color: #139a43;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    padding: 2% 15px;
    div {
      flex: 85%;
      text-align: right;
    }
  }
`;

const LessonPart = styled.div`
  display: flex;
  border: 1px solid #edefed;
  padding: 0.5% 2%;
  width: ${(props) => (props.task ? "55%" : "40%")};
  flex-direction: column;
  border-radius: 2px;
  margin: 0 0 20px 0;
  a {
    padding-top: 2%;
    padding-left: 2%;
  }
  @media (max-width: 1300px) {
    width: ${(props) => (props.task ? "70%" : "50%")};
  }
  @media (max-width: 800px) {
    margin: 1%;
    width: 90%;
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const Header = styled.div`
  border: 1px solid #edefed;
  background: #1a2980;
  color: white;
  margin-top: 4%;
  border-bottom: 0;
  width: ${(props) => (props.task ? "55%" : "40%")};
  text-align: left;
  padding: 5px 0px 5px 2%;
  @media (max-width: 1300px) {
    width: ${(props) => (props.task ? "70%" : "50%")};
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 315,
    },
    flexGrow: 1,
    background: "white",
    marginBottom: "2%",
  },
  progress: {
    width: 350,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
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

const NSL = (props) => {
  const [width, setWidth] = useState(0);
  const onResize = (width) => setWidth(width);

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [task, setTask] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { me, lesson } = props;
  return (
    <>
      {lesson && (
        <>
          <AreYouEnrolled
            openLesson={lesson.open}
            subject={lesson.coursePage.id}
          >
            <div id="root"></div>
            <Container>
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={onResize}
              />
              {me && (
                <Head>
                  {width > 800 && (
                    <Link
                      href={{
                        pathname: "/coursePage",
                        query: {
                          id: lesson.coursePage.id,
                        },
                      }}
                    >
                      <span>
                        <Icon size={"1.5em"} icon={arrowLeft} id="back" />
                      </span>
                    </Link>
                  )}
                  <span>
                    Урок {lesson.number}. {lesson.name}
                  </span>
                </Head>
              )}
              {me &&
                (lesson.user.id === me.id ||
                  me.permissions.includes("ADMIN")) && (
                  <Head2>
                    {lesson.structure.length > 0 && (
                      <div>
                        Режим истории →
                        <Link
                          href={{
                            pathname: "/lesson",
                            query: {
                              id: lesson.id,
                              type: "regular",
                            },
                          }}
                        >
                          <span> Переключить</span>
                        </Link>
                      </div>
                    )}
                  </Head2>
                )}
              <Header
                task={lesson.structure[activeStep].type === "construction"}
              >
                Раздел {activeStep + 1} из {lesson.structure.length}
              </Header>
              <LessonPart
                task={lesson.structure[activeStep].type === "construction"}
              >
                <ReactCSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={5500}
                  transitionLeaveTimeout={3300}
                >
                  <StoryEx
                    task={lesson.structure[activeStep]}
                    me={me}
                    lesson={lesson}
                    step={activeStep}
                  />
                </ReactCSSTransitionGroup>
              </LessonPart>
              <MobileStepper
                variant="progress"
                steps={lesson.structure.length}
                position="static"
                activeStep={activeStep}
                classes={{
                  root: classes.root, // class name, e.g. `classes-nesting-root-x`
                  progress: classes.progress, // class name, e.g. `classes-nesting-label-x`
                }}
                nextButton={
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleNext}
                    classes={{
                      textSizeSmall: classes.textSizeSmall,
                    }}
                    disabled={
                      activeStep === parseInt(lesson.structure.length - 1)
                    }
                  >
                    Вперёд
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleBack}
                    classes={{
                      textSizeSmall: classes.textSizeSmall,
                    }}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Назад
                  </Button>
                }
              />
              {me && <Panel level={me.level.level} change={lesson.change} />}
            </Container>{" "}
          </AreYouEnrolled>
        </>
      )}
    </>
  );
};

export default NSL;
