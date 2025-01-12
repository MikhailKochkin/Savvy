import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";

import { useUser } from "../User";
import Signout from "../auth/Signout";

const SideMenu = styled.div`
  /* The side navigation menu */
  .sidenav {
    height: 0; /* 100% Full-height */
    width: 100%; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #0d1321; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    /* padding-top: 60px; Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    display: flex;
    flex-direction: column;
    button {
      color: #fff;
      font-family: Montserrat;
      font-weight: 600;
      font-size: 1.6rem;
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
      /* padding-top: 15px; */
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const MobileMenu = styled.header`
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    img {
      height: 28px;
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
        margin-right: 20px;
        line-height: 2.2rem;
      }
    }
    @media (max-width: 990px) {
      text-align: right;
    }
  }
`;

const DesktopMenu = styled.header`
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
      min-width: 200px;
      text-align: center;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("nav");

  const onResize = (width) => {
    setWidth(width);
  };

  const toggleModal = (e) => setIsOpen(!isOpen);

  const openNav = () => {
    document.getElementById("mySidenav").style.height = "35%";
    document.getElementById("mySidenav").style.paddingTop = "50px";
  };

  /* Set the width of the side navigation to 0 */
  const closeNav = () => {
    document.getElementById("mySidenav").style.height = "0%";
    document.getElementById("mySidenav").style.paddingTop = "0";
  };

  let me = useUser();
  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <>
        {width > 800 && (
          <DesktopMenu>
            <CourseMenu>
              <Link href="/">
                <div className="logo">
                  <img src="/static/logo_dark_long_lesson_menu.svg" />
                </div>
              </Link>
            </CourseMenu>
            <UserData>
              <Link legacyBehavior href="/blog">
                <div className="blog">
                  <a>{t("blog")}</a>
                </div>
              </Link>
              {me && (
                <Link
                  legacyBehavior
                  href={{
                    pathname: "/account",
                    query: { id: me.id },
                  }}
                >
                  <a className="name">{t("my_account")}</a>
                </Link>
              )}
              {me ? (
                <Link
                  legacyBehavior
                  href={{
                    pathname: "/account",
                    query: { id: me.id },
                  }}
                >
                  <a className="name">
                    {me.surname ? `${me.name} ${me.surname}` : `${me.name}`}
                  </a>
                </Link>
              ) : null}
              {me ? (
                <Signout />
              ) : (
                <Button>
                  <Link
                    href={{
                      pathname: "/auth",
                      query: {
                        pathname: router.asPath,
                      },
                    }}
                  >
                    {t("login")}
                  </Link>{" "}
                </Button>
              )}
            </UserData>
          </DesktopMenu>
        )}
        {width < 800 && (
          <>
            <MobileMenu>
              <Span onClick={(e) => openNav()}>
                {/* <div>BeSavvy</div> */}
                <div className="mini_logo">
                  {/* BeSavvy Lawyer */}
                  <img src="/static/logo_dark_long_lesson_menu.svg" />
                </div>
              </Span>
              <div className="logo">
                {me ? (
                  <Link
                    legacyBehavior
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
                  <Button onClick={(e) => toggleModal()}>
                    <Link
                      href={{
                        pathname: "/auth",
                        query: {
                          pathname: router.asPath,
                        },
                      }}
                    >
                      {t("login")}
                    </Link>{" "}
                  </Button>
                )}
              </div>
            </MobileMenu>
            <SideMenu>
              <div id="mySidenav" className="sidenav">
                <a
                  href="javascript:void(0)"
                  class="closebtn"
                  onClick={(e) => closeNav()}
                >
                  &times;
                </a>

                <Link href="/">
                  <button onClick={(e) => closeNav()}>BeSavvy</button>
                </Link>

                <Link
                  href={{
                    pathname: "/blog",
                  }}
                >
                  <button onClick={(e) => closeNav()}>{t("blog")}</button>
                </Link>
                {me && (
                  <Link
                    href={{
                      pathname: "/account",
                      query: { id: me.id },
                    }}
                  >
                    <button onClick={(e) => closeNav()}>
                      {t("my_account")}
                    </button>
                  </Link>
                )}
                {me ? <Signout /> : null}
              </div>
            </SideMenu>
          </>
        )}
      </>
    </>
  );
};

// export default withTranslation("common")(Nav);
export default Nav;
