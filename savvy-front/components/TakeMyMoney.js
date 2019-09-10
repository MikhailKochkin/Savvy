import React from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Cookies from "universal-cookie";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { CREATE_APPLICATION_MUTATION } from "./course/Application";

const cookies = new Cookies();

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($coursePageID: ID!, $userID: ID!, $price: Int!) {
    createOrder(coursePageID: $coursePageID, price: $price, userID: $userID) {
      id
      coursePageID
      price
      userID
    }
  }
`;

const Button = styled.button`
  background: ${props => props.theme.green};
  border-radius: 5px;
  width: 200px;
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
    background-color: ${props => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

class TakeMyMoney extends React.Component {
  state = {
    loading: false
  };
  render() {
    console.log(typeof this.props.price);
    console.log(this.props.price);
    return (
      <Mutation
        mutation={CREATE_APPLICATION_MUTATION}
        variables={{
          applicantId: this.props.user,
          applicantName: this.props.name,
          coursePageID: this.props.coursePageID,
          message: "Купил курс"
        }}
      >
        {(createApplication, { loading, error }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            variables={{
              coursePageID: this.props.coursePageID,
              price: this.props.price,
              userID: this.props.user
            }}
          >
            {createOrder => (
              <>
                {this.state.loading === false && (
                  <Button
                    disabled={this.state.loading}
                    onClick={async e => {
                      e.preventDefault;
                      this.setState({ loading: true });
                      const res1 = await createApplication();
                      const res2 = await createOrder();
                      location.href = cookies.get("url");
                      this.setState({
                        loading: false
                      });
                    }}
                    promo={this.props.promo}
                  >
                    {this.props.children}
                  </Button>
                )}

                {this.state.loading ? (
                  <div>Готовим платеж. Пожалуйста, подождите немного.</div>
                ) : null}
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
