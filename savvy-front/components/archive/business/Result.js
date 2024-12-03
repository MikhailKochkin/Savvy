import styled from "styled-components";
import Router from "next/router";

const Styles = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 800px) {
    height: auto;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #block {
    width: 50%;
  }
  #header {
    width: 100%;
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
    line-height: 1.5;
  }
  #C2A {
    margin: 20px 0;
    width: 100;
    font-size: 2rem;
    font-weight: 400;
    text-align: left;
    line-height: 1.5;
  }
  #container {
    height: 40%;
  }
  button {
    width: 240px;
    cursor: pointer;
    border: 2px solid black;
    border-radius: 6px;
    height: 60px;
    background: black;
    font-family: Montserrat;
    font-size: 1.6rem;
    font-weight: bold;
    transition: all 0.5s;
    color: white;
    outline: 0;
    &:hover {
      background: #fff;
      color: black;
    }
  }
  img {
    height: 100%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #container {
      height: 300px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    #header {
      width: 90%;
      font-size: 2.2rem;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;
const Result = (props) => {
  return (
    <Styles>
      <Container>
        <div id="block">
          {/* <div id="header">{props.t("result")}</div> */}
          <div id="C2A">
            Посмотрите, как это работает на практике в нашем демо-уроке
          </div>
          <button
            onClick={(e) => {
              Router.push({
                pathname: "/demo",
              });
            }}
          >
            Демо Урок
          </button>
        </div>
        <div id="container">
          <img src="../../static/result.svg" />
        </div>
      </Container>
    </Styles>
  );
};

export default Result;
