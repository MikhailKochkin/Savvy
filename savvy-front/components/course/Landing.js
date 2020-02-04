import React, { useEffect } from "react";
import styled from "styled-components";

const Banner = styled.img`
  max-height: 45vh;
  object-fit: cover;
  text-align: center;
  color: white;
  border-radius: 10px;
  width: 92vw;
  /* content: url("../static/computer.jpg"); */
  @media (max-width: 800px) {
    top: 0;
    left: 0;
    position: relative;
    width: 92vw;
    border-radius: 10px 10px 0px 0px;
    background: #f1efed;
  }
`;

const Square = styled.div`
  display: none;
  position: absolute;
  top: 30%;
  left: 6%;
  z-index: 2;
  width: 30%;
  font-size: 2rem;
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #ece9e6,
    #ffffff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #ece9e6,
    #ffffff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 1%;
  text-align: center;
  border-radius: 10px;
  background-size: cover;
  .text {
    color: black;
    line-height: 1.6;
  }
  @media (max-width: 1400px) {
    font-size: 1.8rem;
  }
  @media (max-width: 1000px) {
    font-size: 1.6rem;
  }
  @media (max-width: 800px) {
    top: 0;
    left: 0;
    position: relative;
    width: 92vw;
    border-radius: 0 0px 10px 10px;
    background: #f1efed;
    padding: 4% 3%;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  border: 1px solid #112a62;
  background: none;
  color: #112a62;
  font-family: Montserrat;
  font-size: 2.2rem;
  padding: 1% 4%;
  margin-top: 3%;
  cursor: pointer;
  outline: 0;
  &:hover {
    -webkit-box-shadow: 3px 1px 34px 19px rgba(17, 42, 98, 1);
    -moz-box-shadow: 3px 1px 34px 19px rgba(17, 42, 98, 1);
    box-shadow: 3px 1px 10px -2.5px rgba(17, 42, 98, 1);
  }
  @media (max-width: 1400px) {
    font-size: 1.8rem;
  }
  @media (max-width: 1000px) {
    font-size: 1.6rem;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Landing = props => {
  const open = () => {
    props.getTour(true);
  };
  useEffect(() => {
    document.getElementById("square").style.display = "block";
  });
  return (
    <>
      <Banner id="banner" src="../static/computer_mini.jpg" />
      <Square id="square">
        <div className="text">
          Ищите вакансии, проходите интерактивные курсы и приобретайте
          практические юридические навыки.
        </div>
        <Button onClick={open}>Подробнее</Button>
      </Square>
    </>
  );
};

export default Landing;
