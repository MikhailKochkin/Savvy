import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";

import { useTranslation } from "next-i18next";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #fff;
  /* position: -webkit-sticky;
  position: sticky;
  top: 0px; */
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 3;
  justify-content: center;
  /* padding-right: 300px; */
  .bottomline_text {
    max-width: 65%;
    min-width: 45%;
    font-size: 1.8rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
    margin-right: 50px;
    span {
    }
    /* opacity: 0.9; */
  }
  button {
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
  a {
    background: #fcc419;
    color: #000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid #fcc419;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px 0;
    background-size: contain;

    .bottomline_text {
      width: 90%;
      max-width: 90%;
      padding: 0;
      margin: 0;
      margin-bottom: 15px;
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
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
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
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

const Ad = (props) => {
  const [width, setWidth] = useState(0);

  const onResize = (width, height) => {
    setWidth(width);
  };
  const { t } = useTranslation("coursePage");

  let demo_lesson = props.data
    .filter((l) => l.open == true)
    .sort((les) => les.number > les.number)[0];

  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="bottomline_text">
        <span>🖐🏻 {t("demo_lesson_offer")}</span>
      </div>

      <a
        href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
        target="_blank"
        id="bottomline_coursepage_to_demo_lesson"
      >
        {t("start_open_lesson")}
      </a>
    </Banner>
  );
};

export default Ad;
