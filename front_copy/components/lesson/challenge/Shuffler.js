import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";

// const shuffle = (array) => {
//   var m = array.length,
//     t,
//     i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//   return array;
// };

const Shuffler = (props) => {
  //   const [count, setCount] = useState(props.tasks);
  //   useEffect(() => setCount(shuffle(props.tasks)), []);
  return <Tasks tasks={props.tasks} lesson={props.lesson} me={props.me} />;
};

export default Shuffler;
