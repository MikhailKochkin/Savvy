import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import AreYouAdmin from "./auth/AreYouAdmin";
import ApplicationBox from "./teach/applications/ApplicationBox";

const PAGE_ORDERS_QUERY = gql`
  query PAGE_ORDERS_QUERY($id: ID!) {
    orders(where: { coursePage: { id: $id }, isPaid: null }) {
      id
      paymentID
      coursePage {
        id
      }
      isPaid
      price
      user {
        name
        surname
        id
      }
    }
  }
`;

const Container = styled.div`
  padding: 2%;
  margin: 1%;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class PaidApplications extends Component {
  state = {
    show: false,
  };
  toggle = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };
  render() {
    return (
      <AreYouAdmin>
        <Width>
          <Container>
            <Query
              query={PAGE_ORDERS_QUERY}
              variables={{
                id: this.props.id,
              }}
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <>
                    <h4>{this.props.title} Список заявок от участников</h4>
                    {data.orders.length === 0 ? (
                      <p>По этому курсу нет заявок!</p>
                    ) : (
                      <div>
                        {data.orders.map((order) => (
                          <ApplicationBox
                            key={order.paymentID}
                            applicantId={order.user.id}
                            coursePageID={order.coursePage.id}
                            user={order.user}
                            orderID={order.id}
                            paymentID={order.paymentID}
                          />
                        ))}
                      </div>
                    )}
                  </>
                );
              }}
            </Query>
          </Container>
        </Width>
      </AreYouAdmin>
    );
  }
}

export default PaidApplications;
export { PAGE_ORDERS_QUERY };
