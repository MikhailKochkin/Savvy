import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  padding: 40px 0;
  width: 100vw;
  background: radial-gradient(
    ellipse at bottom,
    #1b2735 0%,
    #090a0f 100%
  ); /* opacity: 1;
  background-image: radial-gradient(
    #414141 0.8500000000000001px,
    #000000 0.8500000000000001px
  );
  background-size: 17px 17px;*/
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 1;
  z-index: 0;

  .night {
    position: absolute;
    width: 100%;
    z-index: -1;
    height: 50%;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  .shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
    border-radius: 999px;
    -webkit-filter: drop-shadow(0 0 6px #699bff);
    filter: drop-shadow(0 0 6px #699bff);
    -webkit-animation: tail 3000ms ease-in-out infinite,
      shooting 3000ms ease-in-out infinite;
    animation: tail 3000ms ease-in-out infinite,
      shooting 3000ms ease-in-out infinite;
  }
  .shooting_star::before,
  .shooting_star::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      #5f91ff,
      rgba(0, 0, 255, 0)
    );
    -webkit-transform: translateX(50%) rotateZ(45deg);
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    -webkit-animation: shining 3000ms ease-in-out infinite;
    animation: shining 3000ms ease-in-out infinite;
  }
  .shooting_star::after {
    -webkit-transform: translateX(50%) rotateZ(-45deg);
    transform: translateX(50%) rotateZ(-45deg);
  }
  .shooting_star:nth-child(1) {
    top: calc(50% - -119px);
    left: calc(50% - 43px);
    -webkit-animation-delay: 4796ms;
    animation-delay: 4796ms;
  }
  .shooting_star:nth-child(1)::before,
  .shooting_star:nth-child(1)::after {
    -webkit-animation-delay: 4796ms;
    animation-delay: 4796ms;
  }
  .shooting_star:nth-child(2) {
    top: calc(50% - -43px);
    left: calc(50% - 37px);
    -webkit-animation-delay: 5944ms;
    animation-delay: 5944ms;
  }
  .shooting_star:nth-child(2)::before,
  .shooting_star:nth-child(2)::after {
    -webkit-animation-delay: 5944ms;
    animation-delay: 5944ms;
  }
  .shooting_star:nth-child(3) {
    top: calc(50% - -40px);
    left: calc(50% - 222px);
    -webkit-animation-delay: 7556ms;
    animation-delay: 7556ms;
  }
  .shooting_star:nth-child(3)::before,
  .shooting_star:nth-child(3)::after {
    -webkit-animation-delay: 7556ms;
    animation-delay: 7556ms;
  }
  .shooting_star:nth-child(4) {
    top: calc(50% - -29px);
    left: calc(50% - 113px);
    -webkit-animation-delay: 7123ms;
    animation-delay: 7123ms;
  }
  .shooting_star:nth-child(4)::before,
  .shooting_star:nth-child(4)::after {
    -webkit-animation-delay: 7123ms;
    animation-delay: 7123ms;
  }
  .shooting_star:nth-child(5) {
    top: calc(50% - 146px);
    left: calc(50% - 112px);
    -webkit-animation-delay: 3629ms;
    animation-delay: 3629ms;
  }
  .shooting_star:nth-child(5)::before,
  .shooting_star:nth-child(5)::after {
    -webkit-animation-delay: 3629ms;
    animation-delay: 3629ms;
  }
  .shooting_star:nth-child(6) {
    top: calc(50% - -108px);
    left: calc(50% - 160px);
    -webkit-animation-delay: 3895ms;
    animation-delay: 3895ms;
  }
  .shooting_star:nth-child(6)::before,
  .shooting_star:nth-child(6)::after {
    -webkit-animation-delay: 3895ms;
    animation-delay: 3895ms;
  }
  .shooting_star:nth-child(7) {
    top: calc(50% - 52px);
    left: calc(50% - 72px);
    -webkit-animation-delay: 7326ms;
    animation-delay: 7326ms;
  }
  .shooting_star:nth-child(7)::before,
  .shooting_star:nth-child(7)::after {
    -webkit-animation-delay: 7326ms;
    animation-delay: 7326ms;
  }
  .shooting_star:nth-child(8) {
    top: calc(50% - 55px);
    left: calc(50% - 282px);
    -webkit-animation-delay: 956ms;
    animation-delay: 956ms;
  }
  .shooting_star:nth-child(8)::before,
  .shooting_star:nth-child(8)::after {
    -webkit-animation-delay: 956ms;
    animation-delay: 956ms;
  }
  .shooting_star:nth-child(9) {
    top: calc(50% - 129px);
    left: calc(50% - 296px);
    -webkit-animation-delay: 5030ms;
    animation-delay: 5030ms;
  }
  .shooting_star:nth-child(9)::before,
  .shooting_star:nth-child(9)::after {
    -webkit-animation-delay: 5030ms;
    animation-delay: 5030ms;
  }
  .shooting_star:nth-child(10) {
    top: calc(50% - 131px);
    left: calc(50% - 249px);
    -webkit-animation-delay: 1150ms;
    animation-delay: 1150ms;
  }
  .shooting_star:nth-child(10)::before,
  .shooting_star:nth-child(10)::after {
    -webkit-animation-delay: 1150ms;
    animation-delay: 1150ms;
  }
  @-webkit-keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
  @keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start;
  align-items: flex-start; */
  max-width: 1300px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  #image_comment {
    text-align: center;
  }
  .block3 {
    width: 35%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .block3 {
      width: 100%;
    }
  }
