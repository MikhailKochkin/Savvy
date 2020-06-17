import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { CREATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { UPDATE_LESSONRESULT_MUTATION } from "./LessonHeader";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  .arrow {
    width: 30px;
    color: black;
    cursor: pointer;
  }
  a {
    width: 30%;
  }
`;

const Block = styled.div`
  min-height: 50vh;
  display: ${(props) => (props.show === "final" ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Search = styled.div`
  border-bottom: 1px solid grey;
  padding: 2%;
  width: 100%;
  select {
    margin-left: 15px;
  }
`;

const Stepper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 315,
    },
    // flexGrow: 1,
    background: "white",
    margin: "2% 0",
  },
  progress: {
    width: "100%",
    // [theme.breakpoints.down("sm")]: {
    //   width: 100,
    // },
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

  const classes = useStyles();

  const move = async (e) => {
    if (props.components.length > num + 1) {
      const data = await setNum(num + 1);
      //   console.log(document.getElementsByClassName("final")[0].previousSibling);
      if (props.components.length > num + 2) {
        var my_element = document.getElementsByClassName("final")[0]
          .previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (props.components.length === num + 2) {
        var my_element = document.getElementsByClassName("no")[
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
        var my_element = document.getElementsByClassName("final")[0]
          .previousSibling;
        my_element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (props.components.length === num + 2) {
        var my_element = document.getElementsByClassName("no")[
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
  console.log(props.next);
  return (
    <Styles>
      <Search>
        Перейти к конкретному разделу:
        <select
          id="num"
          name="num"
          onChange={(e) => search(parseInt(e.target.value))}
        >
          {props.components.map((el, i) => (
            <option value={i - 1}>{i + 1}</option>
          ))}
        </select>
      </Search>
      {props.components.slice(0, num + 2).map((c, i) => (
        <Block
          show={i === num + 1 ? "final" : "no"}
          className={i === num + 1 ? "final" : "no"}
        >
          {c}
          {props.components.length > num + 1 && i === num && (
            <div className="button" onClick={(e) => move()}>
              <img className="arrow" src="../../static/down-arrow.svg" />
            </div>
          )}
        </Block>
      ))}
      <Stepper>
        <MobileStepper
          variant="progress"
          steps={props.components.length}
          position="static"
          activeStep={num}
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            progress: classes.progress, // class name, e.g. `classes-nesting-label-x`
          }}
        />
        <div>
          {num + 1} из {props.components.length}
        </div>
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
                              console.log(1);
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
                              console.log(2);
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
    </Styles>
  );
};

export default Feed;