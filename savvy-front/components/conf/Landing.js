import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useMutation, gql } from "@apollo/client";

import * as EmailValidator from "email-validator";

const CREATE_CONF_USER_MUTATION = gql`
  mutation createConfUser($email: String!, $conf_number: Int!) {
    createConfUser(email: $email, conf_number: $conf_number) {
      id
    }
  }
`;

const Styles = styled.div`
  min-height: 100vh;
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
    top: calc(20% - 1px);
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
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1200px;
`;

const Main = styled.div`
  margin-left: 5%;
  max-width: 1500px;
  #FOMO {
    line-height: 1.4;
    margin-top: 10px;
  }
  @media (max-width: 800px) {
    width: 95%;
    #FOMO {
      margin-bottom: 5%;
    }
  }
`;

const Logo = styled.div`
  margin: 0px 10px 4% 30px;
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
    margin-left: 5%;
    margin-top: 5%;
  }
`;

const Info = styled.div`
  z-index: 2;

  h1 {
    font-size: 7rem;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1;
    font-weight: 600;
    background: -webkit-linear-gradient(90.69deg, #1a75ff, #ff4ecd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-size: 2.8rem;
    font-weight: 300;
    width: 80%;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  .photos {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 90px;
    margin: 20px 0;
    .border1 {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
    img {
      width: 55px;
      height: 55px;
      border-radius: 50px;
      border: 4px solid #999999;
      cursor: pointer;
    }
    #image1 {
      transition: all 0.5s ease-out;
      &:hover {
        border: 4px solid #88ffea;
      }
    }
    #image2 {
      transition: all 0.5s ease-out;
      &:hover {
        border: 4px solid #ff4ecd;
      }
    }
    #image3 {
      transition: all 0.5s ease-out;
      &:hover {
        border: 4px solid #1a75ff;
      }
    }
    #image4 {
      transition: all 0.5s ease-out;
      &:hover {
        border: 4px solid #88ffea;
      }
    }
    #image5 {
      transition: all 0.5s ease-out;
      &:hover {
        border: 4px solid #ff4ecd;
      }
    }
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 4.4rem;
      width: 70%;
      line-height: 1.2;
    }
    h2 {
      font-size: 2rem;
      line-height: 1.4;

      width: 100%;
    }
    .photos {
      flex-wrap: wrap;
      height: auto;
    }
    img {
      margin-bottom: 20px;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 2rem;
  .time {
    border-right: 0.5px solid white;
    padding-right: 20px;
    margin-right: 20px;
  }
  .format {
    padding-right: 20px;
    margin-right: 20px;
  }
  @media (max-width: 800px) {
    font-size: 1.8rem;
    flex-direction: column;

    .time {
      border: none;
      padding-right: 5px;
      margin-right: 5px;
    }
    .format {
      border: none;
      padding-right: 5px;
      margin-right: 5px;
    }
  }
`;

const Form = styled.div`
  background-image: linear-gradient(
    90.69deg,
    #88ffea 13.42%,
    #ff4ecd 42.37%,
    #1a75ff 103.09%
  );
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  width: 520px;
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
    justify-content: center;
    align-items: center;
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
      font-family: Montserrat;
      cursor: pointer;
      &:hover {
        border: 1px solid white;
        background: black;
        color: #fff;
      }
    }
  }
  @media (max-width: 800px) {
    width: 95%;
    .black {
      input {
        width: 95%;
      }
      .button {
        display: none;
      }
    }
  }
`;

