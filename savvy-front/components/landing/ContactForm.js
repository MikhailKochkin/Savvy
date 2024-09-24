import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Router from "next/router";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import "react-phone-number-input/style.css";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  padding: 50px 0;
  min-height: 85vh;
  width: 100vw;
  background-color: #0d1321;
  /* background-image: url("/static/pattern.svg");
  background-size: cover; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: auto;
    padding: 80px 0;
    min-height: 0;
    background-size: contain;
  }
`;

const Container = styled.div`
  width: 35%;
  height: 90%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  min-width: 460px;

  padding: 4%;
  color: #fff;
  line-height: 1.2;
  font-size: 4rem;
  font-weight: 400;
  .highlight {
    padding-bottom: 1px;
    border-bottom: 3px solid #f9d801;
    font-weight: 600;
  }
  .orange {
    color: #edaf20;
  }
  #header {
    font-size: 2.8rem;
    line-height: 1.2;
    width: 90%;
    font-weight: 700;
    margin-bottom: 20px;
  }
  #intro {
    font-size: 2.2rem;
    width: 95%;
    font-weight: 600;
    margin-top: 10px;
    line-height: 1.2;
  }
  #details2 {
    font-size: 2rem;
    div {
      line-height: 1.4;
      margin: 10px 0;
    }
  }
  #details {
    font-size: 1.6rem;
    line-height: 1.4;
    width: 90%;

    #prices {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .full {
        width: 48%;
        color: #8b887e;
        span {
          font-size: 2.6rem;
        }
      }
      .parts {
        width: 48%;
        span {
          font-size: 2.6rem;
        }
      }
    }
    #price {
      border-bottom: 2px solid white;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    div {
      margin: 5px 0;
    }
    span {
      font-weight: 500;
    }
  }
  @media (max-width: 1200px) {
    margin-bottom: 40px;
  }
  @media (max-width: 800px) {
    height: auto;
    width: 100%;
    min-width: 100px;
    margin-bottom: 10px;
    #description {
      width: 100%;
    }
    #header {
      font-size: 2.6rem;
      width: 95%;
    }
    #details {
      #prices {
        flex-direction: column;
        .full {
          width: 90%;
          span {
            font-size: 2.2rem;
          }
        }
        .parts {
          width: 90%;
          margin-top: 10px;

          span {
            font-size: 2.2rem;
          }
        }
      }
    }
  }
`;

const Contact = styled.div`
  width: 48%;
  min-width: 460px;
  margin-top: 50px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .h2 {
      width: 80%;
      margin-bottom: 30px;
      font-weight: 700;
      font-size: 2.8rem;
      line-height: 1.2;
    }
    form {
      width: 90%;
    }
  }
  .label {
    color: #929395;
  }
  input {
    width: 100%;
    padding: 1% 2%;
    font-family: Montserrat;
    border: none;
    background: none;
    margin-top: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid #702eff;
    outline: 0;
    color: #fff;
    cursor: pointer;
    font-size: 1.6rem;
  }
  #legal {
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
    }
  }
  button {
    width: 100%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: none;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #edaf20;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 500;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #d09611;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    min-width: 100px;
    height: auto;
    margin-top: 0px;
    flex-direction: column;
    padding: 4% 4%;
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
      color: black;
      font-weight: 500;
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    form {
      width: 100%;
      border: none;
    }
    #form_container {
      width: 100%;
    }
  }
`;

const Form = styled.div`
  height: 90%;
  /* padding: 4%; */
  color: black;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  .PhoneInput {
    width: 80%;
    height: 22px;
    select {
    }
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    border-radius: 0;
    padding: 6% 4%;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      width: 95%;
    }
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    #form {
      width: 100%;
      border: none;
    }
    #form_container {
      width: 95%;
      .h2 {
        width: 100%;
      }
      form {
        width: 100%;
      }
    }
  }
`;

const Action = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("000000000000000");

  const { t } = useTranslation("landing");

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  return (
    <Styles id="talk_to_founder">
      <Container>
        <Form>
          <Description>
            Talk to our <span className="orange">founder</span> to get started
          </Description>
          <Contact>
            <div id="form_container">
              <form>
                <div className="label">Name</div>
                <input
                  id="name"
                  className="data"
                  autocomplete="off"
                  // placeholder={t("name")}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <div className="label">Number</div>
                <input
                  id="tel"
                  className="data"
                  type="tel"
                  autocomplete="off"
                  // placeholder={t("number")}
                  onChange={(e) => setNumber(e.target.value)}
                /> */}
                <div className="label">Email</div>
                <input
                  id="email"
                  className="data"
                  type="email"
                  autocomplete="off"
                  // placeholder={t("email")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  id="english_application_button1"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!EmailValidator.validate(email)) {
                      alert("Wrong Email");
                    } else {
                      const res = await createBusinessClient({
                        variables: {
                          type: "main_page",
                          email,
                          name,
                          number,
                        },
                      });
                      alert(
                        "Thank you for your interest! We will contact you soon"
                      );
                    }
                  }}
                >
                  {t("c2a_button2")}
                </button>
              </form>
            </div>
          </Contact>
        </Form>
      </Container>
    </Styles>
  );
};

export default Action;
