import React, { useState } from "react";
import _ from "lodash";
import CreateClauses from "./CreateClauses";
import CreateTitle from "./CreateTitle";

const CreateDocument = props => {
  const [step, setStep] = useState(false);
  const [docID, setDocID] = useState("");
  const getStep = (data, id) => {
    setStep(true);
    setDocID(id);
  };
  return (
    <>
      <CreateTitle getStep={getStep} id={props.lessonID} />
      {step && <CreateClauses document={docID} />}
    </>
  );
};

export default CreateDocument;
