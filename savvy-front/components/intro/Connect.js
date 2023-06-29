import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 60%;
  height: 70vh;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .text {
    text-align: left;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .blue {
    color: #00b0fe;
  }
  a {
    color: #00b0fe;
    transition: 0.3s;
    &:hover {
      color: #0072a3;
    }
  }
  button {
    padding: 15px;
    border-radius: 10px;
    border: 3px solid #00b0fe;
    color: #00b0fe;
    font-weight: bold;
    background: #fff;
    outline: 0;
    cursor: pointer;
    margin-top: 20px;
    font-family: Montserrat;
    width: 250px;
    font-size: 2rem;
    transition: 0.3s;
    &:hover {
      border-color: #0072a3;
      color: #0072a3;
    }
  }
  @media (max-width: 800px) {
    width: 80%;
    height: auto;
    margin: 30px 0;
  }
`;
const Connect = () => {
  return (
    <Styles>
      <div className="box">
        <div className="text">
          Но учиться <span className="blue">без поддержки невозможно</span>.
          Поэтому вступайте в чат участников программы 👋🏻
        </div>
        <a href="https://t.me/joinchat/sKq1W3WoPi1kMmIy" target="_blank">
          <button>Вступить</button>
        </a>
      </div>
    </Styles>
  );
};

export default Connect;
