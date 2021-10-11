import { useState, useEffect } from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100vw;
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dce2e7;
  @media (max-width: 800px) {
    padding: 25px 0;
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #dce2e7;
  padding-left: 20px;
  /* align-items: center; */
  .name {
    color: #989899;
    font-weight: 400;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .main {
    font-size: 2.8rem;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  .secondary {
    color: #989899;
    font-size: 1.4rem;
    max-width: 90%;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    width: 90%;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #dce2e7;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
`;

const Details = (props) => {
  const d = props.data;

  return (
    <Styles>
      <Container>
        <Section>
          <div className="name">Длительность</div>
          <div className="main">{d.length1}</div>
          <div className="secondary">{d.length2}</div>
        </Section>
        <Section>
          <div className="name">Старт</div>
          <div className="main">{d.start}</div>
          <div className="secondary">
            Получите доступ к материалам сразу после покупки
          </div>
        </Section>
        <Section>
          <div className="name">Подготовка</div>
          <div className="main">{d.prior_klnowledge_1}</div>
          <div className="secondary">{d.prior_klnowledge_2}</div>
        </Section>
      </Container>
    </Styles>
  );
};

export default Details;
