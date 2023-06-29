import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100vw;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 100%;
    margin: 20px 0;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    padding: 25px 0;
    h2 {
      margin-bottom: 40px;
      font-size: 3.2rem;
    }
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Points = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  div {
    background-color: #f7f9f9;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const Point = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 15px;
  .li {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.3;
    height: 60px;
    width: 70%;
  }
  div {
    font-size: 1.4rem;
    font-weight: 400;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Advantages = (props) => {
  return (
    <Styles>
      <Container>
        <h2>Почему стоит выбрать обучение в BeSavvy</h2>
        <Points>
          {props.data.advantages.map((a) => (
            <Point>
              <div className="li">{a.title}</div>
              <div>{a.details}</div>
            </Point>
          ))}
        </Points>
      </Container>
    </Styles>
  );
};

export default Advantages;
