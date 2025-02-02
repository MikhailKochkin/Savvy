import React, { useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const Styles = styled.div`
  border: 1px solid #c4c4c4;
  margin-right: 3%;
  margin-bottom: 4%;
  background: white;
  font-size: 1.4rem;
  line-height: 1.8;
  width: 90%;
  font-weight: 500;
  background: #f6ec9a;
  cursor: pointer;
  border: ${(props) =>
    props.active ? `2px solid #3F51B5` : `1px solid #c4c4c4`};
  padding: 4% 6%;
  box-shadow: 0px 4px 4px rgba(182, 182, 182, 0.25);
  transform: ${(props) =>
    props.index % 2 == 0 ? `rotate(-1.2deg)` : `rotate(1.2deg)`};
  img {
    width: 100%;
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0;
    transition: opacity 0ms ease-out;
  }
  .box {
    padding: 0 15px;
    text-decoration: ${(props) => (props.used ? `line-through` : `none`)};
    p {
      margin-bottom: 0;
    }
  }
  .number {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 3%;
    .circle {
      border: 1px solid black;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 30px;
      border-radius: 100px;
    }
    .pin {
      background-image: -moz-radial-gradient(
        45px 45px 45deg,
        circle cover,
        red 50%,
        black 100%
      );
      background-image: -webkit-radial-gradient(
        45px 45px,
        circle cover,
        red,
        black
      );
      background-image: radial-gradient(red 50%, black 100%);
      width: 30px;
      height: 30px;
      border-radius: 50px;
    }
  }
  button {
    margin-bottom: 14px;
  }
`;

const Box = (props) => {
  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState();
  return (
    <Styles
      used={props.used}
      index={props.index}
      key={props.index}
      id={props.index + props.id}
      onClick={(e) => {
        props.passElementValue(props.option, activeValue);
        setActive(!active);
        setActiveValue(props.option);
      }}
      active={
        props.elementsInUse?.filter((el) => el?.element?.text == props.option)
          .length > 0
      }
    >
      <div className="number">
        <div className="circle">{props.index + 1}. </div>
      </div>
      <div className="box">{parse(props.option)}</div>
    </Styles>
  );
};

export default Box;
