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
  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  /* .div1 {
    grid-area: 1 / 1 / 2 / 2;
    height: 20vh;
    text-align: center;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  } */
  .div3 {
    grid-area: 2 / 1 / 3 / 2;
    margin-bottom: 50px;
  }
  .div4 {
    grid-area: 2 / 2 / 3 / 3;
  }
  .div5 {
    grid-area: 3 / 1 / 4 / 2;
  }
  .div6 {
    grid-area: 3 / 2 / 4 / 3;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
`;
const Review = styled.div`
  padding-left: 10%;
  .bubble {
    width: 60%;
    background: #3175f3;
    border-radius: 10px;
    color: #fff;
    height: 200px;
    padding: 4% 2%;
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
        Мы можем за 7 месяцев научить вас этим навыкам. Гарантированно. С
        помощью:
      </h2>
      <div class="parent">
        {/* <div class="div1">
          <h2>
            Мы можем за 7 месяцев научить вас этим навыкам. Гарантированно. С
            помощью:
          </h2>
        </div>
        <div class="div2"></div> */}
        <div class="div3">
          <Review>
            <div className="bubble">Индивидуальные занятия с автором</div>
          </Review>
        </div>
        <div class="div4">
          <Review>
            <div className="bubble">
              Вебинары по актуальным темам и с разбором ошибок
            </div>
          </Review>
        </div>
        <div class="div5">
          <Review>
            <div className="bubble">Интерактивные онлайн упражнения</div>
          </Review>
        </div>
        <div class="div6">
          <Review>
            <div className="bubble">
              Письменные упражнения с проверкой автора
            </div>
          </Review>
        </div>
      </div>
    </Styles>
  );
};

export default Reviews;
