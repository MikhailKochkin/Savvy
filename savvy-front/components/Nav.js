import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from './User';
import Header from './Header';
import Search from './Search';
import Signout from './Signout';

const linkStyle = {
  marginRight: 15
}

const StyledHeader = styled.header`
  background-color: #F2F2F2;
  display: flex;
  justify-content: space-between;
  /* border-top: 1px solid #6DAAE1; */
  border-bottom: 4px solid #152A5E;
  text-transform: uppercase;
  cursor: pointer;
  a, button, input {
    text-decoration: none;
    color: ${props => props.theme.black};
    font-size: 1.8rem;
    font-weight: 700;
    /* border-left: 1px solid #6DAAE1; */
    padding-left: 2%;
    
  }
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
  a:hover {
    color: #6DAAE1;
  }
`;

const CourseMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5% 0% 0.5% 10%;
`;

const UserData = styled.div`
  
  display: flex;
  flex-direction: column;
  padding: 1% 10% 0.5% 0%;
`;

const Nav = () => (
      <User>
        {({data: {me}}) => (     
          <StyledHeader>
            <CourseMenu>
              <Link href="/cases">
                  <a style={linkStyle}>Курсы</a>
              </Link>
              {me && (
                <Link href="/createCourse">
                  <a style={linkStyle}>Создать</a>
                </Link>
              )}
              <Search/>
            </CourseMenu>
            <Link href="/">
              <a style={linkStyle}><h2>Savvy 2.0</h2></a>
            </Link>
            <UserData>
              {me && (
                  <Signout/>
              )}
              {!me && (
                <Link href="/signup">
                  <a style={linkStyle}>SignUp</a>
                  </Link>
                )}
              {me ? <p>{me.name}</p> : null}
            </UserData>
          </StyledHeader> 
        )}
    </User>    
) 

export default Nav;