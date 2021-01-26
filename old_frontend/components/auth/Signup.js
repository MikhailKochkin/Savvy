import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import gql from "graphql-tag";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";
import { Unis, Companies, Tracks } from "../../config";
import { withTranslation } from "../../i18n";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
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
  min-width: 400px;
  font-size: 1.6rem;
  line-height: 1.5;
  @media (max-width: 800px) {
    min-width: 100px;
    max-width: 100%;
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
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
    color: #787878;
  }
  #standard-select-currency {
    width: 87%;
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  #standard-select-currency-label {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    margin-bottom: 0px;
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
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    width: "100%",
  },
  labelRoot: {
    fontSize: "1.5rem",
    width: "100%",
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
  const [status, setStatus] = useState("LAWYER");
  const [uniID, setUniID] = useState("cjyimfz2e00lp07174jpder3m");
  const [company, setCompany] = useState("ck7f4ooa201ro0736gzahsdhn");
  const [careerTrackID, setCareerTrackID] = useState(
    "cjwx78u7700rb07121pelqctm"
  );
  const [isFamiliar, setIsFamiliar] = useState(false);

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
            cookies.set("token", res.data.signup.token);
            props.closeNavBar(true);
            setEmail("");
            setName("");
            setSurname("");
            setPassword("");
            (status === "AUTHOR" || status === "HR") &&
              setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
          }}
        >
          <Fieldset
            disabled={loading}
            aria-busy={loading}
            className={classes.root}
          >
            <Title>{props.t("header2")}</Title>
            <Error error={error} />
            <Input
              className="name"
              type="text"
              name="name"
              placeholder={props.t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="surname"
              type="text"
              name="surname"
              placeholder={props.t("surname")}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Input
              className="email"
              type="email"
              name="email"
              placeholder={props.t("mail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
            <Input
              className="password"
              type="password"
              name="password"
              placeholder={props.t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
            />
            <div className="condition">{props.t("status")}</div>
            <TextField
              className={classes.root}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              id="standard-select-currency"
              select
              label="Select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem key="STUDENT" value="STUDENT">
                {props.t("student")}
              </MenuItem>
              <MenuItem key="LAWYER" value="LAWYER">
                {props.t("lawyer")}
              </MenuItem>
              <MenuItem key="AUTHOR" value="AUTHOR">
                {props.t("author")}
              </MenuItem>
              {/* <MenuItem key="HR" value="HR">
                HR
              </MenuItem> */}
            </TextField>

            {(status === "HR" || status === "AUTHOR") && (
              <>
                <div className="condition">Из какой вы компании?</div>
                <TextField
                  className="company"
                  name="company"
                  className={classes.root}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    },
                  }}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  {Companies.map((co) => (
                    <MenuItem
                      key={Object.values(co)[0]}
                      value={Object.values(co)[0]}
                    >
                      {Object.keys(co)[0]}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}

            {status === "STUDENT" && (
              <>
                <TextField
                  className="uni"
                  name="uniID"
                  className={classes.root}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    },
                  }}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={uniID}
                  onChange={(e) => setUniID(e.target.value)}
                >
                  {Unis.map((uni) => (
                    <MenuItem
                      key={Object.values(uni)[0]}
                      value={Object.values(uni)[0]}
                    >
                      {Object.keys(uni)[0]}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="condition">
                  Выберите направление, в котором
                  <br /> вы хотите развивать карьеру.
                </div>
                <TextField
                  className="careerTrackID"
                  name="careerTrackID"
                  className={classes.root}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    },
                  }}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={careerTrackID}
                  onChange={(e) => setCareerTrackID(e.target.value)}
                >
                  {Tracks.map((track) => (
                    <MenuItem
                      key={Object.values(track)[0]}
                      value={Object.values(track)[0]}
                    >
                      {Object.keys(track)[0]}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
            <div className="condition">{props.t("privacy")} </div>
            <TextField
              name="isFamiliar"
              className="isFamiliar"
              className={classes.root}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              id="standard-select-currency"
              select
              label="Select"
              value={isFamiliar}
              onChange={(e) => setIsFamiliar(e.target.value)}
            >
              <MenuItem key={23425} value={true}>
                {props.t("yes")}
              </MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? props.t("signing_up") : props.t("sign_up")}
            </Button>
            <Transit>
              {props.t("already_member")}
              <span name="signin" onClick={move}>
                {props.t("sign_in")}
              </span>
            </Transit>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default withTranslation("signup")(Signup);
export { SIGNUP_MUTATION };
