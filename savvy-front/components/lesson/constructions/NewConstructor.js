import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";

import UpdateNewConstructor from "./UpdateNewConstructor";
import Summary from "./Summary";
import Document from "./Document";

const CONSTRUCTION_RESULT_QUERY = gql`
  query CONSTRUCTION_RESULT_QUERY($id: String!, $studentId: String!) {
    constructionResults(
      where: {
        constructionId: { equals: $id }
        studentId: { equals: $studentId }
      }
    ) {
      id
      elements
      createdAt
      updatedAt
    }
  }
`;

const Styles = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: ${(props) => (props.story ? "95vw" : "100%")};
  max-width: 1350px;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #f8f9fa;
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    padding-right: 0%;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
`;

const Buttons = styled.div`
  width: 950px;
  margin-bottom: 20px;
`;

const NewConstructor = (props) => {
  const { construction, me, lessonID, story } = props;
  let elements = construction.elements.elements;
  const [update, setUpdate] = useState(false);
  const { t } = useTranslation("lesson");

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(CONSTRUCTION_RESULT_QUERY, {
    variables: { id: construction.id, studentId: me.id },
  });

  if (queryLoading) return "...";
  // if (error) return `Error! ${error.message}`;

  const getResult = (data) => {
    props.getResult(data);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Styles id={props.construction.id}>
      <Container id={"construction_" + construction.id}>
        {story !== true && (
          <Buttons>
            <button onClick={(e) => setUpdate(!update)}>
              {!update ? t("update") : t("back")}
            </button>
          </Buttons>
        )}
        {!update && construction.type == "SUMMARY" ? (
          <Summary
            key={props.key}
            lessonID={props.lessonID}
            construction={props.construction}
            complexity={props.complexity}
            me={props.me}
            story={props.story}
            elements={elements}
            constructionResults={queryData}
          />
        ) : null}
        {!update && construction.type != "SUMMARY" ? (
          <Document
            key={props.key}
            lessonID={props.lessonID}
            construction={props.construction}
            complexity={props.complexity}
            me={props.me}
            story={props.story}
            elements={elements}
            getResult={getResult}
          />
        ) : null}

        {update && (
          <UpdateNewConstructor
            key={construction.id}
            id={construction.id}
            lessonId={props.lessonID}
            construction={construction}
            complexity={construction.complexity}
            me={me}
            getResult={getResult}
            switchUpdate={switchUpdate}
          />
        )}
      </Container>
    </Styles>
  );
};

export default NewConstructor;
