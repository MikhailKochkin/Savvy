import React from "react";
<<<<<<< HEAD

=======
import renderHTML from "react-render-html";
>>>>>>> origin/master
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
<<<<<<< HEAD
        parse(props.note[0].text.substring(0, 500))}
=======
        renderHTML(props.note[0].text.substring(0, 500))}
>>>>>>> origin/master
    </Styles>
  );
};

export default Note;
