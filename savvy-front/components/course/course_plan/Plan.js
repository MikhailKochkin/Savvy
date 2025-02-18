import styled from "styled-components";
import { useState } from "react";
import {
  SecondaryButton,
  ActionButton,
  NanoButton,
  Row,
} from "../../lesson/styles/DevPageStyles";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const TopManagementPanel = styled.div`
  width: 1200px;
  margin: 15px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgb(206, 205, 205);
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-right: 5px;
  padding: 0 15px;
  padding-bottom: 5px;
`;

const RowBlock = styled.div`
  width: ${(props) => props.width};
  border: 1px solid rgb(206, 205, 205);
  background-color: white;
  margin-right: 5px;
  padding: 15px;
  .action_area {
    width: 100%;
    margin: 0;
  }
  .table_head_cell {
    margin-right: 10px;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 10px;
  }
`;

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Plan = () => {
  // savedData = array of objects.
  // {
  //   id: uuidv4(),
  //   text: "",
  //   comment: "",
  //   blockType: null,
  //   inUse: boolean –> have these blocks already been used for simualtor creation
  // }
  const [rows, setRows] = useState([]);
  const [chosenRows, setChosenRows] = useState([]);

  const addRow = (index) => {
    let newRow = {
      id: uuidv4(),
      text: "",
      comment: "",
      blockType: null,
    };
    let newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    setRows(newRows);
  };

  const removeRow = (id, index) => {
    if (confirm(`Are you sure you want to remove row №${index + 1}?`)) {
      let newRows = [...rows].filter((el) => el.id !== id);
      setRows(newRows);
      setChosenRows((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const updateRow = (value, index, field) => {
    let newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const toggleChosenRow = (row) => {
    setChosenRows((prev) => {
      if (prev.some((el) => el.id === row.id)) {
        return prev.filter((el) => el.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  return (
    <Styles>
      <Table>
        <TopManagementPanel>
          <ActionButton>Create Simulator</ActionButton>
        </TopManagementPanel>
        <TableRow>
          <RowBlock width="5%">
            <span className="table_head_cell">№</span>
          </RowBlock>
          <RowBlock width="40%">
            <span className="table_head_cell">Text</span>
          </RowBlock>
          <RowBlock width="40%">
            <span className="table_head_cell">Comment</span>
          </RowBlock>
          <RowBlock width="15%">
            <span className="table_head_cell">Action</span>
            <ButtonColumn>
              <SecondaryButton onClick={(e) => addRow(-1)}>
                Add first row
              </SecondaryButton>
            </ButtonColumn>
          </RowBlock>
        </TableRow>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <RowBlock width="5%">{index + 1}</RowBlock>
            <RowBlock width="40%">
              <DynamicHoverEditor
                index={index}
                name="text"
                getEditorText={(value) => updateRow(value, index, "text")}
                value={row.text}
              />
            </RowBlock>
            <RowBlock width="40%">
              <DynamicHoverEditor
                index={index}
                name="text"
                getEditorText={(value) => updateRow(value, index, "comment")}
                value={row.comment}
              />
            </RowBlock>
            <RowBlock width="15%">
              <Row>
                <div className="action_area">
                  <select
                    value={row.blockType}
                    onChange={(e) =>
                      updateRow(e.target.value, index, "blockType")
                    }
                  >
                    <option value={null}>Undefined type</option>
                    <option value="note">Longread</option>
                    <option value="chat">Dialogue</option>
                    <option value="problem">Case Study</option>
                    <option value="texteditor">Doc Editor</option>
                    <option value="construction">Doc Builder</option>
                  </select>
                </div>
              </Row>
              <ButtonColumn>
                <SecondaryButton onClick={() => toggleChosenRow(row)}>
                  {chosenRows.some((el) => el.id === row.id)
                    ? "Unchoose"
                    : "Choose"}
                </SecondaryButton>
                <SecondaryButton onClick={(e) => addRow(index)}>
                  Add row
                </SecondaryButton>
                <SecondaryButton onClick={(e) => removeRow(row.id, index)}>
                  Remove row
                </SecondaryButton>
              </ButtonColumn>
            </RowBlock>
          </TableRow>
        ))}
      </Table>
    </Styles>
  );
};

export default Plan;
