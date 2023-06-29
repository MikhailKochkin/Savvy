import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useQuery, gql } from "@apollo/client";

import { useTranslation } from "next-i18next";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  justify-content: center;
  margin-bottom: 70px;
  /* padding-right: 300px; */
  .bottomline_text {
    max-width: 95%;
    min-width: 45%;
    font-size: 1.7rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 600;
    padding: 10px;
    margin-right: 50px;
  }
  .more_bottomline_text {
    max-width: 65%;
    min-width: 45%;
    font-size: 1.3rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
    margin-right: 50px;
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
    margin-left: 45px;
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
    /* position: fixed; */
    padding: 10px 0;
    background-size: cover;
    .bottomline_text {
      width: 100%;
      max-width: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    span {
      text-align: center;
      margin-bottom: 10px;
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
      margin: 0;
    }
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Share = (props) => {
  const [width, setWidth] = useState(0);
  const { t } = useTranslation("coursePage");
  const onResize = (width, height) => {
    setWidth(width);
  };

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText("http://bit.ly/406dRHE");
      alert("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <Banner>
      <Container>
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
        <div className="bottomline_text">
          <span>
            Поддержите нас. Отправьте ссылку на этот бот в чат своих друзей
          </span>
          <button
            onClick={(e) => {
              copyContent();
              //   alert("Ссылка скопирована");
            }}
          >
            Скопировать ссылку
          </button>
        </div>
      </Container>
    </Banner>
  );
};

export default Share;
