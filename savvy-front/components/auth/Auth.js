import { useState } from "react";
import Signup from "./newauth/Signup";
import Signin from "./newauth/Signin";
import RequestReset from "./RequestReset";
import styled from "styled-components";

const Styles = styled.div`
  background: #fff;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Container = styled.div`
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Auth = (props) => {
  const [auth, setAuth] = useState("signin");
  const changeState = (dataFromChild) => setAuth(dataFromChild);
  return (
    <Styles id="buy_section">
      <Container>
        {auth === "signin" && (
          <Signin
            page="lesson"
            getData={changeState}
            pathname={props.pathname}
            type={props.type}
          />
        )}
        {auth === "signup" && (
          <Signup
            page="lesson"
            getData={changeState}
            pathname={props.pathname}
            type={props.type}
          />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </Container>
    </Styles>
  );
};

export default Auth;
