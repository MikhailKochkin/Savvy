import { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
    $communication_medium: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
      communication_medium: $communication_medium
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #77cbfa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Block = styled.div`
  min-height: 50%;
  width: 80%;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2% 2%;
  #block1 {
    flex-basis: 50%;
    line-height: 1.4;
    font-size: 2.4rem;
    font-weight: 500;
    padding-left: 10px;
    #additional-info {
      width: 80%;
      margin-bottom: 20px;
      /* line-height: 1.8rem; */
      font-size: 1.8rem;
      margin-top: 15px;
    }
  }
  #block2 {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #form {
      width: 80%;
    }
    form {
      font-size: 1.6rem;
      margin-bottom: 5px;
      #input_box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        #call {
          flex-basis: 50%;
        }
        #telegram {
          flex-basis: 50%;
        }
        #agree {
          width: 100%;
        }
      }
    }
    .data {
      width: 100%;
      background: none;
      font-size: 1.6rem;
      border: none;
      font-family: Montserrat;
      outline: 0;
      border-bottom: 1px solid #162b4b;
      padding-bottom: 0.5%;
      cursor: pointer;
      margin-bottom: 25px;
      color: #162b4b;
      &:hover {
        border-bottom: 1px solid #162b4b;
      }
      &:active {
        border-bottom: 1px solid #162b4b;
      }
    }
    button {
      background: #4571c9;
      padding: 10px 15px;
      border-radius: 10px;
      font-size: 1.8rem;
      font-family: Montserrat;
      border: 1px solid #4571c9;
      color: #fff;
      transition: 0.2s ease-in;
      cursor: pointer;
      width: 100%;
      &:hover {
        background: #3157a1;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 50px 0;
    height: 100%;
    width: 100%;
    flex-direction: column;
    #block1 {
      font-size: 2.2rem;
      font-weight: 500;
      width: 90%;
      padding-left: 0;
    }
    #block2 {
      width: 90%;
      #additional-info {
        width: 100%;
        margin-bottom: 20px;
        margin-top: 30px;
      }
      #form {
        width: 100%;
      }
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
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

const Call1 = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [medium, setMedium] = useState("PHONE");
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);

  return (
    <Mutation
      mutation={CREATE_CLIENT}
      variables={{
        email,
        name,
        number,
        communication_medium: medium,
        type: "STUDENT",
      }}
    >
      {(createBusinessClient, { error, loading }) => (
        <Styles id="C2A">
          <Block>
            <div id="block1">
              <div>
                Запишитесь на
                <span style={{ color: "#FF6F59" }}>
                  {" "}
                  бесплатную карьерную консультацию
                </span>{" "}
                с директором программы.{" "}
              </div>
              <div id="additional-info">
                В течение 20 минут поговорим о ваших целях, расскажем, как
                искать работу, объясним, как устроена программа.
              </div>
            </div>
            <div id="block2">
              <div id="form">
                <input
                  className="data"
                  placeholder="Имя"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="data"
                  type="tel"
                  placeholder="Телефон"
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input
                  className="data"
                  type="email"
                  placeholder="Имейл"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <form>
                  <div>Удобный способ связи:</div>
                  <div id="input_box">
                    <div id="call">
                      <input
                        type="radio"
                        id="male"
                        value="PHONE"
                        name="medium"
                        onChange={(e) => setMedium("PHONE")}
                      />
                      <label for="male">Звонок</label>
                    </div>
                    <div id="telegram">
                      <input
                        type="radio"
                        id="female"
                        value="TELEGRAM"
                        name="medium"
                        onChange={(e) => setMedium("TELEGRAM")}
                      />
                      <label for="female">Телеграм</label>
                    </div>
                  </div>
                </form>
                <form>
                  <div>Согласие на обработку персональных данных</div>
                  <div id="input_box">
                    <div id="agree">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                      />
                      <label for="male">Да</label>
                    </div>
                  </div>
                </form>
                <button
                  onClick={(e) => {
                    if (EmailValidator.validate(email)) {
                      createBusinessClient();
                      toggleModal();
                    } else {
                      alert("Неправильный имейл");
                    }
                  }}
                >
                  Записаться
                </button>
              </div>
            </div>
          </Block>
          <StyledModal
            isOpen={isOpen}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
          >
            <div className="top_message">Мы получили заявку!</div>
            <div className="bottom_message">
              Спасибо, что заинтересовались нашей программой. Мы очень ждем
              возможности познакомиться с вами поближе. Напишем или позвоним вам
              в ближайшие дни.
            </div>
          </StyledModal>
        </Styles>
      )}
    </Mutation>
  );
};

export default Call1;
