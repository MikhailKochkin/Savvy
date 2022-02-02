import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
  width: 360px;
  height: 420px;
  /* margin-right: 50px; */
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    object-fit: cover;
    width: 100%;
    height: 70px;
  }
  @media (max-width: 1200px) {
    width: 360px;
    height: 420px;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const Up = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: 70px;
  }
  .title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 1.2;
    color: #496ddb;
    margin: 10px 20px;
  }
  .description {
    margin: 10px 20px;
    line-height: 1.4;
    font-size: 1.4rem;
    font-weight: 500;
  }
  .term {
    margin: 10px 20px;
    line-height: 1.4;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Down = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .price {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 80px;
    width: 100%;
    border-top: 1px solid rgba(149, 149, 149, 0.5);
    border-bottom: 1px solid rgba(149, 149, 149, 0.5);
    margin-bottom: 10px;
    padding: 15px 0;
  }
  .price_box_price {
    font-size: 2rem;
  }
  .price_box {
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .price_box_description {
    font-size: 1.3rem;
  }
  button {
    background: #496ddb;
    border-radius: 5px;
    border: 1px solid #496ddb;
    height: 45px;
    width: 90%;
    color: #fff;
    font-family: Montserrat;
    font-size: 1.6rem;
    cursor: pointer;
    margin-bottom: 10px;
    transition: ease-in 0.2s;
    &:hover {
      background: #0135a9;
    }
  }
`;

const Program = (props) => {
  return (
    <Card>
      <Up>
        <img src={props.img} />
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
        <div className="term">{props.term}</div>
      </Up>
      <Down>
        <div className="price">
          <div className="price_box">
            <div className="price_box_price">{props.price}</div>
            <div className="price_box_description">Полная стоимость</div>
          </div>
          <div className="price_box">
            <div className="price_box_price">{props.installments}</div>
            <div className="price_box_description">{props.conditions}</div>
          </div>
        </div>
        <Link
          href={{
            pathname: props.pathname,
            query: props.query,
          }}
        >
          <button>Подробнее о программе</button>
        </Link>
      </Down>
    </Card>
  );
};

export default Program;
