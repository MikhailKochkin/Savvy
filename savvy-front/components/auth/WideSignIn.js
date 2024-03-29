import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { useTranslation } from "next-i18next";
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
  width: 550px;
  font-size: 1.6rem;
  margin-bottom: 5%;
  @media (max-width: 800px) {
    width: 95%;
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

const BlueButton = styled.button`
  width: 100%;
  background: #3b5bb3;
  font-size: 1.8rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
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

// const useStyles = makeStyles({
//   button: {
//     width: "100%",
//     marginBottom: "2%",
//     fontSize: "1.7rem",
//     fontFamily: "Montserrat",
//     textTransform: "none",
//   },
//   root: {
//     marginBottom: "4%",
//   },
//   labelRoot: {
//     fontSize: "1.5rem",
//   },
// });

const WideSignin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const classes = useStyles();
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
            // cookies.set("token", res.data.signin.token);
            // props.closeNavBar(true);
            setPassword("");
            setEmail("");
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>{t("c2a2")}</Title>
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
            <BlueButton type="submit" variant="contained" color="primary">
              {loading ? t("entering") : t("enter")}
            </BlueButton>
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

export default WideSignin;
export { SIGNIN_MUTATION };
