import { useDebugValue, useEffect } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #111111;
  .container {
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
      font-weight: 2500;
      line-height: 1.4;
      font-size: 6rem;
      /* background: linear-gradient(90deg, #ea41c4 -3.09%, #fc745b 82.98%); */
      background: -webkit-linear-gradient(0deg, #ea41c4 -3.09%, #fc745b 82.98%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h2 {
      font-weight: 2500;
      line-height: 1.4;
      font-size: 4rem;
      background: -webkit-linear-gradient(0deg, #ea41c4 -3.09%, #fc745b 82.98%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #button_box {
      height: 85px;
      /* border: 1px solid red; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      button {
        background: #fff;
        width: 330px;
        height: 70px;
        border: 1px solid #fff;
        border-radius: 50px;
        font-size: 2.1rem;
        color: rgba(0, 0, 0, 1);
        font-family: Montserrat;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s ease;
        &:hover {
          width: 340px;
          height: 76px;
        }
      }
    }
  }
  @media (max-width: 800px) {
    min-height: 100vh;
    .container {
      h1 {
        font-weight: 2500;
        line-height: 1.3;
        font-size: 3.5rem;
        /* background: linear-gradient(90deg, #ea41c4 -3.09%, #fc745b 82.98%); */
        background: -webkit-linear-gradient(
          0deg,
          #ea41c4 -3.09%,
          #fc745b 82.98%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      h2 {
        font-weight: 2500;
        line-height: 1.3;
        font-size: 2.6rem;
        background: -webkit-linear-gradient(
          0deg,
          #ea41c4 -3.09%,
          #fc745b 82.98%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      #button_box {
        height: 85px;
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        button {
          background: #fff;
          width: 100%;
          height: 70px;
          border: 1px solid #fff;
          border-radius: 50px;
          font-size: 2.1rem;
          color: rgba(0, 0, 0, 1);
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }
      }
    }
  }
`;

const ATF = () => {
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const slide = () => {
    var my_element = document.getElementById("prices");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <div className="container">
        <h1>BeSavvy Connect – платформа для карьерного нетворкинга юристов</h1>
        <h2>
          Учитесь, находите работу и стройте проекты через общение с интересными
          людьми
        </h2>
        <div id="button_box">
          <button onClick={(e) => slide()}>Вступить в сообщество</button>
        </div>
      </div>
    </Styles>
  );
};

export default ATF;
