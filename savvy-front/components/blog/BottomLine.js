import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background: #000000; /* fallback for old browsers */
  background: url("/static/mini_pattern.svg");
  background-size: cover;
  color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 3;
  justify-content: center;
  .bottomline_text {
    max-width: 85%;
    min-width: 35%;
    font-size: 1.8rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
  }
  button {
    background: #92dce5;
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
    a {
      color: #000;
    }
    &:hover {
      background-color: #4ac3d3;
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
  const { t } = useTranslation("blog");

  const slide = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const post = props.post;
  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="bottomline_text">
        <span>{`🔥 Узнайте больше на курсе "${post.coursePage.title}"`}</span>
      </div>
      <button>
        <a
          id="blog_to_course"
          href={`https://besavvy.app/coursePage?id=${post.coursePage.id}`}
          target="_blank"
        >
          {" "}
          На страницу курса
        </a>
      </button>
    </Banner>
  );
};

export default Ad;
