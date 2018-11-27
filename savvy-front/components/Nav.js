import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from './User';
import Signout from './Signout';

const linkStyle = {
  marginRight: 15
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  border-top: 1px solid #6DAAE1;
  border-bottom: 4px solid #6DAAE1;
  text-transform: uppercase;
  cursor: pointer;
  a, button {
    text-decoration: none;
    color: ${props => props.theme.black};
    font-size: 2.4rem;
    font-weight: 700;
    border-left: 1px solid #6DAAE1;
    padding-left: 2%;
    transform: skew(-10deg);
  }
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
  a:hover {
    color: #6DAAE1;
  }
`;

const Nav = () => (
   
      <User>
        {({data: {me}}) => (     
          <StyledHeader>
            {me ? <p>{me.name}</p> : null}
              <Link href="/">
                <a style={linkStyle}>Home</a>
              </Link>
              <Link href="/about">
                <a style={linkStyle}>About</a>
              </Link>
            {me && (
              <>
                <Link href="/create">
                  <a style={linkStyle}>Create</a>
                </Link>
                <Signout/>
              </>
              )}
            {!me && (
              <Link href="/signup">
                <a style={linkStyle}>SignUp</a>
              </Link>
            )}
          </StyledHeader> 
        )}
    </User>    
) 

export default Nav;