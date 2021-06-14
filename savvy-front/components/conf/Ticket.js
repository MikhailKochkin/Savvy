import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { signIn, useSession } from "next-auth/client";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity: 1;
  background-image: radial-gradient(#212121 1px, #000000 1px);
  background-size: 20px 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1200px;
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
`;

const Info = styled.div`
  width: 40%;
  margin-right: 10%;
  h1 {
    font-size: 4rem;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1.5;
    font-weight: 600;
  }
  h2 {
    font-size: 3rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 15px;
  }
`;

const T = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s;
  .black {
    width: 270px;
    height: 20px;
    background: black;
    z-index: 4;
  }
`;

const Circle = styled.div`
  background: blue;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: 110px;
  top: -20px;
  z-index: 1;
  background: black;
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
  background: black;
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
        width: 55px;
        height: 55px;
        background: grey;
        border-radius: 50%;
      }
    }
    .names {
      flex-basis: 50%;
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
    margin-top: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30%;
    font-size: 3rem;
  }
`;

const Ticket = (props) => {
  const [name, setName] = useState("Имя");
  const [surname, setSurname] = useState("Фамилия");
  const [image, setImage] = useState(
    "https://res.cloudinary.com/mkpictureonlinebase/image/upload/c_scale,w_25/v1622816374/face.svg"
  );
  const [step, setStep] = useState(1);

  useEffect(() => {});

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

  const responseGoogle = (response) => {
    console.log(response.At.fT);
    setName(response.At.kV);
    setSurname(response.At.fT);
    setImage(response.At.ZJ);
    setStep(2);
  };
  console.log(props.session.user);
  const user = props.session.user;
  return (
    <Styles>
      <Window>
        <Logo>
          <div>
            Онлайн-конференция <br /> BeSavvy <span>Conf</span>
          </div>
        </Logo>
        <Main>
          <Info>
            <h1>Вы в деле. Теперь расскажите остальным.</h1>
            <h2>Поделитесь своим билетом в социальных сетях.</h2>
          </Info>
          <T
            id="element"
            onMouseMove={(e) => rotate(e)}
            onMouseLeave={(e) => rotate0(e)}
          >
            <div className="black"></div>
            <TicketForm>
              <TickertInner>
                <Circle></Circle>
                <div className="personal_data">
                  <div className="image">
                    <img src={user.image} />
                  </div>
                  <div className="names">
                    <div>{user.name}</div>
                    {/* <div>{surname}</div> */}
                  </div>
                </div>
                <div className="logo">
                  BeSavvy <span>Conf</span>
                </div>
                <div className="date">
                  <div id="left_date">6 октября, 19:00</div>
                  <div>Онлайн</div>
                </div>
                <div className="number">#003730</div>
              </TickertInner>
            </TicketForm>
          </T>
        </Main>
      </Window>
    </Styles>
  );
};

export default Ticket;
