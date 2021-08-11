import React, { useState } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { makeStyles } from "@material-ui/core/styles";
import { CSSTransitionGroup } from "react-transition-group";

const useStyles = makeStyles({
  button: {
    width: "100%",
    marginBottom: "2%",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  min-height: 50vh;
  width: 90%;

  img {
    width: 100%;
  }
`;

const Box = styled.div`
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const TestBlock = (props) => {
  return (
    <>
      <Container>
        <img src="/static/test_pattern.svg" />
        <h2>Закрепление материала</h2>
        <div>
          Ответьте на 80% вопросов правильно, чтобы закрепить новые знания.{" "}
        </div>
      </Container>{" "}
    </>
  );
};

export default TestBlock;
