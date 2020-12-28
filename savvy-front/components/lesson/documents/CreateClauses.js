import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CreateClause from "./CreateClause";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 5%;
  padding: 0% 0;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
  button.but {
    padding: 1%;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2%;
  }
`;

const CreateClauses = (props) => {
  const [clauses, setClauses] = useState(1);
  return (
    <Styles>
      <div id="title">Условия документа:</div>
      <button classNmae="but" onClick={(e) => setClauses(clauses - 1)}>
        -1
      </button>
      <button classNmae="but" onClick={(e) => setClauses(clauses + 1)}>
        +1
      </button>
      {_.times(clauses, (i) => (
        <>
          <CreateClause index={i + 1} document={props.document} />
        </>
      ))}
    </Styles>
  );
};

CreateClauses.propTypes = {
  document: PropTypes.string.isRequired,
};

export default CreateClauses;
