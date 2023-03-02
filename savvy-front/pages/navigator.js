import React from "react";
import Navigator from "../components/navigator/Navigator";

const navigator = (props) => {
  return <Navigator level={props.query.level} tags={props.query.tags} />;
};

export default navigator;
