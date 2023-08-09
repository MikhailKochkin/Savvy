import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useTranslation } from "next-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { getCookie } from "cookies-next";

import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";

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
  min-width: 450px;
  max-width: 520px;
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
  padding: 15px;
  input {
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  @media (max-width: 800px) {
    min-width: 100px;
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

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

const Transit = styled.div`
  margin-top: 3%;
  width: 100%;
  font-size: 1.4rem;
  span {
    color: #112a62;
    font-weight: 600;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  button: {
    width: "100%",
    marginBottom: "2%",
    fontSize: "1.7rem",
    fontFamily: "Montserrat",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const change = (e) => props.getData(e.target.getAttribute("name"));
  const { t } = useTranslation("auth");
  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
    },
  ];

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{
        email: email,
        password: password,
        traffic_sources: { visitsList: visits },
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin, { error, loading }) => (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signin();
            props.closeNavBar ? props.closeNavBar(true) : null;
            setPassword("");
            setEmail("");
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>
              👋 {props.page == "lesson" ? t("signin_lesson_page") : t("c2a2")}
            </Title>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? t("entering") : t("enter")}
            </Button>
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
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signin;

export { SIGNIN_MUTATION };
