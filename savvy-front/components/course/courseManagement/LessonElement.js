import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import {
  ActionButton,
  Row,
  Frame,
  MicroButton,
} from "../../lesson/styles/DevPageStyles";

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
  margin: 40px 0;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
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
      {/* <div>
        {t("Lesson")} {number + 1}. {saved && "✅"}
      </div> */}
      {/* <div className="comment">{lesson.comment}</div> */}

      <Row>
        <div className="description">
          {t(`Lesson_Name`)} {number + 1} {saved && "✅"}
        </div>
        <div className="action_area">
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">{t("Description")}</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              index={0}
              name="description"
              getEditorText={myCallback}
              value={description}
            />
          </Frame>
        </div>
      </Row>
      <ButtonsRow>
        <ActionButton
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
        </ActionButton>
        <MicroButton
          onClick={(e) => {
            e.preventDefault();
            props.addLesson(lesson.id, number);
          }}
        >
          {t("Add_Lesson")}
        </MicroButton>
        <MicroButton
          onClick={(e) => {
            e.preventDefault();
            props.removeLesson(lesson.id, number);
          }}
        >
          {t("Remove_Lesson")}
        </MicroButton>
      </ButtonsRow>
    </Styles>
  );
};

export default LessonElement;
