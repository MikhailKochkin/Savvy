import { useState } from "react";
import styled from "styled-components";
import WideSignIn from "./WideSignIn";
import WideSignUp from "./WideSignUp";
import WideRequestReset from "./WideRequestReset";
import { useUser } from "../User";
import { useRouter } from "next/router";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #content {
    pointer-events: none;
    width: 100%;
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
  width: 33%;
  text-align: center;
  margin-top: 3%;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const PleaseSignIn = (props) => {
  const [auth, setAuth] = useState("signin");
  const changeState = (dataFromChild) => setAuth(dataFromChild);
  const me = useUser();
  const router = useRouter();

  if (!me)
    return (
      <Styles>
        <Title>
          {router.locale == "en" ? (
            <>Something went wrong? Just log in or create an account 😉</>
          ) : (
            <>
              Что-то не получается? Просто зарегистрируйтесь или войдите в
              аккаунт и все заработает! 😉
            </>
          )}
        </Title>
        {auth === "signin" && <WideSignIn getData={changeState} />}
        {auth === "signup" && <WideSignUp getData={changeState} />}
        {auth === "reset" && <WideRequestReset getData={changeState} />}{" "}
      </Styles>
    );
  return props.children;
};

export default PleaseSignIn;
