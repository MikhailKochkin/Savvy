import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import moment from "moment";
import Client from "./Client";

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

const LessonsData = (props) => {
  const { loading, error, data } = useQuery(GET_EMAIL_CAMPAIGNS);

  const [activeCampaignId, setActiveCampaignId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Кампании</h3>
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
    </div>
  );
};

export default LessonsData;
