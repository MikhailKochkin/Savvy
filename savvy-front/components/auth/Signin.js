import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components';
import Error from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!,  $password: String!) {
        signin(email: $email, password: $password) {
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
    /* min-height: 400px; */
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(2 70px);
    .email {
        grid-area: first;
    }
    .password {
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

const LoggedIn = styled.p`
    background-color: #00FF7F;
    font-size: 1.8rem;
    padding: 1% 2%;
    border-radius: 10px;
    width: 45%;
    text-align: center;
`;

class Signin extends Component {
    state = {
        password: '',
        email: '',
        loggedIn: false
    }
    saveToState = e => {
        this.setState({ [e.target.name] : e.target.value}); 
    }
    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
            {(signin, {error, loading}) => (
               <Form 
                  method="post" 
                  onSubmit={ async e => {
                   e.preventDefault();
                   await signin();
                   this.setState({email: '', password: '', loggedIn: true});
                   }}
                >
                <Fieldset disabled={loading} aria-busy={loading}>
                    <h2>Войдите на Savvy</h2>
                    <Error error={error} />
                    {this.state.loggedIn && <LoggedIn>Вы вошли в аккаунт!</LoggedIn>}
                    <Container>
                        <Label className="email"htmlFor="email">
                            <p className="first">Электронная почта</p>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Почта"
                                value={this.state.email}
                                onChange={this.saveToState}
                            />
                        </Label>
                        <Label className="password" htmlFor="password">
                            <p className="first">Пароль</p>
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={this.state.password}
                                onChange={this.saveToState}
                            />
                        </Label>
                    </Container>
                    <Buttons>
                        <SubmitButton type="submit">{loading ? "Вхожу" : "Войти"}!</SubmitButton>
                    </Buttons>
                </Fieldset>
              </Form>
            )}
          </Mutation>
        );
    }
}

export default Signin;
export { SIGNIN_MUTATION };