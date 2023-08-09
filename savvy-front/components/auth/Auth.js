import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import RequestReset from "./RequestReset";
import styled from "styled-components";

const Styles = styled.div`
  border-radius: 40px;
  background: #fff;
  margin: 150px 0;
`;

const Auth = () => {
  const [auth, setAuth] = useState("signin");
  const changeState = (dataFromChild) => setAuth(dataFromChild);

  return (
    <Styles id="buy_section">
      {auth === "signin" && <Signin page="lesson" getData={changeState} />}
      {auth === "signup" && <Signup page="lesson" getData={changeState} />}
      {auth === "reset" && <RequestReset getData={changeState} />}
    </Styles>
  );
};

export default Auth;
