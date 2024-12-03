import styled from "styled-components";
import Router from "next/router";

const Styles = styled.div`
  height: 30vh;
  width: 100vw;
  display: flex;
  background: #91e9e3;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  #header {
    width: 50%;
    font-size: 2.8rem;
    text-align: center;
  }
  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
    padding: 30px 0;
    #header {
      font-size: 2.2rem;
      margin: 5% 0;
      width: 70%;
    }
  }
`;

const Button = styled.button`
  background: black;
  width: 250px;
  padding: 1% 0;
  outline: 0;
  color: white;
  border-radius: 5px;
  border: 2px solid #12182d;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: Montserrat;
  transition: all 0.5s;
  &:hover {
    background: #91e9e3;
    color: black;
  }
`;
const OurGoal = () => {
  return (
    <Styles>
      <div id="header">Давайте обсудим, как мы можем вам помочь</div>
      <Button
        onClick={(e) => {
          Router.push({
            pathname: "/hello",
          });
        }}
      >
        Связаться
      </Button>
    </Styles>
  );
};

export default OurGoal;
