import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity: 1;
  background-image: radial-gradient(
    #414141 0.8500000000000001px,
    #000000 0.8500000000000001px
  );
  background-size: 17px 17px;
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
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1200px;
`;

const Main = styled.div`
  margin-left: 5%;
  max-width: 1500px;
`;

const Logo = styled.div`
  margin: 30px 10px 8% 30px;
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
  }
`;

const Info = styled.div`
  h1 {
    font-size: 7.4rem;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1;
    font-weight: 600;
  }
  h2 {
    font-size: 4.2rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 15px;
    line-height: 1.2;
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 4.6rem;
      width: 70%;
      line-height: 1.2;
    }
    h2 {
      font-size: 3.2rem;
      line-height: 1.4;

      width: 70%;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 2rem;
  margin-bottom: 50px;
  .time {
    border-right: 0.5px solid white;
    padding-right: 20px;
    margin-right: 20px;
  }
  .format {
    border-right: 0.5px solid white;
    padding-right: 20px;
    margin-right: 20px;
  }
  .photos {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .border1 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(196, 196, 196, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50px;
      border: 2px solid black;
    }
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
    .photos {
      display: none;
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
  width: 550px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .black {
    background: black;
    color: #8b8b8b;
    padding: 0 5px 0 20px;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    font-weight: 300;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    input {
      width: 65%;
      background: black;
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
      width: 30%;
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

const Button = styled.div`
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
  &:hover {
    border: 1px solid white;
    background: black;
    color: #fff;
  }
  @media (max-width: 800px) {
    display: flex;
  }
`;

const Landing = (props) => {
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
            <h1>Подготовка и карьера юриста</h1>
            <h2>Быстрее, эффективнее, результативнее</h2>
            <Details>
              <div className="time">6 октября, 19:00 по Москве</div>
              <div className="format">Онлайн</div>
              <div className="photos">
                <div className="border1">
                  <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1595848224/%D0%9B%D0%A5_1.png" />
                </div>
                <div className="border1">
                  <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1595848224/%D0%9B%D0%A5_1.png" />
                </div>
                <div className="border1">
                  <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1595848224/%D0%9B%D0%A5_1.png" />
                </div>
              </div>
            </Details>
          </Info>
          <Form>
            <div className="black">
              <input placeholder="Напишите вашу почту.." />
              <div className="button" onClick={(e) => props.change("ticket")}>
                Получить билет
              </div>
            </div>
          </Form>
          <Button onClick={(e) => props.change("ticket")}>
            Получить билет
          </Button>
        </Main>
      </Window>
    </Styles>
  );
};

export default Landing;
