import React, { useState } from "react";
import styled from "styled-components";
import BusinessEmailCard from "./BusinessEmailCard";
import parse from "html-react-parser";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px;
  div {
    width: 70%;
    p {
      margin: 10px 0;
    }
    a {
      text-decoration: underline;
      font-weight: 600;
    }
  }
  .company_name {
    font-size: 2rem;
    font-weight: 600;
    button {
      border: none;
      background: none;
      font-size: 2rem;
    }
  }
  .result {
    width: auto;
    display: inline-block;
    background-color: #f4a261;
    color: #14213d;
    padding: 2px 10px;
    border-radius: 15px;
    margin: 15px 0;
  }
`;

const Company = (props) => {
  const [open, setOpen] = useState(false);
  const { company, index, emails } = props;
  return (
    <Styles>
      <div className="company_name">
        {index + 1}. {company.name} – {emails.length}{" "}
        <button onClick={(e) => setOpen(!open)}>{open ? "⬆️" : "⬇️"}</button>
      </div>
      <div>
        <b>Comment:</b> {parse(company.comment)}
      </div>
      <div>
        <div className="result">{company.result}</div>
      </div>
      <div>
        {company?.sentEmailsTime?.map((time) => (
          <li>{time}</li>
        ))}
      </div>
      {open &&
        emails.map((c, i) => {
          return (
            <BusinessEmailCard
              key={i}
              index={i}
              name={c.name}
              comment={c.comment}
              surname={c.surname}
              subject={c.subject}
              result={c.result}
              linkedin={c.linkedin}
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

export default Company;
