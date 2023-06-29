import React from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";

const Styles = styled.div`
  border-bottom: 2px solid #edefed;
  margin-bottom: 20px;
`;

const Note = (props) => {
  return (
    <Styles>
      <div>
        <b>Лонгрид:</b>
      </div>
      {props.note.length > 0 &&
        renderHTML(props.note[0].text.substring(0, 500))}
    </Styles>
  );
};

export default Note;
