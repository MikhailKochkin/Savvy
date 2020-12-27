import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";

const InfoStyle = styled.div`
  background-color: white;
  display: block;
  /* font-size: 1.6rem; */
  border: 0.25px solid #f8f8f8;
  border-radius: 4px;
  padding: 2% 4%;
  margin-bottom: 2rem;
  div {
    margin-bottom: 3%;
  }
  a {
    margin-top: 3%;
    padding: 2% 4%;
    font-size: 1.6rem;
    background: #4dac44;
    color: white;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    &:hover {
      background: #006400;
    }
  }
`;

class LegalPortfolio extends Component {
  render() {
    const { id } = this.props;
    return (
      <InfoStyle>
        <div>Создайте свое юридическое портфолио</div>
        <Link
          href={{
            pathname: "/portfolio",
            query: { id }
          }}
        >
          <a>Создать</a>
        </Link>
      </InfoStyle>
    );
  }
}

export default LegalPortfolio;
