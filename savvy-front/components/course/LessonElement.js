import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $name: String!
    $number: Int
    $text: String!
    $description: String!
    $coursePageID: String!
  ) {
    createLesson(
      name: $name
      number: $number
      text: $text
      description: $description
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin: 20px 0;
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  select {
    width: 30%;
    font-size: 1.6rem;
  }
  .comment {
    margin-bottom: 15px;
    line-height: 1.4;
    font-size: 1.4rem;
    color: #757575;
  }
  .input {
    height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  textarea {
    min-height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  .upload {
    border: 1px dashed #e5e5e5;
    padding: 1% 2%;
    border-radius: 3.5px;
    cursor: pointer;
    &:hover {
      border: 1px dashed #112a62;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-dirrection: row;
`;

const Frame = styled.div`
  height: 60%;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin-left: 0.6%;
  }
`;

const ButtonOne = styled.button`
  border: none;
  background: none;
  padding: 10px 20px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  max-width: 180px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const LessonElement = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const myCallback = (dataFromChild) => {
    return setDescription(dataFromChild);
  };

  const { t } = useTranslation("create");

  const [createLesson, { data, loading, error }] = useMutation(
    CREATE_LESSON_MUTATION
  );

  const { number, lesson, courseId } = props;

  return (
    <Styles>
      <div>
        {t("Lesson")} {number + 1}. {saved && "✅"}
      </div>
      <Fieldset>
        <div className="comment">{lesson.comment}</div>
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          placeholder={t("Lesson_Name")}
          onChange={(e) => setName(e.target.value)}
        />
        <Frame>
          <DynamicLoadedEditor
            index={0}
            name="description"
            getEditorText={myCallback}
            value={description}
            placeholder={t("Lesson_Description")}
          />
        </Frame>
        <Buttons>
          <ButtonTwo
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              const res = await createLesson({
                variables: {
                  coursePageID: courseId,
                  name: name,
                  description: description,
                  number: parseInt(number + 1),
                  text: "",
                },
              });
              setSaved(true);
            }}
          >
            {loading ? t("Saving") : saved ? t("Done") : t("Save")}
          </ButtonTwo>
          <ButtonOne
            onClick={(e) => {
              e.preventDefault();
              props.addLesson(lesson.id, number);
            }}
          >
            {t("Add_Lesson")}
          </ButtonOne>
          <ButtonOne
            onClick={(e) => {
              e.preventDefault();
              props.removeLesson(lesson.id, number);
            }}
          >
            {t("Remove_Lesson")}
          </ButtonOne>
        </Buttons>
      </Fieldset>
    </Styles>
  );
};

export default LessonElement;
