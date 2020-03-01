import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  object-fit: cover;
  text-align: center;
  color: white;
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* border-radius: 10px; */
  width: 100vw;
  padding: 0 12%;
  .text {
    color: white;
    line-height: 1.6;
    font-size: 2.4rem;
  }
  @media (max-width: 800px) {
    .text {
      font-size: 1.8rem;
    }
    padding: 0 5%;
    height: 20vh;
  }
`;

const Landing = () => {
  return (
    <>
      <Banner id="banner">
        <div className="text">
          Проходите интерактивные курсы по праву и приобретайте практические
          навыки онлайн.👩🏼‍⚖️
        </div>
      </Banner>
    </>
  );
};

export default Landing;
