import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

const BigImage = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100vw;
  height: 90vh;
  position: relative;
  background: #23074d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #cc5333,
    #23074d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cc5333,
    #23074d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  img {
    object-fit: cover;
    filter: brightness(40%);
  }
`;

const InfoBlock = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 80%;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  h1 {
    font-weight: 400;
    font-size: 6rem;
    text-align: center;
    line-height: 1.2;
    margin: 0;
    margin-bottom: 20px;
  }
  h2 {
    font-weight: 300;
    font-size: 2.6rem;
    text-align: center;
    line-height: 1.4;
    margin: 0;
  }
  @media (max-width: 800px) {
    width: 90%;

    h1 {
      font-size: 3.6rem;
      line-height: 1.4;
    }
    h2 {
      font-size: 2rem;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  #syl_button {
    width: 40%;
    height: 50px;
    font-size: 2rem;
    font-family: Montserrat;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #dedede;
    }
  }
  #buy_button {
    width: 40%;
    margin-left: 50px;
    height: 50px;
    font-size: 2rem;
    color: #000000;
    font-family: Montserrat;
    background-color: #d7690b;
    border: 1px solid #d7690b;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #b85a0a;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #syl_button {
      width: 100%;
      margin-bottom: 20px;
    }
    #buy_button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #clock {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .clock_section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 300px;
      .clock_time {
        font-size: 3rem;
        font-weight: 600;
      }
      .clock_name {
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #clock {
      width: 100%;
    }
  }
`;

const Headline = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const d = props.data;
  useEffect(() => {
    const interval = setInterval(() => {
      var countDownDate = new Date(d.start_eng).getTime(); // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days_calculation = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours_calculation = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes_calculation = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds_calculation = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      setDays(days_calculation);
      setHours(hours_calculation);
      setMinutes(minutes_calculation);
      setSeconds(seconds_calculation);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };

  const slide = () => {
    var my_element = document.getElementById("syllabus");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const slide2 = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <div>
      <BigImage>
        <Image src={d.image} layout="fill" />
        <InfoBlock>
          <Container>
            <h1>{d.header}</h1>
            <h2>{d.subheader}</h2>
            <Buttons>
              <button id="syl_button" onClick={(e) => slide()}>
                Смотреть Программу
              </button>
              <button id="buy_button" onClick={(e) => slide2()}>
                Начать учиться бесплатно
              </button>
            </Buttons>
            <TimeLeft>
              <div id="clock">
                <div className="clock_section">
                  <div className="clock_time">{days}</div>
                  <div className="clock_name">
                    {getNoun(days, "день", "дня", "дней")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{hours}</div>
                  <div className="clock_name">
                    {getNoun(hours, "час", "часа", "часов")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{minutes}</div>
                  <div className="clock_name">
                    {" "}
                    {getNoun(minutes, "минута", "минуты", "минут")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{seconds}</div>
                  <div className="clock_name">
                    {" "}
                    {getNoun(seconds, "секунда", "секунды", "секунд")}
                  </div>
                </div>
              </div>
            </TimeLeft>
          </Container>
        </InfoBlock>
      </BigImage>
    </div>
  );
};

export default Headline;
