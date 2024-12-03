import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import moment from "moment";
import styled from "styled-components";
import Client from "./Client";
import dynamic from "next/dynamic";

const Styles = styled.div`
  .editor {
    font-size: 1.6rem;
    width: 95%;
    border: 1px solid #c4c4c4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    outline: 0;
    padding: 0.5%;
    font-size: 1.6rem;
    margin-bottom: 20px;
    @media (max-width: 800px) {
      width: 350px;
    }
  }
`;
const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $userId: String!
    $text: String!
    $subject: String
  ) {
    sendMessage(userId: $userId, text: $text, subject: $subject) {
      id
    }
  }
`;

const GET_EMAIL_CAMPAIGNS = gql`
  query GetEmailCampaigns {
    emailCampaigns {
      id
      name
      emailReminders {
        id
        userId
        createdAt
        updatedAt
        coursePageId
        sendAt
        emailsSent
        user {
          id
          name
          surname
          email
          number
        }
        gap
        link
      }
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const LessonsData = (props) => {
  const { loading, error, data } = useQuery(GET_EMAIL_CAMPAIGNS);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [userId, setUserId] = useState("");

  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback2 = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Styles>
      <h3>Кампании</h3>
      <h4>Имейл</h4>
      <div>Id</div>
      <input onChange={(e) => setUserId(e.target.value)} />
      <div>Subject</div>
      <input onChange={(e) => setSubject(e.target.value)} />
      <div className="editor">
        <DynamicLoadedEditor
          getEditorText={myCallback2}
          value={message}
          name="text"
        />
      </div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          // let mess = props.communication_history
          //   ? [
          //       ...props.communication_history.messages,
          //       {
          //         message: message,
          //         date: new Date().toISOString(),
          //       },
          //     ]
          //   : [
          //       {
          //         message: message,
          //         date: new Date().toISOString(),
          //       },
          //     ];

          const res = await sendMessage({
            variables: {
              userId: userId,
              text: message,
              subject: subject,
            },
          });
          alert("Sent!");
        }}
      >
        Отправить имейл
      </button>

      {data.emailCampaigns.map((campaign) => (
        <div key={campaign.id}>
          <h4>{campaign.name}</h4>
          <button onClick={() => setActiveCampaignId(campaign.id)}>
            {activeCampaignId === campaign.id
              ? "Hide Reminders"
              : "Show Reminders"}
          </button>
          {activeCampaignId === campaign.id &&
            [...campaign.emailReminders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort reminders by creation date
              .map((reminder, i) => (
                <Client key={i} index={i} reminder={reminder} />
              ))}
        </div>
      ))}
    </Styles>
  );
};

export default LessonsData;
