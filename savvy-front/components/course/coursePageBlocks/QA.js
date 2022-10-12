import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Question from "./Question";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Styles = styled.div`
  width: 100%;
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
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.8rem;
    width: 40%;
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

  const questions = [
    {
      q: "Как мне присоединиться к курсу?",
      a: "Присоединиться очень просто - надо зарегистрироваться на сайте и пройти первый урок. А потом оплатить курс и открыть доступ к оставшимся занятиям.",
    },
    {
      q: "Сколько времени у меня будет уходить на занятия?",
      a: "2-4 часа в неделю. Нам важно не перегрузить вас и не помешать учебе/работе.",
    },
    {
      q: "Будет ли у меня доступ к курсу после его окончания?",
      a: "Да, доступ к материалам курсам у вас остается навсегда.",
    },

    {
      q: "Какой формат занятий?",
      a: "Вы в своем темпе проходите онлайн-уроки на платформе besavvy.app в течение недели, задаете вопросы преподавателю в чате и встречатетесь с ним на вебинарах.",
    },
    {
      q: "Как проходит проверка домашнего задания?",
      a: "Автоматически на платформе. По всем дополнительным вопросам вы сможете напрямую писать авторам в чат.",
    },
    {
      q: "У нас будут вебинары?",
      a: "Да, обычно они проходят раз в 2 недели.",
    },
    {
      q: "А если у меня возникнет вопрос, мне кто-то сможет помочь?",
      a: "Да, есть чат курса в Дискорде, за которым будут внимательно следить создатели и авторы курса.",
    },
    {
      q: "У меня есть вопрос, которого нет в списке..",
      a: "Зайдите на открытый урок, там можно задать любой вопрос в самом конце.",
    },
  ];

  const eng_questions = [
    {
      q: "How do I join the course?",
      a: "It's easy to join - you have to register on the website and check out the first lesson. Then pay for the course and get access to the rest of the classes",
    },
    {
      q: "How long will it take me to complete the course?",
      a: "2-4 hours per week. It is important for us not to overload you or interfere with your studies/work.",
    },
    {
      q: "Will I have access to the course after I complete it?",
      a: "Yes, you will have access to the course permanently",
    },
    {
      q: "What is the format of the course?",
      a: "You take online lessons at your own pace on the besavvy.app platform during the week, ask questions to the instructor in chat and meet them at webinars.",
    },
    {
      q: "How is the homework checked?",
      a: "Automatically on the platform. For any additional questions, you will be able to write directly to the authors in the chat room.",
    },
    {
      q: "Are we going to have webinars?",
      a: "Yes, they usually take place every 2 weeks.",
    },
    {
      q: "And if I have a question, will someone be able to help me?",
      a: "Yes, there is a course chat in Discord, which will be closely monitored by the course creators and authors.",
    },
    {
      q: "I have a question that's not on the list...",
      a: "Go to the open lesson, you can ask any question there at the very end.",
    },
  ];

  const router = useRouter();

  return (
    <Styles>
      <Container ref={nodeRef}>
        <h2>{t("faq")}</h2>
        <QuestionsList>
          {router.locale == "ru" && questions.map((m) => <Question d={m} />)}
          {router.locale != "ru" &&
            eng_questions.map((m) => <Question d={m} />)}
        </QuestionsList>
      </Container>
    </Styles>
  );
};

export default QA;
