import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Modal from "styled-react-modal";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  li {
    flex: 50%;
  }
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
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

const Block = styled.div`
  padding: 3% 0;
  border-bottom: 1px solid #c4c4c4;
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

const ConstructionModal = props => {
  const [isOpen, setIsOpen] = useState(false);
  const { student, construction } = props;
  let results;
  construction.constructionResults.filter(t => t.student.id === student.id)
    .length > 0
    ? (results = construction.constructionResults.filter(
        t => t.student.id === student.id
      ))
    : null;
  return (
    <Box>
      <div>{renderHTML("<b>Конструктор</b> " + construction.name)}</div>
      <div className="column">
        {results && results.length > 0 ? (
          results.map(t => <li>Количество попыток: {t.attempts}</li>)
        ) : (
          <span>Не составлен</span>
        )}
      </div>
      <div className="column">
        <Button onClick={e => setIsOpen(true)}>
          <a>Развернуть</a>
        </Button>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={e => setIsOpen(false)}
          onEscapeKeydown={e => setIsOpen(false)}
        >
          {results && results.length > 0 ? (
            results.map(t => (
              <Block>{t.inputs.map(input => renderHTML(input))}</Block>
            ))
          ) : (
            <span>Ответов нет</span>
          )}
        </StyledModal>
      </div>
    </Box>
  );
};

export default ConstructionModal;
