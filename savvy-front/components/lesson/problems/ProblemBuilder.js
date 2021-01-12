import { useState, useEffect } from "react";
import TestBlock from "./TestBlock";
import * as _ from "lodash";

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

const ProblemBuilder = (props) => {
  const [components, setComponents] = useState([]);
  const cloned_elements = _.cloneDeep(props.elements);

  useEffect(() => {
    let arr = [];
    let i = 0;
    const recurse2 = (el) => {
      if (!arr.includes(el)) {
        el.color = colors[i];
        el.sourceColor = "#fff";
        arr.push(el);
      }
      if (el.next) {
        if (el.next.true) {
          let next_true = cloned_elements.filter(
            (e) => e.id === el.next.true.value
          )[0];
          if (
            next_true &&
            arr.filter((c) => c.id === next_true.id).length === 0
          ) {
            next_true.source = el.id;
            next_true.color = colors[i + 1];
            next_true.sourceColor = colors[i];
            arr.push(next_true);
          }
        }
        if (el.next.false) {
          let next_false = cloned_elements.filter(
            (e) => e.id === el.next.false.value
          )[0];
          if (
            next_false &&
            arr.filter((c) => c.id === next_false.id).length === 0
          ) {
            next_false.source = el.id;
            next_false.color = colors[i + 1];
            next_false.sourceColor = colors[i];
            arr.push(next_false);
          }
        }
        i++;
        if (el.next.true) {
          let next_true = cloned_elements.filter(
            (e) => e.id === el.next.true.value
          )[0];
          if (next_true !== undefined && next_true !== null) {
            recurse2(next_true);
          }
        }
        if (el.next.false) {
          let next_false = cloned_elements.filter(
            (e) => e.id === el.next.false.value
          )[0];
          if (next_false !== undefined && next_false !== null) {
            recurse2(next_false);
          }
        }
      }
    };

    let first = cloned_elements.filter((e) => e.id === props.nodeID)[0];
    console.log("first", Object.isExtensible(first));
    recurse2(first);
    setComponents([...arr]);
  }, [0]);

  const handleNewBlock = (id, root, color) => {
    if (id) {
      let el = props.elements.filter((l) => l.id === id)[0];
      let source = props.elements.filter((l) => l.id === root)[0];
      // console.log(source.color, colors.indexOf(source.color));
      el.source = source.id;
      el.color = colors[colors.indexOf(source.color) + 1];
      el.sourceColor = source.color;
      setComponents([...components, el]);
    }
  };

  const removeBlock = (id) => {
    let comps = components;
    comps = comps.filter((c) => c.id !== id);
    setComponents(comps);
  };
  return (
    <>
      {components.map((el) => (
        <>
          <TestBlock
            id={el ? el.id : "first"}
            type={el.__typename.toLowerCase()}
            lessonID={props.lessonID}
            newTests={props.newTests}
            quizes={props.quizes}
            notes={props.notes}
            t={{
              type:
                el.next && el.next.true && el.next.true.type
                  ? el.next.true.type.toLowerCase()
                  : null,
              value:
                el.next && el.next.true && el.next.true.value
                  ? el.next.true.value.toLowerCase()
                  : null,
            }}
            f={{
              type:
                el.next && el.next.false && el.next.false.type
                  ? el.next.false.type.toLowerCase()
                  : null,
              value:
                el.next && el.next.false && el.next.false.value
                  ? el.next.false.value.toLowerCase()
                  : null,
            }}
            value={el ? el : null}
            source={el.source ? el.source : "null"}
            getNewBlock={handleNewBlock}
            removeBlock={removeBlock}
            sourceColor={el.sourceColor}
            color={el.color}
            fixed={true}
          />
        </>
      ))}
    </>
  );
};

export default ProblemBuilder;
