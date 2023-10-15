import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailList from "../../businessEmailList.js";
import emailSQEList from "../../sqeList.js";

import BusinessEmailCard from "./BusinessEmailCard";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f3f4f5;
  width: 100%;
  .total {
    width: 70%;
    margin: 20px 0;
    button {
    }
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

const ClientData = (props) => {
  const [clients, setClients] = useState(emailList ? emailList : []);
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

  return (
    <Styles>
      <div className="total">
        <div>Всего: {clients.length}</div>
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
        <button onClick={(e) => setClients(emailList)}>Law Firms</button>
        <button onClick={(e) => setClients(emailSQEList)}>
          Training Companies
        </button>
      </div>
      {currentItems.map((c, i) => {
        const globalIndex = indexOfFirstItem + i;
        return (
          <BusinessEmailCard
            id={c.id}
            key={globalIndex}
            index={globalIndex}
            name={c.name}
            comment={c.comment}
            surname={c.surname}
            result={c.result}
            personalTouch={c.personalTouch}
            connection={c.connection}
            firm={c.firm}
            sentEmailsTime={c.sentEmailsTime}
            email={c.email}
          />
        );
      })}
    </Styles>
  );
};

export default ClientData;
