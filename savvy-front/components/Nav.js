import React, { Component } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Modal from "styled-react-modal";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import absoluteUrl from "next-absolute-url";
import User from "./User";
import Menu from "./Menu";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import RequestReset from "./auth/RequestReset";
import Signout from "./auth/Signout";
import { IoMdMenu } from "react-icons/io";

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

// const { origin } = absoluteUrl(req);

const SideMenu = styled.div`
  /* The side navigation menu */
  .sidenav {
    height: 0; /* 100% Full-height */
    width: 100%; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #112a62; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    /* padding-top: 60px; Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    display: flex;
    flex-direction: column;
    button {
      background: none;
      border: none;
      text-align: left;
    }
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 1.8rem;
    color: white;
    display: block;
    transition: 0.3s;
    font-family: Montserrat;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media (max-width: 850px) {
    height: 0;
  }
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const StyledHeader = styled.header`
  background-color: white;
  display: grid;
  height: 60px;
  grid-template-areas: "CourseMenu UserData";
  grid-template-columns: 2fr 1fr;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  a,
  button,
  input,
  p {
    text-decoration: none;
    font-size: 1.8rem;
    padding-left: 2%;
    background-color: none;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .logo {
    width: 150px;
    @media (max-width: 990px) {
      padding-top: 15px;
      margin-right: 10px;
      width: 80%;
      text-align: right;
    }
  }
`;

const CourseMenu = styled.div`
  grid-area: CourseMenu;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 600px) {
    flex-direction: row;
  }
  div {
    margin-left: 40px;
  }
  a {
    padding-bottom: 19px;
    /* &:hover {
      border-bottom: 1px solid #112a62;
    } */
  }
`;

const Button = styled.div`
  border: none;
  background: none;
  padding-right: 0;
  cursor: pointer;
  &:hover {
    color: #6daae1;
  }
