import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { CREATE_APPLICATION_MUTATION } from './course/Application';

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
    background-color: ${props => props.promo ? "#5DAE76" : "#84BC9C"};
    border: none;
    border-radius: ${props => props.promo ? "5px" : "none"};
    border: ${props => props.promo ? "solid 1px white" : "none"};
    color: white;
    padding: ${props => props.promo ? "4% 6%" : "5px 12px"};
    text-decoration: none;
    display: inline-block;
    font-size: ${props => props.promo ? "2.4rem" : "14px"};
    width: 135px;
    margin: 2px;
    cursor: pointer;
    &:hover {
       background-color: #294D4A;
    }
    &:disabled {
      &:hover {
       background-color: #84BC9C;
    }
    }
       
`

class TakeMyMoney extends React.Component {
  state = {
    loading: false
  }
  render() {
    let finalPrice;
    if(this.props.discountPrice !== null) {
      finalPrice = this.props.discountPrice
    } else if (this.props.discountPrice === null){
      finalPrice = this.props.price
    }
    return (
      <Mutation 
        mutation={CREATE_APPLICATION_MUTATION} 
        variables={{
            applicantId: this.props.user,
            applicantName: this.props.name,
            coursePageID: this.props.coursePageID,
            message: "Купил курс"
        }}>
        {(createApplication, {loading, error}) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            variables={{
              coursePageID: this.props.coursePageID,
              price: finalPrice,
              userID: this.props.user
            }}
          >
          {createOrder => (
            <>
              <Button 
                disabled={this.state.loading}
                onClick={ async e => {
                  e.preventDefault
                  this.setState({ loading: true})
                  const res1 = await createApplication();
                  const res2 = await createOrder();
                  location.href = cookies.get('url')
                  this.setState({
                    loading: false
                  })
                }}
                promo = {this.props.promo}
              >
              {this.props.children}
              </Button>
              <br/>
              {this.state.loading ? <p>Готовим платеж. Пожалуйста, подождите немного.</p> : null}
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