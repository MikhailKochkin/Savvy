import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  .image {
    flex-basis: 50%;
  }
  .text {
    flex-basis: 50%;
    padding-left: 20px;
    h1 {
      line-height: 1.4;
    }
    .price {
      border: 1px solid #00b0fe;
      background: #00b0fe;
      display: inline-block;
      padding: 10px 20px;
      color: #fff;
      font-weight: bold;
      border-radius: 8px;
    }
    .job {
      margin-top: 20px;
      font-size: 1.8rem;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 310px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const JTBD = () => {
  return (
    <Styles>
      <Container>
        <div className="image">
          <Image>
            <img src="static/teaching.svg" />
          </Image>
        </div>
        <div className="text">
          <h1>
            Вводная программа <br /> "Основы знаний юриста"
          </h1>
          <div className="price">Бесплатно</div>
          <div className="job">
            Мы поможем сдать экзамены и пройти собеседования. Без страха и
            стресса.
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default JTBD;
