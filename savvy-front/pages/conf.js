import { useState } from "react";
import Landing from "../components/conf/Landing";
import Ticket from "../components/conf/Ticket";

const conf = () => {
  const [stage, setStage] = useState("ticket");

  return (
    <>
      {stage == "email" && <Landing />}
      {stage == "ticket" && <Ticket />}
    </>
  );
};

export default conf;
