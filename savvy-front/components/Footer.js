import styled from "styled-components";
import Link from "next/link";

const FooterStyles = styled.div`
  background-color: #000e29;
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

const Footer = () => {
  return (
    <FooterStyles>
      <div className="block">
        <div>
          {/* {t("ip")} */}
          ИП Кочкин Михаил Валерьевич
        </div>
        <div>
          {/* {t("inn")} */}
          ИНН: 771771639796
        </div>
        <div>
          {/* {t("ogrnip")} */}
          ОГРНИП: 318774600589944
        </div>
      </div>
      <div className="block">
        <div>
          <Link
            href={{
              pathname: "/legal",
              query: { name: "terms" },
            }}
          >
            <a>
              {/* {t("terms")} */}
              Пользовательское соглашение
            </a>
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: "/legal",
              query: { name: "privacy" },
            }}
          >
            <a>
              {/* {t("policy")} */}
              Политика обработки персональных данных
            </a>
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: "/legal",
              query: { name: "offer" },
            }}
          >
            <a>
              {/* {t("offer")} */}
              Оферта
            </a>
          </Link>
        </div>
      </div>
      <div className="mini">
        <div>
          <a target="_blank" href="https://vk.com/besavvylawyer">
            VK
          </a>
        </div>
        <div>
          <a target="_blank" href="https://www.instagram.com/besavvylawyer/">
            Instagram
          </a>
        </div>
        <div>
          <a target="_blank" href="https://t.me/SavvyLive">
            Telegram
          </a>
        </div>
      </div>
    </FooterStyles>
  );
};

// export default withTranslation("search")(Footer);
export default Footer;
