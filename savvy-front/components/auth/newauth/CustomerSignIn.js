import { useEffect, useState } from "react";
import { useMutation, gql, useQuery, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "cookies-next";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import { CURRENT_USER_QUERY } from "../../User";
import Error from "../../ErrorMessage";

const SINGLE_SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!) {
    singleSignin(email: $email) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

// const SINGLE_SIGNUP_MUTATION = gql`
//   mutation SINGLE_SIGNUP_MUTATION(
//     $email: String!
//     $name: String!
//     $surname: String!
//     $password: String!
//   ) {
//     singleSignup(
//       email: $email
//       name: $name
//       surname: $surname
//       password: $password
//     ) {
//       token
//       user {
//         id
//       }
//     }
//   }
// `;

const CLIENTS_TAGS_QUERY = gql`
  query CLIENTS_TAGS_QUERY($tag: [String!]!) {
    users(where: { tags: { hasSome: $tag } }) {
      id
      email
      name
      surname
    }
  }
`;

const GoogleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: #fff;
  border: 2px solid #e4e8eb;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: Montserrat;
  text-align: center;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: #f9f9f9;
  }
  img {
    width: 30px;
    margin-right: 5px;
  }
  @media (max-width: 800px) {
    min-width: 100px;
    width: 100%;
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

const CustomerSingleSignIn = (props) => {
  const [email, setEmail] = useState();
  const [customUsers, setCustomUsers] = useState([]);
  const { data, status } = useSession();
  const router = useRouter();

  const [singleSignin, { error, loading }] = useMutation(
    SINGLE_SIGNIN_MUTATION
  );
  const { t } = useTranslation("auth");
  const [
    getCustomUsers,
    { loading: loading3, error: error3, data: user_data },
  ] = useLazyQuery(CLIENTS_TAGS_QUERY);

  useEffect(() => {
    const fetchData = async () => {
      if (props.authSource) {
        console.log("authSource", props.authSource);
        const customUsers = await getCustomUsers({
          variables: {
            tag: [props.authSource.toLowerCase()],
          },
        });
        console.log("customUsers", customUsers.data.users);
        setCustomUsers([...customUsers.data.users]);
      }
    };

    fetchData();
  }, [props.authSource]); // Consider adding props.authSource to the dependency array if it can change over time

  let url = props.pathname ? props.pathname : "/";

  const signInWithCustomProvider = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    // 1. first find the user in the DB
    if (customUsers.length === 0) {
      alert("No user found with this email address");
      return;
    } else {
      let auth_seeking_user = customUsers.find((user) => user.email === email);
      console.log("auth_seeking_user", auth_seeking_user);

      if (!auth_seeking_user) {
        alert("No user found with this email address");
        return;
      }
      const res = await singleSignin({
        variables: {
          email: auth_seeking_user.email,
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    }
  };

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
          {/* <PurpleButton type="submit" variant="contained" color="primary">
            {loading ? t("entering") : t("enter")}
          </PurpleButton> */}
        </Fieldset>
      </Form>{" "}
      <GoogleButton onClick={() => signInWithCustomProvider()}>
        <img src="https://assets.circle.so/g4wjpw3vylqle5puc5z8n2r5p66v" />
        <span>Continue with Wealthbrite</span>
      </GoogleButton>
    </>
  );
};

CustomerSingleSignIn.propTypes = {
  type: PropTypes.string, // Type of sign-in ("main" or undefined)
  pathname: PropTypes.string, // Pathname to redirect to after sign-in
};

export default CustomerSingleSignIn;
