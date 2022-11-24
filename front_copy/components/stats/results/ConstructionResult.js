import React, { Component } from "react";
import styled from "styled-components";
import ConstructionModal from "./ConstructionModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1%;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

class ConstructionResult extends Component {
  render() {
    const { constructions, student, results } = this.props;
    return (
      <Container>
        {constructions.length > 0 &&
          constructions.map((construction) => (
            <ConstructionModal
              construction={construction}
              student={student}
              results={results}
            />
          ))}
      </Container>
    );
  }
}

export default ConstructionResult;
