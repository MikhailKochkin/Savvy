import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
// import { withTranslation } from "../../i18n";

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
  cursor: pointer;
  min-width: 80px;
  display: flex;
  font-size: 1.6rem;

  flex-direction: row;
  justify-content: flex-end;
  a {
    &:hover {
      border-bottom: 1px solid #112a62;
    }
    font-size: 1.6rem;
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
        <a>Выйти</a>
      </Button>
    )}
  </Mutation>
);

// export default withTranslation("common")(Signout);
export default Signout;
