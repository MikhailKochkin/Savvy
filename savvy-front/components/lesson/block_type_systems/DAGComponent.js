import React, { useState, useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const DAGComponent = () => {
  const [nodeName, setNodeName] = useState("");
  const [nodeFormula, setNodeFormula] = useState("");
  const [parentNode, setParentNode] = useState("");
  const [childNode, setChildNode] = useState("");
  const [updateNodeName, setUpdateNodeName] = useState("");
  const [updateNodeValue, setUpdateNodeValue] = useState("");
  const [results, setResults] = useState({});

  const initialNodes = [];
  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Add a node to the graph
  const addNode = (name, formula = null) => {
    const newNode = {
      id: name,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      data: { label: `${name} (${formula || "N/A"})` },
      formula,
    };
    console.log("newNode", newNode);
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // Add a dependency (edge) between nodes
  const addEdgeToGraph = (parent, child) => {
    const newEdge = { id: `${parent}-${child}`, source: parent, target: child };
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  // Evaluate the DAG and calculate all node values
  const evaluate = () => {
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
      const formula = node?.data?.label.match(/\(([^)]+)\)/)?.[1];

      if (formula && formula !== "N/A") {
        const values = newResults;
        newResults[nodeId] = new Function(
          ...Object.keys(values),
          `return ${formula};`
        )(...Object.values(values));
      } else {
        newResults[nodeId] = parseFloat(node?.data?.label.split(" ")[1]) || 0;
      }
    });

    setResults(newResults);
  };

  const onConnect = useCallback(
    (connection) => setEdges((prevEdges) => addEdge(connection, prevEdges)),
    [setEdges]
  );

  return (
    <div>
      <h1>DAG Simulator</h1>

      {/* Add Node Form */}
      <div>
        <h2>Add Node</h2>
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Node Name"
        />
        <input
          type="text"
          value={nodeFormula}
          onChange={(e) => setNodeFormula(e.target.value)}
          placeholder="Formula (optional)"
        />
        <button
          onClick={() => {
            addNode(nodeName, nodeFormula || null);
            setNodeName(""); // Reset input
            setNodeFormula("");
          }}
        >
          Add Node
        </button>
      </div>

      {/* Add Edge Form */}
      <div>
        <h2>Add Dependency (Edge)</h2>
        <input
          type="text"
          value={parentNode}
          onChange={(e) => setParentNode(e.target.value)}
          placeholder="Parent Node"
        />
        <input
          type="text"
          value={childNode}
          onChange={(e) => setChildNode(e.target.value)}
          placeholder="Child Node"
        />
        <button
          onClick={() => {
            addEdgeToGraph(parentNode, childNode);
            setParentNode(""); // Reset input
            setChildNode("");
          }}
        >
          Add Edge
        </button>
      </div>

      {/* Update Node Value */}
      <div>
        <h2>Update Node Value</h2>
        <input
          type="text"
          value={updateNodeName}
          onChange={(e) => setUpdateNodeName(e.target.value)}
          placeholder="Node Name"
        />
        <input
          type="number"
          value={updateNodeValue}
          onChange={(e) => setUpdateNodeValue(e.target.value)}
          placeholder="Node Value"
        />
        <button
          onClick={() => {
            const updatedNodes = nodes.map((n) =>
              n.id === updateNodeName
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      label: `${n.id} (${updateNodeValue})`,
                    },
                  }
                : n
            );
            setNodes(updatedNodes);
            setUpdateNodeName(""); // Reset input
            setUpdateNodeValue("");
          }}
        >
          Update Value
        </button>
      </div>

      {/* Evaluate DAG */}
      <div>
        <button onClick={evaluate}>Evaluate DAG</button>
      </div>
      <div>
        <h2>Results</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>

      {/* Display Results */}
      <div
        style={{ width: "1000px", height: "600px", border: "1px solid #ddd" }}
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
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DAGComponent;
