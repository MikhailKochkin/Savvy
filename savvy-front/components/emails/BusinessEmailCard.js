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
  width: 100%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 2px solid #eff0f1;
  border-top: 2px solid #fff;
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
  .email {
    border-bottom: 2px solid #f3f4f5;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
  .sent {
    border-top: 2px solid #f3f4f5;
    padding-top: 15px;
    margin-top: 15px;
  }
  .name {
    width: 30%;
    border-right: 2px solid #eff0f1;
    padding: 10px;
    div {
      width: 100%;
    }
    .result {
      width: auto;
      background-color: #ffde01;
      color: #14213d;
      padding: 2px 10px;
      display: inline-block;
      border-radius: 15px;
      margin-bottom: 15px;
    }
  }
  .comment {
    width: 65%;
    padding: 0 2%;
    .emails {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
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
  const [generalOpen, setGeneralOpen] = useState(true);
  const [followUp3Open, setFollowUp3Open] = useState(false);
  const [allLinks, setAllLinks] = useState(false);

  return (
    <Row key={props.index} id={props.id}>
      <div className="index">{props.index + 1}.</div>
      <div className="name">
        {props.result && <div className="result">{props.result}</div>}
        <div>
          <b>
            {props.name} {props.surname}
          </b>
        </div>
        <div>
          {" "}
          {props.comment} at {props.firm}
        </div>
        {props.linkedin && (
          <button>
            <a href={props.linkedin} target="_blank"></a>To Linkedin
          </button>
        )}
        <div className="email">
          {" "}
          <b>{props.email}</b>
        </div>

        <div>Personal touch: {props.personalTouch}</div>
        <div className="sent">
          {props.sentEmailsTime?.length == 0
            ? "No sent messages"
            : props.sentEmailsTime?.map((s) => <li>{s}</li>)}
        </div>
      </div>
      <div className="comment">
        <div className="emails">
          <div>
            <h3>Cold Email</h3>
            <button onClick={(e) => setFirstOpen(!firstOpen)}>
              Open Cold Email
            </button>
          </div>
          <div>
            <h3>Follow Up 1</h3>
            <button onClick={(e) => setFollowUp1Open(!followUp1Open)}>
              Open Follow Up 1
            </button>
          </div>
          <div>
            <h3>General Email</h3>
            <button onClick={(e) => setGeneralOpen(!generalOpen)}>
              Open General Email
            </button>
            <br />
            <button onClick={(e) => setAllLinks(!allLinks)}>
              Open All Links Email
            </button>
          </div>
        </div>
        {followUp1Open && (
          <FollowUpEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
          />
        )}
        {firstOpen && (
          <BusinessEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
          />
        )}
        {generalOpen && (
          <GeneralEmail
            email={props.email}
            name={props.name}
            firm={props.firm}
            connection={props.connection}
            subject={props.subject}
          />
        )}
        {allLinks && (
          <>
            <p>Hello {props.name},</p>
            <p>
              This is Mike. I am the CEO of BeSavvy Lawyer, a platform that
              decreases law firms' spendings on training by 25%.
            </p>
            <p>
              To do this, we provide simulation training that collects massive
              data on how your lawyers develop new skills. Then Learning and
              Development team uses this data to determine if the lawyer is
              ready for billable work or needs personalized support in some
              areas.
            </p>
            <p>
              Our goal is{" "}
              <b>
                to get your trainee lawyers and associates to billable work 67%
                quicker
              </b>{" "}
              without inefficent webinars. Check out our demo to learn how we do
              it: https://besavvy.app/demo?lang=eng.
            </p>
            <p>
              If this is something you might use in your firm, I would be happy
              to have a call with your L&D team to discuss it further.
            </p>
            <p>Best regards,</p>
          </>
        )}
      </div>
    </Row>
  );
});

export default UserCard;
