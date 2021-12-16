import React from "react";
import Onboarding from "../components/Onboarding";

const onboarding = (props) => {
  console.log(props.query.program);
  return (
    <div>
      <Onboarding program={props.query.program} />
    </div>
  );
};

export default onboarding;