`;

const Logo = styled.div`
  margin: 30px 10px 5% 30px;
  font-size: 2.2rem;
  font-weight: 300;
  div {
    line-height: 1.4;
  }
  span {
    color: #f6d288;
    font-weight: 700;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Info = styled.div`
  width: 40%;
  /* margin-right: 10%; */
  padding-left: 40px;
  h1 {
    font-size: 3.2rem;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1.5;
    font-weight: 600;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    width: 95%;

    h1 {
      font-size: 2.8rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
`;

const T = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s;
  flex-basis: 50%;
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
  }
`;

const Circle = styled.div`
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: 110px;
  top: -20px;
  z-index: 1;
  border: 4px solid #d25778;
`;

const TicketForm = styled.div`
  height: 450px;
  width: 270px;
  background: linear-gradient(#d25778, #ec585c, #e7d155, #56a8c6);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TickertInner = styled.div`
  height: 98%;
  width: 97%;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .personal_data {
    width: 80%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    .image {
      flex-basis: 40%;

      img {
        width: 65px;
        height: 65px;
        background: grey;
        border-radius: 50%;
      }
    }
    .names {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .logo {
    margin-top: 40px;
    font-size: 2.4rem;
    span {
      color: #f6d288;
      font-weight: 500;
    }
  }
  .details {
    width: 90%;
    text-align: center;
    font-size: 1.8rem;
    a {
      color: #fff;
      cursor: pointer;
    }
  }
  .date {
    margin-top: 30px;
    font-size: 1.5rem;
    /* width: 85%; */
    display: flex;
    flex-direction: row;
    #left_date {
      border-right: 1px solid white;
      padding-right: 10px;
      margin-right: 10px;
    }
  }
  .number {
    border-top: 1px dashed white;
    width: 100%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 115px;
    font-size: 3rem;
  }
`;

const Form = styled.div`
  background-image: linear-gradient(
    90.69deg,
    #d25778,
    #ec585c,
    #e7d155,
    #56a8c6
  );
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  width: 350px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
  }
  .black {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    padding: 0 5px 0 20px;
    width: 100%;
    height: 100%;
    border: none;
    color: #fff;
    font-family: Montserrat;
    outline: none;
    font-size: 2rem;
    font-weight: 300;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    .image_upload {
      display: none;
    }
    input {
      width: 65%;
      background: transparent;
      outline: none;
      height: 60%;
      color: #fff;
      font-family: Montserrat;
      font-size: 2rem;
      border: none;
      ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #8b8b8b;
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #8b8b8b;
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #8b8b8b;
      }
    }
    .button {
      background: #fff;
      color: black;
      border: 1px solid black;
      border-radius: 8px;
      font-size: 1.6rem;
      /* width: 30%; */
      flex-basis: 40%;
      height: 80%;
      display: flex;
      font-weight: 300;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        border: 1px solid white;
        background: black;
        color: #fff;
      }
    }
  }
  @media (max-width: 800px) {
    width: 270px;
    .black {
      input {
        width: 95%;
      }
      .button {
        display: none;
      }
      label {
        font-size: 1.6rem;
      }
    }
  }
