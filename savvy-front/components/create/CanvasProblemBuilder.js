import React, { useState, useEffect, useRef } from "react";
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
  width: 280px;
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

const QuestionButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .directionButton {
    width: 90%;
    font-size: 1.2rem;
    border: 1px solid #eef1f4;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 15px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .quiz_text {
      width: 80%;
      display: flex;
      flex-direction: row;
      p {
        margin: 4px 0;
      }
    }
    .circle_connector {
      background-color: #a5a5a5;
      width: 12px;
      height: 12px;
      margin-left: 20px;
      border-radius: 50%;
    }
  }
`;

const InformationSection = styled.div`
  height: 150px;
`;

const SVGConnections = ({ messages, breakConnection }) => {
  const getControlPoint = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const cx = x1 + dx / 2;
    const cy = y1 + dy / 2 - length * 0.3;
    return { cx, cy };
  };

  const squareSize = 20;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
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
      {messages.flatMap((message) => {
        if (!message.next.branches || message.next.branches.length == 0) {
          return ["true", "false"].map((key) => {
            const targetId = message.next[key].value;
            const target = messages.find((m) => m.id === targetId);
            if (!target) return null;
            const x1 =
              key === "true"
                ? message.position.x + 280 - 50
                : message.position.x + 280 - 50;
            const y1 =
              key === "true"
                ? message.position.y + 150 + 40
                : message.position.y + 150 + 80;

            const x2 =
              key === "true"
                ? target.position.x - 5
                : target.position.x + squareSize / 2 - 15;
            const y2 =
              key === "true"
                ? target.position.y + squareSize / 2 + 15
                : target.position.y + 50;

            const controlPointOffset = 50;
            let { cx, cy } = getControlPoint(x1, y1, x2, y2);
            cy =
              key === "true"
                ? cy - controlPointOffset
                : cy + controlPointOffset;

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
                  style={{ pointerEvents: "visiblePainted" }}
                  strokeDasharray="5,5"
                />
                <circle
                  cx={midpointX}
                  cy={midpointY}
                  r={5}
                  fill={key === "true" ? "#72D47F" : "#EB5E55"}
                  onClick={() => breakConnection(message.id, targetId, key)}
                  style={{ pointerEvents: "auto" }}
                />
              </g>
            );
          });
        } else {
          return message.next.branches.map((branch, i) => {
            const targetId = branch.value;
            const target = messages.find((m) => m.id === targetId);
            if (!target) return null;
            const x1 = message.position.x + 280 - 50;
            const y1 = message.position.y + 150 + 40 + (i * 45 + 5 * i);

            const x2 = target.position.x - 5;

            const y2 = target.position.y + 50;

            const controlPointOffset = 50;
            let { cx, cy } = getControlPoint(x1, y1, x2, y2);
            cy = cy - controlPointOffset;

            const t = 0.5;
            const mt = 1 - t;
            const midpointX = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
            const midpointY = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;

            return (
              <g key={`${message.id}-${branch}`}>
                <path
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={"#ECD444"}
                  markerEnd="url(#arrowhead)"
                  onClick={() =>
                    breakConnection(message.id, targetId, "branch")
                  }
                  style={{ pointerEvents: "visiblePainted" }}
                  strokeDasharray="5,5"
                />
                <circle
                  cx={midpointX}
                  cy={midpointY}
                  r={5}
                  fill={"#ECD444"}
                  onClick={() =>
                    breakConnection(message.id, targetId, "branch")
                  }
                  style={{ pointerEvents: "auto" }}
                />
              </g>
            );
          });
        }
      })}
    </svg>
  );
};

const CanvasProblemBuilder = ({ items, getSteps, lesson, me }) => {
  const { t } = useTranslation("lesson");
  const initializeMessages = (items) => {
    return items.map((item) => {
      return {
        id: item.id,
        content: "",
        position: item.position || { x: 100, y: 100 }, // Use saved position or default
        type: item.type,
        next: {
          true: {
            value: item.next.true.value,
            type: item.next.true.type,
          },
          false: {
            value: item.next.false.value,
            type: item.next.false.type,
          },
          branches: item.next?.branches ? item.next.branches : [],
        },
      };
    });
  };
  console.log("items", items);
  const [messages, setMessages] = useState(initializeMessages(items));
  const [activeMessage, setActiveMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [{ isOver }, dropCanvas] = useDrop({
    accept: "MESSAGE",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      moveMessage(
        item.id,
        Math.round(item.position.x + delta.x),
        Math.round(item.position.y + delta.y)
      );
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  useEffect(() => {
    getSteps(messages);
  }, [messages]);

  const addMessage = (type) => {
    const id = `message-${messages.length + 1}`;
    const newMessage = {
      id,
      content: type,
      position: { x: 100, y: (messages.length + 1) * 60 },
      next: {
        true: { value: null, type: null },
        false: { value: null, type: null },
      },
      type,
    };
    setMessages([...messages, newMessage]);
  };

  const deleteMessage = (messageId) => {
    setMessages((prevMessages) => {
      const newMessages = prevMessages.filter((msg) => msg.id !== messageId);
      newMessages.forEach((msg) => {
        ["true", "false"].forEach((key) => {
          if (msg.next[key].value === messageId) {
            msg.next[key] = { value: null, type: null };
          }
        });
      });
      return newMessages;
    });
  };

  const moveMessage = (id, x, y) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, position: { x, y } } : msg
      )
    );
  };

  const connectMessages = (sourceId, destId, type, sourceAnswerId) => {
    if (sourceId === destId) return;
    setMessages((prevMessages) => {
      if (sourceAnswerId) {
        const newMessages = [...prevMessages];
        const sourceMessage = newMessages.find((msg) => msg.id === sourceId);
        const destMessage = newMessages.find((msg) => msg.id === destId);
        if (sourceMessage && destMessage) {
          if (!sourceMessage.next.branches) {
            sourceMessage.next.branches = [
              {
                source: sourceAnswerId,
                type: destMessage.type,
                value: destId,
              },
            ];
          } else {
            sourceMessage.next.branches.push({
              source: sourceAnswerId,
              type: destMessage.type,
              value: destId,
            });
          }
        }
        return newMessages;
      } else {
        const newMessages = [...prevMessages];
        const sourceMessage = newMessages.find((msg) => msg.id === sourceId);
        const destMessage = newMessages.find((msg) => msg.id === destId);
        if (
          sourceMessage &&
          destMessage &&
          (type === "true" || type === "false")
        ) {
          sourceMessage.next[type] = { value: destId, type: destMessage.type };
        }
        return newMessages;
      }
    });
  };

  const breakConnection = (sourceId, destId, connectionType) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === sourceId) {
          if (connectionType === "branch") {
            // For branch connections, we need to remove only one connection at a time
            const branchIndex = msg.next.branches.findIndex(
              (branch) => branch.value === destId
            );
            if (branchIndex !== -1) {
              const newBranches = [...msg.next.branches];
              newBranches.splice(branchIndex, 1);
              return {
                ...msg,
                next: {
                  ...msg.next,
                  branches: newBranches,
                },
              };
            }
          } else if (msg.next[connectionType]?.value === destId) {
            return {
              ...msg,
              next: {
                ...msg.next,
                [connectionType]: { value: null, type: null },
              },
            };
          }
        }
        return msg;
      })
    );
  };
  const developElement = (id) => {
    const chosenElement = messages.find((el) => el.id === id);
    const foundData = [
      ...lesson.notes,
      ...lesson.quizes,
      ...lesson.newTests,
      ...lesson.chats,
    ].find((el) => el.id === id);
    setActiveMessage({ ...chosenElement, foundData });
    setModalOpen(true);
  };

  const getData = (newId, type) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === activeMessage.id ? { ...msg, id: newId } : msg
      )
    );
  };

  return (
    <Styles>
      {activeMessage && (
        <StyledModal
          isOpen={modalOpen}
          onBackgroundClick={() => setModalOpen(false)}
          onEscapeKeydown={() => setModalOpen(false)}
        >
          <DevWindowStyles>
            <div>ID: {activeMessage.id}</div>
            <NewBlock
              type={activeMessage.type}
              getData={getData}
              lesson={lesson}
              me={me}
              data={activeMessage.foundData}
              library={lesson.notes}
            />
            <button onClick={() => setModalOpen(false)}>Close</button>
          </DevWindowStyles>
        </StyledModal>
      )}
      <h2>{t("guiding_questions")}</h2>
      <div className="toolbar">
        {["Note", "NewTest", "Quiz", "Chat"].map((type) => (
          <SimpleButton key={type} onClick={() => addMessage(type)}>
            {t(`add_${type.toLowerCase()}`)}
          </SimpleButton>
        ))}
      </div>
      <div
        className="canvasArea"
        ref={dropCanvas}
        style={{ backgroundColor: "#f9f9fb" }}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            {...message}
            number={index + 1}
            onConnect={connectMessages}
            developElement={developElement}
            onRemove={deleteMessage}
            lesson={lesson}
          />
        ))}
        <SVGConnections messages={messages} breakConnection={breakConnection} />
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
  foundElement,
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
        onConnect(item.sourceId, id, item.connectorType, item.sourceAnswerId); // pass the connectorType
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
      <InformationSection>
        <div className="type">
          {number}. {type.toLowerCase() == "newtest" ? t("NewTest") : null}
          {type.toLowerCase() == "quiz" ? t("Quiz") : null}
          {type.toLowerCase() == "note" ? t("Note") : null}
          {type.toLowerCase() == "chat" ? t("Chat") : null}
        </div>
        <div className="id_info">ID: {id}</div>

        <div className="question">
          {type.toLowerCase() == "quiz" &&
          lesson.quizes.find((el) => el.id == id)
            ? parse(
                lesson.quizes
                  .find((el) => el.id == id)
                  .question.substring(0, 100)
              )
            : null}
          {type.toLowerCase() == "newtest" &&
          lesson.newTests.find((el) => el.id == id)
            ? parse(
                lesson.newTests
                  .find((el) => el.id == id)
                  .question[0].substring(0, 100)
              )
            : null}
          {type.toLowerCase() == "note" &&
          lesson.notes.find((el) => el.id == id)
            ? parse(
                lesson.notes.find((el) => el.id == id).text.substring(0, 100)
              )
            : null}

          {type.toLowerCase() == "chat" &&
          lesson.chats.find((el) => el.id == id)
            ? parse(
                lesson.chats
                  .find((el) => el.id == id)
                  .messages.messagesList[0].text?.substring(0, 100)
              )
            : null}
        </div>
        <button onClick={handleRemove}>X</button>
      </InformationSection>
      <QuestionButtons>
        {type.toLowerCase() == "newtest" &&
          lesson.newTests.find((el) => el.id == id)?.complexTestAnswers &&
          lesson.newTests
            .find((el) => el.id == id)
            ?.complexTestAnswers.complexTestAnswers.map((el, index) => (
              <DraggableAnswer
                answerId={el.id}
                key={index}
                el={el}
                sourceId={id}
              />
            ))}
        {type.toLowerCase() == "quiz" && (
          <>
            <div className="directionButton" ref={dragConnectorTrue}>
              <div>True Answer</div>
              <div className="circle_connector"></div>
            </div>
            <div className="directionButton" ref={dragConnectorFalse}>
              <div>False Answer</div>
              <div className="circle_connector"></div>
            </div>
          </>
        )}
        {(type.toLowerCase() == "chat" || type.toLowerCase() == "note") && (
          <>
            <div className="directionButton" ref={dragConnectorTrue}>
              <div>True Answer</div>
              <div className="circle_connector"></div>
            </div>
          </>
        )}
      </QuestionButtons>
    </MessageStyles>
  );
};

const DraggableAnswer = ({ el, sourceId, answerId }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "CONNECTOR",
    item: {
      sourceId: sourceId,
      connectorType: "branch",
      sourceAnswerId: el.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="directionButton" ref={dragRef} id={sourceId + "_" + el.id}>
      <div className="quiz_text">{parse(el.answer.substring(0, 25))}</div>
      <div className="circle_connector"></div>
    </div>
  );
};

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  height: 800px;
  max-width: 880px;
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

export default CanvasProblemBuilder;
