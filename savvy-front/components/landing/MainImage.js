import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  min-height: 400px;
  width: 560px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  @media (max-width: 900px) {
    width: 100%;
  }
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Bubble = styled.div`
  height: 70px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.6rem;
  line-height: 1.3;
  font-weight: 600;
  border-radius: 30px;
  &#purple1 {
    border-color: #7000ff;
    background: #7000ff;
    color: #fff;
    margin-left: 100px;
    padding: 20px 40px;
  }
  &#purple2 {
    border-color: #7000ff;
    background: #7000ff;
    color: #fff;
    margin-right: 20px;
    margin-left: 40px;
    padding: 20px 20px;
  }
  &#orange1 {
    border-color: #e3ad0b;
    background: #e3ad0b;
    color: #fff;
    padding: 20px 40px;
    margin-top: 20px;
  }
  &#orange2 {
    border-color: #e3ad0b;
    background: #e3ad0b;
    color: #fff;
    padding: 20px 40px;
  }
  &#grey1 {
    border-color: #f1f1f1;
    background: #f1f1f1;
    color: #686868;
    margin-right: 20px;
    padding: 20px 40px;
    width: 100%;
  }
  &#grey2 {
    border-color: #f1f1f1;
    background: #f1f1f1;
    color: #686868;
    padding: 20px 40px;
  }
  &#grey3 {
    border-color: #f1f1f1;
    background: #f1f1f1;
    color: #686868;
    padding: 20px 40px;
    margin-right: 20px;
  }
  @media (max-width: 900px) {
    height: 70px;
    border: none;
    background: none;
    border-radius: 0px;
    align-items: flex-start;
    text-align: left;
    font-size: 1.8rem;
    width: 100%;
    &#purple1 {
      border-left: 5px solid #7000ff;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
      margin-left: 0px;
    }
    &#purple2 {
      margin-right: 0px;
      margin-left: 0px;
      border-left: 5px solid #7000ff;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
    }
    &#orange1 {
      border-left: 5px solid #e3ad0b;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
    }
    &#orange2 {
      border-color: #e3ad0b;
      background: #e3ad0b;
      color: #fff;
      padding: 20px 20px;
      margin-top: 20px;
    }
    &#grey1 {
      border-left: 5px solid #f1f1f1;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
    }
    &#grey2 {
      border-left: 5px solid #f1f1f1;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
      margin-top: 20px;
    }
    &#grey3 {
      border-left: 5px solid #7000ff;
      background: none;
      color: #1a1a1a;
      padding: 20px 20px;
    }
  }
`;

const MainImage = () => {
  return (
    <Styles>
      <Container>
        <Row id="row1">
          <Bubble id="purple1">
            Симулятор подготовки <br /> договоров
          </Bubble>
        </Row>
        <Row id="row2">
          <Bubble id="grey1">
            Занятия с экспертами и <br />
            авторами курсов
          </Bubble>
          <Bubble id="orange1">Решение кейсов</Bubble>
        </Row>
        <Row id="row3">
          <Bubble id="purple2">Тренажер для подготовки к экзаменам</Bubble>
          <Bubble id="grey2">Клуб выпускников</Bubble>
        </Row>
        <Row id="row4">
          <Bubble id="grey3">Обучение на реальных проектах</Bubble>
          <Bubble id="orange2">И еще 27 форматов обучения ...</Bubble>
        </Row>
      </Container>
    </Styles>
  );
};

export default MainImage;
