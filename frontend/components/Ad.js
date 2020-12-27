import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  height: 10vh;
  background: #1488cc; /* fallback for old browsers */
  color: white;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 1040px) {
    /* display: none; */
    flex-direction: column;
    height: auto;
  }
  .name {
    padding-left: 40px;
    font-size: 2rem;
    flex-basis: 50%;
    @media (max-width: 1380px) {
      font-size: 1.8rem;
    }
    @media (max-width: 1210px) {
      font-size: 1.6rem;
    }
    @media (max-width: 1040px) {
      font-size: 1.6rem;
      text-align: center;
      padding: 0 5px;
      margin-bottom: 10px;
    }
  }
  .discount {
    font-size: 1.7rem;
    flex-basis: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    a {
      background: #ff6b35;
      color: white;
      border-radius: 5px;
      padding: 1% 5%;
      cursor: pointer;
      &:hover {
        background: #cc5803;
      }
    }
    @media (max-width: 1210px) {
      font-size: 1.7rem;
      text-align: center;
      width: 30%;
    }
    @media (max-width: 800px) {
      font-size: 1.7rem;
      text-align: center;
      width: 60%;
      margin-bottom: 10px;
    }
  }
  .time {
    font-size: 2.6rem;
    flex-basis: 25%;
    @media (max-width: 1210px) {
      font-size: 2.4rem;
    }
    @media (max-width: 800px) {
      font-size: 2rem;
    }
    div {
      font-size: 1.8rem;
      line-height: 1.5;
    }
  }
`;

const calculateTimeLeft = () => {
  moment.locale("ru");
  let now = moment(new Date());
  let then = new Date("04/20/2020 6:00:00");
  const difference = then - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = [
      Math.floor(difference / (1000 * 60 * 60 * 24)),
      String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    ];
  }

  return timeLeft;
};

const Ad = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [width, setWidth] = useState(0);
  const onResize = (width) => {
    setWidth(width);
  };
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  let day;
  if (timeLeft[0] >= 5) {
    day = "дней";
  } else if (timeLeft[0] > 1 && timeLeft[0] < 5) {
    day = "дня";
  } else if (timeLeft[0] === 1) {
    day = "день";
  } else if (timeLeft[0] === 0) {
    day = "дней";
  }
  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="name">
        📊 Запускаем поток по базовой грамматике для legal writing!
      </div>
      <div className="discount">
        <Link
          href={{
            pathname: "/coursePage",
            query: { id: "cjwaz2l0300dc0729d02opkzb" },
          }}
        >
          <a>Узнать больше</a>
        </Link>
      </div>
      <div className="time">
        <>
          {timeLeft.length ? (
            `${timeLeft[0]} ${day} ${timeLeft[1]}:${timeLeft[2]}:${timeLeft[3]} `
          ) : (
            <div>Время вышло! Уберем скидку в течение нескольких часов!</div>
          )}
        </>
      </div>
    </Banner>
  );
};

export default Ad;
