import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import gql from "graphql-tag";
import { PAGE_ORDERS_QUERY } from "../../PaidApplications";

const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($id: ID!, $isPaid: Boolean!) {
    updateOrder(id: $id, isPaid: $isPaid) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.red};
  border-radius: 5px;
  width: 110px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkRed};
  }
`;

const RejectApplication = (props) => {
  const onClick = async (e, updateOrder) => {
    e.preventDefault();
    props.getData("reject");
    updateOrder({
      variables: {
        id: props.orderID,
        isPaid: false,
      },
    });
  };
  return (
    <div>
      <Mutation
        mutation={UPDATE_ORDER}
        refetchQueries={[{ query: PAGE_ORDERS_QUERY }]}
      >
        {(updateOrder) => (
          <Button red onClick={(e) => onClick(e, updateOrder)}>
            Отклонить
          </Button>
        )}
      </Mutation>
    </div>
  );
};

export default RejectApplication;
