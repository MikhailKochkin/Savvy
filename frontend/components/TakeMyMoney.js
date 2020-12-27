import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import Cookies from "universal-cookie";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { CREATE_APPLICATION_MUTATION } from "./course/Application";

const cookies = new Cookies();

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePageId: String!
    $userId: String!
    $price: Int!
    $promocode: String
    $comment: String
  ) {
    createOrder(
      coursePageId: $coursePageId
      price: $price
      userId: $userId
      promocode: $promocode
      comment: $comment
    ) {
      order {
        id
        paymentID
      }
      url
    }
  }
`;

const Button = styled.button`
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
    background-color: ${(props) => props.theme.darkGreen};
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

const TakeMyMoney = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Mutation
      mutation={CREATE_ORDER_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      variables={{
        coursePageId: props.coursePage.id,
        price: props.price,
        userId: props.user,
        promocode: props.promocode,
        comment: props.comment,
      }}
    >
      {(createOrder) => (
        <>
          {!loading && (
            <Button
              disabled={loading}
              onClick={async (e) => {
                e.preventDefault;
                setLoading(true);
                const res = await createOrder();
                console.log(res.data.createOrder.url);
                location.href = res.data.createOrder.url;
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
