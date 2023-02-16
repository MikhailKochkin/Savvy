import { useState } from "react";
import Recommend from "../components/conf/Recommend";
// import { signIn, signOut, useSession } from "next-auth/client";

const conf = (props) => {
  const [stage, setStage] = useState("email");
  return (
    <>
      <Recommend id={props.query.id} />
    </>
  );
};

export default conf;
