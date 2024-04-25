import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../User";
import { useRouter } from "next/router";
import Auth from "./Auth";

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
        <Auth />
      </Styles>
    );
  return props.children;
};

export default PleaseSignIn;
