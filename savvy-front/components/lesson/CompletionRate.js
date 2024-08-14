import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useLazyQuery, gql } from "@apollo/client";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $userId: String!) {
    lessonResults(
      where: {
        lesson: { id: { equals: $lessonId } }
        student: { id: { equals: $userId } }
      }
    ) {
      id
      progress
      lesson {
        id
        structure
      }
    }
  }
`;

const CompletionRate = (props) => {
  const { lesson } = props;
  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: { lessonId: props.lesson.id, userId: props.me.id },
  });
  const getLessonWithHighestProgress = (lessonResults) => {
    return lessonResults.reduce((highest, current) => {
      return current.progress > highest.progress ? current : highest;
    });
  };

  let maxResult = null;
  let completionRate = 0;
  let color;
  if (data?.lessonResults.length > 0 && lesson?.structure?.lessonItems) {
    maxResult = getLessonWithHighestProgress(data.lessonResults);
    completionRate = (
      (maxResult.progress / lesson.structure.lessonItems.length) *
      100
    ).toFixed(0);
  }

  return <div>{completionRate}%</div>;
};

export default CompletionRate;
