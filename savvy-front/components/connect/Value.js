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
    }
  }
`;

const Value = () => {
  let args = [
    `👍 <span id="green">Осваивать новые сферы права</span>, общаясь с экспертами в интересных вам областях`,
    `🌍 <span id="green">Узнавать актуальные новости</span> о новых проектах, тенденциях и возможностях`,
    `😓 Решать рабочие вопросы`,
    `☝️ Находить первым новые вакансии в интересных вам компаниях в России и за рубежом`,
    `🚀 Знать, как проходить собеседования на позиции разного уровня в любые компании`,
    `⭐️ Находить новую компанию и хорошо вместе проводить время`,
  ];
  return (
    <Styles>
      <Container>
        <Header>
          Через умный поиск правильных людей в юридической сфере можно:
        </Header>
        <Args>
          {args.map((a) => (
            <div className="box">{renderHTML(a)}</div>
          ))}
        </Args>
      </Container>
    </Styles>
  );
};

export default Value;
