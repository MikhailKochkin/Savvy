import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import PropTypes from "prop-types";

import SingleSignIn from "./SingleSignIn";
import PasswordSignIn from "./PasswordSignIn";

const Title = styled.div`
  font-size: 2.4rem;
  margin: 30px 0;
  font-weight: 700;
  line-height: 1.4;
  width: 60%;
  text-align: center;
  @media (max-width: 800px) {
    width: 85%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #sign_or {
    margin: 20px 0;
  }
`;

const Transit = styled.div`
  margin-top: 40px;
  text-align: center;
  width: 100%;
  font-size: 1.4rem;
  span {
    color: #702eff;
    font-weight: 600;
    cursor: pointer;
  }
`;

const Legal = styled.div`
  margin-top: 40px;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  line-height: 1.4;
  span {
    color: #702eff;
    font-weight: 600;
    cursor: pointer;
  }
`;

const Signin = (props) => {
  const { t } = useTranslation("auth");
  const change = (e) => props.getData(e.target.getAttribute("name"));

  return (
    <Container>
      <Title>👋 {t("c2a2")}</Title>
      <PasswordSignIn
        pathname={props.pathname}
        type={props.type}
        referrerId={props.referrerId}
      />
      <div id="sign_or"> {t("or")}</div>
      <SingleSignIn
        pathname={props.pathname}
        type={props.type}
        referrerId={props.referrerId}
      />
      <Transit>
        <div>
          <span name="reset" onClick={change}>
            {t("forgot_password")}
          </span>
        </div>
        {t("not_registered_yet")}{" "}
        <span name="signup" onClick={change}>
          {t("signup")}
        </span>
      </Transit>
      <Legal>{t("agree_terms")}</Legal>
    </Container>
  );
};

Signin.propTypes = {
  getData: PropTypes.func.isRequired, // Function to handle data retrieval
  pathname: PropTypes.string, // Pathname to redirect to after sign-in
  type: PropTypes.string, // Type of sign-in ("main" or undefined)
};

export default Signin;
