import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 70%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 50px;
  @media (max-width: 900px) {
    width: 95%;
  }
  h2 {
    text-align: left;
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 10px;
    img {
      height: 45px;
    }
  }
  div {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: #6e6c6b;
  }
  .security_email {
    cursor: pointer;
    transition: ease 0.4s;
    color: #393939;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SecurityHeader = () => {
  return (
    <Styles>
      <h2>
        <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1727937160/savvy/besavvy_logo_dark_yizfpx.png" />
      </h2>
      <div>
        BeSavvy is deeply committed to the security of data within our platform.
        You can trust us to keep your account information safe and protected.
      </div>
      <div className="security_email">
        <a type="mail">security@besavvy.app</a>
      </div>
    </Styles>
  );
};

export default SecurityHeader;
