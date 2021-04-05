import { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { check } from "react-icons-kit/fa/check";
import Icon from "react-icons-kit";
import OurCalculator from "./OurCalculator";
import { withTranslation } from "../../i18n";

const Styles = styled.div`
  min-height: 70vh;
  width: 100vw;
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .custom-shape-divider-top-1616698146 {
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1616698146 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 76px;
  }

  .custom-shape-divider-top-1616698146 .shape-fill {
    fill: #f5f5f5;
  }
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin: 5% 0;
    text-align: center;
  }
  @media (max-width: 800px) {
    height: auto;
    #header {
      font-size: 2.2rem;
      margin: 5% 0;
    }
  }
`;

const Cards = styled.div`
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  /* background: #12182d; */
`;

const Card = styled.div`
  transition: all 0.3s;
  width: ${(props) => (props.chosen ? "30%" : "30%")};
  height: ${(props) => (props.chosen ? "300px" : "300px")};
  border-radius: 15px;
  cursor: pointer;
  .top {
    padding: 15px 30px;
    min-height: 90%;
    background: #f7f8fc;
    border-radius: 15px;
    border: 2px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-color: #e1e5f4;
    &:hover {
      border-color: #1f2041;
    }
  }
  .bottom {
    height: 50%;
    background: white;
    border: 2px solid;
    /* border-color: ${(props) => (props.chosen ? "#1F2041" : "#e1e5f4")}; */
    border-radius: 0 0 15px 15px;
    border-top: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
    font-size: 1.3rem;
    &:hover {
      border-color: ${(props) => (props.chosen ? "#e1e5f4" : "#1F2041")};
    }
  }
  .inner {
    width: 80%;
    margin-bottom: 5px;
    span {
      margin-left: 5px;
    }
  }
  .type {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .price {
    font-size: 2.4rem;
    font-weight: bold;
  }
  .terms {
    text-align: center;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  background: black;
  margin-top: 10px;
  width: 70%;
  padding: 4% 0;
  outline: 0;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid #12182d;
  cursor: pointer;
  font-family: Montserrat;
  transition: all 0.5s;
  &:hover {
    background: #f7f8fc;
    color: black;
  }
`;

const Explainer = styled.div`
  width: 80%;
  margin: 20px 0 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .explainer_header {
    width: 70%;
    text-align: center;
    font-size: 2.4rem;
    font-weight: bold;
    margin: 5% 0;
  }
  @media (max-width: 800px) {
    width: 95%;
    .explainer_header {
      width: 100%;
      font-size: 2.2rem;
    }
  }
`;

const Prices = (props) => {
  const [plan, setPlan] = useState("business");
  return (
    <Styles>
      <div class="custom-shape-divider-top-1616698146">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div id="header">{props.t("prices_header")}</div>
      <Cards>
        <Card onClick={(e) => setPlan("basic")} chosen={plan === "basic"}>
          <div className="top">
            <div className="type">{props.t("pilot")}</div>
            <div className="price">100 000 ₽</div>
            <div className="terms">{props.t("pilot_terms")}</div>
            <Button
              onClick={(e) => {
                Router.push({
                  pathname: "/hello",
                });
              }}
            >
              {props.t("C2A")}
            </Button>
          </div>
        </Card>
        <Card onClick={(e) => setPlan("business")} chosen={plan === "business"}>
          <div className="top">
            <div className="type">{props.t("business")}</div>
            <div className="price">150 000₽</div>
            <div className="terms">{props.t("business_terms")}</div>
            <Button
              onClick={(e) => {
                Router.push({
                  pathname: "/hello",
                });
              }}
            >
              {props.t("C2A")}
            </Button>
          </div>
        </Card>
        <Card
          onClick={(e) => setPlan("enterprise")}
          chosen={plan === "enterprise"}
        >
          <div className="top">
            <div className="type">{props.t("enterprise")}</div>
            <div className="price">{props.t("talk")}</div>
            <div className="terms">{props.t("enterprise_terms")}</div>
            <Button
              onClick={(e) => {
                Router.push({
                  pathname: "/hello",
                });
              }}
            >
              {props.t("C2A")}
            </Button>
          </div>
        </Card>
      </Cards>
      <Explainer>
        <div className="explainer_header">
          Наша задача – перевести 60% внутреннего обучения в симуляторы,
          отцифровать образовательный опыт сотрудников и в 2 раза сократить
          расходы на обучение
        </div>
      </Explainer>
    </Styles>
  );
};

export default withTranslation("business")(Prices);