const Button = styled.button`
  background: #fff;
  color: black;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 1.6rem;
  width: 95%;
  height: 50px;
  margin-top: 10px;
  font-weight: 400;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  cursor: pointer;
  display: none;
  font-family: Montserrat;

  &:hover {
    border: 1px solid white;
    background: black;
    color: #fff;
  }
  @media (max-width: 800px) {
    display: flex;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 90%;
  #name {
    margin-right: 20px;
  }
  a {
    color: white;
    cursor: pointer;
    transition: ease-in 0.1s;
    &:hover {
      color: #ad61e2;
    }
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Landing = (props) => {
  const [email, setEmail] = useState("");

  const [createConfUser, { data, loading, error }] = useMutation(
    CREATE_CONF_USER_MUTATION
  );

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
          <div>Бесплатная онлайн-конференция BeSavvy</div>
        </Logo>
        <Main>
          <Info>
            <h1>6 ключей к карьере юриста</h1>
            <h2>
              6 спикеров расскажут свои истории о работе и росте в профессии.
              Выберите путь, который максимально подходит именно вам.
            </h2>
            <Details>
              <div className="time">6 октября, 19:00 по Москве</div>
              <div className="format">Онлайн</div>
            </Details>
            <div className="photos">
              <div className="border1">
                <img
                  id="image1"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625647696/%D0%9C%D0%B8%D1%88%D0%B0_1.png"
                  data-tip="Михаил Кочкин из BeSavvy"
                />
              </div>
              <div className="border1">
                <img
                  id="image2"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625647696/photo_2021-05-27_12.48_2.png"
                  data-tip="Ксения Даньшина из CMS"
                />
              </div>
              <div className="border1">
                <img
                  id="image3"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625647696/photo_2021-05-27_12.47_2.png"
                  data-tip="Булат Кулахметов из Зарцын и партнеры"
                />
              </div>
              <div className="border1">
                <img
                  id="image4"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625401367/savvy/%D0%94%D0%B5%D0%BD%D0%B8_4_b3fqg4.png"
                  data-tip="Дени Мурдалов из А2"
                />
              </div>
              <div className="border1">
                <img
                  id="image5"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625647696/%D0%AE%D0%BB%D1%8F3.png"
                  data-tip="Юлия Баймакова из Noerr"
                />
              </div>
              <div className="border1">
                <img
                  id="image3"
                  src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1626079215/%D0%9B%D0%B5%D0%B2_2.png"
                  data-tip="Лев Толстопятов из Clifford Chance"
                />
              </div>
              <div className="border1">
                {/* <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1595848224/%D0%9B%D0%A5_1.png" /> */}
              </div>
              {/* <div className="border1">
                  <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1595848224/%D0%9B%D0%A5_1.png" />
                </div> */}
              <ReactTooltip place="top" type="light" effect="float" />
            </div>
          </Info>
          <Form>
            <div className="black">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />{" "}
              <button
                className="button"
                onClick={async (e) => {
                  e.preventDefault();
                  if (EmailValidator.validate(email)) {
                    const res = await createConfUser({
                      variables: {
                        email: email,
                        conf_number: 1,
                      },
                    });
                    console.log(res);
                    props.change("ticket");
                  } else {
                    alert("Неправильный имейл");
                  }
                }}
              >
                {loading ? "Сохраняем.." : "Получить билет"}
              </button>
            </div>
          </Form>
          {/* <MainButton onClick={() => signIn()}>
            <div className="black">Получить билет</div>
          </MainButton> */}
          <Button
            onClick={async (e) => {
              e.preventDefault();
              if (EmailValidator.validate(email)) {
                const res = await createConfUser({
                  variables: {
                    email: email,
                    number: 1,
                  },
                  refetchQueries: [{ query: CURRENT_USER_QUERY }],
                });
                console.log(res);
                props.change("ticket");
              } else {
                alert("Неправильный имейл");
              }
            }}
          >
            {loading ? "Сохраняем.." : "Получить билет"}
          </Button>
          <div id="FOMO">
            Сразу поделимся еще 5 письмами о юридической карьере
          </div>
        </Main>
      </Window>
      <Footer>
        <div id="name">ООО "БиСэвви"</div>
        <div id="contact">
          <a href="mailto:anastasia@besavvy.app">
            По всем вопросам и предложениям
          </a>
        </div>
      </Footer>
    </Styles>
  );
};

export default Landing;
