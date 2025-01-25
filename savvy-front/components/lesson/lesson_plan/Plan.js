import styled from "styled-components";
import { useState } from "react";
import { SecondaryButton } from "../styles/DevPageStyles";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 90vh;
  background-color: #e3e4e7;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-right: 5px;
  padding: 15px;
`;

const RowBlock = styled.div`
  width: ${(props) => props.width};
  border: 1px solid rgb(206, 205, 205);
  background-color: white;
  margin-right: 5px;
  padding: 15px;
`;

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Plan = () => {
  const [rows, setRows] = useState([]);
  const addRow = (index) => {
    let newRow = {
      id: uuidv4(),
      text: "",
      comments: "",
      simulatorBlock: "",
    };
    let newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    console.log("newRows", newRows);
    setRows(newRows);
  };

  const removeRow = (id) => {
    let newRows = [...rows].filter((el) => el.id !== id);
    setRows(newRows);
  };

  const updateRow = (value, index) => {
    let newRows = [...rows];
    newRows[index].text = value;
    setRows(newRows);
  };
  console.log("rows", rows);

  return (
    <Styles>
      <Table>
        <Row>
          <RowBlock width="10%">Intro</RowBlock>
          <RowBlock width="60%">Text</RowBlock>
          <RowBlock width="30%">
            Simulator
            <SecondaryButton onClick={(e) => addRow(0)}>+1</SecondaryButton>
          </RowBlock>
        </Row>
        {rows.map((row, index) => (
          <Row key={row.id}>
            <RowBlock width="10%">{index + 1}</RowBlock>
            <RowBlock width="60%">
              <DynamicHoverEditor
                index={index}
                name="text"
                getEditorText={(value) => updateRow(value, index)}
                placeholder="Message"
                value={row.text}
              />
            </RowBlock>
            <RowBlock width="30%">
              {row.simulatorBlock}
              <SecondaryButton onClick={(e) => addRow(index)}>
                +1
              </SecondaryButton>
              <SecondaryButton onClick={(e) => removeRow(row.id)}>
                -1
              </SecondaryButton>
            </RowBlock>
          </Row>
        ))}
      </Table>
    </Styles>
  );
};

export default Plan;
