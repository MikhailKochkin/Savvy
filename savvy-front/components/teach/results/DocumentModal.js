import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Modal from "styled-react-modal";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
    &.mistake {
      border-bottom: 1px solid #edefed;
      padding-bottom: 10px;
      margin-bottom: 10px;
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
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  div {
    flex-basis: 50%;
    padding: 0 2%;
    p {
      margin-bottom: 10px;
    }
  }
  .right {
    border-left: 1px solid grey;
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

const Text = styled.div``;

const DocumentModal = props => {
  const [open, setOpen] = useState(false);
  const { document, student } = props;
  return (
    <Box>
      <div>
        <b>Документ: </b>
        {document.title}
      </div>
      <div className="column">Ключевые слова:</div>
      <div className="column">
        Ответы:
        <StyledModal
          isOpen={open}
          onBackgroundClick={e => setOpen(false)}
          onEscapeKeydown={e => setOpen(false)}
        >
          <Block>
            <div>
              <b>Первоначальный ответ:</b>
              {document.documentResults.filter(t => t.user.id === student.id)
                .length > 0 ? (
                document.documentResults
                  .filter(t => t.user.id === student.id)
                  .map(t => t.drafts.map(par => renderHTML(par)))
              ) : (
                <span>Не выполнен</span>
              )}
            </div>
            <div className="right">
              <b>Финальный ответ:</b>
              {document.documentResults.filter(t => t.user.id === student.id)
                .length > 0 ? (
                document.documentResults
                  .filter(t => t.user.id === student.id)
                  .map(t => t.answers.map(par => renderHTML(par)))
              ) : (
                <span>Не выполнен</span>
              )}
            </div>
          </Block>
        </StyledModal>
        <Button onClick={e => setOpen(true)}>
          <a>Открыть</a>
        </Button>
      </div>
    </Box>
  );
};

export default DocumentModal;
