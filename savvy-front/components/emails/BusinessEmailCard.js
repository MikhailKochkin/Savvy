import { useState, memo } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import BusinessEmail from "./BusinessEmail";
import FollowUpEmail from "./FollowUpEmail";
import GeneralEmail from "./GeneralEmail";

const Row = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;
  form {
    input {
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
  .index {
    width: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sent {
    border-top: 1px solid #f3f4f5;
    padding-top: 15px;
    margin-top: 15px;
  }
  .name {
    width: 25%;
    .result {
      background-color: #f4a261;
      color: #14213d;
      padding: 2px 10px;
      display: inline-block;
      border-radius: 15px;
    }
  }
  .comment {
    width: 70%;
    padding: 0 2%;
    input {
      width: 400px;
      font-family: Montserrat;
    }
    h4 {
      margin: 0;
      margin-bottom: 10px;
    }

    .editor {
      font-size: 1.6rem;
      width: 95%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
      margin-bottom: 20px;
      @media (max-width: 800px) {
        width: 350px;
      }
    }
    button {
      margin-bottom: 5%;
    }
    textarea {
      font-family: Montserrat;
      /* padding: 0 5%;
      margin: 0 5%; */
      font-size: 1.6rem;
      border: none;
      width: 90%;
      height: 100px;
      white-space: pre-line;
      outline: 0;
    }
    .editor {
    }
  }
  .tags {
    min-width: 380px;
    padding-left: 20px;
    li {
      width: 100%;
    }
  }
  .message {
    margin-bottom: 30px;
    border-bottom: 1px solid lightgrey;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const UserCard = memo((props) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [followUp1Open, setFollowUp1Open] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [followUp3Open, setFollowUp3Open] = useState(false);

  return (
    <Row key={props.index} id={props.id}>
      <div className="index">{props.index + 1}.</div>
      <div className="name">
        {props.result && <div className="result">{props.result}</div>}
        <div>{props.name}</div>
        <div>{props.surname}</div>
        <div>{props.email}</div>
        <div>{props.firm}</div>
        <div>{props.comment}</div>
        <div className="sent">
          {props.sentEmailsTime?.length == 0
            ? "No sent messages"
            : props.sentEmailsTime?.map((s) => <li>{s}</li>)}
        </div>
        <div>Personal touch: {props.personalTouch}</div>
      </div>
      <div className="comment">
        <h3>Cold Email</h3>
        <button onClick={(e) => setFirstOpen(!firstOpen)}>
          Open Cold Email
        </button>
        {firstOpen && (
          <BusinessEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
          />
        )}
        <h3>Follow Up 1</h3>
        <button onClick={(e) => setFollowUp1Open(!followUp1Open)}>
          Open Follow Up 1
        </button>
        {followUp1Open && (
          <FollowUpEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
          />
        )}
        <h3>General Email</h3>
        <button onClick={(e) => setGeneralOpen(!generalOpen)}>
          Open General Email
        </button>
        {generalOpen && (
          <GeneralEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
          />
        )}
      </div>
    </Row>
  );
});

export default UserCard;
