import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";
import { withTranslation } from "../../i18n";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: none;
  font-family: Montserrat;
  outline: 0;
  border-bottom: 1px solid #949494;
  padding-bottom: 1%;
  margin-bottom: 15px;
  &:hover {
    border-bottom: 1px solid #1a2a81;
  }
  &:focus {
    border-bottom: 2px solid #1a2a81;
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
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{
        email: email,
        password: password,
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin, { error, loading }) => (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signin();
            props.closeNavBar(true);
            setPassword("");
            setEmail("");
            console.log(res.data);
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>{props.t("header")}</Title>
            <Error error={error} />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              name="email"
              placeholder={props.t("mail")}
              label="Электронная почта"
            />
            <Input
              type="password"
              name="password"
              label="Пароль"
              value={password}
              placeholder={props.t("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? props.t("signing_in") : props.t("sign_in")}
            </Button>
            <Transit>
              <div>
                <span name="reset" onClick={change}>
                  {props.t("forgot")}
                </span>
              </div>
              {props.t("not_member")}
              <span name="signup" onClick={change}>
                {props.t("create")}
              </span>
            </Transit>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default withTranslation("signup")(Signin);
export { SIGNIN_MUTATION };
