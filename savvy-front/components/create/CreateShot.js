import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import dynamic from "next/dynamic";

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

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
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

const More = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #112a62;
  cursor: pointer;
  &:active {
    border: 2px solid #112a62;
  }
`;

const Remove = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #de6b48;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #de6b48;
  cursor: pointer;
  &:active {
    border: 2px solid #de6b48;
  }
`;

const Save = styled.div`
  padding: 1.5% 3%;
  align-self: flex-start;
  margin-top: 2.5%;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 2%;
  width: 80%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
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
    props.initial_data ? props.initial_data.idea : "Deck"
  );

  // useEffect(() => {
  //   console.log("props.initial_data in CreateShot", props.initial_data);
  //   if (props.initial_data?.content) {
  //     console.log(
  //       "props.initial_data.content.parts",
  //       props.initial_data.content.parts
  //     );
  //     setParts(props.initial_data.content.parts);
  //     setComments(props.initial_data.content.comments);
  //   }
  // }, [props.initial_data]);

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

  return (
    <Styles>
      {/* <Advice>
        Составьте слайды. Слайд состоит из двух частей: текста и комментария.
        Заполните информацию по каждому пункту для каждого слайда.
      </Advice> */}
      <Mutation
        mutation={CREATE_SHOTS_MUTATION}
        variables={{
          lessonId: props.lessonID,
          parts: parts,
          comments: comments,
          title: title,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: props.lessonID },
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(createShot, { loading, error }) => (
          <TestCreate>
            <input
              id="title"
              name="title"
              spellCheck={true}
              placeholder="Название документа"
              autoFocus
              required
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <>
              {_.times(parts.length, (i) => (
                <Row>
                  <Frame>
                    <DynamicLoadedEditor
                      index={i}
                      // name={part}
                      value={parts[i]}
                      getEditorText={myCallback}
                      placeholder={`Текст ${i + 1}`}
                    />
                    <div className="com">
                      <DynamicLoadedEditor
                        index={i}
                        // name={comment}
                        value={comments[i]}
                        placeholder={`Комментарий к тексту ${i + 1}`}
                        getEditorText={myCallback2}
                      />
                    </div>
                  </Frame>
                </Row>
              ))}
            </>
            <More onClick={(e) => more()}>Новый слайд</More>
            <Remove onClick={(e) => remove()}>Убрать слайд</Remove>
            <Save
              onClick={async (e) => {
                e.preventDefault();
                const res2 = await createShot();
                props.getResult(res2);
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Save>
          </TestCreate>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateShot;
