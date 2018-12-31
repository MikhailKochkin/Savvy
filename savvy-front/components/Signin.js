import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!,  $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    state = {
        password: '',
        email: '',
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
               <form 
                  method="post" 
                  onSubmit={ async e => {
                   e.preventDefault();
                   await signin();
                   this.setState({email: '', password: ''});
                   }}
                >
                <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Войти на сайт</h2>
                    <Error error={error} />
                    <label htmlFor="email">
                        Электрооная почта
                        <input 
                            type="email"
                            name="email"
                            placeholder="Почта"
                            value={this.state.email}
                            onChange={this.saveToState}
                        />
                    </label>
                    <label htmlFor="password">
                        Пароль
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={this.state.password}
                            onChange={this.saveToState}
                        />
                    </label>
                    <button type="submit">{loading ? "Вхожу" : "Войти"}!</button>
                </fieldset>
              </form>
            )}
          </Mutation>
        );
    }
}

export default Signin;
export { SIGNIN_MUTATION };