import { useState } from "react";
import Landing from "../components/conf/Landing";
import Ticket from "../components/conf/Ticket";

const conf = () => {
  const [stage, setStage] = useState("email");
  const change = () => {
    setStage("ticket");
  };
  return (
    <>
      {stage == "email" && <Landing change={change} />}
      {stage == "ticket" && <Ticket />}
    </>
  );
};

export default conf;
