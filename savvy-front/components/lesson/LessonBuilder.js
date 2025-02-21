import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";

import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import UpdateLesson from "./UpdateLesson";
import LessonBlock from "./LessonBlock";
import GenerateLesson from "./lesson_management/NewGenerateLesson";
import ChangePositions from "./lesson_management/ChangePositions";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $structure: LessonStructureInput
  ) {
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
    const e = c.map(({ content, ...keepAttrs }) => keepAttrs);
    const f = e.map(({ description, ...keepAttrs }) => keepAttrs);
    const g = f.map(({ format, ...keepAttrs }) => keepAttrs);
    const h = g.map(({ idea, ...keepAttrs }) => keepAttrs);
    const j = h.map(({ status, ...keepAttrs }) => keepAttrs);
    const k = j.map(({ __typename, ...keepAttrs }) => keepAttrs);
    const l = k.map(({ prompt, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: l,
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
    const e = c.map(({ content, ...keepAttrs }) => keepAttrs);
    const f = e.map(({ description, ...keepAttrs }) => keepAttrs);
    const g = f.map(({ format, ...keepAttrs }) => keepAttrs);
    const h = g.map(({ idea, ...keepAttrs }) => keepAttrs);
    const j = h.map(({ status, ...keepAttrs }) => keepAttrs);
    const k = j.map(({ prompt, ...keepAttrs }) => keepAttrs);
    const l = k.map(({ __typename, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: l,
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
  const passData = (blocks, story) => {
    setSimulationStory(story);
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

  let combinedCharacters = lesson.coursePage.characters;

  console.log("combinedCharacters", combinedCharacters);

  // INFO FOR NEW BLOCKS AI GENERATION
  // 1. Create character string
  const cleanedCharacters = combinedCharacters.map(
    ({ __typename, ...rest }) => rest
  );
  const jsonCharactersString = JSON.stringify(cleanedCharacters);

  // 2. Create lesson info string
  const populateLessonStructure = (items) => {
    const updatedItems = items.map((item) => {
      let content;
      if (item.type === "Chat") {
        content = lesson.chats
          .find((chat) => chat.id === item.id)
          ?.messages.messagesList.map((message) => message.text)
          .join(" ");
      } else if (item.type === "Note") {
        content = lesson.notes.find((note) => note.id === item.id)?.text;
      } else if (item.type === "Problem") {
        content = lesson.problems.find(
          (problem) => problem.id === item.id
        )?.text;
      } else if (item.type === "TextEditor") {
        content = lesson.texteditors.find(
          (textEditor) => textEditor.id === item.id
        )?.text;
      } else if (item.type === "Shot") {
        content = "";
      } else if (item.type === "Construction") {
        content = "";
      } else if (item.type === "Forum") {
        content = lesson.forum.text;
      } else if (item.type === "Quiz") {
        content = lesson.quizes.find((quiz) => quiz.id === item.id).question;
      } else if (item.type === "NewTest") {
        content = lesson.newTests.find((newTest) => newTest.id === item.id)
          ?.question[0];
      }
      return {
        type: item.type,
        content: content,
      };
    });
    return updatedItems;
  };

  let currentStory = lesson.structure
    ? populateLessonStructure(lesson.structure?.lessonItems)
    : [];
  const jsonStoryString = JSON.stringify(currentStory);

  let previousStories = [];
  if (lesson.coursePage.lessons) {
    lesson.coursePage.lessons.map((other_lesson) => {
      if (other_lesson.number < lesson.number) {
        previousStories.push(other_lesson.story);
      }
    });
  }

  return (
    <Styles>
      <Container>
        {props.may_i_edit && (
          <UpdateLesson
            lessonId={lesson.id}
            coursePageId={lesson.coursePage.id}
            description={lesson.description}
            lesson={lesson}
            ownerEmail={lesson.user?.email}
            i_built_this_lesson={props.me?.id === lesson?.user?.id}
            onUpdateLessonData={updateLessonData}
          />
        )}
        {/* <Analyzer elements={elements} lesson={lesson} /> */}
        {props.may_i_edit && (
          <GenerateLesson
            passData={passData}
            lessonId={lesson.id}
            coursePageId={lesson.coursePage.id}
            story={lesson.story}
            structure={lesson.structure}
            elements={elements}
            lesson={lesson}
            characters={lesson.characters}
          />
        )}
        {/* {elements ? (
          <ChangePositions
            initialItems={elements}
            onItemsUpdate={handleItemsUpdate}
            lessonId={lesson.id}
            lesson={lesson}
          />
        ) : null} */}
        <BuilderPart id="builder_part">
          {[...elements].map((el, i) => {
            return (
              <LessonBlock
                key={el.id}
                id={el.id}
                comment={el.comment ? el.comment : null}
                saved={el.id && !el.id.includes("temp") ? true : false}
                index={i}
                i_am_author={props.i_am_author}
                may_i_edit={props.may_i_edit}
                me={props.me}
                el={el}
                simulationStory={simulationStory}
                lessonData={lessonData}
                prompt={el.prompt ? el.prompt : "missing"}
                characters={combinedCharacters}
                jsonCharactersString={jsonCharactersString}
                jsonStoryString={jsonStoryString}
                el_type={el.type}
                el_id={el.id}
                lesson={lesson}
                previousStories={previousStories}
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
            );
          })}
        </BuilderPart>
      </Container>
    </Styles>
  );
};

export default LessonBuilder;
