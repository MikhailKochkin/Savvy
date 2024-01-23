import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import parse from "html-react-parser";
import Modal from "styled-react-modal";

import NewBlock from "./blocks/NewBlock";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  h2 {
    width: 660px;
  }
  /* max-width: 600px; */
  .canvasArea {
    position: relative;
    width: 100%;
    height: 900px;
    background: #f9f9fb;
    border: 2px solid #f5f6f6;
    margin: 15px 0;
    overflow: auto;
  }
  .toolbar {
    width: 660px;
    display: flex;
    justify-content: space-between; /* Distribute items evenly along the main axis */
  }
`;

const MessageStyles = styled.div`
  padding: 10px;
  width: 220px;
  height: 260px;
  background: #fff;
  border: 2px solid #eff1f4;
  border-radius: 10px;
  cursor: pointer;
  h2 {
    margin: 5px 0;
  }
  .type {
  }
  .id_info {
    font-size: 1rem;

    padding-bottom: 5px;
    border-bottom: 2px solid #eff1f4;
    margin-bottom: 5px;
  }
  .question {
    p {
      font-size: 1.2rem;
      line-height: 1.4;
      margin: 5px 0;
    }
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    color: #aeaeae;
    /* color: #eff1f4; */
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: none;
  }
`;

const DevWindowStyles = styled.div``;

const SimpleButton = styled.button`
  flex: 1;
  height: 40px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  margin: auto;
  /* align-items: center;
  justify-content: center; */
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  height: 800px;
  max-width: 800px;
  min-width: 560px;
  padding: 2%;
      overflow-y: scroll;

  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const CanvasProblemBuilder = (props) => {
  const canvasWidth = 500; // You can adjust this
  const canvasHeight = 500; // You can adjust this
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const radius = Math.min(canvasWidth, canvasHeight) / 2.5; // Adjust the division factor to control the distance from the center

  const positionMessage = (index, total) => {
    // This function returns the x and y coordinates for a message given its index and total number of messages

    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2; // Subtracting π/2 to start from top

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { x, y };
  };
  const [messages, setMessages] = useState(
    props.items.length > 0
      ? props.items.map((item, index) => {
          const { x, y } = positionMessage(index, props.items.length);
          return {
            id: item.id,
            content: "",
            position: { x, y },
            type: item.type,
            next: {
              true: {
                value: item.next.true.value,
                type: item.next.true.type,
              },
              false: {
                value: item.next.false.value,
                type: item.next.true.type, // Note: This seems like an error. Maybe it should be item.next.false.type?
              },
            },
          };
        })
      : []
  );
  const [zoomLevel, setZoomLevel] = useState(1); // State to handle zoom level
  const [newMessage, setNewMessage] = useState("");
  const [activeId, setActiveId] = useState("");
  const [activeMessage, setActiveMessage] = useState();
  const [foundElement, setFoundElement] = useState();
  const { t } = useTranslation("lesson");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [{ isOver }, dropCanvas] = useDrop({
    accept: "MESSAGE",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const x = Math.round(item.position.x + delta.x);
      const y = Math.round(item.position.y + delta.y);

      moveMessage(item.id, x, y);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const deleteMessage = (messageId) => {
    setMessages((prevMessages) => {
      // Filter out the deleted message
      const newMessages = prevMessages.filter((msg) => msg.id !== messageId);

      // Update connections for any message that was connected to the deleted message
      newMessages.forEach((msg) => {
        ["true", "false"].forEach((key) => {
          if (msg.next[key].value === messageId) {
            msg.next[key].value = null;
            msg.next[key].type = null; // This line makes the type null
          }
        });
      });
      props.getSteps([...newMessages]);

      return newMessages;
    });
  };

  const moveMessage = (id, x, y) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const targetMessage = newMessages.find((message) => message.id === id);
      if (targetMessage) {
        targetMessage.position.x = x;
        targetMessage.position.y = y;
      }
      return newMessages;
    });
  };

  const connectMessages = (sourceId, destId, type) => {
    // Prevent self-connection
    if (sourceId === destId) return;

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const sourceMessage = newMessages.find((msg) => msg.id === sourceId);
      const destMessage = newMessages.find((msg) => msg.id === destId);

      if (
        sourceMessage &&
        destMessage &&
        sourceMessage.next &&
        (type === "true" || type === "false")
      ) {
        sourceMessage.next[type].value = destId;
        sourceMessage.next[type].type = destMessage.type; // setting the type of the destination message
      }
      props.getSteps([...newMessages]);

      return newMessages;
    });
  };

  const breakConnection = (sourceId, destId, connectionType) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const sourceMessage = newMessages.find((msg) => msg.id === sourceId);

      if (
        sourceMessage &&
        sourceMessage.next &&
        (connectionType === "true" || connectionType === "false") &&
        sourceMessage.next[connectionType].value === destId
      ) {
        sourceMessage.next[connectionType].value = null;
        sourceMessage.next[connectionType].type = null;
      }
      props.getSteps([...newMessages]);

      return newMessages;
    });
  };

  const developElement = (val) => {
    setActiveId(val);
    let copiedMesages = [...messages];
    let chosen_element = copiedMesages.find((el) => el.id == val);
    setActiveMessage(chosen_element);
    let found_data = [
      ...props.lesson.notes,
      ...props.lesson.quizes,
      ...props.lesson.newTests,
      ...props.lesson.chats,
    ].find((el) => el.id == val);
    setFoundElement(found_data);
    setModalOpen(true);
  };

  const getControlPoint = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    const cx = x1 + dx / 2;
    const cy = y1 + dy / 2 - length * 0.3; // This factor will determine how much the curve deviates

    return { cx, cy };
  };

  const getData = (newId, type) => {
    let copy_messages = [...messages];
    console.log("newId", newId);
    const updatedArray = copy_messages.map((obj) => {
      if (obj.id === activeMessage.id) {
        return { ...obj, id: newId };
      }
      return obj;
    });
    console.log("updatedArray", updatedArray);

    props.getSteps([...updatedArray]);
    setMessages([...updatedArray]);
  };

  const squareSize = 20;

  return (
    <Styles>
      {activeMessage && activeMessage.type && (
        <StyledModal
          isOpen={modalOpen}
          onBackgroundClick={handleCloseModal}
          onEscapeKeydown={handleCloseModal}
        >
          <DevWindowStyles>
            <div>ID: {activeId}</div>
            <NewBlock
              type={activeMessage.type}
              getData={getData}
              lesson={props.lesson}
              me={props.me}
              data={foundElement}
            />
            <button onClick={(e) => setModalOpen(false)}>Close</button>
          </DevWindowStyles>
        </StyledModal>
      )}
      <h2>{t("guiding_questions")}</h2>
      <div className="toolbar">
        <SimpleButton
          onClick={() => {
            const id = `message-${messages.length + 1}`;
            const newMessages = [
              ...messages,
              {
                id: id,
                content: newMessage || "Note",
                position: { x: 100, y: (messages.length + 1) * 60 },
                next: {
                  true: { value: null, type: null },
                  false: { value: null, type: null },
                },
                type: "Note", // Added type as Note here
              },
            ];
            setMessages(newMessages);
            setNewMessage("");
          }}
        >
          {t("add_note")}
        </SimpleButton>
        <SimpleButton
          onClick={() => {
            const id = `message-${messages.length + 1}`;
            const newMessages = [
              ...messages,
              {
                id: id,
                content: newMessage || "NewTest",
                position: { x: 100, y: (messages.length + 1) * 60 },
                next: {
                  true: { value: null, type: null },
                  false: { value: null, type: null },
                },
                type: "NewTest", // Added type as Note here
              },
            ];
            setMessages(newMessages);
            setNewMessage("");
          }}
        >
          {t("add_test")}
        </SimpleButton>
        <SimpleButton
          onClick={() => {
            const id = `message-${messages.length + 1}`;
            const newMessages = [
              ...messages,
              {
                id: id,
                content: newMessage || "Quiz",
                position: { x: 100, y: (messages.length + 1) * 60 },
                next: {
                  true: { value: null, type: null },
                  false: { value: null, type: null },
                },
                type: "Quiz", // Added type as Note here
              },
            ];
            setMessages(newMessages);
            setNewMessage("");
          }}
        >
          {t("add_quiz")}
        </SimpleButton>
        <SimpleButton
          onClick={() => {
            const id = `message-${messages.length + 1}`;
            const newMessages = [
              ...messages,
              {
                id: id,
                content: newMessage || "Chat",
                position: { x: 100, y: (messages.length + 1) * 60 },
                next: {
                  true: { value: null, type: null },
                  false: { value: null, type: null },
                },
                type: "Chat", // Added type as Note here
              },
            ];
            setMessages(newMessages);
            setNewMessage("");
          }}
        >
          Add chat
        </SimpleButton>
      </div>
      <div
        className="canvasArea"
        ref={dropCanvas}
        style={{ backgroundColor: "#f9f9fb" }}
      >
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          transform={`scale(${zoomLevel})`}
        >
          {/* Arrowhead marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
          {messages.flatMap((message) =>
            ["true", "false"].map((key) => {
              const targetId = message.next[key].value; // Update this line
              const target = messages.find((m) => m.id === targetId);
              if (!target) return null;

              // For "true" key, start from right-middle of the message and end at left-middle of the target
              // For "false" key, start from bottom-middle of the message and end at top-middle of the target

              const x1 =
                key === "true"
                  ? message.position.x + squareSize
                  : message.position.x + squareSize / 2;
              const y1 =
                key === "true"
                  ? message.position.y + squareSize / 2
                  : message.position.y + squareSize;

              const x2 =
                key === "true"
                  ? target.position.x
                  : target.position.x + squareSize / 2;
              const y2 =
                key === "true"
                  ? target.position.y + squareSize / 2
                  : target.position.y;

              // Calculate control points using our function
              // Control point offset
              const controlPointOffset = 50;

              // Calculate control points using our function
              let { cx, cy } = getControlPoint(x1, y1, x2, y2);

              // Adjust control points based on the key
              if (key === "true") {
                cy = cy - controlPointOffset;
              } else {
                cy = cy + controlPointOffset;
              }
              // Calculate the midpoint of the curve using t=0.5
              const t = 0.5;
              const mt = 1 - t;

              const midpointX = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
              const midpointY = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;

              return (
                <g key={`${message.id}-${key}`}>
                  <path
                    d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                    fill="none"
                    stroke={key === "true" ? "#72D47F" : "#EB5E55"}
                    markerEnd="url(#arrowhead)"
                    onClick={() => breakConnection(message.id, targetId, key)}
                    style={{ pointerEvents: "auto" }}
                    stroke-dasharray="5,5"
                  />
                  <circle
                    cx={midpointX} // Place circle at midpoint
                    cy={midpointY} // Place circle at midpoint
                    r={5}
                    fill={key === "true" ? "#72D47F" : "#EB5E55"}
                    onClick={() => breakConnection(message.id, targetId, key)}
                    style={{ pointerEvents: "auto" }}
                  />
                </g>
              );
            })
          )}
        </svg>
        <g transform={`scale(${zoomLevel})`}>
          {messages.map((message, index) => (
            <Message
              key={index}
              number={index + 1}
              id={message.id}
              content={message.content}
              type={message.type}
              position={message.position}
              onConnect={connectMessages}
              developElement={developElement}
              onRemove={deleteMessage}
              lesson={props.lesson}
              // ... other props
            />
          ))}
        </g>
      </div>
    </Styles>
  );
};

const Message = ({
  id,
  number,
  content,
  lesson,
  position,
  onConnect,
  developElement,
  type,
  onRemove,
}) => {
  const { t } = useTranslation("lesson");

  const [{ isDragging }, dragRef] = useDrag({
    type: "MESSAGE",
    item: { id, position }, // include the position here
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CONNECTOR",
    drop: (item) => {
      if (onConnect) {
        onConnect(item.sourceId, id, item.connectorType); // pass the connectorType
      }
    },
  });

  const [, dragConnectorTrue] = useDrag({
    type: "CONNECTOR",
    item: { sourceId: id, connectorType: "true" },
  });

  const [, dragConnectorFalse] = useDrag({
    type: "CONNECTOR",
    item: { sourceId: id, connectorType: "false" },
  });

  const passElementValue = () => {
    developElement(id);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // This stops other click events like `passElementValue`
    if (confirm("Are you sure?")) {
      onRemove(id);
    }
  };

  return (
    <MessageStyles
      onClick={(e) => passElementValue()}
      ref={mergeRefs([dragRef, dropRef])}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="type">
        {number}. {type.toLowerCase() == "newtest" ? t("NewTest") : null}
        {type.toLowerCase() == "quiz" ? t("Quiz") : null}
        {type.toLowerCase() == "note" ? t("Note") : null}
        {type.toLowerCase() == "chat" ? t("Chat") : null}
      </div>
      <div className="id_info">ID: {id}</div>

      <div className="question">
        {type.toLowerCase() == "quiz" && lesson.quizes.find((el) => el.id == id)
          ? parse(
              lesson.quizes.find((el) => el.id == id).question.substring(0, 180)
            )
          : null}
        {type.toLowerCase() == "newtest" &&
        lesson.newTests.find((el) => el.id == id)
          ? parse(
              lesson.newTests
                .find((el) => el.id == id)
                .question[0].substring(0, 180)
            )
          : null}
        {type.toLowerCase() == "note" && lesson.notes.find((el) => el.id == id)
          ? parse(lesson.notes.find((el) => el.id == id).text.substring(0, 120))
          : null}

        {type.toLowerCase() == "chat" && lesson.chats.find((el) => el.id == id)
          ? parse(
              lesson.chats.find((el) => el.id == id).messages.messagesList[0]
                .text
            )
          : null}
      </div>
      <button onClick={handleRemove}>X</button>
      <div
        ref={dragConnectorTrue}
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#72D47F",
          cursor: "pointer",
          position: "absolute",
          top: "95%",
          right: "95%",
        }}
      ></div>
      <div
        ref={dragConnectorFalse}
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#EB5E55",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      ></div>
    </MessageStyles>
  );
};

export default CanvasProblemBuilder;
