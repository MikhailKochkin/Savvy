import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useTranslation } from "next-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";

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

const Styles = styled.div`
  width: 44%;
  min-width: 410px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-align: center;
    justify-content: center;
    .variants {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 1.4rem;
      margin-bottom: 15px;
      .variants_form {
        max-width: 45%;
        display: flex;
        flex-direction: row;
        padding: 5px;
        align-items: flex-start;
        justify-content: flex-start;
        border: 1px solid #d8d8d8;
        border-radius: 10px;
        margin-right: 6px;
        margin-bottom: 6px;
        label {
          line-height: 1.6;
        }
        div {
          width: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          input {
            margin: 0;
            padding: 0;
            margin-top: 5px;
          }
        }
      }
    }
    .h2 {
      width: 100%;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 3.8rem;
      line-height: 1.2;
    }
    form {
      width: 100%;
      .names {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        input {
          width: 48%;
        }
      }
    }
  }
  input {
    width: 100%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
    font-weight: 500;
    background: none;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.6rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #a0a0a0;
      opacity: 1; /* Firefox */
    }
  }
  #explainer {
    width: 100%;
    font-size: 1.4rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  #legal {
    color: #fff;
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
      color: #fff;
    }
  }
  button {
    width: 100%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #f9d801;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dfc201;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    min-width: 100px;
    height: auto;

    flex-direction: column;
    padding: 4% 4%;
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    form {
      width: 100%;
      border: none;
      .names {
        width: 100%;
      }
    }
    #form_container {
      width: 100%;

      .variants {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .variants_form {
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
          label {
            font-size: 1.6rem;
            line-height: 1.4;
          }
          div {
            width: 30%;
            max-width: 30%;
            input[type="radio"] {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
`;

const Title = styled.div`
  font-size: 2.4rem;
  margin: 30px 0;
  font-weight: 700;
  line-height: 1.4;
  width: 100%;
  text-align: center;
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
        <Styles
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signin();
            setPassword("");
            setEmail("");
          }}
        >
          <form disabled={loading} aria-busy={loading}>
            {/* <Title>{t("c2a2")}</Title> */}

            <Error error={error} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              name="email"
              placeholder={t("email")}
              label="Электронная почта"
            />
            <input
              type="password"
              name="password"
              label="Пароль"
              value={password}
              placeholder={t("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? "..." : "Войти"}
            </button>
            {/* <Transit>
              <div>
                <span name="reset" onClick={change}>
                  {t("forgot_password")}
                </span>
              </div>
              {t("not_registered_yet")}{" "}
              <span name="signup" onClick={change}>
                {t("signup")}
              </span>
            </Transit> */}
          </form>
        </Styles>
      )}
    </Mutation>
  );
};

export default Signin;

export { SIGNIN_MUTATION };
