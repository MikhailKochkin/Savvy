import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  /* padding: 50px 0; */
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 1.6rem;
  padding-bottom: 50px;
  .custom-shape-divider-top-1626363977 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    margin-top: -2px;
  }

  .custom-shape-divider-top-1626363977 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 65px;
  }

  .custom-shape-divider-top-1626363977 .shape-fill {
    fill: #ffffff;
  }
  .question_block {
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 4%;
    line-height: 1.4;
    /* justify-content: center; */
    .question_box {
      width: 70%;
      /* min-height: 150px; */
      background: #353c42;
      border-radius: 20px;
      padding: 3%;
      font-size: 2.4rem;
    }
  }
  .answer_block {
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4%;
    /* justify-content: center; */
    .answer_box {
      width: 70%;
      border: 2px solid #fff;
      background: #353c42;
      border-radius: 20px;
      min-height: 150px;
      background: #353c42;
      border-radius: 20px;
      padding: 3%;
      p {
        margin: 10px 0;
      }
      span {
        padding-bottom: 2px;
        border-bottom: 2px solid #3175f3;
      }
    }
  }
  .header {
    font-size: 2.4rem;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .question_block {
      flex-basis: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .question_box {
        width: 80%;
        margin-bottom: 20px;
      }
    }
    .answer_block {
      .answer_box {
        width: 80%;
        margin-bottom: 20px;
      }
    }
  }
`;

const Level = styled.div`
  min-height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Context = (props) => {
  const data = props.data.explainer;

  return (
    <>
      <Styles>
        <div class="custom-shape-divider-top-1626363977">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        {data.map((d) => (
          <Level>
            <div className="question_block">
              <div className="question_box">{d.question}</div>
            </div>
            <div className="answer_block">
              <div className="answer_box">
                <div className="header">{d.header}</div>
                {renderHTML(d.text)}
              </div>
            </div>
          </Level>
        ))}
      </Styles>
    </>
  );
};

export default Context;
