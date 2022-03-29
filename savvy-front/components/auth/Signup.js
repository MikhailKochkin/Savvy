import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import { gql } from "@apollo/client";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";
import { Unis, Companies, Tracks } from "../../config";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $number: String
    $surname: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $company: String
    $uniID: String
    $careerTrackID: String
  ) {
    signup(
      email: $email
      name: $name
      number: $number
      surname: $surname
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      company: $company
      uniID: $uniID
      careerTrackID: $careerTrackID
    ) {
      token
      user {
        id
      }
    }
  }
`;

const Form = styled.form`
  min-width: 450px;
  font-size: 1.6rem;
  overflow-y: scroll;

  @media (max-width: 800px) {
    min-width: 100px;
    max-width: 100%;
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
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
    color: #787878;
  }
  #standard-select-currency {
    width: 90%;
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  #standard-select-currency-label {
    display: none;
  }
`;

const Comment = styled.div`
  font-size: 1.2rem;
  line-height: 1.4;
  max-width: 450px;
  margin-bottom: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  input {
    width: 48%;
    background: none;
    font-size: 1.6rem;
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

const PhoneInput = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 5px;
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
`;

const Transit = styled.div`
  margin-top: 3%;
  font-size: 1.4rem;
  width: 100%;
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
    width: "100%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
  formControl: {
    fontSize: "1.5rem",
  },
});

const Signup = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("LAWYER");
  const [uniID, setUniID] = useState("ckhxpu4sj0000k8rkthw1no3o");
  const [company, setCompany] = useState("ckhxpvj4b0040k8rkag97bkza");
  const [careerTrackID, setCareerTrackID] = useState(
    "ckhxpur6r0017k8rkw0qp2rp2"
  );
  const [isFamiliar, setIsFamiliar] = useState(true);

  const { t } = useTranslation("auth");

  const classes = useStyles();

  const move = (e) => {
    const name = e.target.getAttribute("name");
    props.getData(name);
  };
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{
        name: name,
        surname: surname,
        password: password,
        email: email,
        number: number,
        status: status,
        uniID: uniID,
        company: company,
        careerTrackID: careerTrackID,
        isFamiliar: isFamiliar,
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isFamiliar) {
              alert("Не забыли про согласие на обработку персональных данных?");
              return;
            } else if (status === "") {
              alert("Укажите свой статус на сайте!");
              return;
            } else if (surname === "") {
              alert("Укажите свою фамилию!");
              return;
            }
            const res = await signup();
            props.closeNavBar(true);
            setEmail("");
            setName("");
            setSurname("");
            setPassword("");
            (status === "AUTHOR" || status === "HR") &&
              setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>{t("c2a")}</Title>
            <Error error={error} />
            <Group>
              <input
                className="name"
                type="text"
                name="name"
                placeholder={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="surname"
                type="text"
                name="surname"
                placeholder={t("surname")}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Group>
            <Input
              className="email"
              type="email"
              name="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
            <PhoneInput
              className="number"
              type="tel"
              name="number"
              placeholder={t("number")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Number"
            />
            <Comment>
              We need your phone number to send personalized feedback to your
              WhatsApp
            </Comment>
            <Input
              className="password"
              type="password"
              name="password"
              placeholder={t("create_password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? t("signing_up") : t("button")}
            </Button>
            <Comment>
              By clicking Sign Up, I agree to the the Terms of Service and
              Privacy Policy.
            </Comment>
            <Transit>
              {t("already_registered")}{" "}
              <span name="signin" onClick={move}>
                {t("login")}
              </span>
            </Transit>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
