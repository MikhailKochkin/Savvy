import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import StudentData from "./StudentData";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 50px 0;
`;

const Container = styled.div`
  width: 70%;
  border-bottom: 1px solid grey;
  #header {
    margin: 30px 0;
  }
`;

const SCHOOLERS = gql`
  query SCHOOLERS($id_list: [String!]) {
    users(where: { id: { in: $id_list } }) {
      id
      name
      surname
      email
      coursePages {
        id
        title
        numInCareerTrack
      }
      new_subjects {
        id
        title
        numInCareerTrack
        lessons {
          id
          number
          name
          structure
        }
      }
      courseVisits {
        id
        visitsNumber
        student {
          id
          name
          surname
        }
        createdAt
        updatedAt
      }
      lessonResults {
        id
        progress
        visitsNumber
        createdAt
        updatedAt
        lesson {
          id
          number
          structure
          coursePage {
            id
          }
        }
      }
    }
  }
`;

const Students = (props) => {
  const id_list = [
    "ckqqw7b3o81681grpo0e1809c",
    "ckov7kwg3975021g0595lrys68",
    "ckqt4le9s2620571gtjprbnq11r",
    "ckou4l96t944271g1ruiwupdtg",
    "ckou7vfgs21181guwcrbsyf7k",
    "ckpilmekh2609611guuo05xbf72",
    "cknug8hjq232231g1eet5flcp9",
    "ck2kbga0f00ro0709ya46wv4s",
    "ckq7t62kj761811gumjt15s5uz",
    "cknzzlr6k313011gvvu9rkli9v",
    "ckoyaxksa1335151gwyc9d4m9ho",
    "ckob5fyct222401g4343gy3rd2",
    "ckoeamcc739161gz2bfqe5z02",
    "ckqqw7b3o81681grpo0e1809c",
    "cko05kr1c421211gvvu8ga3ryl",
    "ckqqweavx89301grpk68qf9h3",
    "ck8b9p5nf000x0759h97dbb9g",
    "ckqqw1sb357861grpve336pbl",
    "ckq7tpqp2766051gumgex9dmiq",
    "ck66gxkqt01i907876dqc462z",
    "ckpywbrsd1037031gwdiz5zndyn",
    "cklggst8d720291gvl8xaajgeb",
    "ckointqy4902151hz086ex8ptp",
    "ck7riagcf00d407950ckum4me",
    "cjxsl4s1a006d0776y06v0lw6",
    "ckixeimom00l80737edvjl4fu",
    "ckhmf0vut02630727ulh3d8z3",
    "cju9iuo8b04u20723fywr26rq",
  ];

  const { loading, error, data } = useQuery(SCHOOLERS, {
    variables: { id_list: id_list },
  });
  if (loading) return <p>Loading...</p>;
  let students = data.users;
  return (
    <Styles>
      {props.me && props.me.permissions.includes("ADMIN") && (
        <Container>
          <div id="header">Всего участников школы: {id_list.length}</div>
          {students.map((s) => (
            <StudentData
              student={s}
              coursePages={s.new_subjects}
              courseVisits={s.courseVisits}
              lessonResults={s.lessonResults}
            />
          ))}
        </Container>
      )}
    </Styles>
  );
};

export default Students;
