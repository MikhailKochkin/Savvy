import styled from "styled-components";
import { gql } from "@apollo/client";
import { useUser } from "../User";
import CourseData from "./courseBlocks/CourseData";
import ToolsBox from "./courseBlocks/ToolsBox";
import LessonsData from "./courseBlocks/LessonsData";
import TopLine from "./Topline";
import LessonSearch from "./LessonSearch";

import {
  Container,
  LessonStyles,
  LessonsInfo,
  Total,
  Buttons,
  Button,
  Syllabus,
  Video,
  Comment,
  Lessons,
} from "./styles/CoursePage_Styles";

const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const CoursePage = (props) => {
  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container>
          <LessonStyles>
            <CourseInfo>
              <CourseData id={props.id} />
              <ToolsBox me={me} id={props.id} />
            </CourseInfo>
            <LessonSearch me={me} id={props.id} />
            <LessonsData me={me} id={props.id} />
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

export default CoursePage;
// export { SINGLE_COURSEPAGE_QUERY };
