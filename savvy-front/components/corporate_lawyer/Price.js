import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 3.6rem;
    font-weight: 500;
    line-height: 1.4;
    width: 80%;
    text-align: center;
    margin-bottom: 50px;
  }
  .conclusion {
    padding: 1% 3%;
    border-radius: 10px;
    color: #fff;
    background: #ff6f59;
    border: none;
    outline: 0;
    cursor: pointer;
    margin-top: 20px;
    font-family: Montserrat;
    width: 350px;
    font-size: 1.8rem;
    transition: 0.3s;
    &:hover {
      background: #e01e00;
    }
  }

  @media (max-width: 800px) {
    height: 100%;
    padding: 50px 0;
    .header {
      font-size: 2.8rem;
      text-align: left;
      margin-bottom: 0px;
    }
    .conclusion {
      text-align: center;
      padding: 3%;
      width: 80%;
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  #full {
    padding-top: 50px;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 300px;
  }
  #discount {
    padding-top: 50px;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 300px;
  }
  .header2 {
    color: #ff6f59;
    font-size: 2.6rem;
    text-align: left;
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
      padding-top: 0px;
    }
    #discount {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      /* margin-top: 25px; */
      padding-top: 0px;

      /* width: 50%; */
    }
    .header2 {
      text-align: left;
      width: 100%;
    }
    .text {
      width: 100%;
    }
  }
`;

const Price = () => {
  const slide = () => {
    var my_element = document.getElementById("C2A");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <div className="header">Варианты участия в программе</div>
      <Options>
        <div id="full">
          <div className="header2">Полная оплата участия</div>
          <div className="text">
            <span className="number">35 000 ₽</span> до 18 апреля <br />
            <span className="number2"> 45 000 ₽ потом</span>
          </div>
          <div className="text">
            {" "}
            или рассрочка <span className="number">6 900 ₽</span> на 6 месяцев
          </div>
        </div>
        <div id="discount">
          <div className="header2">Cтипендии и скидки</div>
          <div className="text">
            Получите скидку <span style={{ fontWeight: 600 }}>до 90%</span> на
            конкурсной основе. Подробнее расскажем на собеседовании. Но
            торопитесь, скидки привязаны к цене курса на данный момент.
          </div>
        </div>
      </Options>
      <button onClick={(e) => slide()} className="conclusion">
        Записаться на собеседование
      </button>
    </Styles>
  );
};

export default Price;
