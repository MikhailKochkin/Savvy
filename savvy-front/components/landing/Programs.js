import { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import { useRouter } from "next/router";
import smoothscroll from "smoothscroll-polyfill";

import Program from "./Program";
import LoadingDummy from "../Loading";

const COURSES_QUERY = gql`
  query COURSES_QUERY {
    coursePages(
      where: { published: { equals: true } }
      orderBy: { createdAt: asc }
    ) {
      id
      title
      description
      nextStart
      installments
      price
      courseType
      currency
      discountPrice
      numInCareerTrack
      image
      tags
      createdAt
      lessons {
        id
      }
      user {
        id
        name
        surname
      }
      authors {
        id
        name
        surname
      }
    }
  }
`;

const PROGRAMS_QUERY = gql`
  query PROGRAM_QUERY {
    programs {
      id
      title
      description
      nextStart
      currency
      installments
      price
      image
      tags
      createdAt
    }
  }
`;

const Styles = styled.div`
  display: flex;
  margin: 30px 0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
    padding: 20px 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: 800px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.moreThanOne ? "space-between" : "center"};
  flex-wrap: wrap;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Search = styled.div`
  background: #f1f1f1;
  border-radius: 25px;
  width: 70%;
  margin-bottom: 50px;
  padding: 25px 50px;
  #want {
    font-weight: 800px;
    font-size: 3rem;
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    width: 90%;
    padding: 25px 25px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Option = styled.div`
  border: 1px solid #8d8d8d;
  border: ${(props) =>
    props.active ? "2px solid #7000FF" : "1px solid #8d8d8d"};
  border-radius: 20px;
  padding: 5px 20px;
  margin-right: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  &#create {
    border: 2px solid #8d8d8d;
  }
  @media (max-width: 800px) {
    font-size: 1.3rem;
  }
`;

const Programs = (props) => {
  console.log("Programs");
  const router = useRouter();
  if (router.locale !== "ru" && props.isSubscriptionPage == false) {
    return;
  }
  const { loading, error, data } = useQuery(COURSES_QUERY);
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(PROGRAMS_QUERY);

  const [tag, setTag] = useState(
    router.locale == "ru" || props.isSubscriptionPage
      ? "english"
      : "english_eng"
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  if (loading) return <LoadingDummy />;
  if (loading1) return <LoadingDummy />;

  const slide = () => {
    var my_element = document.getElementById("course_container");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const move = (val) => {
    setTag(val);
    slide();
  };
  const filtered_courses = data.coursePages.filter((c) => c.tags.includes(tag));
  const filtered_programs = data1.programs.filter((c) => c.tags.includes(tag));

  return (
    <Styles id="course_search">
      <Search>
        <>
          <div id="want">😏 Я хочу ...</div>
          <Tags>
            {/* <Option active={tag == "now"} onClick={(e) => move("now")}>
              Построить карьеру
            </Option> */}
            <Option active={tag == "english"} onClick={(e) => move("english")}>
              Выучить Legal English
            </Option>
            <Option active={tag == "corp"} onClick={(e) => move("corp")}>
              Работать с корпоративным правом
            </Option>
            <Option active={tag == "civil"} onClick={(e) => move("civil")}>
              Изучать гражданское право
            </Option>
            <Option active={tag == "ip"} onClick={(e) => move("ip")}>
              Работать в IT/IP
            </Option>
            <Option
              active={tag == "real_estate"}
              onClick={(e) => move("real_estate")}
            >
              Работать с недвижимостью
            </Option>

            <Option
              active={tag == "law_school"}
              onClick={(e) => move("law_school")}
            >
              Закончить юрфак
            </Option>
            <Option
              active={tag == "litigation"}
              onClick={(e) => move("litigation")}
            >
              Стать судебным юристом
            </Option>
            <Option
              active={tag == "first_job"}
              onClick={(e) => move("first_job")}
            >
              Найти первую работу
            </Option>
            <Option active={tag == "tech"} onClick={(e) => move("tech")}>
              Погрузиться в Legal Tech
            </Option>
            <Option active={tag == "soft"} onClick={(e) => move("soft")}>
              Soft Skills
            </Option>
            <Option id="create">
              <a href="https://t.me/MikKochkin" target="_blank">
                Создать свой курс на BeSavvy
              </a>
            </Option>
          </Tags>
        </>
      </Search>

      <Container
        id="course_container"
        moreThanOne={data.coursePages.length > 1 ? true : false}
      >
        {/* {filtered_programs.map((p, i) => (
          <Program
            key={i}
            img={p.image}
            title={p.title}
            program={true}
            currency={p.currency}
            // lessons={p.lessons}
            description={p.description}
            nextStart={p.nextStart}
            price={p.price}
            // installments={p.installments}
            // conditions={p.conditions}
            id={p.id}
          />
        ))} */}
        {filtered_courses
          .sort((a, b) => a.numInCareerTrack - b.numInCareerTrack)
          .map((p, i) => (
            <Program
              key={i}
              img={p.image}
              title={p.title}
              currency={p.currency}
              lessons={p.lessons}
              description={p.description}
              nextStart={p.nextStart}
              price={p.price}
              discountPrice={p.discountPrice}
              installments={p.installments}
              courseType={p.courseType}
              id={p.id}
            />
          ))}
      </Container>
    </Styles>
  );
};

export default Programs;
