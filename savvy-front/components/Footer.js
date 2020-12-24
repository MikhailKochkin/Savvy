import React from "react";
import styled from "styled-components";

const FooterStyles = styled.div`
  background-color: #001f4e;
  color: white;
  max-height: 40%;
  width: 100%;
  display: flex;
  padding: 2% 0;
  padding-bottom: 5%;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  a {
    color: white;
  }
  .block {
    flex-basis: 37%;
    padding-left: 5%;
    div {
      margin-bottom: 10px;
    }
    @media (max-width: 600px) {
      flex-basis: 50%;
    }
  }
  .mini {
    flex-basis: 26%;
    padding-left: 5%;
    div {
      margin-bottom: 10px;
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const Footer = () => (
  <FooterStyles>
    <div>Kak dela?</div>
  </FooterStyles>
);

export default Footer;
