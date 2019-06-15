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
        $email: String,
        $careerTrackID: ID,
        $isFamiliar: Boolean
        ) {
        updateUser(
            id: $id,
            email: $email, 
            name: $name
            careerTrackID: $careerTrackID,
            isFamiliar: $isFamiliar
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
    width: 50%;
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
    .careerTrack {
        grid-area: third;
    }
    grid-template-areas:
        "first   "
        "second   "
        "third   ";
`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 45% 55%;
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
    select {
        height: 50%;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;
    }
    p {
        text-align: center;
    }
    .checked {
        height: 20%;
        width: 30%;
        border: none;
        box-shadow: none;
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
    border-top: solid 1px #F0F0F0;
`;

const Green = styled.div`
    background: #4DAC44;
    padding: 2%;
    border-radius: 10px;
    width: 45%;
    color: white;
    text-align: center;
    display: ${props => props.show ? "block" : "none"};

`;

class AccountPage extends Component {
    state = {
        show: false
    };
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
    handleSteps = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
    };

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
                        onSubmit={ e => {
                            e.preventDefault()
                            this.setState({ show: true})      
                            this.updateUser(e, updateUser)
                      }
                    }   
                    >
                    <Fieldset disabled={loading} aria-busy={loading}>
                    <>
                        <h2>Настройки аккаунта</h2>
                        <Green show = {this.state.show}>Измнения внесены</Green>
                        <Container>

                            <Label className="name" htmlFor="password">
                                <p className="first">Имя и фамилия</p>
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
                       
                            <Label className="careerTrackID" htmlFor="careerTrackID">
                                <p className="third">Карьерный трек</p>
                                {me.careerTrack &&
                                <select name="careerTrackID" defaultValue = {me.careerTrack.id} value={this.state.careerTrackID} onChange={this.handleSteps}>
                                    <option value="NAN">Не выбран</option>
                                    <option value="cjwx78u7700rb07121pelqctm">Корпоративное право</option>
                                    <option value="cjwx79iaj00rk0712tz12j7vi">Право и технологии</option>
                                </select>}
                                {!me.careerTrack &&
                                <select name="careerTrackID" value={this.state.careerTrackID} onChange={this.handleSteps}>
                                    <option value="NAN">Не выбран</option>
                                    <option value="cjwx78u7700rb07121pelqctm">Корпоративное право</option>
                                    <option value="cjwx79iaj00rk0712tz12j7vi">Право и технологии</option>
                                </select>}
                                <br/>
                            </Label>
                            {!me.isFamiliar &&
                            <Label>
                                <p className="first">Когда вы пользуетесь Savvy, мы собираем ваши персональные данные.
                                Пожалуйста, дайте нам свое согласие на это.</p>
                                <input
                                    className="checked" 
                                    type="checkbox"
                                    name="isFamiliar"
                                    value={true}
                                    checked={this.state.isFamiliar}
                                    onChange={this.handleInputChange} 
                                />
                            </Label> }
                            

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