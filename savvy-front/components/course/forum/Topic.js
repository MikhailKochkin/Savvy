import React, { useState } from "react";
import CreateStatement from "./CreateStatement";
import renderHTML from "react-render-html";
import styled from "styled-components";
import moment from "moment";
import DeleteStatement from "./DeleteStatement";

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
  background: ${props => (props.color ? "rgba(50, 172, 102, 0.01)" : "none")};
  border: 1px solid;
  border-color: ${props => (props.color ? "rgba(50, 172, 102)" : "#d3d3d3")};
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

const Topic = props => {
  moment.locale("ru");
  return (
    <Top>
      <Name>{props.topic.name}</Name>
      {props.topic.statements.length > 0 ? (
        <>
          {props.topic.statements.map(s => (
            <Statement color={props.topic.coursePage.user.id === s.user.id}>
              <div className="text">{renderHTML(s.text)}</div>
              <div className="name">
                {s.user.surname
                  ? `${s.user.name} ${s.user.surname}`
                  : s.user.name}
                <span>
                  {`   `}
                  {moment(s.createdAt).format("LLL")}
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
