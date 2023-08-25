import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Modal from "styled-react-modal";
import Construction from "./Construction";

const Box = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
  margin: 75px 0;
  h2 {
    margin: 0;
  }
`;

const Button = styled.button`
  text-align: center;
  background: #ffffff;
  border: 1px solid #112a62;
  border-radius: 5px;
  cursor: pointer;
  width: 90%;
  outline: 0;
  margin: 1% 0;
  color: #112a62;
  font-size: 1.4rem;
  a {
    color: #112a62;
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 1% 2%;
  width: 50%;
  max-height: calc(100vh - 5rem);
  overflow-y: scroll;
  @media (max-width: 800px) {
    width: 90%;
  }
  p {
      margin: 1%;
  }
  #id {
    color: #dc143c;
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
    const vars = shuffle([
      ...props.construction.elements.elements.filter((t) => t.isTest),
    ]);
    setVariants(vars);
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
          <div>Ответов нет</div>
        )}
      </div>
    </Box>
  );
};

export default ConstructionModal;
