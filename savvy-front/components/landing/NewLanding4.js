import { useEffect, useState } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";
import Phone from "./Phone";
import NewNav from "./NewNav";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MainImage from "./MainImage";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  /* height: 800px; */

  /* @media (min-height: 1000px) and (max-height: 1200px) {
    transform-origin: -600% 100%;
    height: 50%;
    min-height: 50vh;
  }
  @media (min-height: 800px) and (max-height: 1000px) {
    transform-origin: -600% 100%;
    height: 50%;
    min-height: 50vh;
  } */
  @media (max-height: 800px) {
  }
`;

const Info = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("/static/law_pattern.svg");

  .container {
    width: 1050px;
    display: flex;
    height: 340px;
    /* min-height: 75vh; */
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 900px) {
      height: auto;
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
        text-align: center;
        width: 95%;
        opacity: 0.9;
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
          width: 100%;
          margin-top: 20px;
        }
      }
      div {
        width: 95%;
        text-align: center;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 2.6rem;
        line-height: 1.4;
        color: #3a3a3a;
        margin-bottom: 20px;
        @media (max-width: 900px) {
          width: 95%;
          font-size: 2rem;
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
    border-radius: 10px;
    font-weight: 600;
    border: 4px solid #7000ff;
    width: 240px;
    padding: 10px 0;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 1.8rem;
    transition: 0.3s;

    &:hover {
      background: #7000ff;
      color: #fff;
      a {
        color: #fff;
      }
    }

    div {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 800px) {
    button {
      width: 80%;
    }
  }
`;

const Landing = (props) => {
  // const [width, setWidth] = useState(0);
  const [h, setH] = useState(0);
  const { t } = useTranslation("landing");
  const router = useRouter();

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
            <h1>{t("upskill_with_simulators")}</h1>
            <div>{t("build_in_minutes")}</div>
            <Buttons>
              <button>
                {" "}
                <Link href="/demo?lang=eng">{t("c2a")}</Link>
              </button>
            </Buttons>
          </div>
        </div>
      </Info>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </Styles>
  );
};

export default Landing;
