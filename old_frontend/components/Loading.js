import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35vh;
`;

const Loading = () => {
  return (
    <Block>
      <CircularProgress />
    </Block>
  );
};

export default Loading;
