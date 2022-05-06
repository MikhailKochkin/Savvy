import React from "react";
import Onboarding from "../components/Onboarding";

const onboarding = (props) => {
  return (
    <div>
      <Onboarding program={props.query.program} />
    </div>
  );
};

export default onboarding;
