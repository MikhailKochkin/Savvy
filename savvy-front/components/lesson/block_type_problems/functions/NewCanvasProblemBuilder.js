import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import parse from "html-react-parser";
import Modal from "styled-react-modal";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NewBlock from "../blocks/NewBlock";
import { MicroButton, SecondaryButton } from "../../styles/DevPageStyles";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  h2 {
    width: 660px;
  }
  /* max-width: 600px; */
  .canvasArea {
    position: relative;
    width: 100%;
    overflow-y: auto;
    height: 900px;
    background: #f9f9fb;
    border: 2px solid #f5f6f6;
    margin: 15px 0;
    overflow: auto;
    zoom: ${(props) => `${props.zoom}%`};
  }

  .toolbar {
    width: 660px;
    display: flex;
    justify-content: space-between; /* Distribute items evenly along the main axis */
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0px;
  .right {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .left {
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MessageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  width: 240px;
  border: 1px solid blue;
  border-radius: 20px;
`;

const InformationSection = styled.div`
  height: 150px;
`;

const initializeMessages = (items) => {
  return items.map((item) => {
    return {
      id: item.id,
      content: "",
      data: {
        id: item.id,
        label: item.id,
        question: item.question,
        answers: item.answers,
        whichAnswersAreCorrect: item.whichAnswersAreCorrect,
      },
      position: item.position || { x: 100, y: 100 }, // Use saved position or default
      //   type: item.type,
      type: "messageNode",
      next: {
        true: {
          value: item.next.true.value,
          type: item.next.true.type,
        },
        false: {
          value: item.next.false.value,
          type: item.next.false.type,
        },
        branches: item.next?.branches ? item.next.branches : [],
      },
    };
  });
};

const generateEdges = (nodes) => {
  return nodes
    .filter((node) => node.next) // Filter out nodes that do not have a 'next' property
    .reduce((edges, node) => {
      // Check for next.false and next.true properties, and create edges
      if (node.next.false) {
        edges.push({
          id: `${node.id}-${node.next.false.value}`,
          source: node.id,
          target: node.next.false.value,
        });
      }
      if (node.next.true) {
        edges.push({
          id: `${node.id}-${node.next.true.value}`,
          source: node.id,
          target: node.next.true.value,
        });
      }
      return edges;
    }, []);
};

const handleStyle = { left: 10 };

const MessageNode = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <MessageStyles>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <InformationSection>
        <div className="type">Quiz</div>
        <div className="id_info">ID: {data.id}</div>

        <div className="question"></div>
      </InformationSection>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </MessageStyles>
  );
};

const nodeTypes = { messageNode: MessageNode };

const CanvasProblemBuilder = ({ items }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initializeMessages(items)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    generateEdges(initializeMessages(items))
  );

  return (
    <div style={{ width: "100%", height: "600px", border: "1px solid #ddd" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        // onConnect={onConnect}
        fitView
      >
        <Background />
        {/* <MiniMap /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
};

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  height: 800px;
  width: 640px;
  padding: 2%;
      overflow-y: scroll;

  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export default CanvasProblemBuilder;
