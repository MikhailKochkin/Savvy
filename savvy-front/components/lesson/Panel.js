import React from "react";
import { Levels } from "../../config";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Back = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  min-height: 10vh;
  padding: 2% 0;
  margin-top: 40px;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
    margin-top: 10px;
  }
`;

const Block1 = styled.div`
  width: 40%;
  padding: 1%;
  background: #007ea7;
  color: white;
  min-height: 150px;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header {
    font-weight: bold;
    flex-basis: 25%;
    padding-left: 3%;
  }
  .main {
    flex-basis: 75%;
    padding-left: 3%;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 30px;
    order: 2;
  }
`;

const Block2 = styled.div`
  width: 40%;
  padding: 1%;
  background: #1a2980;
  color: white;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  .text {
    flex-basis: 65%;
    /* padding: 1%; */
    padding-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    div {
      width: 100%;
    }
    .header {
      font-weight: bold;
      flex-basis: 25%;
    }
    .main {
      flex-basis: 75%;
    }
  }
  .num {
    flex-basis: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .circle {
    border: 2px solid white;
    font-size: 2rem;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 30px;
    order: 1;
  }
`;

const Panel = (props) => {
  let text;
  for (var i = 0; i < Levels.length; i++) {
    if (props.level < Levels[i].level) {
      text = Levels[i].text;
      break;
    }
  }
  return (
    <Back>
      <Block1>
        {props.change && (
          <div>
            <div className="header">Почему стоит пройти этот урок: </div>
            <div className="main">{renderHTML(props.change)}</div>
          </div>
        )}
      </Block1>
      <Block2>
        <div className="text">
          <div className="header">Следующее достижение: </div>
          <div className="main">{text}</div>
        </div>
        <div className="num">
          <div className="circle">{props.level}</div>
        </div>
      </Block2>
    </Back>
  );
};

export default Panel;
