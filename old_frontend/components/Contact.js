import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withTranslation } from "../i18n";

const Styles = styled.div`
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #00204e;
  padding-bottom: 2%;
`;

const Box = styled.div`
  width: 50%;
  padding-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    color: white;
    font-weight: 800;
    font-size: 2rem;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 1.5rem;
      margin-bottom: 3%;
    }
  }
  @media (max-width: 600px) {
    width: 85%;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Button = styled.a`
  transition: all 0.2s ease;
  background: #0068e5;
  border-radius: 6px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 1.5% 4%;
  margin-top: 5%;
  &:hover {
    background: white;
    color: #0068e5;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Contact = ({ t }) => {
  return (
    <Styles>
      <Box>
        <div>
          {t("create1")}
          <br />
          {t("create2")}
        </div>
        <Link
          href={{
            pathname: "/coursePage",
            query: { id: "ck1srkdul00l20763ut2aicn9" },
          }}
        >
          <Button>{t("learn")}</Button>
        </Link>
      </Box>
    </Styles>
  );
};

export default withTranslation("search")(Contact);
