import React from "react";
import styled from "styled-components";

const CaseCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  /* padding: ; */
  margin: 2%;
  width: 285px;
  line-height: 1.2;
  @media (max-width: 1000px) {
    width: 205px;
  }
  @media (max-width: 650px) {
    padding: 2%;
    width: 158px;
  }
  @media (max-width: 374px) {
    width: 150px;
  }
`;

const Photo = styled.div`
  background: #cccccc;
  width: 100%;
  height: 160px;
  @media (max-width: 950px) {
    height: 80px;
  }
`;

const Description = styled.div`
  background: #e3e3e3;
  width: 85%;
  height: 30px;
  margin-top: 5%;
  @media (max-width: 650px) {
    padding: 2%;
    height: 20px;
  }
`;

const Button = styled.div`
  background: #e3e3e3;
  width: 60%;
  height: 30px;
  margin-top: 5%;
  @media (max-width: 650px) {
    padding: 2%;
    height: 20px;
  }
`;

const LoadingDummy = () => {
  return (
    <CaseCard>
      <Photo />
      <Description />
      <Button />
    </CaseCard>
  );
};

export default LoadingDummy;
