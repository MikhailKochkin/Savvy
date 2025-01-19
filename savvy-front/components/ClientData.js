import { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import CreateClient from "./CreateClient";
import Client from "./Client";
import {
  ActionButton,
  SecondaryButton,
  NanoButton,
  Buttons,
  Row,
} from "./lesson/styles/DevPageStyles";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f3f4f5;
  width: 100%;

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 1000px;
  .total {
    width: 50%;
  }
  .search_area {
    display: flex;
    flex-direction: row;
    width: 900px;
    .search_form {
      width: 50%;
      margin-right: 50px;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 1000px;
  margin: 30px 0;
  .board_row {
    display: flex;
    flex-direction: row;

    width: 1000px;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    .board_TA {
      width: 30%;
      border-right: 1px solid #c4c4c4;
      padding: 10px;
    }
    .board_definition {
      width: 70%;
      padding: 10px;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ClientData = (props) => {
  const [clients, setClients] = useState(props.initial_clients);
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  let messaging = [
    {
      target_audience: "HR and Early Talent Team",
      problem_statement:
        "HR teams face challenges in attracting, onboarding, and retaining talent amidst fierce competition and rising salary expectations. ",
      value_proposition:
        "BeSavvy enables HR teams to streamline onboarding and training with interactive simulators that accelerate time-to-competence, improve skill retention, and strengthen the firm’s employer brand. Simulators can be used as virtual job simualtions or for onboarding and training purposes.",
      messages: [
        "Reduce time-to-hire with scalable onboarding solutions.",
        "Build a strong employer brand with innovative training approaches.",
        "Ensure consistent quality in new hires with systematic skill development.",
      ],
    },
    {
      target_audience:
        "Learning and Development Team and Training Principal/Partner",
      problem_statement:
        "L&D teams and training principals face challenges in delivering effective, scalable training that balances real-world application, compliance with regulations, and time efficiency (meaning that the direct involvement of senior lawyers is required). Traditional methods often result in inconsistent outcomes, reluctance to learn, limited skill retention, and reduced productivity.",
      value_proposition:
        "BeSavvy offers practical training simulators that standardise learning, enhance skill development, and deliver measurable outcomes while reducing the time required for traditional methods.",
      messages: [
        "Enhance skill development through simulators while minimising time away from billable work of both senior and junior lawyers.",
        "Accelerate the learning curve for junior lawyers by immersing them in real-world scenarios through practical simulations.",
        "Adopt the principle ‘practice makes permanent’ with interactive simulators that act as personal mentors, enabling repeated practice of real-world tasks.",
      ],
    },
    {
      target_audience: "Innovation Team",
      problem_statement:
        "Innovation teams often face resistance to adopting new legaltech tools and integrating them into existing workflows. Without effective training, these tools remain underutilised, leading to lost ROI.",
      value_proposition:
        "BeSavvy accelerates legaltech adoption by providing practical training simulators that reduce resistance to change, integrate tools into workflows, and maximise technology ROI.",
      messages: [
        "Accelerate adoption of new legaltech tools with effective training.",
        "Maximise ROI on technology investments through practical implementation.",
        "Reduce resistance to change with engaging, real-world simulations.",
      ],
    },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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

  const addClients = (data) => {
    let new_arr = [data].concat(clients);
    setClients([...new_arr]);
  };

  return (
    <Styles>
      <Container>
        <div className="total">
          <div className="search_area">
            <Row className="search_form">
              <div className="description">Search by tag</div>
              <div className="action_area">
                <input onChange={(e) => setTag(e.target.value)} />
                <Buttons gap="5px" margin="0">
                  <SecondaryButton onClick={(e) => search(tag)}>
                    Search
                  </SecondaryButton>
                  <ActionButton
                    onClick={(e) => setClients(props.initial_clients)}
                  >
                    Show All
                  </ActionButton>
                </Buttons>
              </div>
            </Row>
            <Row className="search_form">
              <div className="description">Search by email</div>
              <div className="action_area">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  name="email"
                  placeholder="..."
                />
                <SecondaryButton onClick={(e) => search2(email)}>
                  Search
                </SecondaryButton>
              </div>
            </Row>
          </div>
          {/* Page Buttons */}
        </div>
        <CreateClient addClients={addClients} />
        <Board>
          {messaging.map((m, i) => (
            <div className="board_row" key={i}>
              <div className="board_TA">
                <b> {m.target_audience}</b>
              </div>
              <div className="board_definition">
                <div>
                  <b>Problem Statement: </b>
                  {m.problem_statement}
                </div>
                <div>
                  <b>Value Proposition: </b>
                  {m.value_proposition}
                </div>
                <div>
                  <b>Messages:</b>
                  {m.messages.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Board>
        <div className="pagination">
          <Buttons gap="5px" margin="10px 0">
            {Array.from({ length: totalPages }, (_, index) => (
              <NanoButton
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </NanoButton>
            ))}
          </Buttons>
        </div>
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
            messaging={messaging}
          />
        ))}
      </Container>
    </Styles>
  );
};

export default ClientData;
