import styled from "styled-components";
import parse from "html-react-parser";

const Styles = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  @media (max-width: 800px) {
    min-height: 40vh;
  }
`;

const Container = styled.div`
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #313d48;
  img {
    box-shadow: 0px 0px 15px 2px rgba(196, 196, 196, 0.75);
    -webkit-box-shadow: 0px 0px 15px 2px rgba(196, 196, 196, 0.75);
    -moz-box-shadow: 0px 0px 15px 2px rgba(196, 196, 196, 0.75);
    margin: 30px 0;
  }
  h2 {
    line-height: 1.2;
    font-weight: 700;
    font-size: 2.2rem;
  }
  button {
    background: #327998;
    color: #fff;
    border: 1px solid #327998;
    border-radius: 5px;
    width: 290px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    cursor: pointer;
  }
  #goal_message {
    width: 90%;
    /* height: 150px; */
  }
  #audience_id {
    width: 90%;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
  }
  #goal_examples {
    width: 100%;
    /* height: 150px; */
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: space-between;
    justify-content: space-between;
    border: 1px solid #dee2e6;
    padding: 20px;
    img {
      width: 100%;
    }
    div {
    }
    .audience {
      font-size: 1.6rem;
      width: 90%;
    }
    .example {
      display: flex;
      width: 46%;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 10px;
      font-size: 1.6rem;
      margin: 10px 0;
      p {
        margin: 0;
      }
      .icon {
        margin-right: 20px;
        color: #327998;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      div {
        line-height: 1.5;
        span {
          font-size: 3.6rem;
        }
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #goal_message {
      height: auto;
      width: 90%;
      button {
        width: 90%;
      }
    }
    #goal_examples {
      height: auto;
      flex-direction: column;

      width: 100%;
      .example {
        margin: 10px 0;
        line-height: 1.8;
        width: 100%;
      }
    }
  }
`;

const Blue = styled.div`
  border: 1px solid #dee2e6;
  border-top: none;
  padding: 20px;
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const WhatToExpect = (props) => {
  const { coursePage } = props;
  return (
    <Styles>
      <Container>
        {coursePage.goals && coursePage.goals.length > 0 && (
          <div id="goal_examples">{coursePage.goals.map((g) => parse(g))}</div>
        )}

        {coursePage.audience && (
          <Blue>
            <div id="audience_id">
              <div className="audience">
                {coursePage.audience && parse(coursePage.audience)}
              </div>
            </div>
          </Blue>
        )}
      </Container>
    </Styles>
  );
};

export default WhatToExpect;
