import { useState, useEffect } from "react";
import styled from "styled-components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { gql, useMutation } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import { Title } from "./styles/DevPageStyles";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: String!, $structure: LessonStructure!) {
    updateLesson(id: $id, structure: $structure) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 660px;
  border: 2px solid #f1f1f1;
  background: #fff;
  border-radius: 20px;
  margin: 40px 0;
  padding: 20px;
  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
  textarea {
    width: 550px;
    height: 220px;
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    font-family: Montserrat;
    border-radius: 5px;
    outline: none;
  }
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
`;

const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem, lesson }) => {
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
        {index + 1}.{" "}
        {item.type.toLowerCase() == "chat"
          ? `Chat: ${
              lesson.chats.find((ch) => ch.id == item.id)?.name || "Chat"
            }`
          : null}
        {item.type.toLowerCase() == "shot"
          ? `Deck: ${
              lesson.shots.find((ch) => ch.id == item.id)?.name || "Deck"
            }`
          : null}
        {item.type.toLowerCase() == "note"
          ? `Longread: ${
              lesson.notes.find((ch) => ch.id == item.id)?.name || "Longread"
            }`
          : null}
        {item.type.toLowerCase() == "newtest"
          ? `Quiz: ${
              lesson.newTests.find((ch) => ch.id == item.id)?.name || "Quiz"
            }`
          : null}
        {item.type.toLowerCase() == "quiz"
          ? `Question: ${
              lesson.quizes.find((ch) => ch.id == item.id)?.name || "Question"
            }`
          : null}
        {item.type.toLowerCase() == "problem"
          ? `Case Study: ${
              lesson.problems.find((ch) => ch.id == item.id)?.name ||
              "Case Study"
            }`
          : null}
        {item.type.toLowerCase() == "texteditor"
          ? `Doc Editor: ${
              lesson.texteditors.find((ch) => ch.id == item.id)?.name ||
              "Doc Editor"
            }`
          : null}
        {item.type.toLowerCase() == "construction"
          ? `Doc Builder: ${
              lesson.constructions.find((ch) => ch.id == item.id)?.name ||
              "Doc Builder"
            }`
          : null}
        {item.type.toLowerCase() == "testpractice" && "Chain of questions"}
        {item.type.toLowerCase() == "forum" ? `Q&A` : null}
        <DownArrow onClick={(e) => slide(item.id)}>⬇️</DownArrow>
      </MovableButton>
    </Row>
  );
};

const ChangePositions = ({ initialItems, onItemsUpdate, lessonId, lesson }) => {
  const [items, setItems] = useState(initialItems);
  const [updateLesson, { loading }] = useMutation(UPDATE_LESSON_MUTATION);

  const saveLessonStructure = (newItems) => {
    updateLesson({
      variables: {
        id: lessonId,
        structure: { lessonItems: newItems },
      },
    }).catch((err) => console.error("Failed to save:", err));
  };

  useEffect(() => {
    const initialItemsString = JSON.stringify(
      initialItems.map((item) => item.id)
    );
    const currentItemsString = JSON.stringify(items.map((item) => item.id));

    if (initialItemsString !== currentItemsString) {
      onItemsUpdate(items); // Notify parent whenever items' positions change
    }
  }, [items, initialItems, onItemsUpdate]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);

    saveLessonStructure(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Styles style={{ padding: "20px" }}>
        <Title>Change blocks' positions</Title>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            index={index}
            item={item}
            moveItem={moveItem}
            lesson={lesson}
          />
        ))}
      </Styles>
    </DndProvider>
  );
};

export default ChangePositions;
