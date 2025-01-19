import React from "react";
import Onboarding from "../components/Onboarding";
import { useRouter } from "next/router";

const onboarding = () => {
  const router = useRouter();
  const { id, program } = router.query;

  return (
    <div>
      <Onboarding id={id} program={program} />
    </div>
  );
};

export default onboarding;
