import { useState } from "react";
import styled from "styled-components";
import LessonBlock from "./LessonBlock";
import { useMutation, gql } from "@apollo/client";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: String!, $structure: LessonStructure) {
    updateLesson(id: $id, structure: $structure) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* justify-content: center; */
`;

const BuilderPart = styled.div`
  width: 80%;
`;

const Block = styled.div`
  width: 80%;
  border: 1px dashed grey;
  margin: 20px 0;
  margin-left: 20px;
`;

const Menu = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  border-left: 1px solid lightgrey;
  button {
    margin: 20px 0;
  }
`;

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  margin-left: 20px;
`;

const LessonBuilder = (props) => {
  const [elements, setElements] = useState(
    props.lesson.structure ? props.lesson.structure.lessonItems : []
  );
  const [place, setPlace] = useState("end");
  const { lesson } = props;
  // const [list, setList] = useState([]);
  const addBlock = (type) => {
    if (place == "end") {
      if (type == "longread") {
        setElements([...elements, { id: undefined, type: "Note" }]);
      } else if (type == "test") {
        setElements([...elements, { id: undefined, type: "NewTest" }]);
      } else if (type == "quiz") {
        setElements([...elements, { id: undefined, type: "Quiz" }]);
      } else if (type == "chat") {
        setElements([...elements, { id: undefined, type: "Chat" }]);
      }
    } else {
      let new_elements = [...elements];
      const index = new_elements.findIndex((object) => {
        return object.id === place;
      });

      if (type == "longread") {
        new_elements.splice(index + 1, 0, { id: undefined, type: "Note" });
        setElements([...new_elements]);
      } else if (type == "test") {
        new_elements.splice(index + 1, 0, { id: undefined, type: "NewTest" });
        setElements([...new_elements]);
      } else if (type == "quiz") {
        new_elements.splice(index + 1, 0, { id: undefined, type: "Quiz" });
        setElements([...new_elements]);
      } else if (type == "chat") {
        new_elements.splice(index + 1, 0, { id: undefined, type: "Chat" });
        setElements([...new_elements]);
      }
    }
  };
  console.log("elements", elements);

  const remove = (id) => {
    console.log("id", id);
    let new_list = elements;
    console.log("2", new_list);
    let new_list2 = new_list.filter((el) => el.id != id);
    console.log("3", new_list2);

    setElements([...new_list2]);
  };

  const addToLesson = (type, id, num) => {
    let new_list = elements;
    new_list[num].id = id;
    setElements([...new_list]);
    console.log(3, new_list);
  };

  const addPlace = (id) => {
    setPlace(id);
  };

  const [updateLesson, { data, loading }] = useMutation(UPDATE_LESSON_MUTATION);

  return (
    <Styles>
      <Container>
        <BuilderPart>
          {elements.map((el, i) => {
            console.log(el.id);
            let d;
            if (el.type == "Note") {
              d = lesson.notes.find((n) => n.id == el.id);
            } else if (el.type == "NewTest") {
              d = lesson.newTests.find((n) => n.id == el.id);
            } else if (el.type == "Quiz") {
              d = lesson.quizes.find((n) => n.id == el.id);
            } else if (el.type == "Chat") {
              d = lesson.chats.find((n) => n.id == el.id);
            } else {
              d = null;
            }
            return (
              <LessonBlock
                key={el.id}
                id={el.id}
                d={d}
                index={i}
                me={props.me}
                el={el}
                el_type={el.type}
                el_id={el.id}
                lesson={lesson}
                remove={remove}
                addToLesson={addToLesson}
                addPlace={addPlace}
              />
            );
          })}
        </BuilderPart>
        <Menu>
          <Sticky>
            <button
              onClick={(e) => {
                updateLesson({
                  variables: {
                    id: props.lesson.id,
                    structure: {
                      lessonItems: elements.filter((el) => el.id != undefined),
                    },
                  },
                });
                alert("Готово");
              }}
            >
              Сохранить урок
            </button>
            <button onClick={(e) => addBlock("longread")}>
              Добавить лонгрид
            </button>
            <button onClick={(e) => addBlock("test")}>Добавить тест</button>
            <button onClick={(e) => addBlock("quiz")}>Добавить вопрос</button>
            <button onClick={(e) => addBlock("chat")}>Добавить диалог</button>
            <button onClick={(e) => addBlock("editor")}>
              Добавить редактор
            </button>
          </Sticky>
        </Menu>
      </Container>
    </Styles>
  );
};

export default LessonBuilder;
