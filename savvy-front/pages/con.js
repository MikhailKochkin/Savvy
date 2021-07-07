import { useState } from "react";
import Landing from "../components/conf/Landing";
import Ticket from "../components/conf/Ticket";
// import { signIn, signOut, useSession } from "next-auth/client";

const conf = () => {
  const [stage, setStage] = useState("email");
  // const [session, loading] = useSession();

  const change = () => {
    setStage("ticket");
  };
  return (
    <>
      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )} */}
      {stage === "email" && <Landing change={change} />}
      {stage !== "email" && <Ticket />}
    </>
  );
};

export default conf;
