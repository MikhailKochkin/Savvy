import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";

const Shuffler = (props) => {
  return <Tasks tasks={props.tasks} lesson={props.lesson} me={props.me} />;
};

export default Shuffler;
