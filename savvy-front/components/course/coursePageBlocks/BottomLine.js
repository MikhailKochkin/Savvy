import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background: #000000; /* fallback for old browsers */
  color: #fff;
  opacity: 90%;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 3;
  justify-content: flex-end;
  padding-right: 40px;
  .bottomline_text {
    width: 20%;
    font-size: 1.4rem;
    line-height: 1.6;
    margin-right: 20px;
  }
  button {
    background: #327998;
    color: #fff;
    border: 1px solid #327998;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 100%;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    padding: 0 10px;

    .bottomline_text {
      width: 60%;
    }
    button {
      width: 120px;
      font-size: 1.5rem;
    }
  }
`;

const Ad = () => {
  const [width, setWidth] = useState(0);
  const onResize = (width, height) => {
    setWidth(width);
  };

  const slide = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="bottomline_text">
        Цена со скидкой действует для первых 20 участников.{" "}
      </div>
      <button onClick={(e) => slide()}>Участвовать</button>
    </Banner>
  );
};

export default Ad;
