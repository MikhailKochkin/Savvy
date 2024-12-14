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

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border: 1px solid #ddd;
  padding: 25px;
  margin-bottom: 20px;
`;

const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin-bottom: 20px;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  .controls {
    max-width: 700px;
  }
`;

const DAGComponent = () => {
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
  const [results, setResults] = useState({});
  const [resourceLimit, setResourceLimit] = useState(30000);
  const [feedback, setFeedback] = useState("");
  const [evaluationHistory, setEvaluationHistory] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const getTotalNodeValues = () => {
    return nodes.reduce((total, node) => total + (node.value || 0), 0);
  };

  console.log("edges", edges);

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

  const findParentOnlyNode = (nodes, edges) => {
    const hasOutgoingEdges = new Set();
    const hasIncomingEdges = new Set();
    edges.forEach((edge) => {
      hasOutgoingEdges.add(edge.source);
      hasIncomingEdges.add(edge.target);
    });

    for (const node of nodes) {
      if (hasOutgoingEdges.has(node.id) && !hasIncomingEdges.has(node.id)) {
        return node;
      }
    }

    return null;
  };

  const generateEvaluationFeedback = async () => {
    let feedbackPrompt = `
      The story behind this simulator is: """${backgroundStory}"""
      The final metric that the user needs to optimize is: """${JSON.stringify(
        findParentOnlyNode(nodes, edges)
      )}"""
      The whole system of a simulator looks like this: """${JSON.stringify(
        nodes,
        null,
        2
      )}"""
      The user has influenced the followign mertics: """${JSON.stringify(
        nodes.filter((n) => n.canNodeBeUpdated)
      )}""" 
      The result of the simulation is: """${JSON.stringify(results)}"""
      Explain what the student has done and what has done wrong in one paragraph.
    `;
    console.log("feedbackPrompt", feedbackPrompt);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newFeedback = "";
        console.log(data.result.content);
        setFeedback(data.result.content);

        return data?.resul?.content ? data.result.content : "";
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const evaluate = async () => {
    const totalNodeValues = getTotalNodeValues();
    if (totalNodeValues > resourceLimit) {
      alert(
        `Total node values cannot exceed the resource limit of ${resourceLimit}`
      );
      return;
    }

    const topologicalSort = () => {
      const visited = new Set();
      const stack = [];

      const visit = (nodeId) => {
        if (!visited.has(nodeId)) {
          visited.add(nodeId);
          const nodeEdges = edges.filter((e) => e.target === nodeId);
          nodeEdges.forEach((e) => visit(e.source));
          stack.push(nodeId);
        }
      };

      nodes.forEach((node) => visit(node.id));
      return stack.reverse();
    };

    const sortedNodes = topologicalSort();
    const newResults = { ...results };

    sortedNodes.forEach((nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      const formula = node?.formula;
      const value = node?.value;
      if (formula && formula !== "N/A") {
        const values = newResults;
        try {
          const func = new Function(
            ...Object.keys(values),
            `return (${formula});`
          );
          newResults[nodeId] = func(...Object.values(values));
        } catch (error) {
          newResults[nodeId] = null;
        }
      } else {
        newResults[nodeId] = value || 0;
      }
    });
    setResults(newResults);
    setEvaluationHistory((prevHistory) => [
      ...prevHistory,
      { nodes: [...nodes], results: newResults },
    ]);
    const feedback = await generateEvaluationFeedback();
  };

  const onConnect = useCallback(
    (connection) => setEdges((prevEdges) => addEdge(connection, prevEdges)),
    [setEdges]
  );

  const handleNodeValueChange = (nodeId, newValue) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === nodeId) {
        return {
          ...n,
          data: {
            ...n.data,
            label: `${n.label} (formula: ${n.formula || "N/A"})`,
          },
          value: parseFloat(newValue),
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

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

  const remainingResource = resourceLimit - getTotalNodeValues();

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
          style={{ width: "100%", height: "650px", border: "1px solid #ddd" }}
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
        </div>
        <ControlPanel>
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
        </ControlPanel>
      </ResultPanel>
    </Styles>
  );
};

export default DAGComponent;
