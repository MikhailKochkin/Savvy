import React from "react";
import styled from "styled-components";
import CreateForum from "./CreateForum";
import UpdateForum from "./UpdateForum";

const Styles = styled.div`
  margin-top: 3%;
  width: 90%;
`;

const ChangeForum = (props) => {
  return (
    <Styles>
      {props.forum ? (
        <UpdateForum
          text={props.forum.text}
          id={props.forum.id}
          lesson={props.lesson}
        />
      ) : (
        <CreateForum lesson={props.lesson} />
      )}
    </Styles>
  );
};

export default ChangeForum;
