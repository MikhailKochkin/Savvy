import React from "react";
import renderHTML from "react-render-html";

const Note = (props) => {
  console.log(props.note);
  return <div>{"renderHTML(props.note.text)"}</div>;
};

export default Note;
