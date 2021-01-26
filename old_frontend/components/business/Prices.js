import { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { check } from "react-icons-kit/fa/check";
import Icon from "react-icons-kit";
import OurCalculator from "./OurCalculator";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 5%;
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

const Styles2 = styled.div`
  height: 65vh;
  width: 100vw;
  background: #f2f0ea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 3%;
    text-align: center;
  }
  #box {
    width: 80%;
  }
  @media (max-width: 800px) {
    #header {
      font-size: 2.2rem;
      margin: 5% 0;
    }
  }
`;

const Cards = styled.div`
  width: 80%;
  height: 65%;
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
  width: ${(props) => (props.chosen ? "30%" : "25%")};
  height: ${(props) => (props.chosen ? "110%" : "100%")};
  border-radius: 15px;
  cursor: pointer;
  .top {
    padding: 2% 14%;
    height: 50%;
    background: #f7f8fc;
    border-radius: 15px 15px 0 0;
    border: 1px solid;
    border-color: ${(props) => (props.chosen ? "#1F2041" : "#e1e5f4")};
    border-bottom: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .bottom {
    height: 50%;
    background: white;
    border: 1px solid;
    border-color: ${(props) => (props.chosen ? "#1F2041" : "#e1e5f4")};
    border-radius: 0 0 15px 15px;
    border-top: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
    font-size: 1.3rem;
    /* justify-content: center; */
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
  margin-top: 10%;
  width: 70%;
  padding: 4% 0;
  outline: 0;
  color: white;
  border-radius: 5px;
  border: 1px solid #12182d;
  cursor: pointer;
  font-family: Montserrat;
  transition: all 0.5s;
  &:hover {
    background: white;
    color: black;
  }
`;

const Prices = () => {
  const [plan, setPlan] = useState("business");
  return (
    <>
      <Styles>
        <div id="header">Save money with us by spending only:</div>
        <Cards>
          <Card onClick={(e) => setPlan("basic")} chosen={plan === "basic"}>
            <div className="top">
              <div className="type">Pilot</div>
              <div className="price">8$</div>
              <div className="terms">
                per student, per month,
                <br /> per course
              </div>
              <Button
                onClick={(e) => {
                  Router.push({
                    pathname: "/hello",
                  });
                }}
              >
                Get Started
              </Button>
            </div>
            <div className="bottom">
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
            </div>
          </Card>
          <Card
            onClick={(e) => setPlan("business")}
            chosen={plan === "business"}
          >
            <div className="top">
              <div className="type">Business</div>
              <div className="price">15$</div>
              <div className="terms">
                per student, per month,
                <br /> per course
              </div>
              <Button
                onClick={(e) => {
                  Router.push({
                    pathname: "/hello",
                  });
                }}
              >
                Get Started
              </Button>
            </div>
            <div className="bottom">
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
            </div>
          </Card>
          <Card
            onClick={(e) => setPlan("enterprise")}
            chosen={plan === "enterprise"}
          >
            <div className="top">
              <div className="type">Enterprise</div>
              <div className="price">Let's talk</div>
              <div className="terms">
                per student, per month, <br /> per course
              </div>
              <Button
                onClick={(e) => {
                  Router.push({
                    pathname: "/hello",
                  });
                }}
              >
                Get Started
              </Button>
            </div>
            <div className="bottom">
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
              <div className="inner">
                <Icon size={17} icon={check} />
                <span> Create your courses using our tutorials</span>
              </div>
            </div>
          </Card>
        </Cards>
      </Styles>
      <Styles2>
        <div id="header">How much will you spend and save with us?</div>
        <div id="box">
          <OurCalculator plan={plan} />
        </div>
      </Styles2>
    </>
  );
};

export default Prices;
