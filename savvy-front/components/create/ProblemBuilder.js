import React, { Component } from "react";
import TestBlock from "./blocks/TestBlock";

const colors = [
  "#0D3B66",
  "#FAF0CA",
  "#F4D35E",
  "#EE964B",
  "#F95738",
  "#5AB1BB",
  "#DA4167",
  "#54DEFD",
  "#9B5DE5",
  "#F15BB5",
  "#FEE440",
  "#00BBF9",
  "#00F5D4",
  "#390099",
  "#9E0059",
  "#FF0054",
  "#FF5400",
  "#FFBD00",
];

class ProblemBuilder extends Component {
  state = {
    blocks: [],
    usedElements: [],
    colorNum: 0,
  };

  getNode = (type, id) => {
    this.props.getNode(type, id);
  };

  firstBlock = (type) => {
    let newBlocks;
    if (type === "test") {
      newBlocks = [
        ...this.state.blocks,
        <TestBlock
          id="first"
          newTests={this.props.lesson.newTests}
          quizes={this.props.lesson.quizes}
          notes={this.props.lesson.notes}
          getNewBlock={this.handleNewBlock}
          color={colors[this.state.colorNum]}
          sourceColor="#FFF"
          lessonID={this.props.lesson.id}
          getNode={this.getNode}
        />,
      ];
    }
    this.setState({ blocks: newBlocks });
    this.setState((prevState) => ({
      colorNum: prevState.colorNum + 1,
    }));
  };

  handleNewBlock = (id, root, color) => {
    let el = this.props.elements.filter((l) => l.id === id)[0];
    let source = this.props.elements.filter((l) => l.id === root)[0];
    if (el && !this.state.usedElements.includes(id)) {
      let newBlocks = [
        ...this.state.blocks,
        <TestBlock
          id={el ? el.id : "first"}
          type={el.__typename.toLowerCase()}
          newTests={this.props.lesson.newTests}
          quizes={this.props.lesson.quizes}
          notes={this.props.lesson.notes}
          lessonID={this.props.lesson.id}
          value={el ? el : null}
          source={source ? source : null}
          getNewBlock={this.handleNewBlock}
          sourceColor={color}
          color={colors[this.state.colorNum]}
          fixed={true}
        />,
      ];
      this.setState({ blocks: newBlocks });
      this.setState((prevState) => ({
        colorNum: prevState.colorNum + 1,
      }));
    }
    let used = [...this.state.usedElements, id];
    this.setState({ usedElements: used });
  };

  render() {
    return (
      <>
        <button onClick={(e) => this.firstBlock("test")} id="first">
          Первый блок
        </button>
        {this.state.blocks.map((b) => b)}
      </>
    );
  }
}

export default ProblemBuilder;
