import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getCookie } from "cookies-next";
import * as EmailValidator from "email-validator";

import Error from "../../ErrorMessage";
import { CURRENT_USER_QUERY } from "../../User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $number: String
    $surname: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $traffic_sources: Visits
  ) {
    signup(
      email: $email
      name: $name
      number: $number
      surname: $surname
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      traffic_sources: $traffic_sources
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
  max-width: 520px;

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
  padding: 0px;
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
  width: 100%;
  margin-bottom: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  input {
    width: 48%;
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
    &:focus {
      outline: none; /* Remove the default focus outline */
      background-color: transparent; /* Set the background color to transparent */
    }
    &:hover {
      border: 2px solid #702eff;
    }
    &:focus {
      border: 2px solid #702eff;
    }
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
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px #fff inset; /* Override the autofill box shadow */
    -webkit-text-fill-color: #333; /* Override the autofill text color */
    background-color: transparent !important; /* Override the autofill background color */
  }
  &[type="password"] {
    font-size: 1.4rem;
  }
  &:hover {
    border: 2px solid #702eff;
  }
  &:focus {
    border: 2px solid #702eff;
    outline: none; /* Remove the default focus outline */
    background-color: transparent; /* Set the background color to transparent */
  }
`;

const PhoneInput = styled.input`
  width: 100%;
  height: 45px;
  background: none;
  font-size: 1.4rem;
  border: 2px solid #e4e8eb;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: 0.3s ease-in;
  &:hover {
    border: 2px solid #702eff;
  }
  &:focus {
    border: 2px solid #702eff;
    outline: none; /* Remove the default focus outline */
    background-color: transparent; /* Set the background color to transparent */
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

const PasswordSignup = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("LAWYER");
  const [isFamiliar, setIsFamiliar] = useState(true);

  const { t } = useTranslation("auth");
  const router = useRouter();

  // Construct the URL correctly
  let url = props.pathname ? props.pathname : "/";
  if (props.referrerId) {
    // Check if there are already query parameters in the URL
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}referrerId=${props.referrerId}`;
  }

  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
    },
  ];

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: name,
      surname: surname,
      password: password,
      email: email,
      number: number,
      status: status,
      isFamiliar: isFamiliar,
      traffic_sources: { visitsList: visits },
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        if (surname === "") {
          alert(t("give_surname"));
          return;
        } else if (!EmailValidator.validate(email)) {
          alert(t("give_email"));
          return;
        } else if (number === "" || number.length < 7) {
          alert(t("give_number"));
          return;
        }
        const res = await signup();
        if (props.type == "main") {
          router.push(url);
        }
        setEmail("");
        setName("");
        setSurname("");
        setPassword("");
      }}
    >
      <Fieldset disabled={loading} aria-busy={loading}>
        {/* <Title>{t("c2a")}</Title> */}
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
        <Comment>{t("need_whatsapp")}</Comment>
        <Input
          className="password"
          type="password"
          name="password"
          placeholder={t("create_password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Пароль"
        />
        <PurpleButton type="submit" variant="contained" color="primary">
          {loading ? t("signing_up") : t("button")}
        </PurpleButton>
      </Fieldset>
    </Form>
  );
};

export default PasswordSignup;
export { SIGNUP_MUTATION };
