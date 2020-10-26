import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
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
  margin-left: 8px;
  cursor: pointer;
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  &:hover {
    color: #6daae1;
  }
`;

const Signout = (props) => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <Button onClick={signout}>
        <a>{props.t("signout")}</a>
      </Button>
    )}
  </Mutation>
);

export default withTranslation("common")(Signout);
