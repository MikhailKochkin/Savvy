import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import styled from 'styled-components';
import gql from "graphql-tag";
import Router from 'next/router';
import Error from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!, $isFamiliar: Boolean!) {
        signup(email: $email, name: $name, password: $password, isFamiliar: $isFamiliar) {
            id
            email
            name
            isFamiliar
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
    @media (max-width: 800px) {
        margin-top: 5%;
        width: 80%;
    }
`;

const Form = styled.form`
    width: 50%;
    margin: 50%;
    margin: 0 auto;
    font-size: 1.6rem;
    @media (max-width: 800px) {
        width:90%;
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
    grid-template-rows: repeat(3 70px);
    .email {
        grid-area: first;
    }
    .name {
        grid-area: second;
    }
    /* .surname {
        grid-area: third;
    } */
    .password {
        grid-area: third;
    }
    grid-template-areas:
        "first   "
        "second   "
        "third   ";
        /* "fourth   "; */
    @media (max-width: 800px) {
        margin-bottom: 5%; 
    }
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
    p {
        text-align: center;
    }
    input {
        height: 50%;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;
    }
    .checked {
        height: 25%;
        width: 25%;
        border: none;
        box-shadow: none;
    }
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        .checked {
            height: 30px;
            width: 30px;
      }
    }
`;


const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
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

class Signup extends Component {
    state = {
        name: '',
        surname: '',
        password: '',
        email: '',
        isFamiliar: false,
        loggedIn: false,
    }
    saveToState = e => {
        this.setState({ [e.target.name] : e.target.value}); 
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
      });
    }
    render() {
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
            {(signup, {error, loading}) => (
               <Form 
                  method="post" 
                  onSubmit={ async e => {
                   e.preventDefault();
                   await signup();
                   this.setState({name: '', email: '', password: '', loggedIn: true})
                   setTimeout(() => Router.push({ pathname: '/chooseCareer'}), 2000)
                   }}
                >
                <Fieldset disabled={loading} aria-busy={loading}>
                    <h2>Зарегистрируйтесь на Savvvy.app</h2>
                    <Error error={error} />
                    {this.state.loggedIn && <LoggedIn>Вы успешно зарегистрировались!</LoggedIn>}
                    <Container>
                        <Label className="email" htmlFor="email">
                            <p className="first">Электронная почта</p>
                            <input 
                                className="second"
                                type="email"
                                name="email"
                                placeholder="Почта"
                                value={this.state.email}
                                onChange={this.saveToState}
                            />
                        </Label>
                        <Label className="name" htmlFor="name">
                            <p className="first">Имя и фамилия</p>
                            <input
                                className="second"
                                type="text"
                                name="name"
                                placeholder="Имя и фамилия"
                                value={this.state.name}
                                onChange={this.saveToState}
                            />
                        </Label>
                        {/* <Label className="surname" htmlFor="surname">
                            <p className="first">Фамилия</p>
                            <input
                                className="second"
                                type="text"
                                name="surname"
                                placeholder="Фамилия"
                                value={this.state.surname}
                                onChange={this.saveToState}
                            />
                        </Label> */}
        
                        <Label>
                            <p className="first">Согласие на обработку персональных данных</p>
                            <input
                                className="checked" 
                                type="checkbox"
                                name="isFamiliar"
                                value={true}
                                checked={this.state.isFamiliar}
                                onChange={this.handleInputChange} 
                            />
                        </Label>
                        <Label className="password" htmlFor="password">
                            <p className="first">Пароль</p>
                            <input
                                className="third"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={this.state.password}
                                onChange={this.saveToState}
                            />
                        </Label>
                    </Container>
                    <Buttons>
                        <SubmitButton type="submit">{loading ? "Регистрируюсь" : "Зарегистрироваться"}</SubmitButton>
                    </Buttons>
                </Fieldset>
              </Form>
            )}
          </Mutation>
        );
    }
}

export default Signup;
export { SIGNUP_MUTATION };