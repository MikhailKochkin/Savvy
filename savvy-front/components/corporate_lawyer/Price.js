import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 1.4;
    width: 80%;
    text-align: center;
    margin-bottom: 50px;
  }
  .conclusion {
    margin-top: 40px;
    font-size: 1.8rem;
    cursor: pointer;
    border-bottom: 2px solid black;
    display: inline-block;
    max-width: 300px;
  }

  @media (max-width: 800px) {
    height: 100%;
    padding: 50px 0;
    .header {
      font-size: 2.8rem;
      text-align: left;
    }
    .conclusion {
      text-align: left;
      border-bottom: 1px solid black;
      display: inline-block;
      max-width: 300px;
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  #full {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #discount {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .header2 {
    color: #ff6f59;
    font-size: 2.6rem;
    text-align: center;
    font-weight: 600;
    width: 70%;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  .text {
    width: 70%;
    font-size: 1.8rem;
  }
  .number {
    font-size: 2.4rem;
    font-weight: 600;
    display: inline-block;
  }
  .number2 {
    color: grey;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 80%;
    #full {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    #discount {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-top: 25px;
    }
    .header2 {
      text-align: left;
    }
    .text {
      width: 90%;
    }
  }
`;

const Price = () => {
  return (
    <Styles>
      <div className="header">Варианты участия в программе</div>
      <Options>
        <div id="full">
          <div className="header2">Полная оплата участия</div>
          <div className="text">
            <span className="number">30 000 ₽</span> до 1 апреля <br />
            <span className="number2"> 45 000 ₽ потом</span>
          </div>
          <div className="text">
            {" "}
            или рассрочка <span className="number">3 750 ₽</span> на 12 месяцев
          </div>
        </div>
        <div id="discount">
          <div className="header2">Cтипендии и скидки</div>
          <div className="text">
            Получение скидки до 70% и стипендии до 100% на конкурсной основе.
            Расскажем на собеседовании, как их получить.
          </div>
        </div>
      </Options>
      <span className="conclusion">Записаться на собеседование</span>
    </Styles>
  );
};

export default Price;
