import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

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
      {props.note.length > 0 && parse(props.note[0].text.substring(0, 500))}
    </Styles>
  );
};

export default Note;
