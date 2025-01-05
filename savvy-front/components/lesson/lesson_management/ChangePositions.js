import { useState, useEffect } from "react";
import styled from "styled-components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { gql, useMutation } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import { ActionButton, SecondaryButton } from "./../styles/DevPageStyles";
import {
  autoResizeTextarea,
  adjustTextareaHeight,
} from "./../SimulatorDevelopmentFunctions";
const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: String!, $structure: LessonStructure!) {
    updateLesson(id: $id, structure: $structure) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 660px;
  background: #fff;
  border-radius: 20px;
  margin: 20px 0;
  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
  /* textarea {
    width: 550px;
    height: 220px;
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    font-family: Montserrat;
    border-radius: 5px;
    outline: none;
  } */
`;

const DownArrow = styled.span`
  cursor: grab; /* Indicates the item is draggable */
  font-size: 1.2rem;
  margin-left: 10px;
  &:active {
    cursor: grabbing; /* Indicates the item is being dragged */
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DragIcon = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const MovableButton = styled.div`
  line-height: 1.6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #ccc;
  font-size: 1.4rem;
  width: 90%;
  .number {
    width: 5%;
    margin-right: 5px;
    border-right: 1px solid #ccc;
  }
  .type {
    width: 20%;
    select {
      border: none;
      display: inline-block;
      background: none;
      outline: 0;
      width: 90%;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      text-indent: 0.01px;
      text-overflow: "";
      cursor: pointer;
    }
  }
  .comment {
    width: 70%;
    margin-right: 5px;
    border-left: 1px solid #ccc;

    border-right: 1px solid #ccc;
    textarea {
      border: none;
      font-family: Montserrat;
      font-size: 1.2rem;
      line-height: 1.4;
      width: 95%;
      height: 20px;
      outline: 0;
      margin: 0 5px;
    }
  }
  .navigation {
    width: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    button {
      margin-bottom: 5px;
      font-size: 1.2rem;
    }
  }
`;

const ItemType = "ITEM";

const DraggableItem = ({
  item,
  index,
  moveItem,
  lesson,
  passCommentUpdates,
  passTypeUpdates,
  passDeleteItem,
  passCreateNewItem,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  useEffect(() => {
    smoothscroll.polyfill();
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const slide = (id) => {
    var my_element = document.getElementById(id);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const getCommentUpdates = (index, value) => {
    passCommentUpdates(index, value);
  };

  const getTypeUpdates = (index, value) => {
    passTypeUpdates(index, value);
  };

  const getCreateNewItem = (index) => {
    passCreateNewItem(index);
  };

  const getDeleteItem = (index) => {
    passDeleteItem(index);
  };

  useEffect(() => {
    const textareas = document.querySelectorAll(".dynamic-textarea");
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [item.comment]); // Run this effect whenever answers change

  return (
    <Row ref={(node) => ref(drop(node))}>
      <DragIcon
        style={{
          cursor: "move",
        }}
        src="/static/drag_icons.png"
      />
      <MovableButton
        style={{
          padding: "10px",
          marginBottom: "5px",
          backgroundColor: "#ffffff",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          cursor: "move",
        }}
      >
        <div className="number">{index + 1}. </div>
        <div className="type">
          <select
            className="type"
            name="itemType"
            id="itemType"
            value={item.type}
            onChange={(e) => getTypeUpdates(index, e.target.value)}
          >
            <option value="Chat">Chat</option>
            <option value="Shot">Slides</option>
            <option value="Note">Longread</option>
            <option value="NewTest">Quiz</option>
            <option value="Quiz">Question</option>
            <option value="Problem">Case Study</option>
            <option value="Texteditor">Doc Editor</option>
            <option value="Construction">Doc Builder</option>
            <option value="Forum">QA</option>
          </select>
        </div>
        <div className="comment">
          <textarea
            className="dynamic-textarea"
            value={item.comment}
            onChange={(e) => {
              getCommentUpdates(index, e.target.value);
            }}
            onInput={autoResizeTextarea}
          />
        </div>
        <div className="navigation">
          {item?.id ? (
            <DownArrow onClick={(e) => slide(item.id)}>⬇️</DownArrow>
          ) : null}
          <button
            onClick={() => getDeleteItem(index)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            D
          </button>
          <button
            onClick={() => getCreateNewItem(index + 1)}
            style={{ marginLeft: "10px", color: "green" }}
          >
            A
          </button>
        </div>
        {/* Render children */}
      </MovableButton>
    </Row>
  );
};

const ChangePositions = ({
  initialItems,
  onItemsUpdate,
  lessonId,
  lesson,
  passNewBlockInfo,
}) => {
  const [items, setItems] = useState(initialItems);
  const [updateLesson, { loading }] = useMutation(UPDATE_LESSON_MUTATION);

  // const saveLessonStructure = (newItems) => {
  //   updateLesson({
  //     variables: {
  //       id: lessonId,
  //       structure: { lessonItems: newItems },
  //     },
  //   }).catch((err) => console.error("Failed to save:", err));
  // };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
    passNewBlockInfo(updatedItems);
    // saveLessonStructure(updatedItems);
  };

  const passCommentUpdates = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].comment = value;
    passNewBlockInfo(updatedItems);
  };

  const passTypeUpdates = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].type = value;
    passNewBlockInfo(updatedItems);
  };
  const createNewItem = (position) => {
    const newItem = {
      id: `new-${Date.now()}`, // Unique ID for the new item
      type: "chat", // Default type
      comment: "", // Default comment
    };
    const updatedItems = [...items];
    updatedItems.splice(position, 0, newItem); // Insert the new item at the specified position
    setItems(updatedItems);
    passNewBlockInfo(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    passNewBlockInfo(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Styles>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            index={index}
            item={item}
            moveItem={moveItem}
            lesson={lesson}
            passCommentUpdates={passCommentUpdates}
            passTypeUpdates={passTypeUpdates}
            passDeleteItem={deleteItem}
            passCreateNewItem={createNewItem}
          />
        ))}
        <br />
        <ActionButton onClick={() => createNewItem(items.length)}>
          Add New Item
        </ActionButton>
        <ActionButton onClick={(e) => onItemsUpdate(items)}>Save</ActionButton>
      </Styles>
    </DndProvider>
  );
};

export default ChangePositions;
