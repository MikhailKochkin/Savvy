import styled from "styled-components";
import { useUser } from "../../User";
import CourseData from "./coursePageDesignBlocks/CourseData";
import ToolsBox from "./coursePageDesignBlocks/ToolsBox";
import LessonsData from "./coursePageDesignBlocks/LessonsData";
import LessonSearch from "./LessonSearch";

import { Container, LessonStyles } from "../styles/CoursePage_Styles";

const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const CoursePageLayout = (props) => {
  const me = useUser();

  return (
    <>
      <div id="root"></div>
      <Container>
        <LessonStyles>
          <CourseInfo>
            <CourseData id={props.id} />
            <ToolsBox me={me} id={props.id} />
          </CourseInfo>
          {/* <LessonSearch me={me} id={props.id} /> */}
          <LessonsData me={me} id={props.id} />
        </LessonStyles>
      </Container>
    </>
  );
};

export default CoursePageLayout;
