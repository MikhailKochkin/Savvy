import React from "react";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import {
  ActionButton,
  SecondaryButton,
  NanoButton,
  Buttons,
  Row,
} from "./lesson/styles/DevPageStyles";

const CREATE_CLIENT = gql`
  mutation CREATE_CLIENT(
    $name: String!
    $surname: String
    $country: String!
    $email: String!
    $number: String!
  ) {
    createBusinessClient(
      name: $name
      surname: $surname
      country: $country
      email: $email
      number: $number
    ) {
      id
      name
      surname
      email
      number
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  .create {
    background: #fff;
    width: 90%;
    margin: 20px 0;
    padding: 10px;
    input {
      margin-right: 30px;
    }
  }
`;

const CreateClient = (props) => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [createBusinessClient, { create }] = useMutation(CREATE_CLIENT);

  return (
    <Styles>
      <SecondaryButton onClick={(e) => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Create client"}
      </SecondaryButton>
      {isOpen && (
        <div className="create">
          <Row className="search_form">
            <div className="description">Name</div>
            <div className="action_area">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="name"
                placeholder="..."
              />
            </div>
          </Row>
          <Row className="search_form">
            <div className="description">Surname</div>
            <div className="action_area">
              <input
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                type="text"
                name="surname"
                placeholder="..."
              />
            </div>
          </Row>
          <Row className="search_form">
            <div className="description">Email</div>
            <div className="action_area">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                placeholder="..."
              />
            </div>
          </Row>
          <Row className="search_form">
            <div className="description">Number</div>
            <div className="action_area">
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                type="text"
                name="number"
                placeholder="..."
              />
            </div>
          </Row>
          <Row className="search_form">
            <div className="description">Country</div>
            <div className="action_area">
              <input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                type="text"
                name="country"
                placeholder="..."
              />
            </div>
          </Row>
          <ActionButton
            onClick={async (e) => {
              const res = await createBusinessClient({
                variables: {
                  name: name,
                  surname: surname ? surname : "",
                  number: number ? number : "",
                  email: email ? email : "",
                  country: country,
                },
              });
              props.addClients(res.data.createBusinessClient);
              alert("Done!");
            }}
          >
            Create
          </ActionButton>
        </div>
      )}
    </Styles>
  );
};

export default CreateClient;
