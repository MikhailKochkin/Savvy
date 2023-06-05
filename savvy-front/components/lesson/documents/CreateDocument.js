import React, { useState } from "react";
import _ from "lodash";
import CreateClauses from "./CreateClauses";
import CreateTitle from "./CreateTitle";

const CreateDocument = (props) => {
  const [step, setStep] = useState(false);
  const [docID, setDocID] = useState("");
  const [res, setRes] = useState();
  const getStep = (data, id) => {
    setStep(true);
    setDocID(id);
  };

  const getRes = (val) => setRes(val);
  return (
    <>
      <CreateTitle getStep={getStep} id={props.lessonID} getRes={getRes} />
      {step && <CreateClauses document={docID} />}
      {res && (
        <button onClick={(e) => props.getResult(res)}>Add to the lesson</button>
      )}
    </>
  );
};

export default CreateDocument;
