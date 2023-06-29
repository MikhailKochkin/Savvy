import { useState, useEffect } from "react";

const Tool = (props) => {
  const [value, setValue] = useState(props.value);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      {props.name}{" "}
      <input
        onChange={(e) => {
          props.onChoose(props.num);
          setChecked(!checked);
        }}
        type="checkbox"
        id="scales"
        name="scales"
        checked={checked}
      />
    </div>
  );
};

export default Tool;
