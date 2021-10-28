import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  border-top: 1px solid #dce2e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1040px) {
    padding: 30px 0;
  }
`;

const Container = styled.div`
  width: 80%;
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
    margin: 80px 0;
  }
  h2 {
    margin-bottom: 40px;
    font-size: 3.2rem;
  }
`;

const PointsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-around;
  width: 100%;
  @media (max-width: 1040px) {
    flex-direction: column;
  }
`;

const Point = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  border: 1px solid #dce2e6;
  padding: 20px;
  @media (max-width: 1040px) {
    flex-direction: column;
    width: 90%;
  }
  .number {
    font-size: 1.8rem;
    width: 36px;
    height: 36px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #327998;
    color: #fff;
    border-radius: 50%;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }
  .info {
    width: 90%;
  }

  .header {
    font-weight: 600;
    font-size: 2rem;
    line-height: 1.4;
    margin-bottom: 10px;
    span {
      padding-bottom: 1px;
      border-bottom: 2px solid #d7690b;
    }
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.6rem;
  }
  @media (max-width: 1040px) {
    margin-bottom: 40px;
    .header {
      margin-top: 20px;
    }
  }
`;

const SellingPoints = (props) => {
  const d = props.data;

  return (
    <Styles>
      <Container>
        <h2>Как проходит обучение</h2>
        <PointsBox>
          {d.sps.map((s, i) => (
            <Point>
              {/* <Image src={s.image} width={200} height={200} /> */}
              <div className="number">{i + 1}</div>
              <div className="info">
                <div className="header">{s.selling_point}</div>
                <div className="text">{s.selling_point_details}</div>
              </div>
            </Point>
          ))}
        </PointsBox>
      </Container>
    </Styles>
  );
};

export default SellingPoints;
