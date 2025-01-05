import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

import { useUser } from "../User";
import Signout from "../auth/Signout";

const Styles = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  a {
    font-weight: 500;
    color: black;
    transition: ease 0.2s;
    &:hover {
      color: #5c5c5c;
      cursor: pointer;
    }
  }
  .menu_bar {
    width: 100%;
    max-width: 1140px;
    padding-left: 20px;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 2rem;
      font-weight: 500;
      margin-right: 20%;
      cursor: pointer;
      img {
        height: 32px;
      }
    }
  }
`;

const MobileMenu = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20%;
  display: none;
  margin-right: 20px;
  img {
    width: 25px;
  }
  @media (max-width: 1000px) {
    display: flex;
    justify-content: flex-end;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  width: 70%;
  font-weight: 500;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  div {
    transition: ease 0.2s;
  }
  .enter {
    border-radius: 30px;
    border: 2px solid black;
    font-weight: 500;
    padding: 5px 25px;
    cursor: pointer;
    &:hover {
      color: #5c5c5c;
      cursor: pointer;
      border-color: #5c5c5c;
    }
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

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

const NewNav = (props) => {
  let me = useUser();
  const { t } = useTranslation("nav");
  const router = useRouter();

  const openNav = () => {
    document.getElementById("mySidenav").style.height = "35%";
    document.getElementById("mySidenav").style.paddingTop = "50px";
  };

  /* Set the width of the side navigation to 0 */
  const closeNav = () => {
    document.getElementById("mySidenav").style.height = "0%";
    document.getElementById("mySidenav").style.paddingTop = "0";
  };

  return (
    <Styles>
      <div className="menu_bar">
        <Link href="/">
          <div className="logo">
            <Image
              src={`/static/logo_dark_long_lesson_menu.svg`}
              alt={"logo"}
              width="132"
              height="42"
            />
          </div>
        </Link>
        <MobileMenu onClick={openNav}>
          <img src="static/menu-icon.svg" />
        </MobileMenu>
        <DesktopMenu>
          <Link href="/blog">
            <div className="blog">{t("blog")}</div>
          </Link>
          <Link href="/security">
            <div className="blog">Security</div>
          </Link>
          {me && (
            <Link
              href={{
                pathname: "/account",
                query: { id: me.id },
              }}
            >
              <div className="lk">{t("my_account")}</div>
            </Link>
          )}
          {!me && (
            <div className="enter">
              <Link
                href={{ pathname: "/auth", query: { pathname: router.asPath } }}
              >
                {t("login")}
              </Link>
            </div>
          )}
          {me ? <Signout landing={true} /> : null}
        </DesktopMenu>
      </div>
      <SideMenu>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>

          <Link href="/">
            <button onClick={closeNav}>BeSavvy</button>
          </Link>
          <Link
            href={{
              pathname: "/blog",
            }}
          >
            <button onClick={closeNav}>{t("blog")}</button>
          </Link>
          {me && (
            <Link
              href={{
                pathname: "/account",
                query: { id: me.id },
              }}
            >
              <button onClick={(e) => closeNav()}>{t("my_account")}</button>
            </Link>
          )}
          {me ? <Signout /> : null}
        </div>
      </SideMenu>
    </Styles>
  );
};

export default NewNav;
