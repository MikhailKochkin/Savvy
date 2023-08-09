import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useQuery, gql } from "@apollo/client";
import { result } from "lodash";

const TEAM_RESULTS = gql`
  query questResults($lessonId: String!, $list_of_ids: [String!]) {
    questResults(lessonId: $lessonId, list_of_ids: $list_of_ids) {
      lessonResults {
        id
        student {
          id
          name
          surname
          image
        }
        progress
      }
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  /* background: #1a2980;
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); 
  background: linear-gradient(to right, #26d0ce, #1a2980); */
  width: 100%;
  font-size: 2rem;
  padding: 0 20px;
  #change_page {
    /* width: 400px;
    text-align: right; */
    font-size: 1.7rem;
  }
  span {
    /* font-size: 1.7rem; */
    color: #fff;
  }
  .block {
    font-size: 1.7rem;
    margin-left: 10px;
  }
  #back {
    &:hover {
      color: #e4e4e4;
    }
    cursor: pointer;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 1%;
  }
`;

const Level = styled.div`
  margin: 5px;
  border-radius: 50%;
  height: 55px;
  width: 55px;
  background: #d5d9e4;
  color: #171e2e;
  object-fit: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    if (props.angle >= 360) {
      return `conic-gradient(#ffb703 0deg ${props.angle + "deg"}, #f2e8cf ${
        props.angle + "deg"
      } 360deg)`;
    } else {
      return `conic-gradient(#6a994e 0deg ${props.angle + "deg"}, #f2e8cf ${
        props.angle + "deg"
      } 360deg)`;
    }
  }};
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon_letters {
    margin: 5px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    background: #d5d9e4;
    color: #171e2e;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: row;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 10px;
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
    border-radius: 5px;
    min-width: 130px;
    font-family: Montserrat;
    font-size: 1.2rem;
    font-weight: 400;
    height: 25px;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    a {
      font-family: Montserrat;
      color: #000;
    }
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
`;

const Navigation = (props) => {
  const { lesson, i_am_author, me, width } = props;
  const { t } = useTranslation("lesson");

  let list_of_ids = [];
  me &&
    me.myTeams.length > 0 &&
    me.myTeams[0].users.map((u) => list_of_ids.push(u.id));
  const { loading, error, data } = useQuery(TEAM_RESULTS, {
    variables: { lessonId: lesson.id, list_of_ids: list_of_ids },
  });
  if (loading) return "";
  let results = data.questResults.lessonResults;

  let grouped_results = [];
  results.map((r, i) => {
    if (grouped_results.filter((gr) => gr.id === r.student.id).length == 0) {
      grouped_results.push({
        id: r.student.id,
        results: [r],
      });
    } else {
      let found = grouped_results.find((obj) => obj.id == r.student.id);
      let index = grouped_results.findIndex((object) => {
        return object.id === r.student.id;
      });

      let new_el = {
        id: r.student.id,
        results: [...found.results, r],
      };
      grouped_results[index] = new_el;
    }
  });

  let new_array_2 = grouped_results.map((el) => {
    const max = el.results.reduce((prev, current) =>
      prev.progress > current.progress ? prev : current
    );
    el["max"] = max;
    return el;
  });
  let filtered_results = [];
  new_array_2.map((el) => filtered_results.push(el.max));
  return (
    <Head>
      {lesson.open ? (
        <Link
          href={{
            pathname: "/course",
            query: {
              id: lesson.coursePage.id,
            },
          }}
        >
          <span>⬅{/* {t("back_to_course")} */}</span>
        </Link>
      ) : (
        <Link
          href={{
            pathname: "/course",
            query: {
              id: lesson.coursePage.id,
            },
          }}
        >
          <span>⬅</span>
        </Link>
      )}
      {width > 800 && (
        <Right>
          {me.myTeams.length == 0 && (
            <button>
              <a
                target="_blank"
                href={`https://besavvy.app/account?id=${me.id}`}
              >
                Create a team
              </a>
            </button>
          )}
          {me.myTeams.length > 0 && (
            <button>
              <a
                target="_blank"
                href={`https://besavvy.app/account?id=${me.id}`}
              >
                Invite to your team
              </a>
            </button>
          )}
          <Team>
            {me.myTeams.length > 0 &&
              me.myTeams[0].users.map((t, i) => (
                <Level
                  key={i + "level"}
                  angle={
                    lesson.structure &&
                    (filtered_results.find((lr) => lr.student.id == t.id)
                      ? filtered_results.find((lr) => lr.student.id == t.id)
                          .progress
                      : 0) *
                      (360 / lesson.structure.lessonItems.length)
                  }
                >
                  <IconBlock>
                    {t.image ? (
                      <img className="icon" src={t.image} />
                    ) : t.surname ? (
                      <div className="icon_letters">
                        {t.name[0]}
                        {t.surname[0]}
                      </div>
                    ) : (
                      <div className="icon_letters">
                        {t.name[0]}
                        {t.name[1]}
                      </div>
                    )}
                  </IconBlock>
                </Level>
              ))}
          </Team>
          <div className="block">
            {me &&
              (lesson.user.id === me.id ||
                i_am_author ||
                me.permissions.includes("ADMIN")) && (
                <Link
                  href={{
                    pathname: "/lesson",
                    query: {
                      id: lesson.id,
                      type: "regular",
                    },
                  }}
                >
                  {/* <span>{t("switch")}</span> */}
                  <span>{t("to_development")}</span>
                </Link>
              )}
          </div>
        </Right>
      )}
    </Head>
  );
};

export default Navigation;
