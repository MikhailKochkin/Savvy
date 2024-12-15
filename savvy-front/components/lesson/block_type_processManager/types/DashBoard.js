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

import { Row, SecondaryButton, ActionButton } from "../../styles/DevPageStyles";
import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import MainChart from "../charts/MainChart";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: #f6f8fb;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #e5e5e5;
  width: 32%;
  min-height: 250px;
  background: #fff;
  padding: 20px 25px;
  margin-right: 10px;
  margin-bottom: 10px;
  .number {
    font-size: 4rem;
    font-weight: 600;
    color: #333;
    width: 100%;
    margin-bottom: 15px;
  }
  .progressBar {
    width: 100%;
    margin-bottom: 10px;
    .progressBarContainer {
      border: 1px solid #ddd;
      height: 16px;
      width: 90%;
      display: flex;
      align-items: center;
      border-radius: 8px;
    }
  }
  .label {
    font-size: 1.6rem;
    font-weight: 500;
    color: #333;
    width: 100%;
    margin-bottom: 10px;
  }
  .explainer {
    font-size: 1.2rem;
    color: #666;
    width: 100%;
    line-height: 1.4;
  }
`;

const ShortRectangle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #e5e5e5;
  width: 65%;
  min-height: 250px;
  background: #fff;
  padding: 5px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const LongRectangle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #e5e5e5;
  width: 100%;
  min-height: 250px;
  background: #fff;
  padding: 5px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ProgessBar = styled.div`
  width: ${(props) => props.width}%;
  height: 10px;
  background-color: #21cab8;
  margin: 0 2px;
  border-radius: 5px;
`;

const Lever = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin-right: 25px;
  border: 1px solid #ddd;
  border-radius: 7px;
  height: 90%;
  padding: 15px;
  .label {
    font-size: 2.4rem;
    font-weight: 600;
    color: #333;
    width: 100%;
    margin-bottom: 5px;
    text-align: center;
  }
  .description {
    font-size: 1.4rem;
    color: #666;
    width: 100%;
    line-height: 1.4;
    margin-bottom: 15px;
    text-align: center;
  }
  input {
    width: 100%;
    padding: 10px;
    font-size: 1.6rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    border: 2px solid #20a074;
    outline: none;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const DAGComponent = ({ defaultNodes, defaultEdges, remainingResources }) => {
  const [backgroundStory, setBackgroundStory] = useState(
    "You are a junior lawyer who needs to understand how the law firm economics work. You are given a case where you need to invest some money into: a) newspapers b) tiktok. Find out how investing into these resources will influence company revenue."
  );

  const [results, setResults] = useState({});
  const [resourceLimit, setResourceLimit] = useState(remainingResources);
  const [feedback, setFeedback] = useState("");
  const [evaluationHistory, setEvaluationHistory] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    defaultNodes.processNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    defaultEdges.processEdges
  );

  const getTotalNodeValues = () => {
    return nodes.reduce(
      (total, node) => total + (parseInt(node.value) || 0),
      0
    );
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

  const remainingResource = resourceLimit - getTotalNodeValues();

  return (
    <Styles>
      <Container>
        <Square>
          <div className="number">
            {Math.floor(remainingResource).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>

          <div className="progressBar">
            <div className="progressBarContainer">
              <ProgessBar width={(remainingResource * 100) / resourceLimit} />
            </div>
          </div>
          <div className="label">Remaining Resources</div>
          <div className="explainer">
            This is the money you can spend to finance the process
          </div>
        </Square>
        <ShortRectangle>
          <InnerContainer>
            <div>
              <MainChart
                evaluationHistory={evaluationHistory}
                parent={findParentOnlyNode(nodes, edges)}
              />
              {/* <pre>{JSON.stringify(evaluationHistory, null, 2)}</pre> */}
            </div>
          </InnerContainer>
        </ShortRectangle>
        <LongRectangle>
          {nodes.map((node) => {
            if (node.canNodeBeUpdated === false) {
              return null;
            } else {
              return (
                <Lever key={node.id}>
                  <div className="label">{node.label}</div>
                  <div className="description">{node.description}</div>

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
                </Lever>
              );
            }
          })}
        </LongRectangle>
        <ShortRectangle>
          <InnerContainer>
            <div>
              <ActionButton onClick={evaluate}>Evaluate DAG</ActionButton>
            </div>
            <div>
              <h2>Results</h2>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
            <div>
              <h2>Evaluation History</h2>
              <pre>{JSON.stringify(evaluationHistory, null, 2)}</pre>
            </div>
          </InnerContainer>
        </ShortRectangle>
        <Square>{feedback}</Square>
      </Container>
    </Styles>
  );
};

export default DAGComponent;
