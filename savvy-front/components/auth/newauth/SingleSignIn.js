import { useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "cookies-next";
import PropTypes from "prop-types";
import { CURRENT_USER_QUERY } from "../../User";

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

const SINGLE_SIGNUP_MUTATION = gql`
  mutation SINGLE_SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
  ) {
    singleSignup(
      email: $email
      name: $name
      surname: $surname
      password: $password
    ) {
      token
      user {
        id
      }
    }
  }
`;

const USERS_QUERY = gql`
  query USERS_QUERY($email: String!) {
    users(email: $email) {
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

const SingleSignIn = (props) => {
  const { data, status } = useSession();
  const router = useRouter();

  const [singleSignup, { single_signup_error, single_signup_loading }] =
    useMutation(SINGLE_SIGNUP_MUTATION);
  const [singleSignin, { single_error, single_loading }] = useMutation(
    SINGLE_SIGNIN_MUTATION
  );

  const {
    loading: users_loading,
    error: users_error,
    data: users_data,
  } = useQuery(USERS_QUERY, {
    variables: {
      email: data ? data.user.email : null,
    },
    skip: !data,
  });

  let url = props.pathname ? props.pathname : "/";
  props.referrerId ? (url = url + "&referrerId=" + props.referrerId) : null;
  useEffect(() => {
    if (users_data?.users?.length > 0) {
      const fetchData = async () => {
        if (data) {
          const res = await singleSignin({
            variables: {
              email: data.user.email,
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          });
          if (props.type == "main") {
            router.push(url);
          }
        }
      };
      fetchData();
    } else if (users_data?.users?.length == 0) {
      const googleSignup = async () => {
        if (data) {
          const [name, surname] = data.user.name.split(" ");
          const res = await singleSignup({
            variables: {
              name: name,
              surname: surname,
              email: data.user.email,
              password: uuidv4(),
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          });
          if (props.type == "main") {
            router.push(url);
          }
        }
      };
      googleSignup();
    }
  }, [data, users_data?.users]);

  if (status === "loading") return <h1>Loading... please wait</h1>;
  if (status === "authenticated") {
    return <div>Signed in with Google</div>;
  }
  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
    },
  ];

  return (
    <>
      <GoogleButton onClick={() => signIn("google")}>
        <img src="/static/google_logo.webp" />
        <span>Continue with Google</span>
      </GoogleButton>
    </>
  );
};

SingleSignIn.propTypes = {
  type: PropTypes.string, // Type of sign-in ("main" or undefined)
  pathname: PropTypes.string, // Pathname to redirect to after sign-in
};

export default SingleSignIn;
