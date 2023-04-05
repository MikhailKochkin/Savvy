import React, { useState } from "react";
import UpdateEmailCampaign from "../components/UpdateEmailCampaign";
import CreateEmailCampaign from "../components/CreateEmailCampaign";
import CreateEmailReminder from "../components/CreateEmailReminder";
const EmailCampaign = (props) => {
  const [campaignId, setCampaignId] = useState("");

  const handleCampaignIdChange = (e) => {
    setCampaignId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <CreateEmailReminder />
      <CreateEmailCampaign />
      <form onSubmit={handleSubmit}>
        <label htmlFor="campaignId">Campaign ID:</label>
        <input
          type="text"
          id="campaignId"
          value={campaignId}
          onChange={handleCampaignIdChange}
        />
      </form>
      {campaignId && <UpdateEmailCampaign campaignId={campaignId} />}
    </div>
  );
};

export default EmailCampaign;
