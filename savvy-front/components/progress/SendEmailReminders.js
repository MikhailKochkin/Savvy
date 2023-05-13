import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const GET_EMAIL_REMINDERS = gql`
  query {
    emailReminders(where: { createdAt: { gte: "2023-04-10T15:10:10.734Z" } }) {
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
        lessonResults {
          id
          progress
          visitsNumber
          updatedAt
          lesson {
            id
            number
            name
            coursePage {
              id
              title
            }
          }
        }
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

// const REFRESH_EMAIL_REMINDER = gql`
//   mutation REFRESH_EMAIL_REMINDER($id: String!) {
//     refreshEmailReminder(id: $id) {
//       id
//     }
//   }
// `;

const SendEmailReminders = () => {
  const { data, loading, error } = useQuery(GET_EMAIL_REMINDERS);
  const [updateEmailReminder] = useMutation(UPDATE_EMAIL_REMINDER);
  // const [refreshEmailReminder] = useMutation(REFRESH_EMAIL_REMINDER);

  const [showReminders, setShowReminders] = useState(false);
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(new Date());

  // const updateEmails = async (id) => {
  //   let emails = console.log("emails", emails);
  //   await refreshEmailReminder({
  //     variables: {
  //       id: id,
  //     },
  //   });
  // };

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
    let arr = [...emailsSent];
    // console.log("daysDifference", daysDifference, today, lastUpdatedDate);
    // console.log("the gap", gap, gap - 0.25, daysDifference);

    // if (emailsSent.length > 0) {
    //   arr.pop();
    //   await updateEmailReminder({
    //     variables: {
    //       id: emailReminder.id,
    //       emailsSent: arr,
    //     },
    //   });
    // }

    if (
      (daysDifference >= gap - 0.25 || emailsSent.length == 0) &&
      emailsSent.length < emailCampaign.emails.emails.length
    ) {
      const emailToSend = emailCampaign.emails.emails[emailsSent.length];
      // console.log("emailToSend", emailToSend);
      // console.log("emailReminder", emailReminder.emailCampaign.name);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredReminders = data
    ? data.emailReminders.filter(
        (emailReminder) =>
          new Date(emailReminder.createdAt) >= getLastWeekDate() &&
          (dateFilter === null ||
            new Date(emailReminder.createdAt).toDateString() ===
              dateFilter.toDateString()) &&
          (emailReminder.coursePage.title
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
            emailReminder.emailCampaign?.name
              .toLowerCase()
              .includes(filter.toLowerCase()))
      )
    : [];

  const handleDateFilterChange = (date) => {
    setDateFilter(date);
  };

  const removeDateFilter = () => {
    setDateFilter(null);
  };

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
      <div>
        <label htmlFor="filter">Filter by Title or Campaign:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label htmlFor="dateFilter">Filter by Date:</label>
        <DatePicker
          id="dateFilter"
          selected={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>
      <button onClick={removeDateFilter} disabled={loading}>
        Remove Date Filter
      </button>
      <p>Total reminders: {filteredReminders.length}</p>
      {showReminders &&
        filteredReminders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((emailReminder, index) => (
            <div key={index}>
              <h3>
                {index + 1}. User: {emailReminder.user.name}{" "}
                {emailReminder.user.surname} - {emailReminder.user.email} –{" "}
                {emailReminder.id}
              </h3>
              <p>
                Email campaign: {emailReminder.emailCampaign?.name} /{" "}
                {emailReminder.emailCampaign?.id}
              </p>
              <p>Course page: {emailReminder.coursePage.title}</p>
              <p>Created at: {moment(emailReminder.createdAt).format("LLL")}</p>
              <p>Emails sent: {emailReminder.emailsSent}</p>
              <p>
                Lesson results:{" "}
                {[...emailReminder.user.lessonResults]
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .slice(0, 10)
                  .map((lr) => (
                    <li>
                      {lr.lesson.name} – {lr.progress} – {lr.updatedAt} –
                      {lr.lesson.coursePage.title}
                    </li>
                  ))}
              </p>
            </div>
          ))}
    </div>
  );
};

export default SendEmailReminders;
