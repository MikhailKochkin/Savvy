import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import Icon from "react-icons-kit";
import { vk } from "react-icons-kit/icomoon/vk";
import { instagram } from "react-icons-kit/icomoon/instagram";
import { telegram } from "react-icons-kit/icomoon/telegram";

const FooterStyles = styled.div`
  background-color: #112a62;
  color: white;
  max-height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MissionContactStyles = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2% 2%;
  div {
    font-size: 1.8rem;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    width: 90%;
    justify-content: space-around;
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
  a {
    color: white;
  }
  a:hover {
    color: #005987;
  }
  @media (max-width: 900px) {
    margin-bottom: 5%;
    border-bottom: 0.5px solid white;
    padding-bottom: 5%;
  }
`;

const LinksStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  a {
    color: white;
  }
  a:hover {
    color: #005987;
  }
`;

const LegalAndSocial = styled.div`
  border-top: 0.5px solid white;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1% 2%;
  padding-bottom: 2%;
  font-size: 1.8rem;
  p {
    color: white;
    margin: 0%;
    padding-right: 10px;
  }
  div {
    padding: 0% 0%;
  }
  div > a {
    color: white;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    width: 90%;
  }
`;

const Footer = () => (
  <FooterStyles>
    <MissionContactStyles>
      <div className="motto">
        <div>Ищите нас в социальных сетях:</div>
        <Social>
          <a target="_blank" href="https://vk.com/savvy_university">
            <Icon size={40} icon={vk} />
          </a>

          <a target="_blank" href="https://www.instagram.com/savvy_legal">
            <Icon size={40} icon={instagram} />
          </a>

          <a target="_blank" href="https://t.me/SavvyLive">
            <Icon size={40} icon={telegram} />
          </a>
        </Social>
      </div>
      <LinksStyles>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "terms" }
          }}
        >
          <a>Пользовательское соглашение</a>
        </Link>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "privacy" }
          }}
        >
          <a>Политика обработки персональных данных</a>
        </Link>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "offer" }
          }}
        >
          <a>Оферта</a>
        </Link>
        <a href="mailto:mikhailkochkin@savvvy.app">Напишите нам</a>
      </LinksStyles>
    </MissionContactStyles>
    <LegalAndSocial>
      <p>ИП Кочкин Михаил Валерьевич</p>
      <p>ИНН: 771771639796</p>
      <p>ОГРНИП: 318774600589944 </p>
    </LegalAndSocial>
  </FooterStyles>
);

export default Footer;