`;

const UserData = styled.div`
  grid-area: UserData;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
  button {
    padding: 0;
    margin: 0;
  }
  .name {
    margin-right: 40px;
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const Span = styled.span`
  margin-left: 10px;
  padding-top: 15px;
`;

class Nav extends Component {
  state = {
    menuShown: false,
    isOpen: false,
    auth: "signin",
  };

  onResize = (width) => {
    this.setState({ width });
  };

  openNav = () => {
    document.getElementById("mySidenav").style.height = "35%";
    document.getElementById("mySidenav").style.paddingTop = "50px";
  };

  /* Set the width of the side navigation to 0 */
  closeNav = () => {
    document.getElementById("mySidenav").style.height = "0%";
    document.getElementById("mySidenav").style.paddingTop = "0";
  };

  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  mouseEnter = () => {
    this.setState({ menuShown: true });
  };
  mouseLeave = () => {
    this.setState({ menuShown: false });
  };

  menuShow = () => {
    this.setState((prevState) => ({
      menuShown: !prevState.menuShown,
    }));
  };

  changeState = (dataFromChild) => {
    this.setState({
      auth: dataFromChild,
    });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <>
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={this.onResize}
              />
              {this.state.width > 800 && (
                <>
                  <StyledHeader>
                    <CourseMenu>
                      <Link prefetch href="/">
                        <div className="logo">
                          <a>BeSavvy App</a>
                        </div>
                      </Link>

                      {me && me !== null ? (
                        <>
                          {me.status && me.status === "AUTHOR" && (
                            <Link prefetch href="/educator">
                              <div>
                                <a>Кабинет</a>
                              </div>
                            </Link>
                          )}
                          {me.status && me.status === "HR" && (
                            <Link prefetch href="/educator">
                              <div>
                                <a>Кабинет</a>
                              </div>
                            </Link>
                          )}
                          {me.status && me.status === "SAVVY_AUTHOR" && (
                            <Link prefetch href="/educator">
                              <div>
                                <a>Кабинет</a>
                              </div>
                            </Link>
                          )}
                        </>
                      ) : null}
                      {/* <Button
                        onMouseEnter={this.mouseEnter}
                        onClick={this.menuShow}
                      >
                        <a>Курсы</a>
                      </Button> */}
                    </CourseMenu>
                    <UserData>
                      {me ? (
                        <Link
                          href={{
                            pathname: "/account",
                            query: { id: me.id },
                          }}
                        >
                          <a className="name">
                            {me.surname ? `${me.name} ${me.surname}` : me.name}
                          </a>
                        </Link>
                      ) : null}
                      {me ? <Signout /> : null}
                      {!me && (
                        <Button onClick={this.toggleModal}>
                          <a>Войти</a>
                        </Button>
                      )}
                    </UserData>
                  </StyledHeader>
                  <StyledModal
                    isOpen={this.state.isOpen}
                    onBackgroundClick={this.toggleModal}
                    onEscapeKeydown={this.toggleModal}
                  >
                    {this.state.auth === "signin" && (
                      <Signin
                        getData={this.changeState}
                        closeNavBar={this.toggleModal}
                      />
                    )}
                    {this.state.auth === "signup" && (
                      <Signup
                        getData={this.changeState}
                        closeNavBar={this.toggleModal}
                      />
                    )}
                    {this.state.auth === "reset" && (
                      <RequestReset getData={this.changeState} />
                    )}
                  </StyledModal>
                </>
              )}
              {this.state.width < 800 && (
                <>
                  <StyledHeader>
                    <Span onClick={this.openNav}>
                      <IoMdMenu size={32} />
                    </Span>
                    <div className="logo">
                      {me ? (
                        <Link
                          href={{
                            pathname: "/account",
                            query: { id: me.id },
                          }}
                        >
                          <a className="name">
                            {me.surname ? `${me.name} ${me.surname}` : me.name}
                          </a>
                        </Link>
                      ) : null}
                      {!me && (
                        <Button onClick={this.toggleModal}>
                          <a>Войти</a>
                        </Button>
                      )}
                    </div>
                  </StyledHeader>

                  <SideMenu>
                    <div id="mySidenav" class="sidenav">
                      <a
                        href="javascript:void(0)"
                        class="closebtn"
                        onClick={this.closeNav}
                      >
                        &times;
                      </a>
                      {me && me.status === "AUTHOR" && (
                        <Link prefetch href="/educator">
                          <button onClick={this.closeNav}>
                            <a>Кабинет</a>
                          </button>
                        </Link>
                      )}
                      {me && me.status === "SAVVY_AUTHOR" && (
                        <Link prefetch href="/educator">
                          <button onClick={this.closeNav}>
                            <a>Кабинет</a>
                          </button>
                        </Link>
                      )}
                      <Link
                        href={{
                          pathname: "/courses",
                        }}
                      >
                        <button onClick={this.closeNav}>
                          <a>Курсы Savvy App</a>
                        </button>
                      </Link>
                      <Link
                        href={{
                          pathname: "/communities",
                        }}
                      >
                        <button onClick={this.closeNav}>
                          <a>Курсы вузов и сообществ</a>
                        </button>
                      </Link>
                      {me ? <Signout /> : null}
                    </div>
                  </SideMenu>
                  <StyledModal
                    isOpen={this.state.isOpen}
                    onBackgroundClick={this.toggleModal}
                    onEscapeKeydown={this.toggleModal}
                  >
                    {this.state.auth === "signin" && (
                      <Signin
                        getData={this.changeState}
                        closeNavBar={this.toggleModal}
                      />
                    )}
                    {this.state.auth === "signup" && (
                      <Signup
                        getData={this.changeState}
                        closeNavBar={this.toggleModal}
                      />
                    )}
                    {this.state.auth === "reset" && (
                      <RequestReset getData={this.changeState} />
                    )}
                  </StyledModal>
                </>
              )}
            </>
          );
        }}
      </User>
    );
  }
}

export default Nav;
