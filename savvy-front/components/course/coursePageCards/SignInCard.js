import { useState } from "react";
import styled from "styled-components";
import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  /* min-height: 290px; */
  padding: 2% 4%;
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  font-style: italic;
  padding: 4% 0;
  line-height: 1.4;
`;

const SmallButton = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 100%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
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
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const RegisterCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signup");
  const { t } = useTranslation("course");

  const changeState = (dataFromChild) => {
    setAuth(dataFromChild);
  };

  return (
    <>
      <Payment>
        <Header>✍️ {t("register_header")}</Header>
        <div>{t("register_explainer")}</div>
        <SmallButton onClick={(e) => setIsOpen(true)}>
          {t("register_button")}
        </SmallButton>
      </Payment>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={(e) => setIsOpen(!isOpen)}
        onEscapeKeydown={(e) => setIsOpen(!isOpen)}
      >
        {auth === "signin" && (
          <Signin
            getData={changeState}
            closeNavBar={(e) => setIsOpen(!isOpen)}
          />
        )}
        {auth === "signup" && (
          <Signup
            getData={changeState}
            closeNavBar={(e) => setIsOpen(!isOpen)}
          />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </StyledModal>
    </>
  );
};

export default RegisterCard;
