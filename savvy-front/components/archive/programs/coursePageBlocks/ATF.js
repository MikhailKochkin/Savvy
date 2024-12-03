import { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";

const BigImage = styled.div`
  width: 100vw;
  min-height: 90vh;
  /* background: linear-gradient(110deg, #fff 75%, #fce969 75%); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/static/pattern6.svg");
  background-size: contain;
  @media (max-width: 800px) {
    padding: 50px 0;
    background-size: cover;
  }
`;

const InfoBlock = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100%;
  min-height: 100%;
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
  align-items: flex-start;
  .reviews {
    color: #4b5563;
    font-weight: 500;
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 4.8rem;
    line-height: 1.2;
    text-align: left;
    font-weight: 800;
    margin: 40px 0;
    max-width: 1100px;
    color: #252f3f;
    span {
      background: #fce969;
      display: inline-block;
      transform: skew(-8deg);
      /* -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg); */
    }
  }
  .description {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 40px;
    .text {
      font-size: 2rem;
      font-weight: 500;
      line-height: 1.4;
      text-align: left;
      width: 65%;
      color: #4b5563;
      div {
        margin: 10px 0;
      }
    }
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  @media (max-width: 800px) {
    width: 90%;
    .description {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }
    h1 {
      font-size: 3.6rem;
      line-height: 1.4;
    }
    h2 {
      font-size: 2rem;
      width: 100%;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  .button_group {
    div {
      font-size: 1.6rem;
      margin-top: 10px;
      text-align: center;
    }
  }
  #syl_button {
    width: 25%;
    height: 50px;
    font-size: 2rem;
    font-family: Montserrat;
    background-color: #dedede;
    border: 1px solid #dedede;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    margin-left: 50px;

    &:hover {
      background: #c2c2c2;
    }
  }
  #buy_button {
    width: 420px;
    background: #175ffe;
    color: #fff;
    border-radius: 5px;
    border: none;
    height: 50px;
    font-size: 2rem;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.3s;
    margin-top: 10px;
    &:hover {
      background: #0135a9;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    .button_group {
      width: 90%;
      div {
        width: 100%;
        text-align: center;
      }
    }
    #syl_button {
      width: 100%;
      margin-bottom: 20px;
    }
    #buy_button {
      width: 100%;
      margin-left: 0;
      height: 70px;
    }
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .discount {
    /* background-image: url("/static/badge_star.svg"); */
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    img {
      position: absolute;
      width: 150px;
      height: 150px;
      z-index: 0;
    }
    .number {
      font-size: 2.6rem;
      font-weight: 700;
      z-index: 1;
    }
    .deadline {
      z-index: 1;
    }
    font-size: 1.6rem;
  }
  #clock {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .clock_section {
      width: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      /* width: 100px; */
      .clock_time {
        font-size: 2rem;
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
    .discount {
      .number {
        font-size: 2.6rem;
      }
      font-size: 1.3rem;
      img {
        width: 130px;
        height: 130px;
      }
    }
    #clock {
      width: 100vw;
      .clock_section {
        width: 25%;
      }
    }
  }
`;

const ATF = (props) => {
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
    var my_element = document.getElementById("reviews");
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
        <InfoBlock>
          <Container>
            <div className="reviews">
              <div>
                {_.times(5, (i) => (
                  <img src="./static/simple_star.svg" />
                ))}
              </div>
              <div>
                {d.rating} / 5 Рейтинг курса |{" "}
                <span onClick={(e) => slide()}>Смотреть отзывы</span>
              </div>
            </div>
            <h1>{parse(d.header)}</h1>
            <div className="description">
              <div className="text">{parse(d.subheader)}</div>
              {/* <TimeLeft>
                <div className="discount">
                  <img src="static/badge_star.svg" />
                  <div className="number">-{d.discount}%</div>
                  <div className="deadline">до {d.next_date}</div>
                </div> 
              </TimeLeft>*/}
            </div>
          </Container>
          <Buttons>
            <div className="button_group">
              <button id="buy_button" onClick={(e) => slide2()}>
                Получить первый урок
              </button>
              <div>
                и начать учиться с <b>677 студентами</b>
              </div>
            </div>
            {/* <button id="syl_button" onClick={(e) => slide()}>
              Смотреть Программу
            </button> */}
            {/* <TimeLeft>
              <div className="discount">
                <div className="number">-24%</div>
                <div>до 5 ноября</div>
              </div>
              {/* <div id="clock">
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
                </div> */}
            {/* <div className="clock_section">
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
                </div> */}
            {/* </div> */}
            {/* </TimeLeft>  */}
          </Buttons>
        </InfoBlock>
      </BigImage>
    </div>
  );
};

export default ATF;
