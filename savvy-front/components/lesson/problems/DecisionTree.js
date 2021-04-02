import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Tree from "react-d3-tree";
import ReactResizeDetector from "react-resize-detector";

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  margin-top: 100px;
`;

const Styles = styled.div`
  svg {
    /* border: 1px solid blue; */
    text-align: center;
    vertical-align: middle;
  }
  .node__root {
    fill: #997bfe;
    stroke-width: 0;
    font-family: Montserrat;
  }
  .node__branch {
    fill: #997bfe;
    stroke-width: 0;
  }
  .nodes > circle {
    fill: #7bd7fd;
    stroke-width: 0;
  }
  .link__to-leaf {
    stroke: #e6e4fa; /* fallback for old browsers */
  }
  .link__to-branch {
    stroke: #e6e4fa; /* fallback for old browsers */
  }
`;

const DecisionTree = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [chart, setChart] = useState();

  const onResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  const getDynamicPathClass = ({ source, target }, orientation) => {
    if (!target.children) {
      // Target node has no children -> this link leads to a leaf node.
      return "link__to-leaf";
    }

    // Style it as a link connecting two branch nodes by default.
    return "link__to-branch";
  };

  return (
    <Container>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      {/* <button onClick={(e) => setChart(orgChart)}>Update</button> */}
      <Styles
        id="treeWrapper"
        // onResize={changeSize}
        style={{
          width: "600px",
          height: "600px",
          // position: "-webkit-sticky",
          // position: "sticky",
          // top: "0",
          padding: "0px",
          fontFamily: "Montserrat",
        }}
      >
        <Tree
          data={props.data}
          initialDepth={0}
          pathFunc={"diagonal"}
          pathClassFunc={getDynamicPathClass}
          transitionDuration={500}
          // enableLegacyTransitions={true}
          orientation="vertical"
          translate={{ x: 300, y: 20 }}
          nodeSize={{ x: 300, y: 100 }}
          zoomable={true}
          leafNodeClassName={"nodes"}
          branchNodeClassName="node__branch"
          rootNodeClassName="node__root"
        />
      </Styles>
    </Container>
  );
};

export default DecisionTree;
