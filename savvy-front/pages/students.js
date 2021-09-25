import React from "react";
import { useUser } from "../components/User";
import Students from "../components/students/Students";

const students = (props) => {
  const me = useUser();

  return <Students me={me} />;
};

export default students;
