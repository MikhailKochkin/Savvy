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
  /* width: 292px; */
  height: 48px;
  padding: 5px;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  text-align: center;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const MobileAction = (props) => {
  const { t } = useTranslation("coursePage");

  const slide = () => {
    var my_element = document.getElementById("buy_section");

    var rect = my_element.getBoundingClientRect();
    var offsetTop = window.pageYOffset + rect.top;

    window.scrollTo({
      top: offsetTop - 120, // Adjust for the desired margin
      behavior: "smooth",
    });
  };

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
          slide();
          // alert(
          //   `Сейчас мы откроем диалог с директором BeSavvy Михаилом Кочкиным. Оставьте свой вопрос и он ответит в течение пары часов. Можете просто скопировать этот текст: Привет, расскажи про курс "${props.coursePage.title}"`
          // );
          // location.href = "https://t.me/BeSavvyMentorBot?start=link_vINBAwrN4O";
        }}
      >
        {props.coursePage.prices && props.coursePage.prices.prices.length > 0
          ? "Записаться на курс"
          : t("start_open_lesson")}
      </ButtonOpen>
    </Styles>
  );
};

export default MobileAction;
