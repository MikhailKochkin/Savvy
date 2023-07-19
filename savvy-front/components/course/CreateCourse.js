import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import _ from "lodash";
import { useTranslation } from "next-i18next";

import Error from "../ErrorMessage";
import CreateLessons from "./CreateLessons";
import { CURRENT_USER_QUERY } from "../User";

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $audience: String
    $result: String
    # $tariffs: String
    # $methods: String
    $courseType: String
    $published: Boolean # $uniID: ID
  ) {
    createCoursePage(
      title: $title
      description: $description
      image: $image
      audience: $audience
      result: $result
      # tariffs: $tariffs
      # methods: $methods
      courseType: $courseType
      published: $published # uniID: $uniID
    ) {
      id
    }
  }
`;

const Form = styled.form`
  width: 50%;
  padding: 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin: 2% 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  select {
    width: 30%;
    font-size: 1.6rem;
  }
  input {
    height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-weight: 400;
    font-family: Montserrat;
  }
  input::placeholder {
    color: #b1b1b1;
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
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2%;
  padding: 3%;
  border-top: solid 1px #f0f0f0;
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
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Title2 = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Img = styled.img`
  width: 300px;
  object-fit: cover;
  margin-top: 3%;
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

const Comment = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
  margin-top: 20px;
  .comment {
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    let st = name;
    if (st === "audience") {
      setAudience(dataFromChild);
    } else if (st === "description") {
      setDescription(dataFromChild);
    } else if (st === "result") {
      setResult(dataFromChild);
    }
  };

  const { me } = props;
  return (
    <>
      <div id="root"></div>
      <>
        <Mutation
          mutation={CREATE_COURSE_MUTATION}
          variables={{
            title,
            description,
            image,
            courseType,
            audience,
            result,
            published: false,
          }}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(createCoursePage, { loading, error }) => (
            <Form>
              <Error error={error} />
              <Title>{t("Develop_Together")}</Title>
              <Title2>{t("Step")} 1.</Title2>
              <Fieldset>
                <input
                  className="input"
                  type="text"
                  id="title"
                  name="title"
                  placeholder={t("Course_Name")}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Frame>
                  <DynamicLoadedEditor
                    index={0}
                    name="description"
                    getEditorText={myCallback}
                    value={description}
                    placeholder={t("Description")}
                  />
                </Frame>
                <Frame>
                  <DynamicLoadedEditor
                    index={1}
                    name="result"
                    getEditorText={myCallback}
                    value={result}
                    placeholder={t("Goal")}
                  />
                </Frame>
                <Frame>
                  <DynamicLoadedEditor
                    index={2}
                    name="audience"
                    getEditorText={myCallback}
                    value={audience}
                    placeholder={t("TA")}
                  />
                </Frame>
                <Buttons>
                  <ButtonTwo
                    onClick={async (e) => {
                      e.preventDefault();
                      const res2 = await createCoursePage();
                      setCourseId(res2.data.createCoursePage.id);
                    }}
                  >
                    {loading
                      ? t("Creating")
                      : courseId
                      ? t("Done")
                      : t("Create")}
                  </ButtonTwo>
                </Buttons>
              </Fieldset>
              {courseId && (
                <>
                  <Title2>{t("Step")} 2.</Title2>
                  <Comment>
                    <p>{t("Design_Syllabus")}</p>
                    <p>{t("No_Worry")}</p>
                  </Comment>
                  <CreateLessons courseId={courseId} />
                  <Row>
                    <div className="comment">{t("Finished?")}</div>
                    <ButtonOne
                      onClick={(e) => {
                        e.preventDefault();
                        return Router.push({
                          pathname: "/course",
                          query: { id: courseId },
                        });
                      }}
                    >
                      {t("To_CoursePage")}
                    </ButtonOne>
                  </Row>
                </>
              )}
            </Form>
          )}
        </Mutation>
      </>
    </>
  );
};

export default CreateCourse;
