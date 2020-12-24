import { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { Unis, Companies } from "../config";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: String!
    $name: String
    $surname: String
    $email: String
    $status: Status
    $isFamiliar: Boolean
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      surname: $surname
      status: $status
      isFamiliar: $isFamiliar
    ) {
      id
      name
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 50%;
  margin: 0 auto;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex: 85%;
  padding: 0;
  flex-direction: column;
  border: 1px solid #edefed;
  border-radius: 5px;
  input {
    height: 50%;
    width: 90%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 1%;
    margin-left: 2%;
    margin-bottom: 2%;
    font-size: 1.4rem;
    outline: 0;
  }
  select {
    width: 90%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    font-family: Montserrat;
    padding: 0.6em 1.4em 0.5em 0.8em;
    max-width: 100%;
    box-sizing: border-box;
    margin-left: 2%;
    margin-bottom: 0.5%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .checked {
    height: 20%;
    width: 30%;
    border: none;
    box-shadow: none;
  }
  .Title {
    background: #edefed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding-left: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 2%;
  }
`;

const Comment = styled.div`
  font-size: 1.4rem;
  color: #767676;
  margin-left: 3%;
  margin-top: 1%;
  line-height: 1.2;
  width: 90%;
  margin-bottom: 2%;
`;

const Container = styled.div``;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${(props) => props.theme.green};
  width: 30%;
  border-radius: 5px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2%;
  cursor: pointer;
  outline: 0;
  &:hover {
    background-color: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Green = styled.div`
  background: #4dac44;
  padding: 2%;
  border-radius: 10px;
  width: 45%;
  color: white;
  text-align: center;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Account = (props) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(props.me.status);
  const [name, setName] = useState(props.me.name);
  const [surname, setSurname] = useState(props.me.surname);
  const [email, setEmail] = useState(props.me.email);
  // careerTrackID
  // uniID
  // company

  const { me } = props;
  return (
    <>
      <Mutation
        mutation={UPDATE_USER_MUTATION}
        variables={{
          id: props.me.id,
          email,
          name,
          surname,
          status,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(updateUser, { error, loading }) => (
          <Form>
            <Fieldset disabled={loading} aria-busy={loading}>
              <>
                <div className="Title">Настройки аккаунта</div>
                <Green show={show}>Измнения внесены</Green>
                <Container>
                  <input
                    className="second"
                    type="text"
                    placeholder="Имя"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    className="second"
                    type="text"
                    placeholder="Фамилия"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <br />
                  <input
                    className="second"
                    type="text"
                    placeholder="Ваша электронная почта"
                    required
                    value={me.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <>
                    <select
                      defaultValue={me.status}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="NAN">Не выбран</option>
                      <option value="STUDENT">Студент</option>
                      <option value="AUTHOR">Преподаватель</option>
                      <option value="HR">HR</option>
                    </select>
                    <Comment>
                      Выберите статус, чтобы проходить курсы в качестве
                      студента, создавать курсы в качестве преподавателя или
                      искать сотрудников в качестве HR.
                    </Comment>
                  </>
                </Container>
                <Buttons>
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await updateUser();
                      console.log(res);
                    }}
                  >
                    Изменить
                  </Button>
                </Buttons>
              </>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    </>
  );
};

export default Account;
