import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import CreateClient from "./CreateClient";
import UserCard from "./UserCard";

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
  const [value, setValue] = useState(0); // integer state
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [tag, setTag] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculating the items to show based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // Calculating total number of pages
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  //   const sort = (val) => {
  //     console.log("val", val);
  //     const new_clients = clients.filter((c) => c.tags.includes(val));
  //     setClients(new_clients);
  //   };

  //   const chooseDate = (d) => {
  //     let clients_in_range = props.initial_clients.filter(
  //       (cl) => new Date(cl.createdAt) < new Date(d)
  //       // {
  //       //   let client_date = new Date(cl.createdAt);
  //       //   let chosendate = new Date(d);
  //       //   let week_before_date = new Date(d);

  //       //   week_before_date.setDate(chosendate.getDate() - 7);

  //       //   if (
  //       //     client_date.getTime() > week_before_date.getTime() &&
  //       //     client_date.getTime() < chosendate.getTime()
  //       //   ) {
  //       //     return cl;
  //       //   }
  //       // }
  //     );
  //     setClients(clients_in_range);
  //   };

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
    console.log("filtered_clients", filtered_clients);

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

  const sortByOrders = () => {
    let ordered_clients = [...props.initial_clients].filter(
      (cl) => cl.orders.length > 0
    );
    console.log("ordered_clients", ordered_clients);
    setClients([...ordered_clients]);
  };

  //   let clients_in_range = clients.filter((cl) => {
  //     let client_date = new Date(cl.createdAt);
  //     let chosendate = new Date(startDate);
  //     let week_before_date = new Date(startDate);

  //     week_before_date.setDate(chosendate.getDate() - 7);

  //     if (
  //       client_date.getTime() > week_before_date.getTime() &&
  //       client_date.getTime() < chosendate.getTime()
  //     ) {
  //       return cl;
  //     }
  //   });

  const addClients = (data) => {
    let new_arr = [data].concat(clients);
    setClients([...new_arr]);
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
        {/* <div>Заявок за выбранный период: {clients_in_range.length}</div> */}
        {/* <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setStartDate(date);
            return chooseDate(date);
          }}
        /> */}
        {/* <button onClick={(e) => setValue((value) => value + 1)}>
          Обновить данные
        </button> */}
        <button onClick={(e) => sortClientsByActivity()}>
          Сортировать по последней активности
        </button>
        <br />
        <button onClick={(e) => setClients(props.initial_clients)}>
          Показать всех пользователей
        </button>
        <br />
        <button onClick={(e) => sortByOrders()}>Показать с заказами</button>
        <div>
          <input onChange={(e) => setTag(e.target.value)} />
          <button onClick={(e) => search(tag)}>Искать по тегам</button> <br />
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
      {/* <CreateClient addClients={addClients} /> */}
      {currentItems
        .filter((user) => user.email !== "mi.kochkin@ya.ru")
        .map((c, i) => (
          <UserCard
            id={c.id}
            //   sort={sort}
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
            //   communication_history={c.communication_history}
            //   comment={c.comment}
            tags={c.tags}
            number={c.number}
            createdAt={c.createdAt}
            updatedAt={c.updatedAt}
            //   url={c.type}
            //   communication_medium={c.communication_medium}
          />
        ))}
    </Styles>
  );
};

export default ClientData;
