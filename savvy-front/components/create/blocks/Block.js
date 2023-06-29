import React, { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  margin: ${(props) => (props.id === "first" ? "none" : "0 40px")};
  display: flex;
  flex-direction: row;
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

const Block = (props) => {
  const [reveal, setReveal] = useState(true);
  const open = (obj) => <Block obj={obj} />;
  const { obj } = props;
  return (
    <Styles id={obj.el.props.id} color={obj.el.props.color}>
      <Head>
        <button className="but" onClick={() => setReveal(!reveal)}>
          {reveal ? "-" : "+"}
        </button>
        {obj.el}
      </Head>
      <Nodes>{reveal && obj.nodes.map((n) => open(n))}</Nodes>
    </Styles>
  );
};

export default Block;
