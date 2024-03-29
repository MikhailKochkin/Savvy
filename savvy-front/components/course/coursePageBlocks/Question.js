import styled from "styled-components";
import { useState } from "react";

const Styles = styled.li`
  height: auto;
  display: flex;
  background-color: #f4f8fc;
  margin-bottom: 20px;
  font-size: 1.8rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  border-radius: 5px;
  padding: 2% 4%;
  .question {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 1.4;
    width: 80%;
  }
  @media (max-width: 800px) {
    height: 100%;
    width: 90%;

    .question {
      max-width: 85%;
      font-size: 1.6rem;
    }
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* margin-top: 20px; */
  padding: 20px 0;
  align-items: space-between;
  justify-content: space-between;
  .circle {
    cursor: pointer;
  }
  @media (max-width: 800px) {
    .circle {
    }
  }
`;

const Info = styled.div`
  display: ${(props) => (props.height ? "auto" : "none")};
  padding-bottom: 20px;
  font-size: 1.4rem;
  ul {
    list-style: inside;
  }
  @media (max-width: 800px) {
    line-height: 1.6;
  }
`;

const Question = (props) => {
  const [show, setShow] = useState(false);
  const { d } = props;
  return (
    <Styles>
      <Control>
        <div className="question">{d.q}</div>
        <div className="circle" onClick={(e) => setShow(!show)}>
          {show ? <span>⬆️</span> : <span>⬇️</span>}
        </div>
      </Control>
      <Info height={show}>{d.a}</Info>
    </Styles>
  );
};

export default Question;
