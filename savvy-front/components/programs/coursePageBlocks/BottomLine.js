import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import ReactResizeDetector from "react-resize-detector";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background: #000000; /* fallback for old browsers */
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='29' height='29' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(112)'%3E%3Crect width='100%25' height='100%25' fill='%231c7ed6'/%3E%3Ccircle cx='-4' cy='15' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='6' cy='25' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='16' cy='15' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='36' cy='15' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='26' cy='25' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='46' cy='25' r='1.5' fill='rgba(252, 196, 25,1)'/%3E%3Ccircle cx='15' cy='15' r='1.5' fill='rgba(24, 100, 171,1)'/%3E%3Ccircle cx='35' cy='15' r='1.5' fill='rgba(24, 100, 171,1)'/%3E%3Ccircle cx='5' cy='25' r='1.5' fill='rgba(24, 100, 171,1)'/%3E%3Ccircle cx='25' cy='25' r='1.5' fill='rgba(24, 100, 171,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ");
  color: #fff;
  /* position: -webkit-sticky;
  position: sticky;
  top: 0px; */
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 3;
  justify-content: center;
  /* padding-right: 300px; */
  .bottomline_text {
    max-width: 45%;
    min-width: 35%;
    font-size: 1.8rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
    text-shadow: -1px 0 #1864ab, 0 1px #1864ab, 1px 0 #1864ab, 0 -1px #1864ab;

    span {
    }
    /* opacity: 0.9; */
  }
  button {
    background: #fcc419;
    color: #000;
    border: 1px solid #1864ab;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #1864ab;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px 0;
    .bottomline_text {
      width: 90%;
      max-width: 90%;
      padding: 0;
      margin: 0;
      margin-bottom: 15px;
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
    }
  }
`;

const Ad = (props) => {
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
  const d = props.data;
  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="bottomline_text">
        <span>{d.offer}</span>
      </div>
      <button onClick={(e) => slide()}>Зарегистрироваться</button>
    </Banner>
  );
};

export default Ad;
