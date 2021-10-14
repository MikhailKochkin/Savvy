import React from "react";
import Program from "../components/programs/Program";

const program = (props) => {
  return <Program id={props.query.id} />;
};

export default program;
