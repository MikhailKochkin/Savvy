import React from "react";
import styled from "styled-components";
import Link from "next/link";

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
    <div className="block">
      <div>ИП Кочкин Михаил Валерьевич</div>
      <div>ИНН: 771771639796</div>
      <div>ОГРНИП: 318774600589944 </div>
    </div>
    <div className="block">
      <div>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "terms" },
          }}
        >
          <a>Пользовательское соглашение</a>
        </Link>
      </div>
      <div>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "privacy" },
          }}
        >
          <a>Политика обработки персональных данных</a>
        </Link>
      </div>
      <div>
        <Link
          href={{
            pathname: "/legal",
            query: { name: "offer" },
          }}
        >
          <a>Оферта</a>
        </Link>
      </div>
    </div>
    <div className="mini">
      <div>
        <a target="_blank" href="https://vk.com/besavvylawyer">
          Вконтакте
        </a>
      </div>
      <div>
        <a target="_blank" href="https://www.instagram.com/savvy_legal">
          Инстаграм
        </a>
      </div>
      <div>
        <a target="_blank" href="https://t.me/SavvyLive">
          Телеграм
        </a>
      </div>
    </div>
  </FooterStyles>
);

export default Footer;
