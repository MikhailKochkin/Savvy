import React from "react";
import styled from "styled-components";

const Message = styled.div`
  width: 100%;
  height: 10vh;
  background: #f53f85;
  color: white;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  a {
    color: white;
    cursor: pointer;
    &:hover {
      color: #00ffcd;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.5rem;
    padding: 2%;
    height: auto;
    a {
      color: #00ffcd;
    }
  }
`;

const Alert = () => {
  let url = document.URL;
  return (
    <>
      {url.includes("savvvy") && (
        <Message>
          <div>
            Мы переехали! Новый домен:{" "}
            <a href="https://besavvy.app">besavvy.app</a>. Пожалуйста,
            используйте его. Теперь регистрация на курсы проходит только там!{" "}
          </div>
        </Message>
      )}
    </>
  );
};

export default Alert;
