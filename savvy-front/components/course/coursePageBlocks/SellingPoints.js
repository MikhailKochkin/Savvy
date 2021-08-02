import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f4f8fd;
  border-top: 1px solid #dce2e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1040px) {
    padding: 30px 0;
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.4;
    margin-bottom: 50px;
  }
  @media (max-width: 1040px) {
    h2 {
      font-size: 2.4rem;
      text-align: left;
    }
  }
`;

const PointsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-around;
  @media (max-width: 1040px) {
    flex-direction: column;
  }
`;

const Point = styled.div`
  width: 48%;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  /* justify-content: space-between;
  align-items: space-between; */
  @media (max-width: 1040px) {
    flex-direction: column;
    width: 90%;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }
  .header {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 1.4;
    margin-bottom: 10px;
    span {
      padding-bottom: 1px;
      border-bottom: 2px solid #d7690b;
    }
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.4rem;
  }
  @media (max-width: 1040px) {
    .header {
      margin-top: 20px;
    }
  }
`;

const SellingPoints = () => {
  return (
    <Styles>
      <Container>
        <h2>Учитесь на программе, которая учитывает именно ваши потребности</h2>
        <PointsBox>
          <Point>
            <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" />
            <div className="info">
              <div className="header">
                От теории <span>к практике</span>
              </div>
              <div className="text">
                Мы понятно разберем сложные темы на мини-лекциях и дадим
                конспекты. Отработаем теоретические и практические вопросы через
                решение кейсов. А затем наши авторы расскажут, как строить
                юридическую карьеру уже сейчас.
              </div>
            </div>
          </Point>
          <Point>
            <img src="https://images.unsplash.com/photo-1600195077909-46e573870d99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
            <div className="info">
              <div className="header">
                <span>Индивидуальный</span> путь в обучении
              </div>
              <div className="text">
                Наш курс – это не просто лекции. Это умная система обучения,
                которая подстроится под ваши цели и даст персонализированный
                фидбэк. А заниматься в программе вы сможете, когда вам удобно, в
                любое время дня и ночи.
              </div>
            </div>
          </Point>
          <Point>
            <img src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
            <div className="info">
              <div className="header">
                Работа с <span>экспертами и кураторами</span>
              </div>
              <div className="text">
                В нашу команду входят практикующие юристы, совсем недавно
                закончившие МГУ, НИУ ВШЭ, МГЮА и СПБГУ. Они прекрасно знают, что
                надо знать, чтобы сдать экзамен по гражданскому праву или пройти
                собеседование в престижную компанию.
              </div>
            </div>
          </Point>
          <Point>
            <img src="https://images.unsplash.com/photo-1459499362902-55a20553e082?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" />
            <div className="info">
              <div className="header">
                Конечная цель – <span>экзамен и карьера</span>
              </div>
              <div className="text">
                Мы не хотим выполнять роль лектора. Скорее, ментора и
                наставника, который может взять вас за руку и провести через все
                испытания к конечной цели: успешной сдаче экзамена или получению
                предложения о работе.
              </div>
            </div>
          </Point>
        </PointsBox>
      </Container>
    </Styles>
  );
};

export default SellingPoints;
