import styled from "styled-components";
import { useState } from "react";

const Styles = styled.li`
  height: auto;
  display: flex;
  font-size: 1.8rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #162b4b;
  width: 90%;
  .question {
    font-weight: 600;
  }
  @media (max-width: 800px) {
    height: 100%;
    .question {
      max-width: 85%;
    }
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  align-items: space-between;
  justify-content: space-between;
  .circle {
    border: 2px solid #162b4b;
    width: 25px;
    height: 25px;
    display: flex;
    font-weight: bold;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    color: #162b4b;
    transition: 0.7s;
    &:hover {
      background: #162b4b;
      color: #f8efe6;
    }
  }
  @media (max-width: 800px) {
    .circle {
      width: 35px;
      height: 35px;
      font-size: 3rem;
    }
  }
`;

const Info = styled.div`
  display: ${(props) => (props.height ? "auto" : "none")};
  padding-bottom: 20px;
  font-size: 1.6rem;

  ul {
    list-style: inside;
  }
`;

const Question = (props) => {
  const [show, setShow] = useState(false);
  const { d } = props;
  return (
    <Styles>
      <Control>
        <div className="question">{d.question}</div>
        <div className="circle" onClick={(e) => setShow(!show)}>
          {show ? "-" : "+"}
        </div>
      </Control>
      <Info height={show}>{d.answer}</Info>
    </Styles>
  );
};

export default Question;
