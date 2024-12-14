import { useState } from "react";
import styled from "styled-components";
import Dashboard from "./types/DashBoard";
import UpdateProcessManager from "./UpdateProcessManager";
import { Buttons, SecondaryButton } from "../styles/DevPageStyles";

const Styles = styled.div`
  width: 100%;
`;

const ProcessManager = (props) => {
  const [updateMode, setUpdateMode] = useState(false);

  const getResult = (data) => {
    props.getResult(data);
  };

  const switchUpdate = () => {
    setUpdateMode(!updateMode);
  };

  return (
    <Styles>
      {props.i_am_author && !props.story && (
        <Buttons>
          <SecondaryButton onClick={() => setUpdateMode(!updateMode)}>
            {!updateMode ? "Update" : "Back"}
          </SecondaryButton>
          {/* <DeleteChat me={me.id} chatId={id} lessonId={lessonId} /> */}
        </Buttons>
      )}
      {!updateMode ? (
        <Dashboard
          defaultNodes={props.processManager.nodes}
          defaultEdges={props.processManager.edges}
          remainingResources={props.processManager.remainingResources}
        />
      ) : (
        <UpdateProcessManager
          processManager={props.processManager}
          getResult={getResult}
          switchUpdate={switchUpdate}
        />
      )}
    </Styles>
  );
};

export default ProcessManager;
