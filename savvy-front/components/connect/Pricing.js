import React from "react";
import styled from "styled-components";

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
  font-size: 5.4rem;
  width: 70%;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 800px) {
    width: 90%;
    font-size: 2.4rem;
  }
`;

const Tarifs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  .image {
    width: 15%;
    div {
      width: 80px;
      height: 80px;
      background: grey;
      border-radius: 50px;
    }
  }
  .intro {
    font-size: 2.2rem;
    width: 45%;
    p {
      width: 80%;
      line-height: 1.4;
    }
  }

  .background {
    color: #8c8c8c;
    font-size: 2.2rem;

    width: 40%;
    p {
      width: 80%;
      line-height: 1.4;
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

const Card = styled.div``;

const Pricing = () => {
  return (
    <Styles>
      <Container>
        <Header>Присоединиться к сообществу</Header>
        <Tarifs>
          <Card>1 месяц</Card>
          <Card>1 год</Card>
        </Tarifs>
      </Container>
    </Styles>
  );
};

export default Pricing;
