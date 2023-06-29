import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import CourseInfo from "./CourseInfo";

const PUBLISHED_QUERY = gql`
  query PUBLISHED_QUERY {
    coursePages(where: { published: { equals: true } }) {
      id
      title
      #   lessons {
      #     id
      #     open
      #     name
      #     lessonResults {
      #       id
      #       progress
      #       visitsNumber
      #       createdAt
      #       updatedAt
      #       student {
      #         id
      #         name
      #         surname
      #         new_subjects {
      #           id
      #           title
      #         }
      #       }
      #       lesson {
      #         id
      #         number
      #         structure
      #         coursePage {
      #           id
      #         }
      #       }
      #     }
      #   }
    }
  }
`;

const Open = (props) => {
  const [courseId, setCourseId] = useState("");
  const { loading, error, data } = useQuery(PUBLISHED_QUERY);
  if (loading) return <p>Loading...</p>;
  let courses = data.coursePages;
  return (
    <div>
      {courses && (
        <select
          //   defaultValue={me.status}
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((c) => (
            <option value={c.id}>{c.title}</option>
          ))}
        </select>
      )}
      {courseId}
      <CourseInfo courseId={courseId} />
    </div>
  );
};

export default Open;
