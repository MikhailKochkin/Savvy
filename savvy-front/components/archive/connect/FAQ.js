import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Question from "./Question";
import Modal from "styled-react-modal";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #111111;
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
    line-height: 1.4;
    width: 40%;
    margin: 0;
    color: #fff;
    font-size: 3.4rem;
    width: 70%;
    line-height: 1.4;
    font-weight: 800;
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

const QA = (props) => {
  const nodeRef = useRef();

  useEffect(() => {}, []);

  let questions = [
    {
      q: "Как происходит отбор в сообщество?",
      a: "У нас есть первый вводный месяц, чтобы понять, подходим мы друг другу или нет. По его итогу вы можете решить, есть ли смысл вам находиться в сообществе.",
    },
    {
      q: "Зачем нужна база данных юристов?",
      a: "Таблица помогает вам выстраивать свой нетворк. Вы можете искать людей по разным критериям: опыт или место работы, интересы, город проживания. И начинать с ними общаться офлайн или онлайн.",
    },
    {
      q: "Где проходят встречи?",
      a: "Все встречи проходят онлайн в Zoom. У нас запланировано проведение очных встреч в Москве в ближайшее время.",
    },
    {
      q: "Как мне узнавать о мероприятиях сообщества?",
      a: "Мы активно общаемся в закрытом телеграмм чате BeSavvy Connect. Вся информация о жизни сообщества сразу доступна там.",
    },
    {
      q: "У меня остались вопросы...",
      a: "Если вы не нашли ответа здесь, напишите нам в тг: @hedgehoggyhoge Настя, менеджер коммьюнити и  @MikKochkin Миша, основатель BeSavvy",
    },
  ];

  return (
    <Styles>
      <Container ref={nodeRef}>
        <h2>Часто задаваемые вопросы</h2>
        <QuestionsList>
          {questions.map((m) => (
            <Question d={m} />
          ))}
        </QuestionsList>
      </Container>
    </Styles>
  );
};

export default QA;
