import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { htmlToText } from "html-to-text";
import dynamic from "next/dynamic";
import { useMutation, gql, useQuery } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
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
  width: ${(props) => (props.story ? "85vw" : "100%")};
  max-width: 1350px;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: row;
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

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  return (
    <div id={props.construction.id}>
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
          // getResults={getResults}
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

      <Styles id={"construction_" + construction.id}>
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
            passUpdated={passUpdated}
          />
        )}
      </Styles>
    </div>
  );
};

export default NewConstructor;
