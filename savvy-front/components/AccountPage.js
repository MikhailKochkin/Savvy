import React, { Component } from 'react';
import styled from 'styled-components';
import User from './User';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from './User';
import MyCourses from './MyCourses';
import PleaseSignIn from './auth/PleaseSignIn';


const UPDATE_USER_MUTATION= gql`
    mutation UPDATE_USER_MUTATION(
        $id: ID!,
        $name: String, 
        $email: String
        ) {
        updateUser(
            id: $id,
            email: $email, 
            name: $name
            ) {
            id
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
    grid-template-rows: repeat(3 70px);
    .email {
        grid-area: first;
    }
    .name {
        grid-area: second;
    }
    .password {
        grid-area: third;
    }
    grid-template-areas:
        "first   "
        "second   "
        "third   ";
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

class AccountPage extends Component {
    state = {};
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    updateUser = async (e, updateUser) => {
        e.preventDefault();
        const res = await updateUser({
          variables: {
            id: this.props.query.id,
            ...this.state,
          },
        });
      };
    render() {
        return (
            <PleaseSignIn>
            <User>
                {({data: {me}}) => (
                <>
                <Mutation
                    mutation={UPDATE_USER_MUTATION}
                    variables={this.state}
                    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                >
                {(updateUser, {error, loading}) => (
                    <Form 
                        // method="post" 
                        onSubmit={ e => 
                        // e.preventDefault();
                        // console.log(this.props.query.id)
                        this.updateUser(e, updateUser)}
                    >
                    <Fieldset disabled={loading} aria-busy={loading}>
                    <>
                        <h2>Настройки аккаунта</h2>
                        <Container>
                            <Label className="name" htmlFor="password">
                                <p className="first">Имя</p>
                                <input
                                    className="second"
                                    type="text"
                                    name="name"
                                    placeholder="Ваше имя и фамилия"
                                    required
                                    defaultValue={me.name}
                                    onChange={this.handleChange}
                                />
                            </Label>
                            <br/>
                            <Label className="email" htmlFor="password">
                                <p className="first">Электронная почта</p>
                                <input
                                    className="second"
                                    type="text"
                                    name="email"
                                    placeholder="Ваша электронная почта"
                                    required
                                    defaultValue={me.email}
                                    onChange={this.handleChange}
                                />
                            </Label>
                        </Container>
                        <Buttons>
                            <SubmitButton type="submit">Изменить</SubmitButton>
                        </Buttons>
                    </>
                    </Fieldset>
                </Form>
                )}
                </Mutation>
                <MyCourses
                    meData={me}
                />
              </>
            )}
        </User>
        </PleaseSignIn>
    );
  }
}

export default AccountPage;