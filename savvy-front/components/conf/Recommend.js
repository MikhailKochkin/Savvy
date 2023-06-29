import React from "react";
import styled from "styled-components";
import RecommendForm from "./RecommendForm";

const Styles = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  background: #090a11;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #090a11;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Recommend = (props) => {
  return (
    <Styles>
      <Container>
        <RecommendForm conf={props.conf} />
      </Container>
    </Styles>
  );
};

export default Recommend;
