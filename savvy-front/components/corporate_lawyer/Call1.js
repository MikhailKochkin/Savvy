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
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Block = styled.div`
  height: 70%;
  width: 80%;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2%;
  #block1 {
    flex-basis: 50%;
    font-size: 2.6rem;
    font-weight: 600;
  }
  #block2 {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #additional-info {
      width: 80%;
      margin-bottom: 40px;
    }
    #form {
      width: 80%;
    }
    input {
      width: 100%;
      background: none;
      font-size: 1.8rem;
      border: none;
      font-family: Montserrat;
      outline: 0;
      border-bottom: 1px solid #162b4b;
      padding-bottom: 0.5%;
      cursor: pointer;
      margin-bottom: 40px;
      color: #162b4b;
      &:hover {
        border-bottom: 1px solid #162b4b;
      }
      &:active {
        border-bottom: 1px solid #162b4b;
      }
    }
    button {
      background: #4571c9;
      padding: 10px 15px;
      border-radius: 10px;
      font-size: 1.8rem;
      font-family: Montserrat;
      border: 1px solid #4571c9;
      color: #fff;
      transition: 0.2s ease-in;
      cursor: pointer;
      width: 100%;
      &:hover {
        background: #3157a1;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 50px 0;
    height: 100%;
    width: 100%;
    flex-direction: column;
    #block1 {
      font-size: 2.2rem;
      font-weight: 600;
      width: 90%;
    }
    #block2 {
      width: 90%;
      #additional-info {
        width: 100%;
        margin-bottom: 20px;
        margin-top: 30px;
      }
      #form {
        width: 100%;
      }
    }
  }
`;
const Call1 = () => {
  return (
    <Styles>
      <Block>
        <div id="block1">
          Запишитесь на собеседование с директором программы и получите{" "}
          <span style={{ color: "#FF6F59" }}>персональную консультацию</span>
        </div>
        <div id="block2">
          <div id="additional-info">
            Мы расскажем о программе, о наших преподавателях и подходах, о
            рынке, разберемся в ваших целях и нынешних знаниях.
          </div>
          <div id="form">
            <input placeholder="Имя" />
            <input type="tel" placeholder="Телефон" />
            <input type="email" placeholder="Имейл" />
            <button>Записаться</button>
          </div>
        </div>
      </Block>
    </Styles>
  );
};

export default Call1;
