import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Form = styled.form`
  min-width: 400px;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    min-width: 100px;
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 15px;
  input {
    font-size: 1.6rem;
    font-family: Montserrat;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Transit = styled.div`
  margin-top: 3%;
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
    fontSize: "1.4rem",
    textTransform: "none"
  },
  root: {
    marginBottom: "4%"
  },
  labelRoot: {
    fontSize: "1.5rem"
  }
});

const Signin = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const change = e => props.getData(e.target.getAttribute("name"));
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{
        email: email,
        password: password
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin, { error, loading }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault();
            await signin();
            props.closeNavBar(true);
            setPassword("");
            setEmail("");
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>Войдите на Savvy App</Title>
            <Error error={error} />
            <TextField
              type="text"
              className={classes.root}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot
                }
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="standard-basic"
              name="email"
              label="Электронная почта"
            />
            <TextField
              type="password"
              className={classes.root}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot
                }
              }}
              id="standard-basic"
              name="password"
              label="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? "Вхожу" : "Войти"}
            </Button>
            <Transit>
              <div>
                <span name="reset" onClick={change}>
                  Забыли пароль?
                </span>
              </div>
              Ещё не зарегистрированы на Savvy?{" "}
              <span name="signup" onClick={change}>
                Зарегистрироваться
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
