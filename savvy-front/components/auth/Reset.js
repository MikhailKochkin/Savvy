import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const SubmitButton = styled.button`
    background-color: #008CBA;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 2%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 600;
    width: 50%;
    cursor: pointer;
    &:hover {
        background: #0B3954;
    }
`;

const Form = styled.form`
    width: 40%;
    margin: 50%;
    margin: 0 auto;
    font-size: 1.6rem;
    @media (max-width: 800px) {
        width: 80%;
    }
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
                0 5px 15px 0 rgba(0,0,0,0.08);
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(2 70px);
    .password {
        grid-area: first;
    }
    .password2 {
        grid-area: second;
    }
    grid-template-areas:
        "first   "
        "second   ";
`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 35% 65%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    .first {
        grid-area: first;
    }
    .second {
        grid-area: second;
    }
    grid-template-areas:
        "first second";
    input {
        height: 50%;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;

    }
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;


const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    margin-top: 2%;
    padding: 3%;
    border-top: solid 1px #F0F0F0;
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              this.state.password !== this.state.confirmPassword ?
              alert("Пароли не совпадают!") :
              await reset();
              this.setState({ password: '', confirmPassword: '' });
            }}
          >
            <Fieldset disabled={loading} aria-busy={loading}>
              <h2>Измените пароль</h2>
              <Error error={error} /> 
              <Container>
                <Label className="password" htmlFor="password">
                  <p className="first">Новый пароль</p>
                  <input
                    className="second"
                    type="password"
                    name="password"
                    placeholder="пароль"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </Label>

                <Label className="password2" htmlFor="confirmPassword">
                <p className="first">Повотрите пароль</p>
                  <input
                    className="second"
                    type="password"
                    name="confirmPassword"
                    placeholder="Повотрите пароль"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </Label>
              </Container>
              <Buttons>
                <SubmitButton type="submit">Изменить пароль</SubmitButton>
              </Buttons>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;