import { useState, useEffect, useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";

import { Row, SecondaryButton, ActionButton } from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";

const UPDATE_PROCESS_MANAGER = gql`
  mutation updateProcessManager(
    $id: String!
    $name: String
    $backgroundStory: String
    $remainingResources: Int
    $nodes: ProcessNodes
    $edges: ProcessEdges
  ) {
    updateProcessManager(
      id: $id
      name: $name
      backgroundStory: $backgroundStory
      remainingResources: $remainingResources
      nodes: $nodes
      edges: $edges
    ) {
      id
      name
      backgroundStory
      remainingResources
      userId
      nodes
      edges
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid #ddd;
  padding: 25px;
  margin-bottom: 20px;
`;

const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 20px;
`;

const UpdateProcessManager = (props) => {
  const [backgroundStory, setBackgroundStory] = useState(
    "You are a junior lawyer who needs to understand how the law firm economics work. You are given a case where you need to invest some money into: a) newspapers b) tiktok. Find out how investing into these resources will influence company revenue."
  );
  const [node, setNode] = useState({
    name: "",
    label: "",
    formula: "",
    description: "",
    canNodeBeUpdated: true,
  });
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [resourceLimit, setResourceLimit] = useState(30000);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (props.processManager.nodes.processNodes.length > 0) {
      const nodesWithPosition = props.processManager.nodes.processNodes.map(
        (node) => ({
          ...node,
          data: {
            label: `${node.label} (${node.formula || "N/A"})`,
          },
          position: { x: Math.random() * 400, y: Math.random() * 300 },
        })
      );
      setNodes(nodesWithPosition);
    }
    if (props.processManager.edges.processEdges.length > 0) {
      setEdges(props.processManager.edges.processEdges);
    }
  }, [props.processManager]);

  const [updateProcessManager] = useMutation(UPDATE_PROCESS_MANAGER);

  const handleUpdateProcessManager = async () => {
    const res = await updateProcessManager({
      variables: {
        id: props.processManager.id,
        remainingResources: parseInt(resourceLimit),
        nodes: {
          processNodes: nodes.map((node) => ({
            id: node.id,
            label: node.label,
            formula: node.formula,
            description: node.description,
            value: "0",
            type: "numeric",
            canNodeBeUpdated: node.canNodeBeUpdated,
          })),
        },
        edges: {
          processEdges: edges.map((edge) => ({
            id: `${edge.source}_${edge.target}`,
            source: edge.source,
            target: edge.target,
          })),
        },
      },
    });
    props.getResult(res);
    props.switchUpdate();
  };

  const addNode = () => {
    const newNode = {
      id: node.name,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      data: { label: `${node.label} (${node.formula || "N/A"})` },
      canNodeBeUpdated: node.canNodeBeUpdated,
      description: node.description,
      type: "number",
      formula: node.formula,
      label: node.label,
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNode({
      name: "",
      label: "",
      formula: "",
      description: "",
      canNodeBeUpdated: true,
    });
  };

  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((n) => n.id !== selectedNodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      )
    );
    setSelectedNodeId(null);
    setNode({
      name: "",
      label: "",
      formula: "",
      description: "",
      canNodeBeUpdated: true,
    });
  };

  const onConnect = useCallback(
    (connection) => setEdges((prevEdges) => addEdge(connection, prevEdges)),
    [setEdges]
  );

  const updateNodeProperties = () => {
    setSelectedNodeId(null);
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.name) {
        const newNode = {
          ...n,
          data: {
            ...n.data,
            label: `${node.label || n.label} (val: ${
              node.value || n.value
            }, formula: ${node.formula || n.formula})`,
          },
          value: node.value ? parseInt(node.value) : n.value,
          formula: node.formula || n.formula,
          description: node.description || n.description,
          label: node.label || n.label,
        };
        setNode(newNode);
        return newNode;
      }
      return n;
    });
    console.log("updatedNodes", updatedNodes);
    setNodes(updatedNodes);
    setNode({
      name: "",
      value: "",
      formula: "",
      description: "",
      label: "",
    });
  };

  const handleNodeSelection = (e) => {
    const selectedNode = nodes.find((n) => n.id === e.target.value);
    console.log("selectedNode", selectedNode);
    if (selectedNode) {
      setNode({
        name: selectedNode.id,
        value: selectedNode.value || "",
        formula: selectedNode.formula || "",
        description: selectedNode.description || "",
        label: selectedNode.label || "",
        canNodeBeUpdated: selectedNode.canNodeBeUpdated,
      });
      setSelectedNodeId(selectedNode.id);
    } else {
      setSelectedNodeId(null);
    }
  };

  return (
    <Styles>
      <Container>
        <div>
          <Row>
            <div className="description">Background Story</div>
            <div className="action_area">
              <textarea
                type="text"
                value={backgroundStory}
                onChange={(e) => {
                  setBackgroundStory(e.target.value);
                  autoResizeTextarea(e);
                }}
                onInput={autoResizeTextarea}
              />
            </div>
          </Row>
          <Row>
            <div className="description">Resource Limit</div>
            <div className="action_area">
              <input
                type="text"
                value={resourceLimit}
                onChange={(e) => {
                  setResourceLimit(e.target.value);
                }}
                onInput={autoResizeTextarea}
              />
            </div>
          </Row>
          <h2>Add Node</h2>
          <Row>
            <div className="description">Node Name</div>
            <div className="action_area">
              <input
                type="text"
                value={node.name}
                onChange={(e) => setNode({ ...node, name: e.target.value })}
                placeholder="Node Name"
              />
            </div>
          </Row>
          <Row>
            <div className="description">Node Formula</div>
            <div className="action_area">
              <input
                type="text"
                value={node.formula}
                onChange={(e) => setNode({ ...node, formula: e.target.value })}
                placeholder="Formula (optional)"
              />
            </div>
          </Row>
          <Row>
            <div className="description">Node Description</div>
            <div className="action_area">
              <input
                type="text"
                value={node.description}
                onChange={(e) =>
                  setNode({ ...node, description: e.target.value })
                }
                placeholder="Description (optional)"
              />
            </div>
          </Row>
          <Row>
            <div className="description">Node Label</div>
            <div className="action_area">
              <input
                type="text"
                value={node.label}
                onChange={(e) => setNode({ ...node, label: e.target.value })}
                placeholder="Label (optional)"
              />
            </div>
          </Row>
          <Row>
            <div className="description">Can Node Value Be Updated</div>
            <div className="action_area">
              <select
                value={node.canNodeBeUpdated}
                onChange={(e) =>
                  setNode({
                    ...node,
                    canNodeBeUpdated: e.target.value === "true",
                  })
                }
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </Row>

          <SecondaryButton onClick={addNode}>Add Node</SecondaryButton>
        </div>
        <div>
          <h2>Update Node</h2>
          <Row>
            <div className="description">Select Node</div>
            <div className="action_area">
              <select value={selectedNodeId} onChange={handleNodeSelection}>
                <option value={null}>Select a node</option>
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.id}
                  </option>
                ))}
              </select>
            </div>
          </Row>
          {selectedNodeId && (
            <>
              <Row>
                <div className="description">Node Name</div>
                <div className="action_area">
                  <input
                    type="text"
                    value={node.name}
                    onChange={(e) => setNode({ ...node, name: e.target.value })}
                    placeholder="Node Name"
                  />
                </div>
              </Row>
              <Row>
                <div className="description">Node Value</div>
                <div className="action_area">
                  <input
                    type="number"
                    value={node.value}
                    onChange={(e) =>
                      setNode({ ...node, value: e.target.value })
                    }
                    placeholder="Node Value"
                  />
                </div>
              </Row>
              <Row>
                <div className="description">Node Formula</div>
                <div className="action_area">
                  <input
                    type="text"
                    value={node.formula}
                    onChange={(e) =>
                      setNode({ ...node, formula: e.target.value })
                    }
                    placeholder="Node Formula"
                  />
                </div>
              </Row>
              <Row>
                <div className="description">Node Description</div>
                <div className="action_area">
                  <input
                    type="text"
                    value={node.description}
                    onChange={(e) =>
                      setNode({ ...node, description: e.target.value })
                    }
                    placeholder="Node Description"
                  />
                </div>
              </Row>
              <Row>
                <div className="description">Node Label</div>
                <div className="action_area">
                  <input
                    type="text"
                    value={node.label}
                    onChange={(e) =>
                      setNode({ ...node, label: e.target.value })
                    }
                    placeholder="Node Label"
                  />
                </div>
              </Row>
              <SecondaryButton onClick={updateNodeProperties}>
                Update Node
              </SecondaryButton>
              <SecondaryButton onClick={deleteNode}>
                Delete Node
              </SecondaryButton>
            </>
          )}
        </div>
      </Container>
      <ResultPanel>
        <div
          style={{ width: "100%", height: "900px", border: "1px solid #ddd" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
          <ActionButton onClick={handleUpdateProcessManager}>
            Update Process Manager
          </ActionButton>
        </div>
      </ResultPanel>
    </Styles>
  );
};

export default UpdateProcessManager;
