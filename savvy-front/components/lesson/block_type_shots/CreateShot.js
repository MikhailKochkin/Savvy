import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import {
  Row,
  ActionButton,
  SecondaryButton,
  Buttons,
} from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";

const CREATE_SHOTS_MUTATION = gql`
  mutation CREATE_SHOTS_MUTATION(
    $title: String!
    $parts: [String!]
    $comments: [String!]
    $lessonId: String!
  ) {
    createShot(
      title: $title
      parts: $parts
      comments: $comments
      lessonId: $lessonId
    ) {
      id
      title
      parts
      comments
      user {
        id
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 2%;
  margin-bottom: 5%;
  input {
    align-self: flex-start;
    margin-bottom: 3%;
    border-radius: 5px;
    font-family: Montserrat;
    border: 1px solid #c4c4c4;
    width: 90%;
    height: 40px;
    padding: 1.5% 5px;
    font-size: 1.6rem;
    outline: 0;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 3%;
  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateShot = (props) => {
  const [parts, setParts] = useState(
    props.initial_data?.content ? props.initial_data.content.parts : []
  );
  const [comments, setComments] = useState(
    props.initial_data?.content ? props.initial_data.content.comments : []
  );
  const [title, setTitle] = useState(
    props.initial_data ? props.initial_data.idea : "Slides"
  );
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  const [createShot, { loading, error }] = useMutation(CREATE_SHOTS_MUTATION, {
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: props.lessonID },
      },
    ],
    awaitRefetchQueries: true,
  });

  const myCallback = (dataFromChild, name, index) => {
    let new_parts = parts;
    new_parts[index] = dataFromChild;
    setParts([...new_parts]);
  };

  const myCallback2 = (dataFromChild, name, index) => {
    let new_comments = comments;
    new_comments[index] = dataFromChild;
    setComments([...new_comments]);
  };

  const more = () => {
    setParts([...parts, ""]);
    setComments([...comments, ""]);
  };

  const remove = () => {
    if (parts.length > 1) {
      let new_parts = [...parts];
      new_parts.pop();

      let new_comments = [...comments];
      new_comments.pop();
      setParts([...new_parts]);
      setComments([...new_comments]);
    }
  };

  function splitContentArray(content) {
    const partsArray = [];
    const commentsArray = [];

    content.forEach((item) => {
      partsArray.push(item.part);
      commentsArray.push(item.comment);
    });

    return { partsArray, commentsArray };
  }

  const generateSlides = async (e) => {
    e.preventDefault();

    let chatPrompt = `
      You are building a block of a simulator that has the following story: """${props.simulationStory}"""
      This block type is Slides. Slides is a step-by-step explanantion of how to draft a document.

      Every slide has two arrays: an array with text and an array with comments.
      
      Use this info to creates a slides block: """${prompt}""".

      Generate and return in JSON format a new slides block using the information from the above.
      The result must look like this:

      Simulator story: "Jane is a law student who is heeting help from her tutor Jack"
      result: {
        "content": [
          {
            "part": "<p><ins><em>(1) An inspector may take any emergency measure referred to in subsection A</em></ins></p>",
            "comment": "<p>Сначала указываем последствие</p>"
          },
          {
            "part": "<p><em>(1) An inspector may take any emergency measure referred to in subsection A </em><ins>(2) if the inspector:</ins></p>",
            "comment": "<p>Потом выделяем общий корень всех условий этого последствия.</p>"
          },
          {
            "part": "<p><em>(1) An inspector may take any emergency measure referred to in subsection A (2) if the inspector:</em></p><p><ins><em>(a) (3) believes on reasonable grounds that ..., and</em></ins></p><p><ins><em>(b) considers the measure necessary to prevent or reduce any serious and imminent danger to life, health, property or the environment</em></ins></p>",
            "comment": "<p>Потом перечисляем все условия.</p><p>Обратите внимание, что все условия построены по одинаковой модели.</p>"
          }
        ]
      }

      The number of parts and comments should be the same. The part and comment with the same index should be related to each other.
    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chatPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let new_slides = JSON.parse(data.result.content);
        console.log("new_slides", new_slides);
        setParts(splitContentArray(new_slides.content).partsArray);
        setComments(splitContentArray(new_slides.content).commentsArray);

        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Styles>
      <TestCreate>
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
          </div>
        </Row>
        <Row>
          <div className="description">Prompt</div>
          <div className="action_area">
            <textarea
              onChange={(e) => {
                setPrompt(e.target.value);
                autoResizeTextarea(e);
              }}
              onInput={autoResizeTextarea}
            />
            <ActionButton
              onClick={async (e) => {
                setGenerating(true);
                const res = await generateSlides(e);
                setGenerating(false);
              }}
            >
              {!generating ? "Generate with AI" : "..."}
            </ActionButton>
          </div>
        </Row>

        <>
          {_.times(parts.length, (i) => (
            <Row key={i}>
              <Frame>
                <DynamicLoadedEditor
                  index={i}
                  value={parts[i]}
                  getEditorText={myCallback}
                  placeholder={`Slide ${i + 1}`}
                />
                <div className="com">
                  <DynamicLoadedEditor
                    index={i}
                    value={comments[i]}
                    placeholder={`Comment ${i + 1}`}
                    getEditorText={myCallback2}
                  />
                </div>
              </Frame>
            </Row>
          ))}
        </>
        <Buttons>
          <SecondaryButton onClick={(e) => remove()}>
            Remove Slide
          </SecondaryButton>
          <SecondaryButton onClick={(e) => more()}>New Slide</SecondaryButton>
        </Buttons>
        <Buttons>
          <ActionButton
            onClick={async (e) => {
              e.preventDefault();
              const res2 = await createShot({
                variables: {
                  lessonId: props.lessonID,
                  parts: parts,
                  comments: comments,
                  title: title,
                },
              });
              props.getResult(res2);
            }}
          >
            {loading ? "Saving..." : "Save"}
          </ActionButton>
        </Buttons>
      </TestCreate>
    </Styles>
  );
};

export default CreateShot;
