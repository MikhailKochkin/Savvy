import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  background: black;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
  font-family: "Anton", sans-serif;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 1;

  .night {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  .shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
    border-radius: 999px;
    -webkit-filter: drop-shadow(0 0 6px #699bff);
    filter: drop-shadow(0 0 6px #699bff);
    -webkit-animation: tail 3000ms ease-in-out infinite,
      shooting 3000ms ease-in-out infinite;
    animation: tail 3000ms ease-in-out infinite,
      shooting 3000ms ease-in-out infinite;
  }
  .shooting_star::before,
  .shooting_star::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      #5f91ff,
      rgba(0, 0, 255, 0)
    );
    -webkit-transform: translateX(50%) rotateZ(45deg);
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    -webkit-animation: shining 3000ms ease-in-out infinite;
    animation: shining 3000ms ease-in-out infinite;
  }
  .shooting_star::after {
    -webkit-transform: translateX(50%) rotateZ(-45deg);
    transform: translateX(50%) rotateZ(-45deg);
  }
  .shooting_star:nth-child(1) {
    top: calc(50% - -119px);
    left: calc(50% - 43px);
    -webkit-animation-delay: 4796ms;
    animation-delay: 4796ms;
  }
  .shooting_star:nth-child(1)::before,
  .shooting_star:nth-child(1)::after {
    -webkit-animation-delay: 4796ms;
    animation-delay: 4796ms;
  }
  .shooting_star:nth-child(2) {
    top: calc(50% - -43px);
    left: calc(50% - 37px);
    -webkit-animation-delay: 5944ms;
    animation-delay: 5944ms;
  }
  .shooting_star:nth-child(2)::before,
  .shooting_star:nth-child(2)::after {
    -webkit-animation-delay: 5944ms;
    animation-delay: 5944ms;
  }
  .shooting_star:nth-child(3) {
    top: calc(50% - -40px);
    left: calc(50% - 222px);
    -webkit-animation-delay: 7556ms;
    animation-delay: 7556ms;
  }
  .shooting_star:nth-child(3)::before,
  .shooting_star:nth-child(3)::after {
    -webkit-animation-delay: 7556ms;
    animation-delay: 7556ms;
  }
  .shooting_star:nth-child(4) {
    top: calc(50% - -29px);
    left: calc(50% - 113px);
    -webkit-animation-delay: 7123ms;
    animation-delay: 7123ms;
  }
  .shooting_star:nth-child(4)::before,
  .shooting_star:nth-child(4)::after {
    -webkit-animation-delay: 7123ms;
    animation-delay: 7123ms;
  }
  .shooting_star:nth-child(5) {
    top: calc(50% - 146px);
    left: calc(50% - 112px);
    -webkit-animation-delay: 3629ms;
    animation-delay: 3629ms;
  }
  .shooting_star:nth-child(5)::before,
  .shooting_star:nth-child(5)::after {
    -webkit-animation-delay: 3629ms;
    animation-delay: 3629ms;
  }
  .shooting_star:nth-child(6) {
    top: calc(50% - -108px);
    left: calc(50% - 160px);
    -webkit-animation-delay: 3895ms;
    animation-delay: 3895ms;
  }
  .shooting_star:nth-child(6)::before,
  .shooting_star:nth-child(6)::after {
    -webkit-animation-delay: 3895ms;
    animation-delay: 3895ms;
  }
  .shooting_star:nth-child(7) {
    top: calc(50% - 52px);
    left: calc(50% - 72px);
    -webkit-animation-delay: 7326ms;
    animation-delay: 7326ms;
  }
  .shooting_star:nth-child(7)::before,
  .shooting_star:nth-child(7)::after {
    -webkit-animation-delay: 7326ms;
    animation-delay: 7326ms;
  }
  .shooting_star:nth-child(8) {
    top: calc(50% - 55px);
    left: calc(50% - 282px);
    -webkit-animation-delay: 956ms;
    animation-delay: 956ms;
  }
  .shooting_star:nth-child(8)::before,
  .shooting_star:nth-child(8)::after {
    -webkit-animation-delay: 956ms;
    animation-delay: 956ms;
  }
  .shooting_star:nth-child(9) {
    top: calc(50% - 129px);
    left: calc(50% - 296px);
    -webkit-animation-delay: 5030ms;
    animation-delay: 5030ms;
  }
  .shooting_star:nth-child(9)::before,
  .shooting_star:nth-child(9)::after {
    -webkit-animation-delay: 5030ms;
    animation-delay: 5030ms;
  }
  .shooting_star:nth-child(10) {
    top: calc(50% - 131px);
    left: calc(50% - 249px);
    -webkit-animation-delay: 1150ms;
    animation-delay: 1150ms;
  }
  .shooting_star:nth-child(10)::before,
  .shooting_star:nth-child(10)::after {
    -webkit-animation-delay: 1150ms;
    animation-delay: 1150ms;
  }
  @-webkit-keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @-webkit-keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
  @keyframes shooting {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(300px);
      transform: translateX(300px);
    }
  }
`;

const L = () => {
  return (
    <Styles>
      <div class="night">
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
      </div>
      <div>
        <div>test</div>
        <div>text</div>
        <div>best</div>
      </div>
    </Styles>
  );
};

export default L;
