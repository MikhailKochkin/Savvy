import React from "react";
import { useUser } from "../components/User";

const test = () => {
  const me = useUser();
  console.log(me);
  return <div>Привет!</div>;
};

export default test;
