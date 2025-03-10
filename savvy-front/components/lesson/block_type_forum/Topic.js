import React, { useState } from "react";
import CreateStatement from "./CreateStatement";

import styled from "styled-components";
import dayjs from "dayjs";
import DeleteStatement from "./DeleteStatement";
import parse from "html-react-parser";

const Top = styled.div`
  border-top: 1px solid #d3d3d3;
  padding: 2% 0;
  margin: 2% 0;
  #comment {
    color: #767676;
    margin-bottom: 2%;
  }
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 2%;
`;

const Statement = styled.div`
  background: ${(props) =>
    props.color ? "rgba(50, 172, 102, 0.1)" : "#f0f8ff"};
  padding: 1.5% 2%;
  padding-top: 1%;
  margin-bottom: 2%;
  .text {
    margin-bottom: 1.5%;
  }
  .name {
    color: #000e2d;
    font-weight: bold;
    span {
      color: #767676;
      font-weight: normal;
    }
  }
`;

const Topic = (props) => {
  return (
    <Top>
      <Name>{props.topic.name}</Name>
      {props.topic.statements.length > 0 ? (
        <>
          {props.topic.statements.map((s) => (
            <Statement color={props.topic.coursePage.user.id === s.user.id}>
              <div className="text">{parse(s.text)}</div>
              <div className="name">
                {s.user.surname
                  ? `${s.user.name} ${s.user.surname}`
                  : s.user.name}
                <span>
                  {`   `}
                  {dayjs(s.createdAt).format("LLL")}
                </span>
              </div>
              {props.me.id === s.user.id && (
                <DeleteStatement
                  coursePageID={props.topic.coursePage.id}
                  statementID={s.id}
                />
              )}
            </Statement>
          ))}
        </>
      ) : (
        <div id="comment">
          Никто еще ничего не написал по этой теме. Станьте первым!
        </div>
      )}
      <CreateStatement coursePageID={props.coursePageID} topic={props.topic} />
    </Top>
  );
};

export default Topic;
