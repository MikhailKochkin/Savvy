import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import { gql } from "@apollo/client";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../ErrorMessage";
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
  min-width: 400px;
  font-size: 1.6rem;
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
    width: 90%;
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
  const [status, setStatus] = useState("LAWYER");
  const [uniID, setUniID] = useState("ckhxpu4sj0000k8rkthw1no3o");
  const [company, setCompany] = useState("ckhxpvj4b0040k8rkag97bkza");
  const [careerTrackID, setCareerTrackID] = useState(
    "ckhxpur6r0017k8rkw0qp2rp2"
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
            <Title>Зарегистрируйтесь на Savvy App</Title>
            <Error error={error} />
            <Input
              className="name"
              type="text"
              name="name"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="surname"
              type="text"
              name="surname"
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Input
              className="email"
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
            <Input
              className="password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="Select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={isFamiliar}
              onChange={(e) => setIsFamiliar(e.target.value)}
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
              У вас уже есть аккаунт на Savvy App?{" "}
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

export default Signup;
export { SIGNUP_MUTATION };
