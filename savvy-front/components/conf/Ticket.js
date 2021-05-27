import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  background-image: radial-gradient(#8f8f8f 0.4px, transparent 0.4px);
  background-size: 50px 50px;
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
`;

const Main = styled.div`
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
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
`;

const Info = styled.div`
  width: 40%;
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
`;

const TicketForm = styled.div`
  height: 500px;
  width: 400px;
  background-image: linear-gradient(#6aff52, #4dfbfb);
  border-radius: 15px;
`;

const Ticket = () => {
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
            <h1>Вы в деле. Теперь получите свое приглашение. </h1>
            <h2>Добавьте свои данные и получите уникальный билет.</h2>
            <button>Привет</button>
          </Info>
          <TicketForm>test</TicketForm>
        </Main>
      </Window>
    </Styles>
  );
};

export default Ticket;
