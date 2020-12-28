import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
import { withTranslation } from "../../i18n";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Button = styled.div`
  border: none;
  background: none;
  font-size: 1.8rem;
  cursor: pointer;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  a {
    &:hover {
      border-bottom: 1px solid #112a62;
    }
  }
  @media (max-width: 850px) {
    color: white;
    margin: 8px 8px 8px 32px;
  }
`;

const Signout = (props) => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <Button
        onClick={async (e) => {
          const res = await signout();
        }}
      >
        <a>{props.t("signout")}</a>
      </Button>
    )}
  </Mutation>
);

export default withTranslation("common")(Signout);
