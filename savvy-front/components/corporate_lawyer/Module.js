import styled from "styled-components";
import { useState } from "react";

const Styles = styled.li`
  color: white;
  height: auto;
  /* padding-top: 40px; */
  display: flex;
  font-size: 1.8rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #f7d188;
  width: 90%;
  @media (max-width: 800px) {
    height: 100%;
    width: 100%;
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
    border: 1px solid #f7d188;
    width: 25px;
    height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    color: #f7d188;
  }
  @media (max-width: 800px) {
    height: 100%;
    width: 100%;
    .module {
      width: 80%;
    }
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
  ul {
    list-style: inside;
  }
`;

const Module = (props) => {
  const [show, setShow] = useState(false);
  const { d } = props;
  return (
    <Styles>
      <Control>
        <div className="module">
          {d.number}. {d.name}
        </div>
        <div className="circle" onClick={(e) => setShow(!show)}>
          {show ? "-" : "+"}
        </div>
      </Control>
      <Info height={show}>
        <ul>
          {d.lessons.map((l) => (
            <li>{l}</li>
          ))}
        </ul>
      </Info>
    </Styles>
  );
};

export default Module;
