import { useEffect, useState } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";
import Phone from "./Phone";
import NewNav from "./NewNav";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  min-height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Menu = styled.div`
  width: 100%;
  height: 800px;
  z-index: 1;
  /* margin: 50px 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background: linear-gradient(-85deg, #ee7752, #ff4fce, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  position: absolute;
  bottom: 0;
  top: auto;
  opacity: 0.9;
  transform-origin: ${(props) => `${-90}% 100%`};
  transform: skewY(-12deg);
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 50% 0;
    }
    50% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @media (min-height: 1000px) and (max-height: 1200px) {
    transform-origin: -500% 100%;
  }
  @media (min-height: 400px) and (min-width: 1100px) and (max-width: 1500px) {
    transform-origin: ${(props) => `${-100}% 100%`};
  }
  @media (max-height: 500px) and (min-width: 1100px) and (max-width: 1500px) {
    transform-origin: ${(props) => `${-100}% 100%`};
  }
  @media (min-height: 900px) and (max-height: 1000px) and (max-width: 900px) {
    transform-origin: -800% 100%;
  }
  @media (min-height: 800px) and (max-height: 900px) and (max-width: 900px) {
    transform-origin: -750% 100%;
  }
  @media (max-height: 800px) and (max-width: 900px) {
    transform-origin: -650% 100%;
  }
  @media (max-height: 750px) and (max-width: 900px) {
    transform-origin: -550% 100%;
  }
`;

const Info = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    width: 80%;
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    .text {
      h1 {
        font-size: 7rem;
        line-height: 1.1;
        text-align: left;
        font-weight: 700;
        width: 70%;
        opacity: 0.9;
        /* margin-top: 10%; */
        color: #3a3a3a;
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
        width: 70%;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 1.8rem;
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
    background: #1b65f1;
    color: #fff;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 15px;
    border: none;
    width: 290px;
    padding: 15px 0;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 1.8rem;
    transition: 0.3s;
    &:hover {
      background: #0135a9;
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
    console.log("num", num);
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
      <Menu height={h}></Menu>
      <Info>
        <NewNav />
        <div className="container">
          <div className="text">
            <h1>{t("h1")}</h1>
            <div>{t("h2")}</div>
            <Buttons>
              <button onClick={(e) => slide()}>{t("c2a")}</button>
            </Buttons>
          </div>
          <Phone />
        </div>
      </Info>
      <Block></Block>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
