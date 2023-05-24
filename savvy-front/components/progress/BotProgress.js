import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import BotSession from "./BotSession";

const now = new Date();
now.setDate(now.getDate() - 10);
const thirtyDaysAgo = now.toISOString();

const BOT_SESSIONS_QUERY = gql`
  query BOT_SESSIONS_QUERY {
    botDialogues(where: { updatedAt: { gte: "${thirtyDaysAgo}" } }) {
      id
      rating
      source
      journey
      createdAt
      updatedAt
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BotProgress = () => {
  // 1. download bot sessions data
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(BOT_SESSIONS_QUERY);

  if (loading1) return <p>Loading1...</p>;
  // 2. count the total number of sessions per day
  let sessions;
  if (data1) {
    sessions = data1.botDialogues;
  }

  const groupByDay = (array) => {
    const now = new Date();
    const groups = [];

    array.forEach((obj) => {
      const timestamp = new Date(obj.createdAt);
      const diffTime = Math.abs(now - timestamp);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        const day = timestamp.toDateString();
        let group = groups.find((g) => g.day === day);
        if (!group) {
          group = { day, objects: [] };
          groups.push(group);
        }
        group.objects.push(obj);
      }
    });

    groups.sort((a, b) => {
      const aDate = new Date(a.day);
      const bDate = new Date(b.day);
      return bDate - aDate;
    });

    groups.forEach((group) => {
      group.objects.sort((a, b) => {
        const aTimestamp = new Date(a.createdAt);
        const bTimestamp = new Date(b.createdAt);
        return aTimestamp - bTimestamp;
      });
    });

    return groups;
  };

  let grouped_sessions = groupByDay(sessions);

  function countObjects(arr) {
    let totalCount = 0;
    let journeyCount = 0;

    arr.forEach((item) => {
      totalCount += item.objects.length;

      item.objects.forEach((obj) => {
        if (obj.journey.length > 0) {
          journeyCount++;
        }
      });
    });

    return {
      totalCount,
      journeyCount,
    };
  }

  let res = countObjects(grouped_sessions);

  return (
    <Styles>
      <h4>Numbers last 7 days</h4>
      <li># sessions: {res.totalCount}</li>
      <li># active sessions: {res.journeyCount} </li>
      <li>
        % active sessions:{" "}
        {((res.journeyCount / res.totalCount) * 100).toFixed(2)}%{" "}
      </li>
      <br />
      {grouped_sessions.map((gs) => (
        <BotSession session={gs} />
      ))}
    </Styles>
  );
};

export default BotProgress;
