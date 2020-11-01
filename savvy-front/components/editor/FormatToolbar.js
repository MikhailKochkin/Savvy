import React from "react";
import { withTheme } from "styled-components";

const FormatToolbarStyles = {
  display: "flex",
  background: "white",
  padding: "2%",
  margin: "0 0 10px 0",
  position: "-webkit-sticky",
  position: "sticky",
  top: "20px",
  zIndex: "1",
  maxWidth: "700px",
  border: "1px solid #EDEFED",
};

const FormatToolBar = (props) => (
  <div style={FormatToolbarStyles}>{props.children}</div>
);

export default FormatToolBar;
