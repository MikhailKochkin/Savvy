import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const SubmitButton = styled.button`
  flex: 50%;
  background-color: #84bc9c;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
  padding: 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 1px solid black;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
  }
`;

const Form = styled.form`
  width: 30%;
  margin: 50%;
  margin: 0 auto;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  margin: 10% 0;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(2 70px);
  .password {
    grid-area: first;
  }
  .password2 {
    grid-area: second;
  }
  grid-template-areas:
    "first   "
    "second   ";
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
    margin-bottom: 2%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  padding: 3%;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Reset = (props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { t } = useTranslation("auth");

  const [reset, { error, loading }] = useMutation(RESET_MUTATION, {
    variables: {
      resetToken: props.resetToken,
      password: password,
      confirmPassword: confirmPassword,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t("not_match") + "!");
      return;
    }
    await reset();
    setPassword("");
    setConfirmPassword("");
    router.push("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset disabled={loading} aria-busy={loading}>
        <Title>{t("update_password")}</Title>
        <Error error={error} />
        <Container>
          <input
            className="second"
            type="password"
            name="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="second"
            type="password"
            name="confirmPassword"
            placeholder={t("repeat_the_password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Container>
        <Buttons>
          <SubmitButton type="submit">{t("update_password")}</SubmitButton>
        </Buttons>
      </Fieldset>
    </Form>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
