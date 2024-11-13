const graph = [
  {
    id: "start",
    value: 0,
    goal: 100,
    dependencies: ["node1", "node2"],
    sources: ["node3"],
    manageable: false,
    formula: (x, y) => x + y,
  },
  {
    id: "node1",
    value: 0,
    formula: (x) => x * 2,
    dependencies: ["node3"],
    sources: ["start"],
    manageable: false,
  },
  {
    id: "node2",
    value: 12,
    dependencies: [],
    sources: ["start"],
    manageable: true,
  },
  {
    id: "node3",
    value: 15,
    formula: (x) => x * 2,
    dependencies: [],
    sources: ["node1"],
    manageable: true,
  },
];

const simulation = (graph) => {
  const nodeMap = new Map(graph.map((node) => [node.id, node]));
  const calculate = (nodeId) => {
    // 1. Get the node by id
    const node = nodeMap.get(nodeId);
    // 2. If this is the initial node, set the value to the input
    if (nodeId === "node3") {
      node.value = node.formula(node.value); // Replace 10 with desired input
      console.log(`${node.id}: ${node.value}`);
    } else {
      node.dependencies.forEach((dep) => calculate(dep));
      console.log("node dependencies", node.dependencies);
      const depValues = node.dependencies.map((dep) => nodeMap.get(dep).value);
      if (node.formula) {
        node.value = node.formula(...depValues);
        console.log(`${node.id}: ${node.value}`);
      }
    }
  };

  calculate("start");

  const startNode = nodeMap.get("start");
  console.log(`Start node value: ${startNode.value}, Goal: ${startNode.goal}`);
};

simulation(graph);
