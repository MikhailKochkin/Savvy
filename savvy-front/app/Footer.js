"use client";

import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import CookieConsent from "react-cookie-consent";

const FooterStyles = styled.div`
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: white;
  max-height: 40%;
  min-height: 400px;
  width: 100%;
  padding: 2% 0;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
  }
  a {
    color: white;
  }
  .social {
    margin: 6px 0;
    text-align: center;
    a {
      font-weight: 600;
    }
  }
  .block {
    display: flex;
    flex-direction: row;
    margin: 6px 0;
    #cross {
      margin: 0 5px;
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
  .imgGroup {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation("nav");
  const { pathname, asPath, query } = router;

  return (
    <FooterStyles>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        enableDeclineButton
        declineButtonText="No"
        flipButtons
        cookieName="beSavvyCookieConsent"
        style={{ background: "#2B373B", padding: "0 10px" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={365}
      >
        We use cookies to ensure that we give you the best experience on our
        website. If you continue to use this site we will assume that you are
        happy with it.
      </CookieConsent>
      <div className="container">
        {router.locale == "ru" ? (
          <div className="social">
            Мы публикуем посты в{" "}
            <a href="https://www.instagram.com/besavvylawyer/" target="_blank">
              инстаграме
            </a>
            , публикуем карточки в{" "}
            <a href="https://vk.com/besavvylawyer" target="_blank">
              ВК
            </a>{" "}
            и делимся инсайтами в{" "}
            <a href="https://t.me/+5FUacwk7o6czYzdi" target="_blank">
              телеграме
            </a>
          </div>
        ) : (
          <div className="social">
            <div>
              We publish posts and reels on{" "}
              <a href="https://www.instagram.com/besavvyworld/" target="_blank">
                Instagram
              </a>
              , write threads on{" "}
              <a href="https://twitter.com/besavvyworld" target="_blank">
                Twitter
              </a>{" "}
              and sometimes post videos on{" "}
              <a
                href="https://www.youtube.com/channel/UC8dZeytW8ChNaUPXlu_1yBw"
                target="_blank"
              >
                Youtube
              </a>
              .
            </div>
          </div>
        )}
        <div className="block">
          <div>{t("name")} © 2018 — 2023 </div>
        </div>
        <div className="block">
          {router.locale == "ru" && (
            <div>
              {t("tax_number")} / {t("registration_number")}{" "}
            </div>
          )}
        </div>
        <div className="block">
          <div>
            <Link
              legacyBehavior
              href={{
                pathname: "/legal",
                query: { name: "terms" },
              }}
            >
              <a>{t("terms")}</a>
            </Link>
          </div>
          <div id="cross"> × </div>
          <div>
            <Link
              legacyBehavior
              href={{
                pathname: "/legal",
                query: { name: "privacy" },
              }}
            >
              <a>{t("privacy_policy")}</a>
            </Link>
          </div>
          <div id="cross"> × </div>
          <div>
            <Link
              legacyBehavior
              href={{
                pathname: "/legal",
                query: { name: "cookie" },
              }}
            >
              <a>Cookies</a>
            </Link>
          </div>
        </div>
        <div className="imgGroup">
          <div className="img">
            <img
              src="../../static/uk.svg"
              onClick={(e) =>
                router.push({ pathname, query }, asPath, {
                  locale: "en",
                })
              }
            />
          </div>
          <div className="img">
            <img
              src="../../static/russia.svg"
              onClick={(e) =>
                router.push({ pathname, query }, asPath, {
                  locale: "ru",
                })
              }
            />
          </div>
        </div>
        {/* <div className="mini">
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
        </div> */}
      </div>
    </FooterStyles>
  );
};

// export default withTranslation("search")(Footer);
export default Footer;
