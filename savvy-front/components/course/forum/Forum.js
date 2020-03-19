import React, { useState } from "react";
import CreateTopic from "./CreateTopic";
import Topic from "./Topic";

const Forum = props => {
  console.log(props.me);
  return (
    <>
      <h2>Форум</h2>
      <CreateTopic coursePageID={props.coursePage.id} />
      {props.coursePage.topics.map(topic => (
        <Topic topic={topic} coursePageID={props.coursePage.id} me={props.me} />
      ))}
    </>
  );
};

export default Forum;
