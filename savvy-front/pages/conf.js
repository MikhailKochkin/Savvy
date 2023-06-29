import { useState } from "react";
import ConfPage from "../components/conf/ConfPage";
import Ticket from "../components/conf/Ticket";
// import { signIn, signOut, useSession } from "next-auth/client";

const conf = (props) => {
  const [stage, setStage] = useState("email");
  // const [session, loading] = useSession();
  return (
    <>
      <ConfPage id={props.query.id} />
      {/* {stage === "email" && <Landing change={change} />} */}
      {/* {stage !== "email" && <Ticket />} */}
    </>
  );
};

export default conf;
