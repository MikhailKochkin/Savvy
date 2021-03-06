import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import gql from "graphql-tag";
import Router from "next/router";
import Error from "../ErrorMessage";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { CURRENT_USER_QUERY } from "../User";
import { Unis, Companies, Tracks } from "../../config";

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
  font-size: 1.6rem;
  width: 33%;
  margin-bottom: 3%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Fieldset = styled.fieldset`
  padding: 15px;
  display: flex;
  flex-direction: column;
  padding: 4%;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
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
  &.password {
    margin-bottom: 0px;
  }
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

const WideSignUp = (props) => {
  const [state, setState] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
    status: "LAWYER",
    uniID: "cjyimfz2e00lp07174jpder3m",
    company: "ck7f4ooa201ro0736gzahsdhn",
    careerTrackID: "cjwx78u7700rb07121pelqctm",
    isFamiliar: false,
  });

  const classes = useStyles();

  const move = (e) => {
    const name = e.target.getAttribute("name");
    props.getData(name);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{
        name: state.name,
        surname: state.surname,
        password: state.password,
        email: state.email,
        status: state.status,
        uniID: state.uniID,
        company: state.company,
        careerTrackID: state.careerTrackID,
        isFamiliar: state.isFamiliar,
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!state.isFamiliar) {
              alert("Не забыли про согласие на обработку персональных данных?");
              return;
            } else if (state.status === "") {
              alert("Укажите свой статус на сайте!");
              return;
            } else if (state.surname === "") {
              alert("Укажите свою фамилию!");
              return;
            }
            await signup();
            (state.status === "AUTHOR" || state.status === "HR") &&
              setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
          }}
        >
          <Fieldset
            disabled={loading}
            aria-busy={loading}
            className={classes.root}
          >
            <Title>Зарегистрируйтесь на BeSavvy App</Title>
            <Error error={error} />
            <Input
              className="name"
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue={state.name}
              onChange={onChange}
              label="Имя"
            />
            <Input
              className="surname"
              type="text"
              name="surname"
              placeholder="Фамилия"
              defaultValue={state.surname}
              onChange={onChange}
              label="Фамилия"
            />
            <Input
              className="email"
              type="email"
              name="email"
              placeholder="Почта"
              defaultValue={state.email}
              onChange={onChange}
              label="Электронная почта"
            />
            <Input
              className="password"
              type="password"
              name="password"
              placeholder="Пароль"
              defaultValue={state.password}
              onChange={onChange}
              label="Пароль"
            />
            <div className="condition">Выберите ваш статутс на сайте:</div>

            <TextField
              className={classes.root}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              id="standard-select-currency"
              select
              name="status"
              label="Select"
              value={state.status}
              onChange={onChange}
            >
              <MenuItem key="STUDENT" value="STUDENT">
                Студент
              </MenuItem>
              <MenuItem key="LAWYER" value="LAWYER">
                Юрист
              </MenuItem>
              <MenuItem key="AUTHOR" value="AUTHOR">
                Преподаватель
              </MenuItem>
              <MenuItem key="HR" value="HR">
                HR
              </MenuItem>
            </TextField>

            {(state.status === "HR" || state.status === "AUTHOR") && (
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
                  value={state.company}
                  onChange={onChange}
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

            {state.status === "STUDENT" && (
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
                  value={state.uniID}
                  onChange={onChange}
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
                  value={state.careerTrackID}
                  onChange={onChange}
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
            <div className="condition">
              Согласие на обработку персональных данных:
            </div>
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
              value={state.isFamiliar}
              onChange={onChange}
            >
              <MenuItem key={23425} value={true}>
                Да
              </MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? "Регистрируюсь" : "Зарегистрироваться"}
            </Button>
            <Transit>
              У вас уже есть аккаунт на BeSavvy App?{" "}
              <span name="signin" onClick={move}>
                Войти
              </span>
            </Transit>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default WideSignUp;
export { SIGNUP_MUTATION };
