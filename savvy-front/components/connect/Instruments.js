import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: #111111;
  color: #fff;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  background: #111111;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 3.4rem;
  width: 70%;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 800px) {
    width: 90%;
    font-size: 2.4rem;
  }
`;

const Args = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  border: 1px solid red;
  .box {
    width: 30%;
    font-size: 2.6rem;
    line-height: 1.4;
    font-weight: 600;
    border: 1px solid #fff;
    margin-bottom: 40px;
    color: #8c8c8c;
    .header {
      color: #fff;
      min-height: 80px;
    }
    .explainer {
      font-size: 2.2rem;
      margin-bottom: 20px;
    }

    #green {
      background: #03e599;
      color: #000000;
      transform: skew(-5deg);
      -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg);
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .box {
      width: 90%;
      font-size: 1.8rem;
      .header {
        color: #fff;
        min-height: 40px;
        font-size: 2.2rem;
      }
      .explainer {
        font-size: 1.8rem;
        margin-bottom: 20px;
      }
    }
  }
`;

const Instruments = () => {
  let args = [
    {
      header: `Базу данных юристов`,
      explainer: `Находите тех, кто может вам помочь, с кем можно посоветоваться. Все анкеты хранятся в Notion: там вы можете найти нужных вам людей по разным критериям (место работы или учебы, место проживания или профессиональные интересы)`,
    },
    {
      header: `Учебная программа по нетворкингу`,
      explainer: `Учебная программа по карьерному нетворкингу. Как общаться с людьми, чтобы все стороны получали пользу? Как строить отношения с коллегами, клиентами, наставниками, чтобы общение было комфортным и полезным для всех.`,
    },
    {
      header: `Встречи с гостями`,
      explainer: `Встречи с гостями в теплой и уютной атмосфере, а не на конференции или семинаре. `,
    },
  ];

  return (
    <Styles>
      <Container>
        <Header>Все это можно сделать через инструменты нетворкинга:</Header>
        <Args>
          {args.map((a) => (
            <div className="box">
              <div className="header">{renderHTML(a.header)}</div>
              <div className="explainer">{renderHTML(a.explainer)}</div>
            </div>
          ))}
        </Args>
      </Container>
    </Styles>
  );
};

export default Instruments;
