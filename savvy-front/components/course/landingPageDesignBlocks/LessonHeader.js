import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

const UPDATE_PUBLISHED_MUTATION = gql`
  mutation UPDATE_PUBLISHED_MUTATION($id: String!, $published: Boolean) {
    updatePublished(id: $id, published: $published) {
      id
    }
  }
`;

const CREATE_LESSONRESULT_MUTATION = gql`
  mutation CREATE_LESSONRESULT_MUTATION($visitsNumber: Int, $lessonID: String) {
    createLessonResult(visitsNumber: $visitsNumber, lessonID: $lessonID) {
      id
    }
  }
`;

const UPDATE_LESSONRESULT_MUTATION = gql`
  mutation UPDATE_LESSONRESULT_MUTATION(
    $id: String!
    $visitsNumber: Int
    $progress: Int
  ) {
    updateLessonResult(
      id: $id
      visitsNumber: $visitsNumber
      progress: $progress
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 300px;
  max-height: 430px;
  border-radius: 2rem;
  font-size: 1.6rem;
  margin-bottom: 35px;
  margin-right: 55px;
  padding: 2% 4%;
  position: relative;
  .open {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #fcc417;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: 280px;
  }
  .image {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    max-height: 150px;
  }
  span {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  transition: 0.3s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px -7px rgb(0 0 0 / 10%),
      0 4px 30px -9px rgb(0 0 0 / 20%);
  }
  @media (max-width: 1000px) {
    display: flex;
    width: 95%;
    margin: 20px 0;
    flex-direction: column;
    justify-content: center;
    padding: 0 3%;
    padding-bottom: 5%;
  }
`;

const A = styled.a`
  font-size: 1.6rem;
  margin-top: 20px;
  background: #f0f5f7;
  border: 1px solid #f0f5f7;
  color: #000;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Montserrat;
  outline: 0;
  transition: all 0.6s;
  &:hover {
    border: 1px solid #666666;
    background: #666666;
    color: #fff;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  /* padding-right: 25px; */
  .lesson_name {
    font-size: 1.9rem;
    font-weight: 600;
    line-height: 1.5;
  }
  .lesson_description {
    font-size: 1.4rem;
    line-height: 1.6;
    max-height: 180px;
    overflow-y: scroll;
    p {
      margin: 4px 0;
    }
  }
  div {
    padding: 2% 0% 2% 0%;
  }
  .arrow {
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  margin-top: 20px;
  background: #f0f5f7;
  border: 1px solid #f0f5f7;
  color: #000;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: all 0.6s;
  &:hover {
    border: 1px solid #666666;
    background: #666666;
    color: #fff;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Time = styled.div`
  color: #666666;
  font-size: 1.4rem;
`;

const LessonHeader = (props) => {
  const [published, setPublished] = useState(props.lesson.published);
  const [reveal, setReveal] = useState(false);

  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );

  const [updatePublished, { published_data }] = useMutation(
    UPDATE_PUBLISHED_MUTATION
  );

  const { lesson, name, author, coursePageId, students, me } = props;
  const { t } = useTranslation("coursePage");

  let color;
  let visit;

  let time;
  if (lesson.structure && lesson.structure.lessonItems) {
    if (lesson.structure.lessonItems.length * 3 < 40) {
      time = 40;
    } else {
      time = lesson.structure.lessonItems.length * 3;
    }
  } else {
    time = 40;
  }

  return (
    <>
      <TextBar color={color}>
        {/* {lesson && lesson.open && <div className="open">🔓</div>} */}
        <div>
          <Text>
            <div className="lesson_name">
              {lesson.number}. {name}
            </div>
            <div className="lesson_description">
              {lesson.description && parse(lesson.description)}
            </div>
          </Text>
        </div>
        <div>
          <Time>
            {time} {t("min")}.
          </Time>
        </div>
        {/* new button logic */}
        {/* if you do not have an account => no lesson / no link */}

        {/* first visit: if you have an account but did not buy the new course => get the free version / link 1 */}
        {me && lesson && lesson.open && (
          <Link
            legacyBehavior
            href={{
              pathname: "/lesson",
              query: {
                id: lesson.id,
                type: lesson.type.toLowerCase(),
              },
            }}
          >
            <A id="curriculum_to_demo_lesson">
              {t("start")}
              {/* <Button>{t("start")}</Button> */}
            </A>
          </Link>
        )}
      </TextBar>
    </>
  );
};

// export default withTranslation("course")(LessonHeader);
export default LessonHeader;

export { CREATE_LESSONRESULT_MUTATION };
export { UPDATE_LESSONRESULT_MUTATION };
