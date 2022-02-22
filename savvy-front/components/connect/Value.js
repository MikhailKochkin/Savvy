import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

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
    font-weight: 500;
    margin-bottom: 40px;
    color: #8c8c8c;
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
  @media (max-width: 800px) {
    flex-direction: column;
    .box {
      width: 100%;
      font-size: 2rem;
    }
  }
`;

const Value = () => {
  let args = [
    `👍 <span id="green">Осваивать новые сферы</span>, общаясь с экспертами в интересных вам областях`,
    `🌍 <span id="yellow">Узнавать актуальные новости</span> о новых проектах, тенденциях и возможностях`,
    `😓 <span id="orange">Решать рабочие вопросы</span>, советуясь с юристами с разными специализациями`,
    `☝️ <span id="red">Находить первым новые вакансии</span> в интересных вам компаниях в России и за рубежом`,
    `🚀 Узнавать, <span id="violet">как проходить собеседования</span> на позиции разного уровня в любые компании`,
    `⭐️ <span id="blue">Находить новых знакомых</span> и хорошо вместе проводить время`,
  ];
  return (
    <Styles>
      <Container id="value">
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
