"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";

// import { useUser } from "./User";
// import Signup from "./auth/Signup";
// import Signin from "./auth/Signin";
// import RequestReset from "./auth/RequestReset";
// import Signout from "./auth/Signout";

const SideMenu = styled.div`
  /* The side navigation menu */
  .sidenav {
    height: 0%; /* 100% Full-height */
    width: 100%; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 10; /* Stay on top */
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
    font-size: 1.6rem;
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
  background: #fff;
  display: grid;
  min-height: 70px;
  padding: 10px 0;
  font-weight: 500;
  grid-template-areas: "CourseMenu UserData";
  grid-template-columns: 1fr 3fr;
  cursor: pointer;
  a,
  button,
  input,
  p {
    text-decoration: none;
    font-size: 1.6rem;
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
  .my {
    margin-left: 50px;
    min-width: 120px;
  }
  .blog {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    a {
      padding: 0;
      margin: 0;
      font-size: 1.6rem;
      transition: ease-in 0.5s;

      &:hover {
        color: #4679d8;
      }
    }
  }
  .mini_logo {
    width: 150px;
    img {
      height: 24px;
    }
    a {
      font-weight: 500;
      font-size: 2.2rem;
      @media (max-width: 990px) {
        font-size: 1.6rem;
      }
    }
  }
  .logo {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 32px;
    }
    a {
      font-weight: 500;
      font-size: 2.2rem;
      @media (max-width: 990px) {
        font-size: 1.6rem;
      }
    }
    @media (max-width: 990px) {
      text-align: right;
    }
  }
`;

const CourseMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: row;
  }
  div {
    min-width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  a {
    /* &:hover {
      border-bottom: 1px solid #112a62;
    } */
  }
`;

const Button = styled.div`
  border: none;
  background: none;
  min-width: 80px;
  display: flex;
  font-size: 1.4rem;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 0;
  margin-left: 50px;
  cursor: pointer;
  a {
    font-size: 1.6rem;
  }
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
    /* margin-right: 40px; */
    min-width: 200px;
    font-size: 1.6rem;
  }
  .imgGroup {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
  }
  .img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  img {
    width: 25px;
  }
`;

const Span = styled.span`
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Nav = (props) => {
  const [width, setWidth] = useState(800);
  const onResize = (width) => {
    setWidth(width);
  };
  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <>
        {width > 800 && (
          <>
            <StyledHeader>
              <CourseMenu>
                <Link href="/">
                  <div className="logo">
                    <img src="/static/long_logo.svg" />
                  </div>
                </Link>
              </CourseMenu>
              <UserData>
                <Link legacyBehavior href="/blog">
                  <div className="blog">
                    {/* <a>{t("blog")}</a> */}
                    <a>Blog</a>
                  </div>
                </Link>
              </UserData>
            </StyledHeader>
          </>
        )}
        {width < 800 && (
          <>
            <StyledHeader>
              <Span>
                <Link href="/">
                  <div className="logo">
                    <img src="/static/long_logo.svg" />
                  </div>
                </Link>
              </Span>
            </StyledHeader>
          </>
        )}
      </>
    </>
  );
};

// export default withTranslation("common")(Nav);
export default Nav;