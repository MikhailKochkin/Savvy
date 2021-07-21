import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 60vh;
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
    grid-column-gap: 20px;
    grid-row-gap: 20px;
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
    .parent {
      display: flex;
      flex-direction: column;
    }
  }
`;
const Container = styled.div`
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 3rem;
    font-weight: 600;
    width: 80%;
    line-height: 1.4;
    text-align: center;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    .parent {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Results = () => {
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
      <Container>
        <h2>
          Пока не готовы проходить программу? Давайте в любом случае
          познакомимся. Зарегистрируйтесь на вводную встречу и я подскажу, как
          вам учить английский дальше.
        </h2>
      </Container>
    </Styles>
  );
};

export default Results;
