import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const PopupOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  h2 {
    line-height: 1.4;
  }
  p {
    line-height: 1.4;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
`;

const SubscribeButton = styled.button`
  padding: 12px 24px;
  background: #1f2024;
  color: #fff;
  border: none;
  font-family: Montserrat;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 5px;
  a {
    color: #fff;
  }

  &:hover {
    /* background-color: #0070d1; */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ExitIntentPopup = (props) => {
  const { t } = useTranslation("navigator");
  const router = useRouter();

  const showExitIntentPopup = () => {
    const exitIntentPopup = document.getElementById("exitIntentPopup");
    exitIntentPopup.style.display = "block";
  };

  const hideExitIntentPopup = () => {
    const exitIntentPopup = document.getElementById("exitIntentPopup");
    exitIntentPopup.style.display = "none";
  };

  const handleMouseMove = (event) => {
    if (event.clientY <= 10) {
      showExitIntentPopup();
      document.removeEventListener("mousemove", handleMouseMove);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getLinkAction = (e) => {
    props.getLinkAction(null, "click_to_TG");
  };

  return (
    <PopupOverlay
      id="exitIntentPopup"
      onClick={(event) => {
        if (event.target.id === "exitIntentPopup") {
          hideExitIntentPopup();
        }
      }}
    >
      <PopupContent>
        <h2>{t("wait")}</h2>
        <p>{t("we_have")}</p>
        <SubscribeButton onClick={(e) => getLinkAction(e)}>
          <a
            href={
              router.locale == "ru"
                ? "https://t.me/besavvylawyer"
                : "https://www.linkedin.com/company/68516659"
            }
            target="_blank"
          >
            {t("subscribe")}
          </a>
        </SubscribeButton>
      </PopupContent>
    </PopupOverlay>
  );
};

export default ExitIntentPopup;
