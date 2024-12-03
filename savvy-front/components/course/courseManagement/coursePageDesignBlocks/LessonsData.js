import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Feedback from "../Feedback";
import Loading from "../../../layout/Loading";
import LessonHeader from "../../../lesson/LessonHeader";
import LessonRow from "../../../lesson/LessonRow";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      lessons {
        id
        name
        number
        tags
        type
        open
        structure
        description
        published
        coursePage {
          id
        }
        user {
          id
        }
      }
      description
      courseType
      user {
        id
        name
        surname
        image
        description
      }
      authors {
        id
        name
        surname
        image
      }
    }
  }
`;

export const LessonsInfo = styled.div`
  min-height: 50vh;
  margin-top: 30px;
  padding: 0;
  h1 {
    line-height: 1.2;
  }
  .week {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1% 0;
    margin-top: 20px;
  }
`;

const Buttons = styled.div``;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  padding: 0;
  margin-right: 20px;
  outline: 0;
  cursor: pointer;
  font-family: Montserrat;
  padding-bottom: 10px;
  border-bottom: ${(props) =>
    props.primary ? "2px solid black" : "2px solid white"};
  transition: 0.2s;
  &#forum {
    font-weight: bold;
  }
`;

const Syllabus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .week_number {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 25px;
  }
  @media (max-width: 800px) {
    .week_number {
      margin: 15px 0;
    }
  }
`;

export const Total = styled.div`
  font-size: 1.6rem;
  margin: 30px 0;

  @media (max-width: 800px) {
    font-size: 1.8rem;
    margin-bottom: 6%;
    line-height: 1.4;
  }
`;

const Comment = styled.div`
  font-size: 1.6rem;
  background: #0268e6;
  color: white;
  padding: 2% 3%;
  margin-top: 3%;
  text-align: center;
`;

const Lessons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 800px) {
    /* height: 200px; */
  }
`;

const LessonsTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  border-radius: 20px;
  padding: 10px;
  background: #fff;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    overflow-x: auto;
    max-width: 100%;
    /* height: 200px; */
  }
