import React from "react";
import styled from "styled-components";
import parse from 'html-react-parser';


const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 120vh;
  background: #111111;
  color: #fff;
  @media (max-width: 800px) {
    padding: 30px 0;
  }
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
  margin-bottom: 60px;
  font-size: 3.4rem;
  width: 70%;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 2.6rem;
  }
`;

const Args = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  .box {
    width: 30%;
    font-size: 2.6rem;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 40px;
    color: #8c8c8c;
    .header {
      color: #fff;
      min-height: 80px;
    }
    .explainer {
      font-size: 2.2rem;
      margin-bottom: 20px;
      #green {
        background: #03e599;
        color: #000000;
      }
      #yellow {
        background: #fed232;
        color: #000000;
      }
      #orange {
        background: #fe7e43;
        color: #000000;
      }
      #red {
        background: #ff3f60;
        color: #000000;
      }
      #violet {
        background: #e42ee4;
        color: #000000;
      }
      #blue {
        background: #c34bfe;
        color: #000000;
      }
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
      width: 100%;
      font-size: 2rem;
      .header {
        color: #fff;
        min-height: 40px;
        font-size: 2.2rem;
      }
      .explainer {
        font-size: 2rem;
        margin-bottom: 20px;
      }
    }
  }
`;

const Instruments = () => {
  let args = [
    {
      header: `1. Базу данных юристов`,
      explainer: `Находите тех, кто может вам помочь, с кем можно посоветоваться. Все анкеты хранятся в Notion: там вы можете <span id="green">найти нужных вам людей по разным критериям</span> (место работы или учебы, место проживания или профессиональные интересы)`,
    },
    {
      header: `2. Учебную программу по нетворкингу`,
      explainer: `Учебная программа по карьерному нетворкингу. <span id="orange">Как общаться с людьми, чтобы все стороны получали пользу?</span> Как строить отношения с коллегами, клиентами, наставниками, чтобы общение было комфортным и полезным для всех.`,
    },
    {
      header: `3. Встречи участников сообщества`,
      explainer: `Встречи участников в теплой и уютной атмосфере, онлайн и офлайн. <span id="blue">Поговорим на юридические и неюридические темы</span>: про карьеру, эффективность, отдых, бизнес и так далее. `,
    },
  ];

  return (
    <Styles>
      <Container>
        <Header>Все это можно сделать через инструменты нетворкинга:</Header>
        <Args>
          {args.map((a) => (
            <div className="box">
              <div className="header">{parse(a.header)}</div>
              <div className="explainer">{parse(a.explainer)}</div>
            </div>
          ))}
        </Args>
      </Container>
    </Styles>
  );
};

export default Instruments;
