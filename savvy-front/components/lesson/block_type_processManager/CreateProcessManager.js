import { useState, useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styled from "styled-components";
import { Row, SecondaryButton, ActionButton } from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import { useMutation, gql } from "@apollo/client";

const CREATE_PROCESS_MANAGER = gql`
  mutation CreateProcessManager(
    $name: String!
    $backgroundStory: String!
    $remainingResources: Int!
    $lessonId: String!
    $nodes: ProcessNodes
    $edges: ProcessEdges
  ) {
    createProcessManager(
      name: $name
      backgroundStory: $backgroundStory
      remainingResources: $remainingResources
      lessonId: $lessonId
      nodes: $nodes
      edges: $edges
    ) {
      id
      name
      backgroundStory
      remainingResources
      userId
      lessonId
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

const CreateProcessManager = (props) => {
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

  const [createProcessManager] = useMutation(CREATE_PROCESS_MANAGER);

  const handleCreateProcessManager = async () => {
    const res = await createProcessManager({
      variables: {
        name: "New Process Manager",
        backgroundStory,
        remainingResources: resourceLimit,
        lessonId: props.lessonId,
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
        <h1>DAG Simulator</h1>
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
          <button onClick={handleCreateProcessManager}>
            Create Process Manager
          </button>
        </div>
        {/* <ControlPanel>
          <div className="controls">
            <div>
              <h2>Remaining Resource</h2>
              <p>{remainingResource}</p>
            </div>
            <h2>Update Node Values</h2>
            {nodes.map((node) => {
              if (node.canNodeBeUpdated === false) {
                return null;
              } else {
                return (
                  <Row key={node.id}>
                    <div className="description">
                      {node.id} ({node.label})
                    </div>
                    <div className="action_area">
                      <input
                        type="number"
                        value={node.value || ""}
                        defaultValue={0}
                        onChange={(e) =>
                          handleNodeValueChange(node.id, e.target.value)
                        }
                        placeholder="Node Value"
                      />
                    </div>
                  </Row>
                );
              }
            })}
          </div>
          <div>
            <ActionButton onClick={evaluate}>Evaluate DAG</ActionButton>
          </div>
          <div>
            <h2>Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
            <div>{feedback}</div>
          </div>
          <div>
            <h2>Evaluation History</h2>
            <pre>{JSON.stringify(evaluationHistory, null, 2)}</pre>
          </div>
        </ControlPanel> */}
      </ResultPanel>
    </Styles>
  );
};

export default CreateProcessManager;
