import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Router from "next/router";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #d6d6d6;
  background: #fff;
  z-index: 10;
  position: fixed;
  bottom: 0px;
  height: 100px;
`;

const ButtonOpen = styled.a`
  width: 90%;
  height: 48px;
  border-top: 2px solid #175ffe;
  padding: 2%;
  font-family: Montserrat;
  border: none;
  text-align: center;
  background: #175ffe;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  color: #fff;
  /* position: -webkit-sticky; */
  &:hover {
    background-color: #0b44bf;
  }
`;

const MobileAction = (props) => {
  const { t } = useTranslation("coursePage");
  let demo_lesson = props.coursePage.lessons
    .filter((l) => l.open == true)
    .sort((les) => les.number > les.number)[0];

  return (
    <Styles>
      {/* <ButtonOpen
        id="bottomline_coursepage_to_demo_lesson"
        // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
        // target="_blank"
        onClick={(e) => {
          e.preventDefault();
          Router.push({
            pathname: "/lesson",
            query: {
              id: demo_lesson.id,
              type: "story",
            },
          });
        }}
      >
        {t("start_open_lesson")}
      </ButtonOpen> */}
      <ButtonOpen
        id="coursePage_to_demolesson"
        // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
        // target="_blank"

        onClick={(e) => {
          e.preventDefault();
          alert(
            `Сейчас мы откроем диалог с директором BeSavvy Михаилом Кочкиным. Он ответит на любой вопрос по курсам. Задайте ему свой вопрос или просто скопируйте этот текст: Привет, расскажи про курс "${props.coursePage.title}" `
          );
          location.href = "https://t.me/BeSavvyMentorBot?start=link_vINBAwrN4O";
        }}
      >
        Получить консультацию
      </ButtonOpen>
    </Styles>
  );
};

export default MobileAction;
