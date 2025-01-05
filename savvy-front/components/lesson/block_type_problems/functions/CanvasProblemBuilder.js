import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import parse from "html-react-parser";
import Modal from "styled-react-modal";
import NewBlock from "../blocks/NewBlock";
import { MicroButton, SecondaryButton } from "../../styles/DevPageStyles";

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
    overflow-y: auto;
    height: 900px;
    background: #f9f9fb;
    border: 2px solid #f5f6f6;
    margin: 15px 0;
    overflow: auto;
    zoom: ${(props) => `${props.zoom}%`};
  }

  .toolbar {
    width: 660px;
    display: flex;
    justify-content: space-between; /* Distribute items evenly along the main axis */
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0px;
  .right {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .left {
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MessageStyles = styled.div`
  padding: 10px;
  width: 280px;
  background: #fff;
  border: 2px solid #eff1f4;
  border-radius: 10px;
  transform-origin: 0 0;
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  opacity: ${(props) => (props.isDragging ? 0 : 0.7)};
  color: #000;

  z-index: 10;
  cursor: pointer;
  .type {
    background: #fff;
    opacity: 1;
    color: #000;
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
  const getControlPoints = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Control points offset for smooth S-curve
    const c1x = x1 + length * 0.9; // First control point (right of start point)
    const c1y = y1 - length * 0; // Slightly above start point
    const c2x = x2 - length * 0.7; // Second control point (left of end point)
    const c2y = y2 - length * 0; // Slightly above end point

    return { c1x, c1y, c2x, c2y };
  };

  const getMidpoint = (x1, y1, c1x, c1y, c2x, c2y, x2, y2, t = 0.5) => {
    // Cubic Bézier interpolation formula
    const mt = 1 - t;
    const midpointX =
      mt * mt * mt * x1 +
      3 * mt * mt * t * c1x +
      3 * mt * t * t * c2x +
      t * t * t * x2;
    const midpointY =
      mt * mt * mt * y1 +
      3 * mt * mt * t * c1y +
      3 * mt * t * t * c2y +
      t * t * t * y2;

    return { midpointX, midpointY };
  };

  const squareSize = 20;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "400vw",
        height: "100vh",
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
            const targetId = message.next[key]?.value;
            const target = messages.find((m) => m.id === targetId);
            if (!target) return null;

            let zoom = 1;

            let zoom_coef = parseFloat(((1 - zoom) * 10).toFixed(2));

            let x1;
            let y1;
            if (zoom > 0.4 && zoom < 0.7) {
              x1 = message.position.x + 280 - 50 - zoom_coef * 24;
              y1 =
                key === "true"
                  ? message.position.y + 150 + 40 - zoom_coef * 20
                  : message.position.y + 150 + 80 - zoom_coef * 23.5;
            } else if (zoom >= 0.7 && zoom < 0.9) {
              x1 = message.position.x + 280 - 50 - zoom_coef * 24;
              y1 =
                key === "true"
                  ? message.position.y + 150 + 40 - zoom_coef * 20
                  : message.position.y + 150 + 80 - zoom_coef * 22.5;
            } else {
              x1 = message.position.x + 280 - 50 - zoom_coef * 24;
              y1 =
                key === "true"
                  ? message.position.y + 150 + 40 - zoom_coef * 20
                  : message.position.y + 150 + 80 - zoom_coef * 20;
            }

            // Define start and end points

            // console.log("x1", x1, y1, zoom);

            const x2 = target.position.x - 5;
            const y2 = target.position.y + 50 - zoom_coef * 5;

            // Calculate control points for cubic Bézier curve
            const { c1x, c1y, c2x, c2y } = getControlPoints(x1, y1, x2, y2);

            // Calculate midpoint for the interactive circle
            const { midpointX, midpointY } = getMidpoint(
              x1,
              y1,
              c1x,
              c1y,
              c2x,
              c2y,
              x2,
              y2
            );

            return (
              <g key={`${message.id}-${key}`}>
                <path
                  d={`M ${x1} ${y1} C ${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`}
                  fill="none"
                  stroke={key === "true" ? "#2a9d8f" : "#f4a261"}
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
          // Handle branches logic here (similar to above)
        }
      })}
    </svg>
  );
};

const initializeMessages = (items) => {
  return items.map((item) => {
    return {
      id: item.id,
      content: "",
      position: item.position || { x: 100, y: 100 }, // Use saved position or default
      type: item.type,
      question: item.question,
      answers: item.answers,
      whichAnswersAreCorrect: item.whichAnswersAreCorrect,
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

const CanvasProblemBuilder = ({
  items,
  getSteps,
  lesson,
  me,
  generatedSteps,
}) => {
  const { t } = useTranslation("lesson");
  const [messages, setMessages] = useState(
    items ? initializeMessages(items) : []
  );
  const [zoom, setZoom] = useState(1);
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
        const newMessages = prevMessages.map((msg) => {
          if (msg.id === sourceId) {
            const destMessage = prevMessages.find((m) => m.id === destId);
            if (destMessage) {
              const newBranch = {
                source: sourceAnswerId,
                type: destMessage.type,
                value: destId,
              };
              return {
                ...msg,
                next: {
                  ...msg.next,
                  branches: msg.next.branches
                    ? [...msg.next.branches, newBranch]
                    : [newBranch],
                },
              };
            }
          }
          return msg;
        });
        return newMessages;
      } else {
        return prevMessages.map((msg) => {
          if (msg.id === sourceId && (type === "true" || type === "false")) {
            const destMessage = prevMessages.find((m) => m.id === destId);
            if (destMessage) {
              return {
                ...msg,
                next: {
                  ...msg.next,
                  [type]: { value: destId, type: destMessage.type },
                },
              };
            }
          }
          return msg;
        });
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
  const developElement = (id, question, answers, whichAnswersAreCorrect) => {
    const chosenElement = messages.find((el) => el.id === id);
    const foundData = [
      ...lesson.notes,
      ...lesson.quizes,
      ...lesson.newTests,
      ...lesson.chats,
    ].find((el) => el.id === id);
    setActiveMessage({
      ...chosenElement,
      foundData,
      question,
      answers,
      whichAnswersAreCorrect,
    });
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
    <Styles zoom={100 * zoom}>
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
              generatedInfo={{
                question: activeMessage.question,
                answers: activeMessage.answers,
                whichAnswersAreCorrect: activeMessage.whichAnswersAreCorrect,
              }}
              library={lesson.notes}
            />
            <button onClick={() => setModalOpen(false)}>Close</button>
          </DevWindowStyles>
        </StyledModal>
      )}
      {/* <h2>{t("guiding_questions")}</h2> */}
      <Toolbar>
        <div className="left">
          {["Note", "NewTest", "Quiz", "Chat"].map((type) => (
            <SecondaryButton key={type} onClick={() => addMessage(type)}>
              {t(`add_${type.toLowerCase()}`)}
            </SecondaryButton>
          ))}
        </div>
        <div className="right">
          <SecondaryButton
            onClick={() => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1))}
          >
            Zoom In
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5))}
          >
            Zoom Out
          </SecondaryButton>
          {/* <div>{zoom}</div> */}
        </div>
      </Toolbar>
      <div className="canvasArea" ref={dropCanvas}>
        {messages.map((message, index) => (
          <Message
            key={index}
            {...message}
            number={index + 1}
            onConnect={connectMessages}
            developElement={developElement}
            onRemove={deleteMessage}
            lesson={lesson}
            question={message.question}
            answers={message.answers}
            whichAnswersAreCorrect={message.whichAnswersAreCorrect}
            zoom={zoom}
          />
        ))}
        <SVGConnections
          messages={messages}
          breakConnection={breakConnection}
          zoom={zoom}
        />
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
  question,
  answers,
  whichAnswersAreCorrect,
  zoom,
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
    developElement(id, question, answers, whichAnswersAreCorrect);
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
      // zoom={zoom}
      isDragging={isDragging}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
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
          lesson.newTests.find((el) => el.id == id)?.type == "branch" &&
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
        {type.toLowerCase() == "newtest" &&
          lesson.newTests.find((el) => el.id == id)?.type !== "branch" && (
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
  width: 640px;
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
