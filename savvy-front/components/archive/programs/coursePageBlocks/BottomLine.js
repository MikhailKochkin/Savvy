import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import ReactResizeDetector from "react-resize-detector";
import parse from 'html-react-parser';


const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
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
    text-align: center;
    font-weight: 500;
    padding: 10px;
    margin-right: 40px;
    span {
    }
    /* opacity: 0.9; */
  }
  button {
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
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
      border: 1px solid #dea702;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px 0;
    background-size: contain;

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
        <span>{parse(d.offer)}</span>
      </div>
      <button onClick={(e) => slide()}>Получить гайд</button>
    </Banner>
  );
};

export default Ad;
