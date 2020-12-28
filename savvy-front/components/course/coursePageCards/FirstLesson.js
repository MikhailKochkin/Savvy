import React, { Component } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";
import EnrollCoursePage from "../../EnrollCoursePage";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 290px;
  /* padding: 2% 4%; */
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  padding-bottom: 4%;
  padding-top: 4%;
  line-height: 1.4;
  border-radius: 10px 10px 0 0;
  background: rgba(36, 101, 255, 0.1);
  margin: 0;
  text-align: center;
  /* color: #112b62; */
`;

const Text = styled.div`
  margin: 4% 4%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
`;

const Part1 = styled.div`
  line-height: 1.6;
  font-size: 1.4rem;
  .Title {
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const Part2 = styled.div``;

const Button = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 100%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

const RegisterCard = () => {
  return (
    <>
      <Payment>
        <Header>🔓 Открытый урок</Header>
        <Text>
          <Part1>
            <div className="Title">Урок 1. Основные источники права</div>
            <div>
              По своей сути рыбатекст является альтернативой традиционному lorem
              ipsum, который вызывает у некторых людей недоумение при попытках
              прочитать рыбу текст.
            </div>
          </Part1>
          <Part2>
            <Button>Начать</Button>
          </Part2>
        </Text>
      </Payment>
    </>
  );
};

export default RegisterCard;
