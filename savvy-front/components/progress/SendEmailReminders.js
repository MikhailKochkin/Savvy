import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";

const GET_EMAIL_REMINDERS = gql`
  query {
    emailReminders {
      id
      emailsSent
      createdAt
      updatedAt
      gap
      coursePage {
        id
        title
      }
      user {
        name
        surname
        email
      }
      emailCampaign {
        id
        name
        emails
      }
    }
  }
`;

const UPDATE_EMAIL_REMINDER = gql`
  mutation UpdateEmailReminder($id: String!, $emailsSent: [String]) {
    updateEmailReminder(id: $id, emailsSent: $emailsSent) {
      id
      emailsSent
    }
  }
`;

const SendEmailReminders = () => {
  const { data, loading, error } = useQuery(GET_EMAIL_REMINDERS);
  const [updateEmailReminder] = useMutation(UPDATE_EMAIL_REMINDER);
  const [showReminders, setShowReminders] = useState(false);

  const getLastWeekDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  };

  const sendEmail = async (emailReminder) => {
    const calculateDaysDifference = (date1, date2) => {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.abs((date1 - date2) / oneDay);
      return diffDays;
    };
    const emailsSent = emailReminder.emailsSent;
    const emailCampaign = emailReminder.emailCampaign;
    const reminderUpdatedAt = emailReminder.updatedAt;
    const gap = emailReminder.gap;

    const today = new Date();
    const lastUpdatedDate = new Date(reminderUpdatedAt);

    const daysDifference = calculateDaysDifference(today, lastUpdatedDate);

    // console.log("daysDifference", daysDifference, today, lastUpdatedDate);
    // console.log("the gap", gap, gap - 0.25, daysDifference);

    if (
      (daysDifference >= gap - 0.25 || emailsSent.length == 0) &&
      emailsSent.length < emailCampaign.emails.emails.length
    ) {
      const emailToSend = emailCampaign.emails.emails[emailsSent.length];
      // console.log("emailToSend", emailToSend);
      // console.log("emailReminder", emailReminder);

      await updateEmailReminder({
        variables: {
          id: emailReminder.id,
          emailsSent: [...emailsSent, emailToSend.name],
        },
      });
    }
  };

  const handleButtonClick = () => {
    if (data) {
      data.emailReminders.forEach((emailReminder) => {
        sendEmail(emailReminder);
      });
    }
  };

  const toggleRemindersList = () => {
    setShowReminders(!showReminders);
  };

  moment.locale("ru");

  return (
    <div>
      <h2>Send Email Reminders</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={handleButtonClick} disabled={loading}>
        Send Emails
      </button>
      <button onClick={toggleRemindersList} disabled={loading}>
        {showReminders ? "Hide Reminders" : "Show Reminders"}
      </button>
      {/* {console.log("data.emailReminders", data.emailReminders)} */}
      {showReminders &&
        data &&
        data.emailReminders
          .filter(
            (emailReminder) =>
              new Date(emailReminder.createdAt) >= getLastWeekDate()
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Updated sorting function
          .map((emailReminder, index) => (
            <div key={index}>
              <h3>
                {index + 1}. User: {emailReminder.user.name}{" "}
                {emailReminder.user.surname} - {emailReminder.user.email}
              </h3>
              <p>
                Email campaign: {emailReminder.emailCampaign?.name} /{" "}
                {emailReminder.emailCampaign?.id}
              </p>
              <p>Course page: {emailReminder.coursePage.title}</p>
              <p>Created at: {moment(emailReminder.createdAt).format("LLL")}</p>
              <p>Emails sent: {emailReminder.emailsSent}</p>
            </div>
          ))}
    </div>
  );
};

export default SendEmailReminders;
