import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";

import { CURRENT_USER_QUERY } from "../../User";
import Error from "../../ErrorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
    $traffic_sources: Visits
  ) {
    signin(
      email: $email
      password: $password
      traffic_sources: $traffic_sources
    ) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

const Form = styled.form`
  width: 480px;
  font-size: 1.6rem;
  z-index: 101;
  @media (max-width: 800px) {
    min-width: 100px;
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0px;
  @media (max-width: 800px) {
    min-width: 100px;
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  background: none;
  font-size: 1.4rem;
  border: 2px solid #e4e8eb;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  &[type="password"] {
    font-size: 1.4rem;
  }

  &:hover {
    border: 2px solid #702eff;
  }
  &:focus {
    border: 2px solid #702eff;
  }
`;

const PurpleButton = styled.button`
  width: 100%;
  background: #702eff;
  font-size: 1.8rem;
  font-weight: 500;
  height: 45px;
  color: #fff;
  border-radius: 8px;
  border: 4px solid #702eff;
  font-family: Montserrat;
  outline: 0;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 4px solid #edaf20;
  }
`;

const PasswordSignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { t } = useTranslation("auth");
  // all mutations and queries
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION);

  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
    },
  ];

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await signin({
            variables: {
              email: email,
              password: password,
              traffic_sources: { visitsList: visits },
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          });
          if (props.type == "main") {
            router.push(props.pathname ? props.pathname : "/");
          }
        }}
      >
        <Fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="standard-basic"
            name="email"
            placeholder={t("email")}
            label="Электронная почта"
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            value={password}
            placeholder={t("password")}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PurpleButton type="submit" variant="contained" color="primary">
            {loading ? t("entering") : t("enter")}
          </PurpleButton>
        </Fieldset>
      </Form>{" "}
    </>
  );
};

PasswordSignIn.propTypes = {
  type: PropTypes.string, // Type of sign-in ("main" or undefined)
  pathname: PropTypes.string, // Pathname to redirect to after sign-in
};

export default PasswordSignIn;

export { SIGNIN_MUTATION };
