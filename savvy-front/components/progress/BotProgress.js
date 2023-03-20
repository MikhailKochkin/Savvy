import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import BotSession from "./BotSession";

const BOT_SESSIONS_QUERY = gql`
  query BOT_SESSIONS_QUERY {
    botDialogues(where: { updatedAt: { gte: "2023-03-03T00:10:10.734Z" } }) {
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

    groups.forEach((group) => {
      group.objects.sort((a, b) => {
        const aTimestamp = new Date(a.item);
        const bTimestamp = new Date(b.item);
        return aTimestamp - bTimestamp;
      });
    });

    return groups;
  };

  let grouped_sessions = groupByDay(sessions);

  // 3. count active sessions

  // 4. display for active sessions: time, steps, feedback

  return (
    <Styles>
      {grouped_sessions.map((gs) => (
        <BotSession session={gs} />
      ))}
    </Styles>
  );
};

export default BotProgress;
