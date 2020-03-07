import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Banner = styled.div`
  width: 100%;
  height: 8vh;
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
    flex-basis: 60%;
    @media (max-width: 1380px) {
      font-size: 1.8rem;
    }
    @media (max-width: 1210px) {
      font-size: 1.6rem;
    }
    @media (max-width: 1040px) {
      font-size: 1.8rem;
      text-align: center;
      padding: 0 5px;
    }
  }
  .discount {
    font-size: 3.6rem;
    flex-basis: 15%;
    @media (max-width: 1210px) {
      font-size: 2.8rem;
      text-align: center;
    }
  }
  .time {
    font-size: 3rem;
    flex-basis: 25%;
    @media (max-width: 1210px) {
      font-size: 2.4rem;
    }
  }
`;

const calculateTimeLeft = () => {
  moment.locale("ru");
  let now = moment(new Date());
  let then = new Date("2020-03-10 06:00:00");
  const difference = then - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = [
      Math.floor(difference / (1000 * 60 * 60 * 24)),
      String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      String(Math.floor((difference / 1000) % 60)).padStart(2, "0")
    ];
  }

  return timeLeft;
};

const Ad = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  let day;
  if (timeLeft[0] > 1) {
    day = "дня";
  } else if (timeLeft[0] === 1) {
    day = "день";
  } else if (timeLeft[0] === 0) {
    day = "дней";
  }
  return (
    <Banner>
      <div className="name">
        🇬🇧 Весенние скидки на все курсы по юридическому английскому!
      </div>
      <div className="discount">20%</div>
      <div className="time">
        {timeLeft.length ? (
          `${timeLeft[0]} ${day} ${timeLeft[1]}:${timeLeft[2]}:${timeLeft[3]} `
        ) : (
          <span>Время вышло! Уберем скидку в течение нескольких часов!</span>
        )}
      </div>
    </Banner>
  );
};

export default Ad;
