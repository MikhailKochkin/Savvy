import { useEffect } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";
import Phone from "./Phone";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  min-height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const Menu = styled.div`
  width: 100%;
  height: 1000px;
  z-index: 1;
  /* margin: 50px 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 25s ease infinite;
  position: absolute;
  bottom: 0;
  top: auto;
  /* left: calc(var(--offsetX) * -1); */
  /* height: var(--gradientHeight); */
  transform-origin: -120% 100%;
  transform: skewY(-12deg);
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Info = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu_bar {
    width: 90%;
    color: #fff;
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    .logo {
      font-size: 2.2rem;
      font-weight: 400;
      margin-right: 20%;
    }
    .nav {
      display: flex;
      width: 100%;
      flex-direction: row;
      font-size: 1.8rem;
      font-weight: 400;
      div {
        margin-right: 10%;
        transition: ease 0.2s;
        &:hover {
          color: #cbcbcb;
          cursor: pointer;
        }
      }
      .enter {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 30px;
        padding: 5px 25px;
        cursor: pointer;
      }
    }
  }
  .container {
    width: 80%;
    display: flex;
    margin-top: 40px;
    flex-direction: row;
    .text {
      h1 {
        font-size: 7rem;
        line-height: 1.2;
        text-align: left;
        font-weight: 700;
        width: 80%;
        opacity: 0.9;
        /* margin-top: 10%; */
        color: #3a3a3a;
        span {
          display: inline-block;
          transform: skew(-6deg);
          background: #fce969;
        }
      }
      div {
        width: 70%;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 1.4;
        color: #3a3a3a;
        margin-bottom: 20px;
      }
    }
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  width: 40%;
  .black {
    text-align: center;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 1.2;
    margin-top: 10px;
  }

  .discount {
    /* background-image: url("/static/badge_star.svg"); */
    width: 150px;
    color: #fff;
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
      font-size: 2.4rem;
      font-weight: 700;
      z-index: 1;
      text-align: center;
    }
    .deadline {
      z-index: 1;
      font-size: 1.4rem;
      text-align: center;
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
  /* @media screen and (max-width: 900px), screen and (max-height: 800px) {
    width: 35%;
    position: absolute;
    right: 100%;
    left: 60%;
  } */
  @media screen and (max-width: 800px) {
    width: 40%;
    position: absolute;
    right: 100%;
    left: 60%;
    top: 10%;
    .black {
      display: none;
      text-align: center;
      font-weight: 600;
      font-size: 1.8rem;
    }

    .discount {
      .number {
        font-size: 2.1rem;
      }
      .deadline {
        font-size: 1.3rem;
      }
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

const Subheader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  .subheader {
    font-size: 2rem;
    line-height: 1.4;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
    font-weight: 400;
    color: #4b5563;
    .row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      margin: 10px 0;
    }
    img {
      width: 25px;
      height: 25px;
    }
    .point {
      margin-left: 15px;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
    margin-top: 10px;
    align-items: flex-start;
    .subheader {
      font-size: 1.8rem;
      width: 90%;
    }
  }
`;

const Block = styled.div`
  width: 75%;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    font-size: 6rem;
    line-height: 1.2;
    text-align: left;
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
    color: #252f3f;
    span {
      display: inline-block;
      transform: skew(-6deg);
      background: #fce969;
    }
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 900px) {
    width: 100%;
    h1 {
      font-size: 4rem;
    }
    .header {
      font-size: 2.4rem;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  button {
    background: #1b65f1;
    color: #fff;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 15px;
    border: none;
    width: 290px;
    padding: 15px 0;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 1.8rem;
    transition: 0.3s;
    &:hover {
      background: #0135a9;
    }

    div {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 1300px) {
    button {
      width: 40%;
    }
  }
  @media (max-width: 900px) {
    button {
      width: 100%;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 80%;
  object-fit: cover;
  text-align: center;
  color: black;
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* border-radius: 10px; */
  width: 80vw;
  padding: 0 12%;
  .text {
    color: white;
    line-height: 1.6;
    font-size: 2.4rem;
  }
  @media (max-width: 800px) {
    .text {
      font-size: 1.8rem;
    }
    padding: 0 5%;
    height: 20vh;
  }
`;

const Landing = (props) => {
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });
  const slide = () => {
    var my_element = document.getElementById("course_search");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Menu></Menu>
      <Info>
        <div className="menu_bar">
          <div className="logo">BeSavvy</div>
          <div className="nav">
            <div>Курсы</div>
            <div>Сообщество</div>
            <div>Личный кабинет</div>
            <div className="enter">Войти</div>
          </div>
        </div>
        <div className="container">
          <div className="text">
            <h1>Мы обучаем юристов практическим навыкам онлайн</h1>
            <div>
              Больше 2500 юристов прошли наши курсы, на которых они занимались
              на онлайн-тренажерах, решали кейсы и участвовали в мастер-классах.
            </div>
            {/* <div>
              А программы мы делаем вместе с юристами из Алруда, Clifford
              Chance,
            </div>{" "} */}
          </div>
          <Phone />
        </div>
      </Info>
      <Block>
        <Text>
          {/* <h1>
            Мы <span>обучаем юристов</span> практическим навыкам онлайн{" "}
          </h1> */}
          {/* <Subheader>
            <div className="subheader">
              <div className="row">
                <img src="/static/tick2.svg" />
                <div className="point">
                  <b>2 500+</b> выпускников платных и бесплатных программ
                </div>
              </div>
              <div className="row">
                <img src="/static/tick2.svg" />
                <div className="point">
                  <b>20+</b> преподавателей-практиков из Noerr, CMS, Clifford
                  Chance, Алруд и других престижных компаний.
                </div>
              </div>

              <div className="row">
                <img src="/static/tick2.svg" />
                <div className="point">
                  <b>4</b> вида симуляторов, позволяющих оттачивать практические
                  навыки онлайн{" "}
                </div>
              </div>
            </div>
          <TimeLeft>
              <div className="discount">
                <img src="static/bstar.svg" />
                <div className="deadline">Бесплатно</div>
                <div className="number">1.12-31.12</div>
              </div>
              <div className="black">
                Бесплатные
                <br /> интенсивы
              </div>
            </TimeLeft> 
          //</Subheader>*/}
          <Buttons>
            <button onClick={(e) => slide()}>Выбрать программу</button>
          </Buttons>
        </Text>
      </Block>
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