`;

const Box = styled.div`
  border-bottom: 2px solid #e8eff6;
  display: flex;
  flex-direction: row;
  flex: 1; /* This makes the Box component stretch in height */
  background: #e8eff6;
  color: #76706c;
  div {
    padding: 5px 10px;
    font-size: 1.4rem;
    background: #fff;
  }
  .div1 {
    width: 5%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
    margin-right: 2px;
    border: none;
  }
  .div2 {
    width: 22%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div3 {
    width: 36%;
    p {
      margin: 0;
      margin-bottom: 5px;
      line-height: 1.5;
    }
  }
  .div4 {
    width: 12%;
  }
  .div5 {
    width: 18%;
  }
  .div6 {
    width: 7%;
  }
  @media (max-width: 850px) {
    .div1 {
      min-width: 50px;
    }
    .div2 {
      min-width: 250px;
    }
    .div3 {
      min-width: 400px;
    }
    .div4 {
      min-width: 100px;
    }
    .div5 {
      min-width: 200px;
    }
    .div6 {
      min-width: 80px;
    }
  }
`;

const LessonsData = (props) => {
  // 1. get props and state
  const { me, id } = props;
  const { t } = useTranslation("course");
  const [page, setPage] = useState("lessons");
  const [format, setFormat] = useState("table");

  // 2. get course data
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <Loading />;
  if (!data || !data.coursePage) return <p></p>;

  const coursePage = data.coursePage;

  // 6. determiine which lessons are open

  let openLesson;
  let openLessons = coursePage.lessons.filter((l) => l.open);
  if (openLessons.length > 0) {
    openLesson = openLessons[0];
  } else {
    openLesson = null;
  }

  // 7. authorization checks

  let isEnrolled;
  if (me && me.new_subjects) {
    isEnrolled = me.new_subjects.some((c) => c.id == coursePage.id);
  } else {
    isEnrolled = false;
  }

  let i_am_author = false;
  if (
    me &&
    (coursePage.authors.filter((auth) => auth.id == me.id).length > 0 ||
      coursePage.user.id == me.id)
  ) {
    i_am_author = true;
  }

  let initial_lessons = [...coursePage.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .filter((l) => l.published);

  let broken_lessons = initial_lessons;
  let unpublished_lessons = [...coursePage.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .filter((l) => !l.published);

  return (
    <LessonsInfo>
      {page === "lessons" && (
        <>
          <Total>
            <Buttons>
              {me && (
                <Button
                  primary={format === "gallery"}
                  onClick={(e) => setFormat("gallery")}
                >
                  {t("gallery")}
                </Button>
              )}
              <Button
                primary={format === "table"}
                onClick={(e) => setFormat("table")}
              >
                {t("table")}
              </Button>
            </Buttons>
          </Total>
          {me && format == "gallery" && (
            <>
              <Syllabus>
                <Lessons>
                  {broken_lessons.map((lesson, index) => (
                    <>
                      <LessonHeader
                        me={me}
                        key={lesson.id}
                        name={lesson.name}
                        lesson={lesson}
                        i_am_author={i_am_author}
                        coursePage={props.id}
                        author={coursePage.user.id}
                        open={index + 1 === 1}
                        index={index + 1}
                        coursePageId={coursePage.id}
                      />
                    </>
                  ))}
                </Lessons>
              </Syllabus>
              {me &&
                (i_am_author ||
                  (me.permissions && me.permissions.includes("ADMIN"))) && (
                  <Syllabus>
                    <div className="week_number">Unpublished lessons</div>
                    <Lessons>
                      {unpublished_lessons.map((lesson, index) => (
                        <>
                          <LessonHeader
                            me={me}
                            key={lesson.id}
                            name={lesson.name}
                            lesson={lesson}
                            i_am_author={i_am_author}
                            coursePage={props.id}
                            author={coursePage.user.id}
                            open={index + 1 === 1}
                            index={index + 1}
                            coursePageId={coursePage.id}
                          />
                        </>
                      ))}
                    </Lessons>
                  </Syllabus>
                )}
            </>
          )}
          {format == "table" && (
            <>
              <Syllabus>
                <LessonsTable>
                  <Box>
                    <div className="div1">№</div>
                    <div className="div2">{t("name")}</div>
                    <div className="div3">{t("description")}</div>
                    <div className="div4"></div>
                    <div className="div5">{t("tags")}</div>
                    <div className="div6">{t("%")}</div>
                  </Box>
                  {broken_lessons.map((lesson, index) => (
                    <>
                      <LessonRow
                        me={me}
                        key={lesson.id}
                        name={lesson.name}
                        lesson={lesson}
                        i_am_author={i_am_author}
                        coursePage={props.id}
                        author={coursePage.user.id}
                        open={index + 1 === 1}
                        index={index + 1}
                        coursePageId={coursePage.id}
                      />
                    </>
                  ))}
                </LessonsTable>
              </Syllabus>
              {me &&
                (i_am_author ||
                  (me.permissions && me.permissions.includes("ADMIN"))) && (
                  <Syllabus>
                    {unpublished_lessons?.length > 0 && (
                      <>
                        <div className="week_number">Unpublished lessons</div>
                        <Lessons>
                          <LessonsTable>
                            {unpublished_lessons.map((lesson, index) => (
                              <>
                                <LessonRow
                                  me={me}
                                  key={lesson.id}
                                  name={lesson.name}
                                  lesson={lesson}
                                  i_am_author={i_am_author}
                                  coursePage={props.id}
                                  author={coursePage.user.id}
                                  open={index + 1 === 1}
                                  index={index + 1}
                                  coursePageId={coursePage.id}
                                />
                              </>
                            ))}
                          </LessonsTable>
                        </Lessons>
                      </>
                    )}
                  </Syllabus>
                )}
            </>
          )}
          {/* } */}
        </>
      )}

      {me && isEnrolled ? (
        <>
          {me.studentFeedback.filter(
            (f) => f.lesson.coursePage.id == coursePage.id
          ).length === 0 ? (
            <p>{t("no_feedback_yet")}</p>
          ) : null}
          {me.studentFeedback
            .filter((f) => f.lesson.coursePage.id == coursePage.id)
            .map((feedback) => (
              <Feedback feedback={feedback} />
            ))}
        </>
      ) : null}
    </LessonsInfo>
  );
};

export default LessonsData;
