import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserCard from "./UserCard";
import emailGroups from "../emailGroups";

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

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: String!, $tags: [String]) {
    updateUser(id: $id, tags: $tags) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f3f4f5;
  width: 100%;
  .total {
    width: 80%;
    margin: 20px 0;
  }
  .create {
    background: #fff;
    width: 90%;
    margin-bottom: 20px;
    padding: 10px;
    input {
      margin-right: 30px;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Tag = styled.div`
  border: 1px solid blue;
  cursor: pointer;
  color: blue;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: center;
  align-items: center;
  transition: ease-in 0.2s;
  &:hover {
    border: 2px solid blue;
  }
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 15%;
  }
  .email {
    width: 20%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 45%;
    .editor {
      font-size: 1.6rem;
      width: 95%;
      margin-left: 5%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
      @media (max-width: 800px) {
        width: 350px;
      }
    }
    button {
      margin-left: 5%;
      margin-bottom: 5%;
    }
    textarea {
      font-family: Montserrat;
      padding: 0 5%;
      margin: 0 5%;
      border: none;
      width: 90%;
      height: 100px;
      white-space: pre-line;
    }
    .editor {
    }
  }
  .tags {
    padding-left: 20px;
    li {
      width: 100%;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const ClientData = (props) => {
  const [clients, setClients] = useState(props.initial_clients);
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [tag, setTag] = useState("");
  const [campaign, setCampaign] = useState("");
  const [emailType, setEmailType] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [number, setNumber] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const [updateUser, { data: data2, loading: loading2, error: error2 }] =
    useMutation(UPDATE_USER_MUTATION);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculating the items to show based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // Calculating total number of pages
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const searchWithoutTags = () => {
    let filtered_clients = clients.filter((c) => c.tags.length == 0);
    setClients(filtered_clients);
  };

  const search = (val) => {
    let filtered_clients = clients.filter(
      (c) => c.tags.includes(val) || c.tags.includes(val.toLowerCase())
    );
    setClients(filtered_clients);
  };

  const search2 = (val) => {
    let filtered_clients = props.initial_clients.filter(
      (c) => c.email == val.toLowerCase()
    );
    setClients(filtered_clients);
  };

  const search3 = (val) => {
    function filterByCoursePage(objects, coursePageId) {
      return objects.filter((obj) => {
        // check if obj, obj.emailReminders or obj.emailReminders[0] is not null or undefined
        if (obj && obj.emailReminders) {
          // Check if the coursePage property exists and if its id matches the coursePageId parameter for any emailReminder
          return obj.emailReminders.some(
            (reminder) =>
              reminder.coursePage && reminder.coursePage.id === coursePageId
          );
        }
        return false;
      });
    }
    let filtered_clients = filterByCoursePage(props.initial_clients, val);

    setClients(filtered_clients);
  };

  const search4 = (campaign) => {
    let campaign_users = props.initial_clients.filter(
      (user) =>
        user.traffic_sources &&
        user.traffic_sources.visitsList &&
        user.traffic_sources.visitsList.some(
          (visit) =>
            visit && visit.utm_campaign && visit.utm_campaign === campaign
        )
    );
    setClients(campaign_users);
  };

  const search5 = (val) => {
    let filtered_clients = props.initial_clients.filter((c) =>
      String(c.number).includes(String(val))
    );
    setClients(filtered_clients);
  };

  const searchWithPhones = (val) => {
    let filtered_clients = props.initial_clients.filter((c) => c.number);
    setClients(filtered_clients);
  };

  const search6 = (val) => {
    let filtered_clients = props.initial_clients.filter((client) =>
      client.emailReminders.some((reminder) =>
        reminder.emailCampaign.name.includes(val)
      )
    );
    setClients(filtered_clients);
  };

  const search7 = () => {
    function filterByCoursePage(objects, startTime, endTime) {
      return objects.filter((obj) => {
        // check if obj, obj.emailReminders, obj.emailReminders[0] or obj.createdAt is not null or undefined
        if (obj && obj.createdAt) {
          // Parse obj.createdAt into a Date object
          const createdAtDate = new Date(obj.createdAt);

          // Check if createdAtDate is within the range of startTime and endTime
          const isWithinDateRange =
            createdAtDate >= new Date(startTime) &&
            createdAtDate <= new Date(endTime);

          return isWithinDateRange;
        }
        return false;
      });
    }

    let filtered_clients = filterByCoursePage(
      props.initial_clients,
      startTime,
      endTime
    );
    setClients(filtered_clients);
  };

  const sortClientsByActivity = () => {
    setClients(
      [...clients].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
  };

  function findNewestItem(array) {
    if (array.length === 0) {
      return null;
    }

    return array.reduce((newest, item) => {
      return new Date(newest.createdAt) > new Date(item.createdAt)
        ? newest
        : item;
    });
  }

  function getNextEmailItem(object, subject) {
    const { emails } = object;
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].subject === subject) {
        return emails[i + 1] || emails[0];
      }
    }
    return emails[0];
  }

  // console.log("clients", clients);

  function addTagToClient(coursePageId, tag) {
    clients.forEach((client) => {
      // Check if 'lessonResults' array contains a lesson with 'coursePage.id' equal to 'coursePageId'
      const hasLesson = client.lessonResults.some(
        (lessonResult) => lessonResult.lesson.coursePage.id === coursePageId
      );
      // const newTags = ["Английский", "IQL"];
      // console.log("email", client.email, client.tags);
      // updateUser({
      //   variables: {
      //     id: client.id,
      //     tags: newTags,
      //   },
      // });
      let num = 0;
      if (
        hasLesson
        // && !client.tags.includes("corp") &&
        // !client.tags.includes("Corp")
        // && !client.tags.includes("английский")
        // !client.tags.includes("IQL") &&
        // !client.tags.includes("MQL") &&
        // !client.tags.includes("SQL")
      ) {
        // Add the new tag to the 'tags' array
        const newTags = [...client.tags, tag, "IQL"];
        // Update the client
        // console.log("client", client);
        // console.log("newTags", newTags);
        num = num + 1;
        updateUser({
          variables: {
            id: client.id,
            tags: newTags,
          },
        });
      }
    });
  }

  function isNewestItemMoreThan48HoursOld(newestItem) {
    if (newestItem === null) {
      return true;
    }

    let createdAtDate = new Date(newestItem.createdAt);
    let currentDate = new Date();

    // Get the difference in milliseconds
    let difference = currentDate - createdAtDate;

    // Convert the difference from milliseconds to hours
    let differenceInHours = difference / 1000 / 60 / 60;

    return differenceInHours > 80;
  }

  const send = () => {
    if (emailType == "") {
      alert("Выберите тему писем");
      return;
    }
    let num = 0;
    clients.map((c) => {
      let last_email = findNewestItem(c.messages);
      let next_email = getNextEmailItem(
        emailGroups.find((el) => el.name === emailType),
        last_email?.subject
      );

      if (isNewestItemMoreThan48HoursOld(last_email) && next_email) {
        console.log("next_email", next_email);

        num = num + 1;
        const res = sendMessage({
          variables: {
            userId: c.id,
            text: next_email.text,
            subject: next_email.subject,
          },
        });
      }
    });
    console.log("Число отправленных писем: ", num);
  };

  const sortByOrders = () => {
    let ordered_clients = [...props.initial_clients]
      .filter((cl) => cl.orders.length > 0)
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
    setClients([...ordered_clients]);
  };

  let MQL_clients = [...props.initial_clients].filter(
    (cl) => cl.tags.includes("MQL") || cl.tags.includes("mql")
  );
  let IQL_clients = [...props.initial_clients].filter(
    (cl) => cl.tags.includes("IQL") || cl.tags.includes("iql")
  );
  let SQL_clients = [...props.initial_clients].filter(
    (cl) => cl.tags.includes("SQL") || cl.tags.includes("sql")
  );

  return (
    <Styles>
      <div className="total">
        <div>Всего пользователей: {props.initial_clients.length}</div>
        <div>IQL: {IQL_clients.length}</div>
        <div>MQL: {MQL_clients.length}</div>
        <div>SQL: {SQL_clients.length}</div>
        <button
          onClick={(e) => addTagToClient("ck4n47a2j01jg0790gspxqxju", "ГП")}
        >
          Add tag to client
        </button>
        <button onClick={(e) => setShowTags(!showTags)}>Show Tags</button>
        {showTags && (
          <div>
            <li>
              По предметам: английский, corp, ГП, Школа, Арбитражный_процесс
            </li>
            <li>По активности: Active, Email_Inactive</li>
            <li>По развитию: Talk, July_Week1</li>
          </div>
        )}
        <button onClick={(e) => sortClientsByActivity()}>
          Сортировать по последней активности
        </button>
        <br />
        <button onClick={(e) => setClients(props.initial_clients)}>
          Показать всех пользователей
        </button>
        <button onClick={(e) => searchWithPhones(clients)}>
          Показать с номером
        </button>
        <br />
        <button onClick={(e) => sortByOrders()}>Показать с заказами</button>
        <div>
          <input onChange={(e) => setTag(e.target.value)} />
          <button onClick={(e) => search(tag)}>Искать по тегам</button> <br />
          <button onClick={(e) => searchWithoutTags()}>
            Показать без тегов
          </button>{" "}
          <br />
          <input onChange={(e) => setStartTime(e.target.value)} />
          <input onChange={(e) => setEndTime(e.target.value)} />
          <button onClick={(e) => search7(startTime, endTime)}>
            Искать до даты
          </button>{" "}
          <br />
          <input onChange={(e) => setNumber(e.target.value)} />
          <button onClick={(e) => search5(number)}>
            Искать по номеру
          </button>{" "}
          <br />
          <input onChange={(e) => setCampaignName(e.target.value)} />
          <button onClick={(e) => search6(campaignName)}>
            Искать по email кампании
          </button>{" "}
          <br />
          <input onChange={(e) => setCampaign(e.target.value)} />
          <button onClick={(e) => search4(campaign)}>
            Искать по рекламным кампаниям
          </button>{" "}
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            name="email"
            placeholder="..."
          />
          <button onClick={(e) => search2(email)}>Искать по почте</button>
          <br />
          <input
            onChange={(e) => setCourseId(e.target.value)}
            value={courseId}
            type="text"
            name="email"
            placeholder="..."
          />
          <button onClick={(e) => search3(courseId)}>
            Искать по курсу (EmailReminder)
          </button>
          <br />
          <button onClick={(e) => send()}>Отправить имейлы</button>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
          >
            {emailGroups.map((g) => (
              <option value={g.name}>{g.name}</option>
            ))}
          </select>
          <div>Всего: {clients.length}</div>
          {/* Page Buttons */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {currentItems
        // .filter((user) => user.email !== "mi.kochkin@ya.ru")
        .map((c, i) => (
          <>
            <UserCard
              id={c.id}
              key={c.id}
              index={i}
              name={c.name}
              surname={c.surname}
              email={c.email}
              comment={c.comment}
              messages={c.messages}
              orders={c.orders}
              new_subjects={c.new_subjects}
              traffic_sources={c.traffic_sources}
              lessonResults={c.lessonResults}
              challengeResults={c.challengeResults}
              tags={c.tags}
              number={c.number}
              createdAt={c.createdAt}
              updatedAt={c.updatedAt}
            />
          </>
        ))}
    </Styles>
  );
};

export default ClientData;
