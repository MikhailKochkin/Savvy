import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Modal from "styled-react-modal";
import Construction from "./Construction";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 75px 0;
  h2 {
    margin: 0;
  }
`;

const ConstructionModal = (props) => {
  const { construction, results } = props;
  const [variants, setVariants] = useState([]);
  let student_results;
  results.filter((r) => r.construction.id === construction.id).length > 0
    ? (student_results = results.filter(
        (r) => r.construction.id === construction.id
      ))
    : null;

  const shuffle = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };
  useEffect(() => {
    let vars;
    if (props.construction?.elements?.elements) {
      vars = shuffle([
        ...props.construction.elements.elements.filter((t) => t.isTest),
      ]);
    } else {
      vars = props.construction.variants;
    }
    setVariants([...vars]);
  }, []);

  return (
    <Box id={construction.id}>
      <h2>Doc Builder</h2>
      <div></div>
      <div className="column">
        {student_results && student_results.length > 0 ? (
          <div>
            {student_results.map((s, i) => {
              if (s.elements && s.elements.elements.length > 0) {
                return (
                  <Construction
                    resultId={s.id}
                    id={"conresult" + i}
                    key={i}
                    s={s}
                    student_results={student_results}
                    elems={s.elements.elements}
                    construction={construction}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div>No answers provided</div>
        )}
      </div>
    </Box>
  );
};

export default ConstructionModal;
