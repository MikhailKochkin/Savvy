import React from "react";
import Onboarding from "../components/Onboarding";

const onboarding = (props) => {
  return (
    <div>
      <Onboarding id={props.query.id} program={props.query.program} />
    </div>
  );
};

export default onboarding;
