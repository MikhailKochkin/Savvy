import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import User from './User';
import Menu from './Menu';
import Search from './Search';
import Signout from './auth/Signout';

const ALL_COURSE_PAGES_QUERY = gql`
  query ALL_COURSE_PAGES_QUERY {
    coursePages {
      id
      title
      courseType
      user {
          id
          name
      }
    }
  }
`;

const StyledHeader = styled.header`
  background-color: #F2F2F2;
  display: grid;
  grid-template-areas: "CourseMenu Logo UserData";
  grid-template-columns: 1fr 1.5fr 1fr;
  border-bottom: 4px solid #152A5E;
  cursor: pointer;
  line-height: 0%;
  a, button, input, p {
    text-decoration: none;
    color: #13214D;
    font-size: 1.8rem;
    font-weight: 700;
    padding-left: 2%;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 0.5fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 
    "Logo"
    "CourseMenu"
    "UserData";
    justify-content: center;
  }
  a:hover {
    color: #6DAAE1;
  }
`;

const CourseMenu = styled.div`
  grid-area: CourseMenu;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

const Logo = styled.div`
  grid-area: Logo;
  h2 {
    text-align: center;
  }
`;

const Button = styled.button`
    border: none;
    text-decoration: none;
    color: #13214D;
    font-family: "Gill Sans",serif;
    font-size: 1.8rem;
    font-weight: 700;
    cursor: pointer;
    background-color: #F0F0F0;
    &:hover {
        color: #6DAAE1;
    }
`;

const UserData = styled.div`
  grid-area: UserData;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

class Nav extends Component {
  state = {
    menuShown: false,
  }
  mouseEnter = () => {
    this.setState({ menuShown: true });
  }
  mouseLeave = () => {
    this.setState({ menuShown: false });
  }
    render() {
      return (
      <User>
        {({data: {me}}) => (
        <>   
          <StyledHeader>
            <CourseMenu>
                <Link 
                  prefetch 
                  href="/courses">
                    <a>Меню</a>
                </Link>
                {me && (
                  <Link 
                    prefetch 
                    href="/create">
                    <a>Создать</a>
                  </Link>
                )}
                <Button onMouseEnter={this.mouseEnter}>Поиск</Button>
                {/* <Search/> */}
            </CourseMenu>
            <Logo>
                <Link prefetch href="/">
                  <a ><h2>Savvy</h2></a>
                </Link>
            </Logo>
            <UserData>
                {me ?
                <Link href={{
                  pathname: '/account',
                  query: {id: me.id}
                }}>
                  <a className="name">{me.name}</a>
                </Link>
                : null}
                {me && (
                    <Signout/>
                )}
                {!me && (
                  <Link prefetch href="/signup">
                    <a>Войти</a>
                    </Link>
                  )}
            </UserData>
          </StyledHeader>
          <Query 
            query={ALL_COURSE_PAGES_QUERY} 
            fetchPolicy="cache-first"
          >
            {({ data, error, loading }) => {
                if (error) return <p>Error: {error.message}</p>;
                return (
                this.state.menuShown ?
                <div onMouseLeave={this.mouseLeave}>
                  <Menu courses={data.coursePages}/>
                </div>
                : 
                null
            )}}
          </Query>
        </>
        )}
    </User>  
  )}  
}

export default Nav;