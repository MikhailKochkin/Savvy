import React from "react";
import styled from "styled-components";
import parse from 'html-react-parser';


const Styles = styled.div`
  width: 100vw;
  min-height: 95vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-top: 1px solid #dce2e7;
  @media (max-width: 800px) {
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: #313d48;
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
    width: 40%;
    /* height: 150px; */
    h2 {
      line-height: 1.4;
      font-weight: 500;
      font-size: 2.8rem;
    }
  }
  #goal_examples {
    width: 40%;
    /* height: 150px; */
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    div {
    }
    .example {
      display: flex;
      flex-direction: row;
      margin: 15px 0;
      .icon {
        margin-right: 20px;
        color: #327998;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      div {
        line-height: 1.2;
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
      margin-bottom: 30px;
      button {
        width: 90%;
      }
    }
    #goal_examples {
      height: auto;
      width: 100%;
      .example {
        margin: 20px 0;
        line-height: 1.4;
      }
    }
  }
`;

const Goal = (props) => {
  const slide = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const d = props.data;
  return (
    <Styles>
      <Container>
        <div id="goal_message">
          <h2>
            {d.goal_header ? (
              parse(d.goal_header)
            ) : (
              <>
                Вы получите новые знания. <br />
                Новые навыки.
                <br /> И новые знакомства с экспертами.
              </>
            )}
          </h2>

          <button onClick={(e) => slide()}>Участвовать</button>
        </div>
        <div id="goal_examples">
          {d.goals.map((g) => (
            <div className="example">
              <div className="icon"></div>
              <div>{parse(g)}</div>
            </div>
          ))}
        </div>
      </Container>
    </Styles>
  );
};

export default Goal;