`;

const Ticket = (props) => {
  const [name, setName] = useState("Имя");
  const [surname, setSurname] = useState("Фамилия");
  const [image, setImage] = useState(
    "https://res.cloudinary.com/mkpictureonlinebase/image/upload/c_scale,w_25/v1622816374/face.svg"
  );
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 10000));
  }, []);

  const rotate = (e) => {
    let el = document.getElementById("element");
    const { x, y, width, height } = el.getBoundingClientRect();
    const centerPoint = { x: x + width / 2, y: y + height / 2 };
    // console.log(centerPoint);
    const degreeX = (e.clientX - centerPoint.x) * 0.4;
    const degreeY = (e.clientY - centerPoint.y) * -0.4;
    // console.log(degreeX, degreeY);
    el.style.transform = `perspective(800px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
  };

  const rotate0 = (e) => {
    let el = document.getElementById("element");
    const { x, y, width, height } = el.getBoundingClientRect();
    const centerPoint = { x: x + width / 2, y: y + height / 2 };
    // console.log(centerPoint);
    const degreeX = (e.clientX - centerPoint.x) * 0;
    const degreeY = (e.clientY - centerPoint.y) * 0;
    // console.log(degreeX, degreeY);
    el.style.transform = `perspective(800px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
  };

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Styles>
      <div class="night">
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
      </div>
      <Window>
        <Logo>
          {/* <div>
            <div>Бесплатная онлайн-конференция BeSavvy</div>
          </div> */}
        </Logo>
        <Main>
          <Info>
            <h1>Что это? Где я оказался?</h1>
            <h2>
              Это твой подарочный сертификат на один из курсов BeSavvy.
              <br />
              <br /> Напиши нам в любой из социальных сетей (список есть внизу
              этой страницы), пришли ссылку на этот сертификат и мы откроем
              доступ.
            </h2>
          </Info>
          <T
            id="element"
            onMouseMove={(e) => rotate(e)}
            onMouseLeave={(e) => rotate0(e)}
          >
            <TicketForm>
              <TickertInner>
                <Circle></Circle>
                <div className="personal_data">
                  <div className="image">
                    <img src={props.data.img} />
                  </div>
                  <div className="names">
                    <div> {props.data.name}</div>
                    <div> {props.data.surname}</div>
                  </div>
                </div>
                <div className="logo">
                  BeSavvy <span>Lawyer</span>
                </div>
                <div className="details">
                  <a
                    target="_blank"
                    href="https://besavvy.app/ru/coursePage?id=cknu5zekc112311g1emrinm7io"
                  >
                    {props.data.course}
                  </a>
                </div>
                <div className="date">
                  <div id="left_date">Старт в любой день</div>
                  <div>Онлайн</div>
                </div>
                <div className="number">{"#00" + props.data.num}</div>
              </TickertInner>
            </TicketForm>
          </T>
          {/* <div className="block3">
            <Form>
              <div className="black">
                <input
                  placeholder="Имя"
                  onChange={(e) => setName(e.target.value)}
                />{" "}
              </div>
            </Form>
            <Form>
              <div className="black">
                <input
                  placeholder="Фамилия"
                  onChange={(e) => setSurname(e.target.value)}
                />{" "}
              </div>
            </Form>
            <Form>
              <div className="black">
                
                <label>
                  <input
                    className="image_upload"
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Загрузите свою фотографию..."
                    onChange={(e) => uploadFile(e)}
                  />
                  Загрузи фото 😊
                </label>
              </div>
            </Form>
            <div id="image_comment">
              Рекомендуем взять квадратную фотографию или заранее ее обрезать
            </div>
          </div> */}
        </Main>
      </Window>
    </Styles>
  );
};

export default Ticket;
