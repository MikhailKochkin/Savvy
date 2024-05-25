import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Router from "next/router";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #d6d6d6;
  background: #fff;
  z-index: 10;
  position: fixed;
  bottom: 0px;
  height: 100px;
`;

const ButtonOpen = styled.a`
  width: 90%;
  height: 48px;
  padding: 5px;
  font-family: Montserrat;
  border: 2px solid #283d3b;
  text-align: center;
  background: #175ffe;
  margin-bottom: 10px;
  outline: 0;
  text-align: center;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  color: #fff;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const MobileAction = (props) => {
  const { t } = useTranslation("coursePage");
  return (
    <Styles>
      <ButtonOpen
        id="coursePage_to_demolesson"
        onClick={(e) => {
          e.preventDefault();
          Router.push({
            pathname: "/subscription",
            query: {
              courseId: props.coursePage.id,
            },
          });
        }}
      >
        Открыть доступ
      </ButtonOpen>
    </Styles>
  );
};

export default MobileAction;
