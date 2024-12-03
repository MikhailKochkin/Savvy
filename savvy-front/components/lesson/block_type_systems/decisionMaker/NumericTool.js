import { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  .text {
    width: 65%;
  }
  .input {
    width: 35%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding-left: 10px;
    outline: 0;
  }
  margin-bottom: 10px;
`;

const NumericTool = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <Styles>
      <div className="text">{props.name} </div>
      <input
        className="input"
        type="number"
        onChange={(e) => {
          props.getValue({ value: parseInt(e.target.value), id: props.num });
          setValue(e.target.value);
        }}
        defaultValue={value}
      />
    </Styles>
  );
};

export default NumericTool;
