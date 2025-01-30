import React from "react";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";

const Container = styled.div`
  display: ${(props) => (props.isDisplayed ? "block" : "none")};
  border-left: 1px solid rgb(233, 233, 233);
  position: fixed;
  right: 0;
  padding-left: 5px;
  @media (max-width: 800px) {
    width: 100%;
    height: 100vh;
  }
`;

const LapTopScreen = styled.div`
  width: 400px;
`;

const DemoC2A = (props) => {
  return (
    <Container isDisplayed={props.isDisplayed}>
      <LapTopScreen>
        <InlineWidget
          styles={{
            width: "100%",
            height: "100vh",
          }}
          url="https://calendly.com/mike-from-besavvy/call-with-mike-kochkin"
        />
      </LapTopScreen>
    </Container>
  );
};

export default DemoC2A;
