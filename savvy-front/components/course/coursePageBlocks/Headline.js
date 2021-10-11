import { useState, useEffect } from "react";
import styled from "styled-components";
// import Image from "next/image";
import renderHTML from "react-render-html";

const BImage = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100vw;
  min-height: 80vh;
  position: relative;
  img {
    object-fit: cover;
    filter: brightness(40%);
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const InfoBlock = styled.div`
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
  width: 70%;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 6rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
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
  h2 {
    font-size: 2.2rem;
    line-height: 1.4;
    text-align: center;
    width: 75%;
    font-weight: 400;
    color: #4b5563;
  }
  @media (max-width: 800px) {
    width: 90%;

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
  width: 65%;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  #syl_button {
    width: 45%;
    height: 50px;
    font-size: 2rem;
    font-family: Montserrat;
    background-color: #dedede;
    border: 1px solid #dedede;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #c2c2c2;
    }
  }
  #buy_button {
    width: 45%;
    margin-left: 50px;
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
    &:hover {
      background: #0135a9;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
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
      width: 100vw;
      .clock_section {
        width: 25%;
      }
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
      <BImage>
        {/* <Image src={`/static/${d.image}`} layout="fill" /> */}
        <InfoBlock>
          <Container>
            <h1>{renderHTML(d.header)}</h1>
            <h2>{d.subheader}</h2>
            <Buttons>
              <button id="syl_button" onClick={(e) => slide()}>
                Смотреть Программу
              </button>
              <button id="buy_button" onClick={(e) => slide2()}>
                Начать учиться
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
      </BImage>
    </div>
  );
};

export default Headline;
