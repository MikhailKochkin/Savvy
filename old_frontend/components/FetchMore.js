import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const NavButton = styled.button`
  width: 15%;
  color: #606060;
  background-color: white;
  border: 1px solid #edefed;
  border-radius: 6px;
  padding: 0.5%;
  margin-bottom: 1%;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.4rem;
  outline: none;
  &:hover {
    border: 1px solid #122a62;
  }
  @media (max-width: 800px) {
    border: 1px solid #122a62;
    width: 40%;
    margin: 3% 0;
  }
`;

class FetchMore extends Component {
  render() {
    return (
      <Block>
        <NavButton onClick={this.props.onLoadMore}>Показать еще 👇🏻</NavButton>
      </Block>
    );
  }
}

export default FetchMore;
