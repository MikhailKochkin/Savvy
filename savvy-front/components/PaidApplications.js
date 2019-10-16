import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import AreYouAdmin from "./auth/AreYouAdmin";
import ApplicationBox from "./teach/applications/ApplicationBox";

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

const App = styled.div`
  border: 2px solid black;
  padding: 2%;
  margin: 1%;
  width: 70%;
  display: flex;
  flex-direction: column;
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

const Orders = styled.div`
  display: block;
`;

class PaidApplications extends Component {
  state = {
    show: false
  };
  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };
  render() {
    return (
      <AreYouAdmin>
        <Width>
          <Container>
            <Query
              query={PAGE_APPLICATIONS_QUERY}
              variables={{
                id: this.props.id
              }}
              fetchPolicy="cache-first"
            >
              {({ data, error, loading, fetchMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <>
                    <h4>{this.props.title} Список заявок от участников</h4>
                    {data.applications === 0 ? (
                      <p>По этому курсу нет заявок!</p>
                    ) : null}
                    <div>
                      {data.applications.map(application => (
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
                id: this.props.id
              }}
              fetchPolicy="cache-first"
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                console.log(data);
                return (
                  <>
                    <p>Список счетов</p>
                    {data.orders === 0 ? (
                      <p>По этому курсу нет счетов!</p>
                    ) : null}
                    <button onClick={this.toggle}>Показать</button>
                    {this.state.show && (
                      <>
                        <p>Счета:</p>
                        <Orders>
                          {data.orders.map(order => (
                            <App key={order.id}>
                              <h3>Чек</h3>
                              <div>Имя: {order.user.name}</div>
                              <div>Код чека: {order.paymentId}</div>
                              <div>Цена: {order.price}</div>
                            </App>
                          ))}
                        </Orders>
                      </>
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
