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
  font-size: 5.4rem;
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

const Founder = () => {
  return (
    <Styles>
      <Container>
        <Header>Привет, я Миша</Header>
        <Args>
          <div className="image">
            <div></div>
          </div>
          <div className="intro">
            <p>Я основатель BeSavvy Connect.</p>{" "}
            <p>
              Я вижу, как важно для юристов взаимодействовать с коллегами и
              представителями из других сфер.{" "}
            </p>
            <p>
              {" "}
              Но у них не всегда есть понимание, как это длать. Чтобы им помочь,
              я создал BeSavvy Connect.
            </p>
          </div>
          <div className="background">
            <p>
              А я еще основал BeSavvy School. Там мы учим юристов праву и
              английскому языку.
            </p>
          </div>
        </Args>
      </Container>
    </Styles>
  );
};

export default Founder;
