import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import parse from "html-react-parser";

import Loading from "../../layout/Loading";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(id: $id) {
      id
      title
      updatedAt
      user {
        id
        name
        surname
        work
        image
      }
      authors {
        id
        name
        surname
        work
        image
      }
      nextStart
      header
      subheader
      new_students {
        id
      }
    }
  }
`;

const Container = styled.div`
  width: 100vw;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  background-size: contain;
  background: #181d2e; /* fallback for old browsers */
  @media (max-width: 800px) {
    padding-bottom: 50px;
    background-size: contain;
  }
`;

const InfoBlock = styled.div`
  max-height: 1200px;
  min-height: 400px;
  max-width: 1100px;
  width: 85%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Container2 = styled.div`
  width: 100%;
  max-width: 750px;
  margin-top: 50px;
  padding-right: 80px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .date {
    font-weight: bold;
    color: #252f3f;
  }

  h1 {
    font-size: 3.4rem;
    line-height: 1.2;
    font-weight: 600;
    margin: 0;
    color: #fff;
    span {
      color: #b8baf9;
    }
  }
  h2 {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-top: 25px;
    width: 75%;
    font-weight: 400;
    color: #f1f1f1;
    margin: 20px 0;
  }
  .details {
    color: #fff;
    margin-top: 10px;
    span {
      color: #b8baf9;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-right: 0px;
    h1 {
      font-size: 2.6rem;
      line-height: 1.4;
    }
    h2 {
      font-size: 2rem;
      width: 100%;
      margin-bottom: 0px;
    }
  }
`;

const ATF = (props) => {
  const router = useRouter();

  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <Loading />;

  const course = data.coursePage;

  router.locale == "ru" ? dayjs.locale("ru") : dayjs.locale("en");
  return (
    <div id="ATF">
      <Container>
        <InfoBlock>
          <Container2>
            <h1>{course?.header?.length > 0 ? parse(course.header[0]) : ""}</h1>
            <h2 id="header2">
              {course.subheader.length > 0 ? parse(course.subheader[0]) : ""}
            </h2>
            <div className="details">9.1 ⭐️⭐️⭐️⭐️⭐️</div>
            <div className="details">
              ☉ {router.locale == "ru" ? "Автор: " : "Created by"}
              <span>
                {course.user.name} {course.user.surname}
              </span>
            </div>
            <div className="details">
              ✦{" "}
              {router.locale == "ru"
                ? "Последнее обновление: "
                : "Last updated"}{" "}
              <span>{dayjs(course.updatedAt).format("MM/YYYY")}</span>
            </div>
          </Container2>
        </InfoBlock>
      </Container>
    </div>
  );
};

export default ATF;
