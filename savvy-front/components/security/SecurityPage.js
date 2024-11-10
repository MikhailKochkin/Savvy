import React from "react";
import SecurityHeader from "./SecurityHeader";
import SecurityMenu from "./SecurityMenu";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecurityPage = () => {
  return (
    <Styles>
      <SecurityHeader />
      <SecurityMenu />
    </Styles>
  );
};

export default SecurityPage;
