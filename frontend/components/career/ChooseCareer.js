import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "../User";
import { useUser } from "../User";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $careerTrackID: ID
    $isFamiliar: Boolean
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      careerTrackID: $careerTrackID
      isFamiliar: $isFamiliar
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  background: white;
  padding: 2%;
`;

const Header = styled.p`
  font-size: 2.6rem;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin-bottom: 2%;
  .first {
    grid-area: first;
  }
  .second {
    grid-area: second;
  }
  grid-template-areas: "first second";
  p {
    text-align: center;
    font-size: 2rem;
  }
  input {
    height: 50%;
    width: 80%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
  div {
    padding: 4%;
  }
  .checked {
    height: 25%;
    width: 40%;
    border: none;
    box-shadow: none;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    .checked {
      height: 100%;
      width: 100%;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: initial;
  height: auto;
`;

const Button = styled.button`
  background-color: #008cba;
  border: none;
  border-radius: 6px;
  color: white;
  padding: 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  width: 150px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background: #0b3954;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
    width: 80%;
  }
`;

class ChooseCareer extends Component {
  state = {
    careerTrackID: "",
  };
  updateUser = async (e, updateUser) => {
    e.preventDefault();
    const res = await updateUser({
      variables: {
        id: this.props.me.id,
        careerTrackID: this.state.careerTrackID,
      },
    });
  };
  render() {
    return (
      <Styles>
        <Header>
          Чтобы получить максимальную пользу от BeSavvy, выберите свой карьерный
          трек:{" "}
        </Header>
        <User>
          {({ data: { me } }) => (
            <>
              <Mutation
                mutation={UPDATE_USER_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {(updateUser, { error, loading }) => (
                  <Fieldset>
                    <Label>
                      <div>
                        <p>Технологии и дизайн в работе юриста</p>
                        <Button
                          onClick={async (e) => {
                            e.preventDefault();
                            const res1 = await this.setState({
                              careerTrackID: "cjymywj43tg8c0b36c762ii0w",
                            });
                            const res2 = await this.updateUser(e, updateUser);
                            Router.push({ pathname: "/courses" });
                          }}
                        >
                          Выбрать
                        </Button>
                      </div>
                      <Img src="../static/тех.png" />
                    </Label>
                    <Label>
                      <div>
                        <p>Корпоративный юрист</p>
                        <Button
                          onClick={async (e) => {
                            e.preventDefault();
                            const res1 = await this.setState({
                              careerTrackID: "cjymyvxjqqsoh0b53wtdnpzkk",
                            });
                            const res2 = await this.updateUser(e, updateUser);
                            Router.push({ pathname: "/courses" });
                          }}
                        >
                          Выбрать
                        </Button>
                      </div>
                      <Img src="../static/корпюрист.png" />
                    </Label>
                  </Fieldset>
                )}
              </Mutation>
            </>
          )}
        </User>
      </Styles>
    );
  }
}

export default ChooseCareer;
