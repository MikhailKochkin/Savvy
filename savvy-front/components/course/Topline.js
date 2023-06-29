import React, { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  /* position: -webkit-sticky;
  position: sticky; */
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  justify-content: center;
  /* padding-right: 300px; */
  .bottomline_text {
    /* max-width: 95%;
    min-width: 45%; */
    font-size: 1.6rem;
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
    width: 250px;
    min-width:
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    text-align: center;
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
    /* position: -webkit-sticky;
    position: sticky; */
    top: 0px;
    padding: 10px 0;
    background-size: cover;
    .bottomline_text {
      width: 60%;
      padding: 0;
      margin: 0;
      font-size: 1.4rem;
      /* margin-bottom: 10px; */
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
      text-align: center;
    }
  }
`;

const Button = styled.div`
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
  @media (max-width: 800px) {
    width: 120px;
    font-size: 1.3rem;
    text-align: center;
    line-height: 1.2;
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: row;
    width: 95%;
    justify-content: space-between;
  }
`;

const Ad = (props) => {
  const { t } = useTranslation("course");

  return (
    <Banner>
      <Container>
        <div className="bottomline_text">
          <span>🎁 {t("full_course")}</span>
        </div>
        <Button>
          <Link
            href={{
              pathname: "/coursePage",
              query: { id: props.id },
            }}
          >
            {t("buy_full")}
          </Link>
        </Button>
      </Container>
    </Banner>
  );
};

export default Ad;
