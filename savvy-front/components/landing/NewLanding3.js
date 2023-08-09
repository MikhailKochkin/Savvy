import { useEffect, useState } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";
import Phone from "./Phone";
import NewNav from "./NewNav";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import MainImage from "./MainImage";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  @media (min-height: 1000px) and (max-height: 1200px) {
    transform-origin: -600% 100%;
    height: 50%;
    min-height: 50vh;
  }
  @media (min-height: 800px) and (max-height: 1000px) {
    transform-origin: -600% 100%;
    height: 50%;
    min-height: 50vh;
  }
  @media (max-height: 800px) {
  }
`;

const Info = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    width: 1050px;
    display: flex;
    max-height: 65vh;
    min-height: 75vh;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (max-width: 900px) {
      align-items: flex-start;
    }
    .video_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      video {
        background: #fff;
        width: 560px;
      }
    }
    @media (max-width: 900px) {
      flex-direction: column;
      max-height: 180vh;
      width: 90%;

      .video_box {
        video {
          width: 100%;
        }
      }
    }

    .text {
      h1 {
        font-size: 5rem;
        line-height: 1.1;
        text-align: left;
        font-weight: 700;
        width: 95%;
        opacity: 0.9;
        /* margin-top: 10%; */
        color: #000000;
        span {
          display: inline-block;
          transform: skew(-6deg);
          background: #fce969;
        }
        @media (max-width: 1150px) {
          font-size: 6.4rem;
        }
        @media (max-width: 900px) {
          font-size: 4rem;
        }
        @media (max-width: 300px) {
          font-size: 3rem;
        }
      }
      div {
        width: 90%;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 2.2rem;
        line-height: 1.4;
        color: #3a3a3a;
        margin-bottom: 20px;
        @media (max-width: 900px) {
          width: 95%;
        }
      }
    }
  }
`;

const Block = styled.div`
  width: 75%;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const Buttons = styled.div`
  width: 100%;
  button {
    background: none;
    color: #1a1a1a;
    border-radius: 20px;
    font-weight: 600;
    margin-top: 25px;
    margin-bottom: 15px;
    border: 4px solid #7000ff;
    width: 290px;
    padding: 15px 0;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 1.8rem;
    transition: 0.3s;
    &:hover {
      background: #7000ff;
      color: #fff;
    }

    div {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 800px) {
    button {
      width: 100%;
    }
  }
`;

const Landing = (props) => {
  // const [width, setWidth] = useState(0);
  const [h, setH] = useState(0);
  const { t } = useTranslation("landing");

  const onResize = (width, height) => {
    // setWidth(width);
    let num = 0;
    if (height < 600) {
      num = 0;
    } else if (height >= 600 && height < 770) {
      num = parseInt(height * 0.09);
    } else if (height >= 770) {
      num = 130;
    }
    setH(num);
  };

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const slide = () => {
    var my_element = document.getElementById("course_search");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Info>
        <NewNav />
        <div className="container">
          <div className="text">
            <h1>{t("h1")}</h1>
            <div>
              {t("h2")}
              {/* 
              Больше 20 интерактивных курсов от экспертов из Алруд, DLA Piper,
              Birch Legal и Никольская Консалтинг */}
            </div>
            <Buttons>
              <button id="main_page_button" onClick={(e) => slide()}>
                {t("c2a")}
              </button>
            </Buttons>
          </div>
          <div className="video_box">
            {/* <video loop="loop" autoplay="autoplay" playsinline muted>
              <source src="static/v4.webm" type="video/webm" />
            </video> */}
            <MainImage />
          </div>
          {/* <Phone /> */}
        </div>
      </Info>
      <Block></Block>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
