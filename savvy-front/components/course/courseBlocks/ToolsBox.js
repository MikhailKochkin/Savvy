import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

// import FirstLesson from "../coursePageCards/FirstLesson";
import RegisterCard from "../coursePageCards/RegisterCard";
import StudentCard from "../coursePageCards/StudentCard";
import TeacherCard from "../coursePageCards/TeacherCard";
import SignInCard from "../coursePageCards/SignInCard";
import Loading from "../../Loading";

export const PayBox = styled.div`
  flex: 40%;
  display: flex;
  background: #fff;
  border-radius: 2rem;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 2%;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);

  @media (max-width: 1000px) {
    margin-top: 20px;
    margin-left: 0px;
    align-items: center;
  }
`;

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      published
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
      lessons {
        id
        name
        number
        description
        type
        assignment
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

const ToolsBox = (props) => {
  // 1. get props and state
  const { me, id } = props;
  const { t } = useTranslation("course");

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
  if (stats_loading) return <Loading />;
  // 4. prepare for data analysis
  const coursePage = data.coursePage;
  let lessons = coursePage.lessons;
  let maxes = [];
  let lessonResults = [];
  // 5. analyze user's lesson results to provide them wiith up-to-date progress information
  if (stats_data) {
    lessonResults = stats_data.lessonResults;
    // console.log("lessonResults", lessonResults);
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

  // 6. authorization checks

  let i_am_author = false;
  if (me && coursePage.authors.filter((auth) => auth.id == me.id).length > 0) {
    i_am_author = true;
  }

  let first_lesson = [...lessons].sort((a, b) => a.number - b.number)[0];
  // let first_lesson = lessons[0];
  return (
    <PayBox>
      {/* Карточка регистрации на сайте */}
      {!me && <SignInCard />}
      {/* Карточка первого урока */}
      {me &&
        me.permissions &&
        me.id !== coursePage.user.id &&
        !i_am_author &&
        !me.new_subjects.find((c) => c.id == coursePage.id) &&
        !me.permissions.includes("ADMIN") && (
          <RegisterCard
            me={me}
            coursePage={coursePage}
            first_lesson={first_lesson}
            lessonResults={lessonResults}
          />
        )}
      {/* Карточка преподавателя */}
      {me &&
        me.permissions &&
        (me.id === coursePage.user.id ||
          me.permissions.includes("ADMIN") ||
          i_am_author) && (
          <TeacherCard id={coursePage.id} coursePage={coursePage} />
        )}
      {/* Карточка ученика */}
      {/* {console.log("student", stats_data)} */}
      {stats_data &&
        me &&
        me.permissions &&
        me.new_subjects.find((c) => c.id == coursePage.id) &&
        !me.permissions.includes("ADMIN") && (
          <StudentCard
            coursePage={coursePage}
            lessonResults={lessonResults}
            me={me}
          />
        )}
    </PayBox>
  );
};

export default ToolsBox;
