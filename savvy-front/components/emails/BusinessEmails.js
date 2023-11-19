import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { companyList, emailList } from "../../businessEmailList.js";
import { uniList, emailUniList } from "../../lawschool.js";
import Company from "./Company";
import emailSQEList from "../../sqeList.js";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $subject: String
    $name: String
    $email: String
    $firm: String
    $connection: String
    $type: String
  ) {
    sendBusinessEmail(
      subject: $subject
      name: $name
      email: $email
      firm: $firm
      connection: $connection
      type: $type
    ) {
      name
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
  .floating {
  }
  .total {
    width: 70%;
    margin: 20px 0;
    /* position: -webkit-sticky;
    position: sticky; */
    top: 0%;
    background: #f3f4f5;
    border: 1px solid grey;
    padding: 30px 0;
    padding-left: 20px;
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

const EmailBox = styled.div`
  width: 660px;
  input {
    padding: 3px 10px;
    margin: 10px 0;
    width: 360px;
  }
`;

const Editor = styled.div`
  display: "block";
  font-size: 1.6rem;
  width: 700px;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #fff;
  outline: 0;
  padding: 0.5%;
  margin: 10px 0;
  font-size: 1.6rem;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Buttons = styled.div`
  width: 70%;
  border-top: 1px dashed grey;
  padding-top: 25px;
  margin-top: 25px;
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const ClientData = (props) => {
  const [clients, setClients] = useState(emailList ? emailList : []);
  const [addressees, setAddressees] = useState([emailList ? emailList : []]);
  const [organizations, setOrganizations] = useState(
    companyList ? [...companyList] : []
  );
  const [subject, setSubject] = useState();
  const [tags, setTags] = useState(props.tags);
  const [text, setText] = useState();
  const [orgList, setOrgList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [sendBusinessEmail, { data, loading, error }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const myCallback2 = (dataFromChild) => {
    setText(dataFromChild);
  };
  // console.log("lawSchoolList", lawSchoolList);
  // Calculating the items to show based on the current page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // Calculating total number of pages
  // const totalPages = Math.ceil(clients.length / itemsPerPage);

  const addOrgList = (name) => {
    setOrgList([...orgList, name]);
    let new_clients = clients;
    let filteredClients = new_clients.filter((el) => orgList.includes(el.firm));

    setAddressees(filteredClients);
  };
  console.log("orgList", orgList);
  console.log("addressees", addressees);

  const send = () => {
    addressees.map(async (c) => {
      // console.log("c", c.name, c.email, text);
      if (c.email) {
        const res = await sendBusinessEmail({
          variables: {
            name: c.name,
            connection: text,
            subject: subject,
            email: c.email,
            firm: c.firm,
            type: "general",
          },
        });
      }
    });
    console.log("Число отправленных писем: ", addressees.length);
  };

  return (
    <Styles>
      <div className="total">
        <div className="floating">
          <div>Всего: {clients.length}</div>
          <div>Адресаты: {addressees.length}</div>
          <EmailBox>
            <input
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
            <Editor>
              <DynamicLoadedEditor
                getEditorText={myCallback2}
                value={text}
                name="text"
              />
            </Editor>
          </EmailBox>
          <button onClick={(e) => send()}>Отправить имейлы</button>
          <button onClick={(e) => setAddressees([])}>Обнулить</button>
        </div>
        <br />
        {/* <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
        <button
          onClick={(e) => {
            setClients(emailList);
            setOrganizations(companyList);
          }}
        >
          Law Firms
        </button>
        <button
          onClick={(e) => {
            setOrganizations([
              {
                name: "Training Center",
                comment: "",
                result: "",
                country: "",
                sentEmailsTime: ["October 22"],
              },
            ]);
            setClients(emailSQEList);
          }}
        >
          Training Companies
        </button>
        <button
          onClick={(e) => {
            setClients(emailUniList);
            setOrganizations(uniList);
          }}
        >
          Law Schools
        </button>
      </div>

      {organizations.map((c, i) => {
        return (
          <>
            <Buttons>
              <button onClick={(e) => addOrgList(c.name)}>Add</button>
            </Buttons>
            <Company
              index={i}
              company={c}
              emails={clients.filter(
                (item) => item.firm?.toLowerCase() == c.name.toLowerCase()
              )}
            />
          </>
        );
      })}
      {/* {currentItems.map((c, i) => {
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
      })} */}
    </Styles>
  );
};

export default ClientData;
