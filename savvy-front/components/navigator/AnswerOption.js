import React, { useState } from "react";
import styled from "styled-components";

import { useQuery, useMutation, gql } from "@apollo/client";
import Modal from "styled-react-modal";

import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import RequestReset from "../auth/RequestReset";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const StyledButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: ${(props) => (props.color !== "#c4c4c4" ? "2px solid" : "1px solid")};
  border-color: ${(props) => props.color};
  padding: 10px 15px;
  background: #fff;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  border-radius: ${(props) =>
    props.color !== "#c4c4c4" && props.color !== "green" ? "25px" : "0px"};

  img {
    display: block;
    margin: 2% 0;
    max-width: 100%;
    max-height: 20em;
    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }
  }
  p {
    margin: 0;
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

const AnswerOption = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");

  const [choose, setChoose] = useState(false);
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);
  const changeState = (dataFromChild) => setAuth(dataFromChild);
  const toggleModal = (e) => setIsOpen(!isOpen);

  const change = (e) => {
    if (!choose && !props.hidden) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
      setChoose(!choose);
    } else if (props.lastBlock) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
    }
  };

  const changeCourse = (e) => {
    console.log("props.lastBlock", props.lastBlock);
    if (!choose && !props.hidden) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
      setChoose(!choose);
    }
  };

  const shuffle = () => {
    props.shuffle(true);
  };

  let color;

  if (choose) {
    color = "#122A62";
  } else if (props.color) {
    color = props.color;
  } else {
    color = "#c4c4c4";
  }
  return (
    <>
      {!props.hidden &&
        (props.type == "link" ? (
          <StyledButton
            type="checkbox"
            answer={props.answer}
            number={props.number}
            choose={choose}
            onClick={(e) => {
              console.log(222);
              sendMessage({
                variables: {
                  userId: props.me.id,
                  text: `
                <p>Добрый день,</p>
                <p>Вот ссылка на материал: <a href="${props.link}">${props.link}</a></p>
                        `,
                },
              });
              change();
            }}
            color={color}
          >
            {/* <a href={props.link} target="_blank"> */}
            {props.answer && parse(props.answer)}
            {/* </a> */}
          </StyledButton>
        ) : props.type == "shuffle" ? (
          <StyledButton
            type="checkbox"
            answer={props.answer}
            onClick={(e) => shuffle()}
            choose={choose}
            color={color}
          >
            {props.answer && parse(props.answer)}
          </StyledButton>
        ) : props.type === "signup" ? (
          <StyledButton
            type="checkbox"
            answer={"Зарегистрироваться"}
            number={props.number}
            choose={choose}
            onClick={(e) => toggleModal(true)}
            color={color}
          >
            {props.answer && parse(props.answer)}
          </StyledButton>
        ) : (
          <StyledButton
            type="checkbox"
            answer={props.answer}
            number={props.number}
            choose={choose}
            onClick={(e) => change()}
            color={color}
          >
            {props.answer && parse(props.answer)}
          </StyledButton>
        ))}
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        {auth === "signin" && (
          <Signin getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "signup" && (
          <Signup getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </StyledModal>
    </>
  );
};

export default AnswerOption;
