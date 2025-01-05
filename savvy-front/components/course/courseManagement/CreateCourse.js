import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useTranslation } from "next-i18next";

import Error from "../../ErrorMessage";
import CreateLessons from "./CreateLessons";
import { CURRENT_USER_QUERY } from "../../User";
import {
  ActionButton,
  SecondaryButton,
  Buttons,
  Row,
  Frame,
  Title,
} from "../../lesson/styles/DevPageStyles";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $audience: String
    $result: String
    $courseType: String
    $published: Boolean
  ) {
    createCoursePage(
      title: $title
      description: $description
      image: $image
      audience: $audience
      result: $result
      courseType: $courseType
      published: $published
    ) {
      id
    }
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Title2 = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Comment = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    margin-right: 10px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateCourse = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("PRIVATE");
  const [result, setResult] = useState("");
  const [audience, setAudience] = useState("");
  const [pending, setPending] = useState(false);
  const [image, setImage] = useState("");
  const [courseId, setCourseId] = useState();

  const { t } = useTranslation("create");

  const myCallback = (dataFromChild, name) => {
    if (name === "audience") {
      setAudience(dataFromChild);
    } else if (name === "description") {
      setDescription(dataFromChild);
    } else if (name === "result") {
      setResult(dataFromChild);
    }
  };

  const [createCoursePage, { loading, error }] = useMutation(
    CREATE_COURSE_MUTATION,
    {
      variables: {
        title,
        description,
        image,
        courseType,
        audience,
        result,
        published: false,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <>
      <div id="root"></div>
      <Form>
        <Error error={error} />
        <Title>{t("Develop_Together")}</Title>
        <Title2>{t("Step")} 1.</Title2>
        <Row>
          <div className="description">{t("Course_Name")}</div>
          <div className="action_area">
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <div className="description">Description</div>
          <div className="action_area">
            <Frame>
              <DynamicLoadedEditor
                index={0}
                name="description"
                getEditorText={myCallback}
                value={description}
              />
            </Frame>
            <div className="explainer">{t("Description")}</div>
          </div>
        </Row>
        <Row>
          <div className="description">Expected results</div>
          <div className="action_area">
            <Frame>
              <DynamicLoadedEditor
                index={1}
                name="result"
                getEditorText={myCallback}
                value={result}
              />
            </Frame>
            <div className="explainer">{t("Goal")}</div>
          </div>
        </Row>
        <Row>
          <div className="description">Audience</div>
          <div className="action_area">
            <Frame>
              <DynamicLoadedEditor
                index={2}
                name="audience"
                getEditorText={myCallback}
                value={audience}
              />
            </Frame>
            <div className="explainer">{t("TA")}</div>
          </div>
        </Row>

        <Buttons>
          <ActionButton
            onClick={async (e) => {
              e.preventDefault();
              const res2 = await createCoursePage();
              setCourseId(res2.data.createCoursePage.id);
            }}
          >
            {loading ? t("Creating") : courseId ? t("Done") : t("Create")}
          </ActionButton>
        </Buttons>
        {courseId && (
          <>
            <Title2>{t("Step")} 2.</Title2>
            {/* <Comment>
            <p>{t("Design_Syllabus")}</p>
            <p>{t("No_Worry")}</p>
          </Comment> */}
            <CreateLessons courseId={courseId} />
            <Comment>
              <div>{t("Finished?")}</div>

              <SecondaryButton
                onClick={(e) => {
                  e.preventDefault();
                  return Router.push({
                    pathname: "/course",
                    query: { id: courseId },
                  });
                }}
              >
                {t("To_CoursePage")}
              </SecondaryButton>
            </Comment>
          </>
        )}
      </Form>
    </>
  );
};

export default CreateCourse;
