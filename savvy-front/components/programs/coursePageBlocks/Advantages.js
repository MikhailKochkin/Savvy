import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 100%;
    margin: 20px 0;
    margin-bottom: 80px;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Point = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-bottom: 50px;
  li {
    font-size: 1.8rem;
    font-weight: 500;
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
              <li>{a.title}</li>
              <div>{a.details}</div>
            </Point>
          ))}
        </Points>
      </Container>
    </Styles>
  );
};

export default Advantages;
