import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Question from "./Question";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 40%;
    margin: 0;
  }

  @media (max-width: 800px) {
    width: 90%;
    flex-direction: column;
    h2 {
      width: 100%;
      margin-bottom: 40px;
      font-size: 3.2rem;
    }
  }
`;

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  @media (max-width: 800px) {
    width: 90%;
    flex-direction: column;
  }
`;

const ButtonZone = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  div {
    width: 80%;
    margin-bottom: 50px;
    text-align: center;
    font-size: 3rem;
    line-height: 1.4;
  }
  button {
    width: 40%;
    margin-left: 50px;
    height: 50px;
    font-size: 2rem;
    color: #fff;
    font-family: Montserrat;
    background-color: #4785a2;
    border: 1px solid #4785a2;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #29617a;
    }
  }
  @media (max-width: 800px) {
    div {
      font-size: 2.4rem;
      width: 100%;
    }
    button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  p {
    width: 100%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const QA = (props) => {
  const { t } = useTranslation("coursePage");
  const nodeRef = useRef();

  return (
    <Styles>
      <Container ref={nodeRef}>
        <h2>{t("faq")}</h2>
        <QuestionsList>
          {props.data.questions.map((m) => (
            <Question d={m} />
          ))}
        </QuestionsList>
      </Container>
    </Styles>
  );
};

export default QA;
