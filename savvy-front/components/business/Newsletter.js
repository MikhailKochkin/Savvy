import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import Icon from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { facebookSquare } from "react-icons-kit/fa/facebookSquare";
import { linkedinSquare } from "react-icons-kit/fa/linkedinSquare";
import { instagram } from "react-icons-kit/fa/instagram";

const CREATE_CLIENT = gql`
  mutation createBusinessClient($email: String!) {
    createBusinessClient(email: $email) {
      id
    }
  }
`;

const Styles = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: auto;
  }
`;

const Comment = styled.div`
  width: 80%;
  text-align: left;
  margin-top: 10px;
`;

const Container = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #header {
    width: 60%;
    text-align: center;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 4%;
    line-height: 1.4;
  }
  #C2A {
    width: 50%;
    text-align: center;
    font-size: 1.8rem;
    /* font-weight: bold; */
    margin-bottom: 1%;
    line-height: 1.4;
  }
  .message {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .SM {
      width: 40%;
      margin-top: 4%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      span {
        cursor: pointer;
        &:hover {
          color: #91e9e3;
        }
      }
    }
  }
  .input {
    height: 100%;
    width: 60%;
    display: flex;
    background: #91e9e3;
    flex-direction: column;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    #advantages {
      display: flex;
      flex-direction: row;
      margin-top: 30px;
      width: 80%;
      .bullet {
        display: flex;
        width: 150px;
        flex-basis: 33%;
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
    }
    #input {
      width: 80%;
      height: 45px;
      display: flex;
      flex-direction: row;
      /* background: white; */
      background: #91e9e3;
      #text {
        border: 2px solid black;
        border-radius: 6px 0 0 6px;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* padding: 2px 5px; */
        input {
          outline: none;
          border-radius: 4px 0 0 4px;
          font-family: Montserrat;
          height: 100%;
          border: none;
          background: white;
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
  }
  @media (max-width: 800px) {
    flex-direction: column;
    height: 100vh;
    #header {
      width: 100%;
    }
    #C2A {
      width: 100%;
    }
    .message {
      flex-basis: 60%;
      width: 80%;
      .SM {
        width: 90%;
      }
    }
    .input {
      width: 100%;
      height: 80%;
      margin: 30px 0;
      flex-basis: 40%;
      #input {
        flex-direction: column;
        height: auto;
        #text {
          margin-bottom: 10px;
          border: 2px solid black;
          border-radius: 6px;
          width: 100%;
          display: flex;
          background: white;
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60%;
        margin: 20px 0;
        .bullet {
          width: 100%;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  return (
    <Mutation mutation={CREATE_CLIENT} variables={{ email }}>
      {(createBusinessClient, { error, loading }) => (
        <Styles>
          <Container>
            <div className="message">
              <div id="header">Just looking around?</div>
              <div id="C2A">
                Sign up for our newsletter and social media accounts
              </div>
              <div className="SM">
                <span>
                  <Icon size={40} icon={facebookSquare} />
                </span>
                <span>
                  <Icon size={40} icon={linkedinSquare} />
                </span>
                <span>
                  <Icon size={40} icon={instagram} />
                </span>
              </div>
            </div>
            <div className="input">
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
                      createBusinessClient();
                      setComment("We will be in touch!");
                    } else {
                      setComment("This is not a correct email");
                    }
                  }}
                >
                  Sign Up
                </button>
              </div>
              <Comment>{comment}</Comment>
              <div id="advantages">
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>For lawyers</div>
                </div>
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>For bankers</div>
                </div>
                <div className="bullet">
                  <span>
                    <Icon size={25} icon={check} />
                  </span>
                  <div>For consultants</div>
                </div>
              </div>
            </div>
          </Container>
        </Styles>
      )}
    </Mutation>
  );
};

export default Newsletter;
