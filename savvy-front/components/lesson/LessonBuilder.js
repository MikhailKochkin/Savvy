import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";

import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import UpdateLesson from "./UpdateLesson";
import LessonBlock from "./LessonBlock";
import GenerateLesson from "./lesson_management/GenerateLesson";
import ChangePositions from "./lesson_management/ChangePositions";

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BuilderPart = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LessonBuilder = (props) => {
  const { lesson } = props;
  const [elements, setElements] = useState(
    props.lesson.structure && props.lesson.structure.lessonItems.length > 0
      ? props.lesson.structure.lessonItems
      : [
          {
            id: undefined,
            type: "Chat",
            num: 1,
          },
        ]
  );
  const [lessonData, setLessonData] = useState({
    name: lesson.name,
    description: lesson.description,
  });
  const [isElementPositionChangeOn, setIsElementPositionChangeOn] =
    useState(false);
  const [simulationStory, setSimulationStory] = useState("");

  const updateLessonData = ({ name, description }) => {
    setLessonData({
      name: name,
      description: description,
    });
  };

  useEffect(() => {
    smoothscroll.polyfill();
  });

  const slide = () => {
    var my_element = document.getElementById("builder_part");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  // const getTemplate = (val) => {
  //   let new_template = templates[val][router.locale];
  //   setElements((e) => [...new_template]);
  //   setPassTemplate(true);
  //   setTimeout(() => setPassTemplate(false), 2000);
  //   slide();
  // };

  const [updateLesson, { data, loading }] = useMutation(
    UPDATE_LESSON_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_LESSON_QUERY, variables: { id: lesson.id } }, // DocumentNode object parsed with gql
        "SINGLE_LESSON_QUERY", // Query name
      ],
    }
  );

  const addBlock = (id, comment) => {
    let new_elements = [...elements];
    const index = new_elements.findIndex((object) => {
      return object.id === id;
    });
    if (comment) {
      new_elements.splice(index + 1, 0, {
        id: undefined,
        type: comment.type,
        comment: comment.text,
      });
    } else {
      new_elements.splice(index + 1, 0, {
        id: undefined,
        type: undefined,
      });
    }
    setElements([...new_elements]);
  };

  const remove = (id) => {
    let new_list = elements;
    let new_list2 = new_list.filter((el) => el.id != id && el.id != undefined);
    setElements([...new_list2]);

    let a = new_list2.filter((el) => el.id != undefined);
    const b = a.map(({ num, ...keepAttrs }) => keepAttrs);
    const c = b.map(({ data, ...keepAttrs }) => keepAttrs);
    const d = c.map(({ comment, ...keepAttrs }) => keepAttrs);
    const e = d.map(({ content, ...keepAttrs }) => keepAttrs);
    const f = e.map(({ description, ...keepAttrs }) => keepAttrs);
    const g = f.map(({ format, ...keepAttrs }) => keepAttrs);
    const h = g.map(({ idea, ...keepAttrs }) => keepAttrs);
    const j = h.map(({ status, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: j,
        },
      },
    });
  };

  const addToLesson = (id, num, type, data) => {
    let new_list = [...elements];
    let temp_obj = { ...new_list[num] };
    temp_obj.id = id;
    temp_obj.type = type;
    temp_obj.data = data;
    new_list[num] = temp_obj;
    setElements([...new_list]);
    let a = new_list.filter((el) => el.id != undefined);
    const b = a.map(({ num, ...keepAttrs }) => keepAttrs);
    const c = b.map(({ data, ...keepAttrs }) => keepAttrs);
    const d = c.map(({ comment, ...keepAttrs }) => keepAttrs);
    const e = d.map(({ content, ...keepAttrs }) => keepAttrs);
    const f = e.map(({ description, ...keepAttrs }) => keepAttrs);
    const g = f.map(({ format, ...keepAttrs }) => keepAttrs);
    const h = g.map(({ idea, ...keepAttrs }) => keepAttrs);
    const j = h.map(({ status, ...keepAttrs }) => keepAttrs);
    const k = j.map(({ prompt, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: k,
        },
      },
    });
  };

  const addPlace = (id) => {
    addBlock(id);
  };

  const addGeneratedPlace = (id, data) => {
    addBlock(id, data);
  };
  const passData = (blocks) => {
    const flattenedBlocks = blocks.flat();

    let new_blocks = flattenedBlocks.map((el) => ({
      id: el.id && el.id !== "undefined" ? el.id : undefined, // Ensure id is assigned even if missing
      type: el.type == "Longread" ? "Note" : el.type, // Ensure type is assigned even if missing
      comment: el.comment || undefined, // Ensure comment is assigned even if missing
    }));

    setElements(new_blocks);
  };

  const handleItemsUpdate = (updatedItems) => {
    setElements(updatedItems);
  };

  return (
    <Styles>
      <Container>
        <UpdateLesson
          lessonId={lesson.id}
          coursePageId={lesson.coursePage.id}
          description={lesson.description}
          lesson={lesson}
          // getTemplate={getTemplate}
          onUpdateLessonData={updateLessonData}
        />
        {/* <Analyzer elements={elements} lesson={lesson} /> */}
        <GenerateLesson
          passData={passData}
          lessonId={lesson.id}
          story={lesson.story}
          structure={lesson.structure}
          lesson={lesson}
        />
        {elements ? (
          <ChangePositions
            initialItems={elements}
            onItemsUpdate={handleItemsUpdate}
            lessonId={lesson.id}
            lesson={lesson}
          />
        ) : null}
        <BuilderPart id="builder_part">
          {[...elements].map((el, i) => {
            return (
              <>
                <LessonBlock
                  key={el.id}
                  id={el.id}
                  comment={el.comment ? el.comment : null}
                  saved={el.id ? true : false}
                  index={i}
                  me={props.me}
                  el={el}
                  simulationStory={simulationStory}
                  lessonData={lessonData}
                  prompt={el.prompt ? el.prompt : "missing"}
                  // updateTemplate={passTemplate}
                  el_type={el.type}
                  el_id={el.id}
                  lesson={lesson}
                  remove={remove}
                  addToLesson={addToLesson}
                  addPlace={addPlace}
                  addGeneratedPlace={addGeneratedPlace}
                  initial_data={
                    el.status && el.status == "generated"
                      ? {
                          content: el.content,
                          format: el.format,
                          idea: el.idea,
                          description: el.description,
                        }
                      : null
                  }
                />
              </>
            );
          })}
        </BuilderPart>
      </Container>
    </Styles>
  );
};

export default LessonBuilder;
