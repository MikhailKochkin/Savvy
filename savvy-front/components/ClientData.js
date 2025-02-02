import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CreateClient from "./CreateClient";
import Client from "./Client";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION(
    $id: String!
    $communication_history: ClientMessages
  ) {
    sendBusinessClientEmail(
      id: $id
      communication_history: $communication_history
    ) {
      id
    }
  }
`;

const UPDATE_CLIENT_MUTATION2 = gql`
  mutation UPDATE_CLIENT_MUTATION2($id: String!, $tags: [String]) {
    updateBusinessClient(id: $id, tags: $tags) {
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
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [emailType, setEmailType] = useState("");
  const [value, setValue] = useState(0); // integer state
  const [tag, setTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [sendBusinessClientEmail, { updated_data }] = useMutation(
    UPDATE_CLIENT_MUTATION
  );

  const [updateBusinessClient, { updated_data2 }] = useMutation(
    UPDATE_CLIENT_MUTATION2
  );

  function addTagToClient(coursePageId, tag) {
    clients.forEach((client) => {
      // Check if 'type' exists and contains the 'coursePageId'
      if (
        client.type &&
        client.type.includes(coursePageId) &&
        !client.tags.includes("Школа")
      ) {
        // Add the new tag to the 'tags' array
        const newTags = [...client.tags, tag];
        // console.log("client.type", client.type, newTags);
        // Update the client
        updateBusinessClient({
          variables: {
            id: client.id,
            tags: newTags,
          },
        });
      }
    });
  }

  // Calculating the items to show based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // Calculating total number of pages
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const sort = (val) => {
    const new_clients = clients.filter((c) => c.tags.includes(val));
    setClients(new_clients);
  };

  const chooseDate = (d) => {
    let clients_in_range = props.initial_clients.filter(
      (cl) => new Date(cl.createdAt) < new Date(d)
      // {
      //   let client_date = new Date(cl.createdAt);
      //   let chosendate = new Date(d);
      //   let week_before_date = new Date(d);

      //   week_before_date.setDate(chosendate.getDate() - 7);

      //   if (
      //     client_date.getTime() > week_before_date.getTime() &&
      //     client_date.getTime() < chosendate.getTime()
      //   ) {
      //     return cl;
      //   }
      // }
    );
    setClients(clients_in_range);
  };

  const search = (val) => {
    let filtered_clients = clients.filter((c) => c.tags.includes(val));
    setClients(filtered_clients);
  };

  const search2 = (val) => {
    let filtered_clients = props.initial_clients.filter(
      (c) => c.email == val.toLowerCase()
    );
    setClients(filtered_clients);
  };

  let clients_in_range = clients.filter((cl) => {
    let client_date = new Date(cl.createdAt);
    let chosendate = new Date(startDate);
    let week_before_date = new Date(startDate);

    week_before_date.setDate(chosendate.getDate() - 7);

    if (
      client_date.getTime() > week_before_date.getTime() &&
      client_date.getTime() < chosendate.getTime()
    ) {
      return cl;
    }
  });

  const addClients = (data) => {
    let new_arr = [data].concat(clients);
    setClients([...new_arr]);
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

  function isNewestItemMoreThan48HoursOld(newestItem) {
    if (newestItem === null) {
      return true;
    }

    let createdAtDate = new Date(newestItem.date);
    let currentDate = new Date();

    // Get the difference in milliseconds
    let difference = currentDate - createdAtDate;

    // Convert the difference from milliseconds to hours
    let differenceInHours = difference / 1000 / 60 / 60;

    return differenceInHours > 80;
  }

  // const send = () => {
  //   if (emailType == "") {
  //     alert("Выберите тему писем");
  //     return;
  //   }
  //   clients.map((c) => {
  //     let last_email = findNewestItem(
  //       c.communication_history && c.communication_history.messages
  //         ? c.communication_history.messages
  //         : []
  //     );
  //     let next_email = getNextEmailItem(
  //       emailGroups.find((el) => el.name === emailType),
  //       last_email?.subject
  //     );

  //     if (isNewestItemMoreThan48HoursOld(last_email) && next_email) {
  //       let mess = c.communication_history
  //         ? [
  //             ...c.communication_history.messages,
  //             {
  //               message: next_email.text,
  //               date: new Date().toISOString(),
  //               subject: next_email.subject,
  //             },
  //           ]
  //         : [
  //             {
  //               message: next_email.text,
  //               date: new Date().toISOString(),
  //               subject: next_email.subject,
  //             },
  //           ];
  //       const res = sendBusinessClientEmail({
  //         variables: {
  //           id: c.id,
  //           communication_history: {
  //             messages: mess,
  //           },
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <Styles>
      <div className="total">
        <div>Всего заявок: {props.initial_clients.length}</div>
        <div>Заявок за выбранный период: {clients_in_range.length}</div>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setStartDate(date);
            return chooseDate(date);
          }}
        />
        <button onClick={(e) => setValue((value) => value + 1)}>
          Обновить данные
        </button>
        <button onClick={(e) => setClients(props.initial_clients)}>
          Показать всех клиентов
        </button>
        <button onClick={(e) => addTagToClient("school", "Школа")}>
          Add tag to client
        </button>
        <div>
          <input onChange={(e) => setTag(e.target.value)} />
          <button onClick={(e) => search(tag)}>Искать по тегам</button>
        </div>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            name="email"
            placeholder="..."
          />
          <button onClick={(e) => search2(email)}>Искать по почте</button>
        </div>
        <br />
        <button onClick={(e) => send()}>Отправить имейлы</button>
        <select
          value={emailType}
          onChange={(e) => setEmailType(e.target.value)}
        >
          {/* {emailGroups.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))} */}
        </select>
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
      <CreateClient addClients={addClients} />
      {currentItems.map((c, i) => (
        <Client
          id={c.id}
          sort={sort}
          key={c.id}
          index={i}
          name={c.name}
          surname={c.surname}
          email={c.email}
          communication_history={c.communication_history}
          comment={c.comment}
          tags={c.tags}
          number={c.number}
          createdAt={c.createdAt}
          url={c.type}
          communication_medium={c.communication_medium}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
