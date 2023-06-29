import React from "react";
import styled from "styled-components";
import parse from 'html-react-parser';


const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  h2 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.8rem;
  }
  @media (max-width: 800px) {
    width: 100%;
    h2 {
      margin-left: 10%;
      margin-bottom: 0px;
      font-size: 3.2rem;
    }
  }
`;

const Container = styled.div`
  width: 90%;
`;

const PriceBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: #f4f8fc;
  width: 32%;
  height: 420px;

  padding: 20px;
  border: 1px solid #f0f3f5;
  border-radius: 15px;
  margin-bottom: 20px;
  p {
    margin: 5px 0;
  }
  h3 {
    font-size: 2.2rem;
    margin: 0;
    margin-bottom: 10px;
  }
  .description {
    width: 90%;
    line-height: 1.4;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  .price {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 15px;
  }
  .places {
    border-top: 1px solid #171e2e;
    width: 100%;
    margin-top: 8px;
    padding-top: 8px;

    text-align: center;
  }
  @media (max-width: 800px) {
    width: 90%;
    height: auto;
    h3 {
      font-size: 2.4rem;
    }
    .description {
      font-size: 1.6rem;
      div {
        margin: 5px 0;
      }
    }
    .price {
      font-size: 4rem;
    }
    .places {
      font-size: 1.8rem;
    }
  }
`;

const PriceBoxBlue = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: #171e2e;
  color: #fff;
  width: 100%;
  height: 450px;

  padding: 20px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  margin-bottom: 20px;
  p {
    margin: 5px 0;
  }
  h3 {
    font-size: 2.2rem;
    margin: 0;
    margin-bottom: 15px;
  }
  .description {
    width: 90%;
    font-size: 1.4rem;

    line-height: 1.6;
  }
  .price {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 15px;
  }
  .places {
    border-top: 1px solid #ffffff;
    width: 100%;
    margin-top: 8px;
    padding-top: 8px;

    text-align: center;
  }
  @media (max-width: 800px) {
    height: auto;
    h3 {
      font-size: 2.4rem;
    }
    .description {
      font-size: 1.6rem;
      div {
        margin: 5px 0;
      }
    }
    .price {
      font-size: 4rem;
    }
    .places {
      font-size: 1.8rem;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  /* justify-content: center; */
  align-items: center;
  .box {
    background: #435cf8;
    color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Prices = (props) => {
  let p = props.coursePage.prices.prices;
  return (
    <Styles>
      <Container>
        <h2>Варианты участия</h2>
        <PriceBoxContainer>
          <PriceBox>
            <h3>{p[0].name}</h3>
            <p className="price">{p[0].price} ₽</p>

            <p className="description">{parse(p[0].description)}</p>
            <p className="places">Осталось мест: {p[0].places}</p>
          </PriceBox>
          <Box>
            <div className="box">Самый популярный</div>
            <PriceBoxBlue>
              <h3>{p[1].name}</h3>
              <p className="price">{p[1].price} ₽</p>
              <p className="description">{parse(p[1].description)}</p>
              <p className="places">Осталось мест: {p[1].places}</p>
            </PriceBoxBlue>
          </Box>
          <PriceBox>
            <h3>{p[2].name}</h3>
            <p className="price">{p[2].price} ₽</p>
            <p className="description">{parse(p[2].description)}</p>
            <p className="places">Осталось мест: {p[2].places}</p>
          </PriceBox>
        </PriceBoxContainer>
      </Container>
    </Styles>
  );
};

export default Prices;
