import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import { check } from "react-icons-kit/fa/check";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_down } from "react-icons-kit/md/ic_keyboard_arrow_down";
import * as EmailValidator from "email-validator";
const CREATE_CLIENT = gql`
  mutation createBusinessClient($email: String!) {
    createBusinessClient(email: $email) {
      id
    }
  }
`;

const Styles = styled.div`
  height: 85vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Containers = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
`;

const LeftContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div {
    height: 50%;
    img {
      height: 100%;
    }
  }
  .secret {
    display: none;
  }
  @media (max-width: 800px) {
    order: 2;
    margin-top: 20px;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    .secret {
      display: block;
    }
    div {
      height: 150px;
    }
  }
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  div {
    height: 50%;
    img {
      height: 100%;
    }
  }
  @media (max-width: 800px) {
    display: none;
    width: 100%;
    div {
      background: pink;
      height: 10%;
    }
  }
`;

const CentralContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #big {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 4%;
  }
  #main {
    font-size: 2.3rem;
    text-align: center;
    margin-bottom: 6%;
  }
  #input {
    width: 80%;
    height: 45px;
    display: flex;
    flex-direction: row;
    #text {
      border: 2px solid black;
      border-radius: 6px 0 0 6px;
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2px 5px;
      input {
        outline: none;
        font-family: Montserrat;
        height: 70%;
        border: none;
        width: 100%;
        font-size: 1.7rem;
        padding: 2%;
      }
    }
    button {
      width: 30%;
      background: black;
      color: white;
      height: 100%;
      border: 2px solid black;
      border-left: none;
      font-family: Montserrat;
      font-size: 1.8rem;
      font-weight: bold;
      outline: none;
      border-radius: 0 6px 6px 0;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        border: 2px solid black;
        border-left: none;
        color: black;
        background: white;
      }
    }
  }
  #advantages {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  }
  .bullet {
    display: flex;
    width: 250px;
    flex-direction: row;
    font-size: 1.2rem;
    font-weight: bold;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 30px;
      margin-right: 15px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  @media (max-width: 800px) {
    order: 1;
    width: 90%;
    #big {
      font-size: 3rem;
      font-weight: bold;
      margin: 6% 0;
      text-align: center;
      width: 90%;
      line-height: 1.4;
    }
    #main {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 6%;
    }
    #input {
      flex-direction: column;
      height: auto;
      #text {
        margin-bottom: 10px;
        border: 2px solid black;
        border-radius: 6px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        input {
          height: 70%;
          width: 100%;
          font-size: 1.7rem;
          text-align: center;
        }
      }
      button {
        width: 100%;
        border: 2px solid black;
        border-radius: 6px;
        padding: 6px;
        font-size: 1.6rem;
        text-align: center;
        &:hover {
          border: 2px solid black;
          color: black;
          background: white;
        }
      }
    }
    #advantages {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .bullet {
        width: 100%;
        font-size: 1.5rem;
        margin-bottom: 10px;
      }
      div {
        text-align: left;
      }
    }
  }
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 0;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Intro = () => {
  const [email, setEmail] = useState("");

  const slide = () => {
    var my_element = document.getElementById("about");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Mutation mutation={CREATE_CLIENT} variables={{ email }}>
      {(createBusinessClient, { error, loading }) => (
        <Styles>
          <Containers>
            <LeftContainer>
              <div>
                <img src="../../static/boy.svg" />
              </div>
              <div className="secret">
                <img src="../../static/girl.svg" />
              </div>
            </LeftContainer>
            <CentralContainer>
              <div id="big">Great training starts here</div>
              <div id="main">
                Give your employees an e-mentor and cust costs on internal
                training by 60%.
              </div>
              <div id="input">
                <div id="text">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mikhail@besavvy.app"
                  />
                </div>
                <button
                  onClick={(e) => {
                    if (EmailValidator.validate(email)) {
                      Router.push({
                        pathname: "/hello",
                      });
                      createBusinessClient();
                    } else {
                      alert("This is not a correct email");
                    }
                  }}
                >
                  Get Started
                </button>
              </div>
              <div id="advantages">
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>Unique training simulators </div>
                </div>
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>24/7 tech and course development support</div>
                </div>
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>Set up next course in minutes</div>
                </div>
              </div>
            </CentralContainer>
            <RightContainer>
              <div>
                <img src="../../static/girl.svg" />
              </div>
            </RightContainer>
          </Containers>
          <Arrow>
            <Icon
              size={75}
              icon={ic_keyboard_arrow_down}
              onClick={(e) => slide()}
            />
          </Arrow>
        </Styles>
      )}
    </Mutation>
  );
};

export default Intro;
