import React, { useState } from "react";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
import WideSignIn from "./WideSignIn";
import WideSignUp from "./WideSignUp";
import WideRequestReset from "./WideRequestReset";

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

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data }, loading) => {
        if (loading) return <p>Loading...</p>;
        console.log(data);
        // if (!data.me) {
        //   return (
        //     <Styles>
        //       <div id="content">{props.children}</div>
        //       <Title>
        //         Что-то не получается? Просто зарегистрируйтесь или войдите в
        //         аккаунт и все заработает! 😉
        //       </Title>
        //       {auth === "signin" && <WideSignIn getData={changeState} />}
        //       {auth === "signup" && <WideSignUp getData={changeState} />}
        //       {this.state.auth === "reset" && (
        //         <WideRequestReset getData={changeState} />
        //       )}
        //     </Styles>
        //   );
        // }
        return props.children;
      }}
    </Query>
  );
};

export default PleaseSignIn;
