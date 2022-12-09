import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  width: 100vw;
  background: #090a10;
  color: #fff;
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  /* background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
  opacity: 1;
  z-index: 0;
`;

const Container = styled.div`
  width: 80%;
  h2 {
    font-size: 2.8rem;
    font-weight: 600;
  }
  .row {
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 15px;
    border-bottom: 1px solid #3e72f9;
    padding-bottom: 10px;
    font-size: 1.7rem;

    .number {
      width: 20px;
      margin-right: 10px;
    }
    p {
      margin: 0;
    }
  }
  @media (max-width: 800px) {
    h2 {
      line-height: 1.4;
    }
    .row {
      width: 100%;
    }
  }
`;

const Program = (props) => {
  return (
    <Styles>
      <Container>
        <h2>Программа конференции</h2>
        <div>
          {props.conf.goals.map((g, i) => (
            <div className="row">
              <div className="number">{i + 1}.</div> {renderHTML(g)}
            </div>
          ))}
        </div>
      </Container>
    </Styles>
  );
};

export default Program;
