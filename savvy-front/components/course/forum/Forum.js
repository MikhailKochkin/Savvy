import React, { useState } from "react";
import CreateTopic from "./CreateTopic";
import Topic from "./Topic";

const Forum = props => {
  return (
    <>
      <h2>Форум</h2>
      <CreateTopic coursePageID={props.coursePage.id} />
      {props.coursePage.topics.length > 0 ? (
        props.coursePage.topics.map(topic => (
          <Topic
            topic={topic}
            coursePageID={props.coursePage.id}
            me={props.me}
          />
        ))
      ) : (
        <h3>Пока нет открытых тем. Начните обсуждение первым!</h3>
      )}
    </>
  );
};

export default Forum;
