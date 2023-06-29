import React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";

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
  .create {
    background: #fff;
    width: 90%;
    margin-bottom: 20px;
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

  const [createBusinessClient, { create }] = useMutation(CREATE_CLIENT);

  return (
    <Styles>
      <div className="create">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="number"
          name="number"
          placeholder="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="text"
          id="country"
          name="country"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
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
        </button>
      </div>
    </Styles>
  );
};

export default CreateClient;
