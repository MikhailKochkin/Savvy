import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
import { useTranslation } from "next-i18next";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Button = styled.div`
  border-radius: 30px;
  border: 2px solid black;
  font-weight: 500;
  padding: 5px 25px;
  cursor: pointer;
  &:hover {
    color: #5c5c5c;
    cursor: pointer;
    border-color: #5c5c5c;
  }
`;

const NewSignout = (props) => {
  const { t } = useTranslation("nav");
  return (
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
          <a>{t("sign_out")}</a>
        </Button>
      )}
    </Mutation>
  );
};

export default NewSignout;
