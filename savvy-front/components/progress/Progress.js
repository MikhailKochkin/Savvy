import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CourseBox from "./CourseBox";
import KPI from "./KPI";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin: 50px 0;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      surname
      createdAt
      updatedAt
      country
      status
      coursePages {
        id
        lessons {
          id
        }
      }
      lessonResults {
        id
        updatedAt
      }
    }
  }
`;

const COURSEPAGES_QUERY = gql`
  query COURSEPAGES_QUERY {
    coursePages {
      id
      title
      published
      courseType
      user {
        id
      }
      new_students {
        id
        name
      }
    }
  }
`;

const COURSEPAGE_QUERY = gql`
  query COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        tags
        email
        studentFeedback {
          id
          lesson {
            id
            coursePage {
              id
            }
          }
        }
        courseVisits {
          id
          reminders
          visitsNumber
          coursePage {
            id
          }
          createdAt
        }
      }
      lessons {
        id
        text
        name
        number
        assignment
        structure
        # coursePage {
        #   id
        # }
        # forum {
        #   id
        # }
        newTests {
          id
          question
          answers
          correct
          next
        }
        quizes {
          id
          question
          answer
          next
        }
        forum {
          id
          text
          lesson {
            id
            name
          }
          rating {
            id
            rating
            createdAt
            user {
              id
              name
              surname
            }
          }
          statements {
            id
            text
            createdAt
            answered
            comments
            user {
              id
              name
              surname
            }
            forum {
              id
              rating {
                id
                rating
              }
            }
          }
          # lesson {
          #   id
          #   user {
          #     id
          #   }
          # }
          # user {
          #   id
          #   name
          #   surname
          # }
        }
        notes {
          id
          text
          next
        }
        problems {
          id
          text
          nodeID
          nodeType
        }
        texteditors {
          id
          text
          totalMistakes
        }
        constructions {
          id
          name
          variants
          answer
        }
        documents {
          id
          title
        }
      }
    }
  }
`;

const Progress = (props) => {
  const [option, setOption] = useState("cjtreu3md00fp0897ga13aktp");

  const { loading, error, data } = useQuery(COURSEPAGE_QUERY, {
    variables: { id: option },
  });

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(COURSEPAGES_QUERY);

  const {
    loading: loading3,
    error: error3,
    data: data3,
  } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (loading2) return <p>Loading...</p>;
  if (loading3) return <p>Loading...</p>;

  let coursePage = data.coursePage;
  let coursePages = data2.coursePages;
  let users = data3.users;

  return (
    <Styles>
      <Container>
        <KPI coursePages={coursePages} users={users} />
        {/* <select onChange={(e) => setOption(e.target.value)}>
          <option value="cjtreu3md00fp0897ga13aktp">
            Старт в Гражданском Праве (общая часть)
          </option>
          <option value="ckfy1q60a02f307281abcpgae">
            Введение в право интеллектуальной собственности
          </option>
          <option value="cktrbubdl2237dou9vzn1gb3w">
            Старт в юридическом английском
          </option>
          <option value="ck0pdit6900rt0704h6c5zmer">
            Legal English. Базовый уровень
          </option>
          <option value="ck2f2nk4007dw0785lhixfppw">
            Legal English. Продвинутый уровень
          </option>
          <option value="ck6mc531p02z20748kwpqnt7z">
            Legal English. Cложности юридического перевода
          </option>
          <option value="ck587y4kp00lf07152t0tyywl">
            Корпоративное право: основы работы с непубличными обществами
          </option>
          <option value="ckrza2r9a1377641guuzwhlgcb5">Сделки M&A</option>
          <option value="ckqut60ya145911gqj58c0qo8a">
            Основные инструменты договорной работы корпоративного юриста
          </option>
          <option value="ckt9rmh4e51981hp97uwp6rft">
            Как защитить интересы компании в арбитражном суде?
          </option>
          <option value="ckwue8197229091h1abn955mbe">Налоговое право</option>
          <option value="ckum7fc9i644701hqtbnqalqgg">Семейное право</option>
          <option value="ckup6fss5650821hwe4oqbql91">
            Правовое регулирование ПО
          </option>
          <option value="ckgdgw88c02uv0742v0ttx8pl">Старт в банкротстве</option>
          <option value="ckx9f5kq487681hx6lojxzvqx">
            Старт в ценных бумагах
          </option>
        </select>
        <CourseBox key={coursePage.id} id={coursePage.id} c={coursePage} />*/}
      </Container>
    </Styles>
  );
};

export default Progress;
