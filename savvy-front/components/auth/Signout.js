import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";

import { CURRENT_USER_QUERY } from "../User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const ClassicButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  padding: 1px 6px;
  font-weight: 600;
  @media (max-width: 850px) {
    color: white;
    margin: 8px 8px 8px 32px;
  }
  &:hover {
    color: #5c5c5c;
  }
`;

const LandingButton = styled.div`
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

const Signout = ({ landing }) => {
  const { t } = useTranslation("nav");
  const { data, status } = useSession();

  const [signoutMutation] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSignout = async () => {
    if (status === "authenticated") {
      await signOut("google");
    }
    await signoutMutation();
  };

  return landing ? (
    <LandingButton onClick={handleSignout}>{t("sign_out")}</LandingButton>
  ) : (
    <ClassicButton onClick={handleSignout}>{t("sign_out")}</ClassicButton>
  );
};

export default Signout;
