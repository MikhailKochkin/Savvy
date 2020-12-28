import React from "react";
import { useUser } from "../components/User";

const test = () => {
  const me = useUser();
  if (me) {
    console.log(me.name, me.surname, me.id);
  } else {
    console.log(me);
  }
  return <div>Привет!</div>;
};

export default test;
