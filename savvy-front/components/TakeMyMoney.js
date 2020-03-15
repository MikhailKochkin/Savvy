import React, { useState } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Cookies from "universal-cookie";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { CREATE_APPLICATION_MUTATION } from "./course/Application";

const cookies = new Cookies();

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePage: ID!
    $user: ID!
    $price: Int!
    $promocode: String
  ) {
    createOrder(
      coursePage: $coursePage
      price: $price
      user: $user
      promocode: $promocode
    ) {
      id
    }
  }
`;

const Button = styled.button`
  transition: all 0.2s ease;
  background: #0846d8;
  border-radius: 5px;
  width: 100%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

const Message = styled.div`
  margin-top: 4%;
`;

const TakeMyMoney = props => {
  const [loading, setLoading] = useState(false);
  return (
    <Mutation
      mutation={CREATE_ORDER_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      variables={{
        coursePage: props.coursePage.id,
        price: props.price,
        user: props.user,
        promocode: props.promocode
      }}
    >
      {createOrder => (
        <>
          {!loading && (
            <Button
              disabled={loading}
              onClick={async e => {
                e.preventDefault;
                setLoading(true);
                const res2 = await createOrder();
                location.href = cookies.get("url");
                setLoading(false);
              }}
            >
              {props.children}
            </Button>
          )}
          {loading ? (
            <Message>Готовим платеж. Пожалуйста, подождите немного.</Message>
          ) : null}
        </>
      )}
    </Mutation>
  );
};

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
