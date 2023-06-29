import React from "react";

const Styles = styled.div`
  margin: ${(props) => (props.id === "first" ? "none" : "0 40px")};
  display: flex;
  flex-direction: column;
  width: 1000px;
  border-left: ${(props) =>
    props.id === "first" ? "none" : "1px solid #F4F2F2"};
  overflow: ${(props) => (props.id === "first" ? "auto" : "visible")};
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .but {
    height: 25px;
    width: 25px;
    margin: 0 10px;
  }
`;

const Nodes = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProblemBlock = () => {
  return (
    <Styles>
      <Head>{obj.el}</Head>
      <Nodes>{reveal && obj.nodes.map((n) => open(n))}</Nodes>
    </Styles>
  );
};

export default ProblemBlock;
