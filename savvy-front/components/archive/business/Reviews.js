import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1%;
  }
`;
const Reviews = () => {
  return <Styles>Что говорят?</Styles>;
};

export default Reviews;
