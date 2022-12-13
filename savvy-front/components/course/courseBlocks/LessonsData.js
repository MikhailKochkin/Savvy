import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

import Loading from "../../Loading";
import LessonHeader from "../../lesson/LessonHeader";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      image
      news
      price
      discountPrice
      video
      audience
      result
      tags
      weeks
      tariffs
      methods
      reviews
      subscriptionPrice
      subscription
      promocode
      published
      user {
        id
      }
      lessons {
        id
        name
        number
        type
        open
        description
        structure
        forum {
          id
          statements {
            id
            comments
          }
          rating {
            id
            rating
          }
        }
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
      students
      new_students {
        id
      }
      user {
        id
        name
        surname
        image
        description
        work
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      authors {
        id
        name
        surname
        image
        description
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
    }
  }
`;

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($coursePageId: String!, $userId: String!) {
    lessonResults(
      where: {
        lesson: { coursePageId: { equals: $coursePageId } }
        student: { id: { equals: $userId } }
      }
    ) {
      id
      visitsNumber
      progress
      lesson {
        id
        name
        structure
        type
        number
      }
      student {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const LessonsInfo = styled.div`
  margin-top: 30px;

  padding: 0 3%;
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
    props.primary ? "1px solid black" : "1px solid white"};
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

const Header = styled.span`
  font-size: 2.4rem;
  margin: 1% 0;
  padding: 1%;
  padding-right: 1.5%;
  font-style: italic;
  -webkit-box-decoration-break: clone;
  -o-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 1.4;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background: #ffdad7; */
  /* transform: skew(-5deg);
  -webkit-transform: skew(-5deg);
  -moz-transform: skew(-5deg);
  -o-transform: skew(-5deg); */
  /* transform: skew(10deg, 10deg); */
`;

const LessonsData = (props) => {
  // 1. get props and state
  const { me, id } = props;
  const { t } = useTranslation("course");
  const [page, setPage] = useState("lessons");

  // 2. get course data
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  // 3. get students' data
  const [
    fetchQuery,
    { loading: stats_loading, error: stats_error, data: stats_data },
  ] = useLazyQuery(LESSON_RESULTS_QUERY);

  useEffect(() => {
    // when the first query is loaded, then fire this lazy query function
    if (me) {
      fetchQuery({
        variables: {
          coursePageId: props.id,
          userId: me.id,
        },
      });

      // if (stats_error) return <p>{stats_error}</p>;
      // if (stats_loading) return <Loading />;
    }
  }, [me]);
  if (loading) return <Loading />;

  // 4. prepare for data analysis
  const coursePage = data.coursePage;
  let lessons = coursePage.lessons;
  let maxes = [];

  // 5. analyze user's lesson results to provide them wiith up-to-date progress information
  if (stats_data) {
    let lessonResults = stats_data.lessonResults;

    // 5.1. Get all lesson results
    const sorted_lessons = lessonResults
      .slice()
      .sort((a, b) => a.lesson.number - b.lesson.number);

    // 5.2. group all lesson results by lesson
    let new_array = [];
    sorted_lessons.forEach((l) => {
      let lessonId = l.lesson.id;
      if (new_array.find((x) => x.lessonId === lessonId)) {
        let obj = new_array.find((x) => x.lessonId === lessonId);
        let new_results_list = [...obj.results, l];
        return (obj.results = new_results_list);
      } else {
        let new_obj = {
          lessonId: lessonId,
          results: [l],
        };
        return new_array.push(new_obj);
      }
    });

    // 5.3. leave only lesson results with the highest progress

    let new_array_2 = new_array.map((el) => {
      const max = el.results.reduce((prev, current) =>
        prev.progress > current.progress ? prev : current
      );
      el["max"] = max;
      return el;
    });

    // 5.4. Leave only maxes

    new_array_2.forEach((el) => maxes.push(el.max));

    let lesResults = [];
    maxes.forEach((lr) => {
      let new_obj = {
        progress: lr.progress,
        lesson_number: lr.lesson.number,
        lesson_size: lr.lesson.structure
          ? lr.lesson.structure.lessonItems.length
          : 1,
        lesson_name: lr.lesson.name,
        visits: lr.visitsNumber,
      };
      lesResults.push(new_obj);
    });
  }

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
  if (me && coursePage.authors.filter((auth) => auth.id == me.id).length > 0) {
    i_am_author = true;

    //   let have_cert = false;
    //   let cert;
    //   me &&
    //     me.certificates.forEach((c) => {
    //       if (c.coursePage.id == coursePage.id) {
    //         have_cert = true;
    //         cert = c;
    //       }
    //     });
  }

  //  8. groupe lessons by week

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
  let initial_lessons = [...coursePage.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .filter((l) => l.type !== "HIDDEN");

  let broken_lessons = sliceIntoChunks(
    initial_lessons,
    coursePage.weeks ? coursePage.weeks : 3
  );

  let hidden_lessons = [...coursePage.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .filter((l) => l.type == "HIDDEN");

  return (
    <LessonsInfo>
      <Buttons>
        <Button
          primary={page === "lessons"}
          onClick={(e) => setPage("lessons")}
        >
          {t("lessons")}
        </Button>
        <Button
          primary={page === "feedback"}
          onClick={(e) => setPage("feedback")}
        >
          {t("feedback")}
        </Button>
      </Buttons>
      {page === "lessons" && (
        <>
          <Total>
            {" "}
            {t("total_lessons")}
            <b>
              {lessons.filter((l) => l.type !== "HIDDEN").length}
            </b> <br /> {t("course_term")}{" "}
            {/* {console.log(
              "coursePage.weeks",
              Math.ceil(
                lessons.length /
                  Math.ceil(coursePage.weeks ? coursePage.weeks : 3)
              )
            )} */}
            <b>
              {Math.ceil(
                lessons.length / (coursePage.weeks ? coursePage.weeks : 3)
              ) == 0
                ? 1
                : Math.ceil(
                    lessons.length / (coursePage.weeks ? coursePage.weeks : 3)
                  )}
            </b>
          </Total>
          <Syllabus>
            {[...broken_lessons].map((b, i) => (
              <>
                <div className="week_number">
                  {t("week")} {i + 1}
                </div>
                <Lessons>
                  {b.map((lesson, index) => (
                    <>
                      <LessonHeader
                        me={me}
                        key={lesson.id}
                        name={lesson.name}
                        lesson={lesson}
                        lessonResult={maxes.find(
                          (m) => m.lesson.id == lesson.id
                        )}
                        i_am_author={i_am_author}
                        statements={
                          lesson.forum ? lesson.forum.statements : null
                        }
                        coursePage={props.id}
                        author={coursePage.user.id}
                        open={index + 1 === 1}
                        index={index + 1}
                        coursePageId={coursePage.id}
                      />
                    </>
                  ))}
                </Lessons>
              </>
            ))}
          </Syllabus>
          {me && me.permissions && me.permissions.includes("ADMIN") && (
            <Syllabus>
              <div className="week_number">Hidden lessons</div>
              <Lessons>
                {hidden_lessons.map((lesson, index) => (
                  <>
                    <LessonHeader
                      me={me}
                      key={lesson.id}
                      name={lesson.name}
                      lesson={lesson}
                      lessonResult={maxes.find((m) => m.lesson.id == lesson.id)}
                      i_am_author={i_am_author}
                      statements={lesson.forum ? lesson.forum.statements : null}
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

      {page === "feedback" &&
        (me && isEnrolled ? (
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
        ) : (
          <Comment>{t("join_the_course")}</Comment>
        ))}
    </LessonsInfo>
  );
};

export default LessonsData;
