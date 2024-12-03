import React from "react";
import styled from "styled-components";

import Form from "./Form";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  background: #090a10;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #090a10;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Register = (props) => {
  return (
    <Styles>
      <Container>
        <Form conf={props.conf} />
      </Container>
    </Styles>
  );
};

export default Register;
