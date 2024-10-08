import { useTranslation } from "next-i18next";
import styled from "styled-components";
import PropTypes from "prop-types";

import SingleSignIn from "./SingleSignIn";
import PasswordSignup from "./PassWordSignup";

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
  span {
    color: #702eff;
    font-weight: 600;
    cursor: pointer;
  }
`;

const Signup = (props) => {
  const { t } = useTranslation("auth");
  const change = (e) => props.getData(e.target.getAttribute("name"));
  return (
    <Container>
      <Title>
        {/* 👋 {props.page == "lesson" ? t("signin_lesson_page") : t("c2a2")} */}
        👋 {t("c2a2")}
      </Title>
      <PasswordSignup
        pathname={props.pathname}
        type={props.type}
        referrerId={props.referrerId}
      />
      <div id="sign_or">{t("or")}</div>
      <SingleSignIn redirect={props.pathname} type={props.type} />
      <Transit>
        {t("not_registered_yet")}{" "}
        <span name="signin" onClick={change}>
          {t("signin")}
        </span>
      </Transit>
      <Legal>{t("agree_terms")}</Legal>
    </Container>
  );
};

Signup.propTypes = {
  getData: PropTypes.func.isRequired, // Function to handle data retrieval
  pathname: PropTypes.string, // Pathname to redirect to after sign-in
  type: PropTypes.string, // Type of sign-in ("main" or undefined)
};

export default Signup;
