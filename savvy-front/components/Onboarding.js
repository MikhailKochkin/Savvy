import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Course from "./course/Course";

const COURSES_QUERY = gql`
  query COURSES_QUERY {
    coursePages(orderBy: { createdAt: asc }) {
      id
      title
      description
      image
      tags
      lessons {
        id
        forum {
          id
          rating {
            id
            rating
          }
        }
      }
      user {
        id
        name
        surname
        image
        status
        company {
          id
          name
        }
        uni {
          id
          title
        }
      }
      authors {
        id
        name
        surname
        status
        company {
          id
          name
        }
        uni {
          id
          title
        }
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  margin: 40px 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
  align-items: center;
  justify-content: center;
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const Onboarding = (props) => {
  // const { loading, error, data } = useQuery(COURSES_QUERY);
  // if (loading) return <p>Loading...</p>;
  // const coursePages = data.coursePages;
  const englishCourses = [
    "ck6mc531p02z20748kwpqnt7z",
    "ck2f2nk4007dw0785lhixfppw",
    "ck0pdit6900rt0704h6c5zmer",
    "cknu5zekc112311g1emrinm7io",
  ];
  const corpCourses = [
    "ck587y4kp00lf07152t0tyywl",
    "ckqut60ya145911gqj58c0qo8a",
    "ckrza2r9a1377641guuzwhlgcb5",
  ];
  const schoolCourses = [
    "ck587y4kp00lf07152t0tyywl",
    "ckqut60ya145911gqj58c0qo8a",
    "ckrza2r9a1377641guuzwhlgcb5",
    "ckt9rmh4e51981hp97uwp6rft",
    "ckup6fss5650821hwe4oqbql91",
    "ckwue8197229091h1abn955mbe",
  ];
  const startCourses = [
    "cjtreu3md00fp0897ga13aktp",
    "ck4n47a2j01jg0790gspxqxju",
    "cktrbubdl2237dou9vzn1gb3w",
    "ckfy1q60a02f307281abcpgae",
    "ck89zsn5200790701jcpqxmiu",
  ];
  let shownCourses = [];
  // if (props.program == "english") {
  //   coursePages.map((c) => {
  //     if (englishCourses.includes(c.id)) {
  //       return shownCourses.push(c);
  //     }
  //   });
  // } else if (props.program == "corp") {
  //   coursePages.map((c) => {
  //     if (corpCourses.includes(c.id)) {
  //       return shownCourses.push(c);
  //     }
  //   });
  // } else if (props.program == "school") {
  //   coursePages.map((c) => {
  //     if (schoolCourses.includes(c.id)) {
  //       return shownCourses.push(c);
  //     }
  //   });
  // } else if (props.program == "start") {
  //   coursePages.map((c) => {
  //     if (startCourses.includes(c.id)) {
  //       return shownCourses.push(c);
  //     }
  //   });
  // }
  return (
    <Styles>
      <Container>
        {/* {shownCourses.map((c) => (
          <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
        ))} */}
        <h2>Спасибо, что решили учиться вместе с нами!</h2>
        <p>Рассказываем, как открыть доступ к курсу.</p>
        <ol>
          <li>
            Вернитесь на страницу курса, на которой вы оплатили доступ. Вот{" "}
            <a
              target="_blank"
              href={`https://besavvy.app/coursePage?id=${props.id}`}
            >
              ссылка
            </a>
            .
          </li>
          <li>
            В форме оплаты выберите опцию "Открыть доступ к оплаченному курсу" и
            нажмите на кнопку "Открыть курс".
          </li>
          <li>
            Вы перейдете на страницу с уроками и другими материалами, входящими
            в курс.
          </li>
          <li>
            Авторы курсов обычно подробно рассказывают о формате и деталях курса
            в одном из первых уроков. Обязательно изучите их, наверняка автор
            там уже разобрал ваши вопросы.
          </li>
          <li>
            Если будут вопросы, пишите нам. Для этого достаточно нажать на
            виджет в правом нижнем углу экрана.
          </li>
          <p>До встречи на занятиях.</p>
        </ol>
      </Container>
    </Styles>
  );
};

export default Onboarding;
