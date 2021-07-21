import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  .custom-shape-divider-top-1626364588 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1626364588 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 65px;
  }

  .custom-shape-divider-top-1626364588 .shape-fill {
    fill: #000000;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 4rem;
    font-weight: 600;
    width: 80%;
    line-height: 1.4;
    margin-bottom: 50px;
    span {
      color: #3175f3;
    }
  }
  .parent {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 2 / 1 / 3 / 2;
  }
  .div4 {
    grid-area: 2 / 2 / 3 / 3;
  }
  @media (max-width: 800px) {
    h2 {
      font-size: 3.4rem;
      margin-bottom: 0;
      width: 90%;
    }
    .parent {
      display: flex;
      flex-direction: column;
      width: 95%;
    }
  }
`;
const Review = styled.div`
  /* border: 1px solid grey; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  &.right {
    justify-content: flex-start;
  }
  .bubble {
    width: 100%;
    /* background: #3175f3; */
    border-radius: 20px;
    padding: 4% 2%;
    display: flex;
    flex-direction: row;
    .number {
      font-size: 14rem;
      font-weight: 500;
      margin-right: 30px;
      color: #3175f3;
    }
    .text {
      font-size: 2.6rem;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 800px) {
    &.right {
      justify-content: center;
    }
    .bubble {
      width: 90%;
      padding: 0;
      .number {
        font-size: 8rem;
        font-weight: 500;
        margin-right: 30px;
        color: #3175f3;
        width: 100px;
      }
      .text {
        font-size: 2rem;
        line-height: 1.4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const Reviews = () => {
  return (
    <Styles>
      <div class="custom-shape-divider-top-1626364588">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      <h2>
        Мы можем за 7 месяцев <span>научить вас этим навыкам</span>.
        Гарантированно. С помощью:
      </h2>
      <div class="parent">
        <div class="div1">
          <Review>
            <div className="bubble">
              <div className="number">32</div>
              <div className="text">индивидуальных занятия с автором*</div>
            </div>
          </Review>
        </div>
        <div class="div2">
          <Review className="right">
            <div className="bubble">
              <div className="number">12</div>
              <div className="text">
                вебинаров по актуальным темам и разборам ошибок
              </div>
            </div>
          </Review>
        </div>
        <div class="div3">
          <Review>
            <div className="bubble">
              <div className="number">88</div>
              <div className="text">интерактивных онлайн тренажеров </div>
            </div>
          </Review>
        </div>
        <div class="div4">
          <Review className="right">
            <div className="bubble">
              <div className="number">10</div>
              <div className="text">письменных заданий с проверкой автора</div>
            </div>
          </Review>
        </div>
      </div>
    </Styles>
  );
};

export default Reviews;
