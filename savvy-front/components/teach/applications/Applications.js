import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import ApplicationBox from "./ApplicationBox";

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-bottom: 3%;
`;

const Header = styled.p`
  font-size: 2rem;
  background: #edefed;
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  border: 1px solid #edefed;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const PAGE_APPLICATIONS_QUERY = gql`
  query PAGE_APPLICATIONS_QUERY($id: ID!) {
    applications(where: { coursePageID: $id }) {
      id
      applicantId
      applicantName
      message
    }
  }
`;

const PAGE_ORDERS_QUERY = gql`
  query PAGE_ORDERS_QUERY($id: ID!) {
    orders(where: { coursePageID: $id }) {
      id
      paymentId
      paid
      price
      user {
        name
        id
      }
    }
  }
`;

class Applications extends Component {
  render() {
    return (
      <Styles>
        <Query
          query={PAGE_APPLICATIONS_QUERY}
          variables={{
            id: this.props.id,
          }}
          fetchPolicy="cache-first"
        >
          {({ data, error, loading, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <>
                <Header>Список заявок от участников</Header>
                {data.applications === 0 ? (
                  <p>По этому курсу нет заявок!</p>
                ) : null}
                <div>
                  {data.applications.map((application) => (
                    <ApplicationBox
                      key={application.applicantId}
                      applicantId={application.applicantId}
                      coursePageId={this.props.id}
                      applicationId={application.id}
                      name={application.applicantName}
                    />
                  ))}
                </div>
              </>
            );
          }}
        </Query>
        <Query
          query={PAGE_ORDERS_QUERY}
          variables={{
            id: this.props.id,
          }}
          fetchPolicy="cache-first"
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <>
                {/* <h1>Список счетов</h1>
                {data.orders === 0 ? <p>По этому курсу нет заявок!</p> : null}
                <div>
                  {data.orders.map(order => (
                    <App key={order.id}>
                      <h3>Чек</h3>
                      <p>Имя: {order.user.name}</p>
                      <p>Код чека: {order.paymentId}</p>
                      <p>Цена: {order.price}</p>
                    </App>
                  ))}
                </div> */}
              </>
            );
          }}
        </Query>
      </Styles>
    );
  }
}

export default Applications;
