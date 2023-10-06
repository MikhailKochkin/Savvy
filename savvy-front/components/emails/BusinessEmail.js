import { useState, memo } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $subject: String
    $name: String
    $email: String
    $firm: String
    $personalTouch: String
    $connection: String
    $type: String
  ) {
    sendBusinessEmail(
      subject: $subject
      name: $name
      email: $email
      firm: $firm
      personalTouch: $personalTouch
      connection: $connection
      type: $type
    ) {
      name
    }
  }
`;

const Styles = styled.div`
  margin: 15px 0;
`;

const Editor = styled.div`
  display: "block";
  font-size: 1.6rem;
  width: 95%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  margin: 10px 0;
  font-size: 1.6rem;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const BusinessEmail = (props) => {
  const [personalTouch, setPersonalTouch] = useState(props.personalTouch);
  const [connection, setConnection] = useState(
    `I noticed ` +
      props.connection +
      ` At BeSavvy, we use simulation training to build digital portraits of lawyers' skill sets. That's why I've decided to write you.`
  );
  console.log("props", props.name);
  const [subject, setSubject] = useState(
    `Enhance law firm training with simulation technologies`
  );

  const myCallback2 = (dataFromChild) => {
    setConnection(dataFromChild);
  };

  const [sendBusinessEmail, { data, loading, error }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  return (
    <Styles className="letter">
      <h4>Subject</h4>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      <h4>Email</h4>
      <p>Dear {props.name}</p>
      <Editor>
        <textarea
          value={connection}
          onChange={(e) => myCallback2(e.target.value)}
        />
      </Editor>
      <p>
        What are training simulators? They're online environments where lawyers
        can practice real-world tasks like Due Diligence or M&A projects,
        receive personalized feedback, and improve rapidly.
      </p>
      <p>
        <b>
          Our team prepared a report on how simulators can increase Employee
          Skill Advancement rate by 59% and triple Training ROI in your firm.
        </b>{" "}
        Please reply to this message and I will send you the link.
      </p>

      <button
        onClick={async (e) => {
          const res = await sendBusinessEmail({
            variables: {
              name: props.name,
              connection: connection,
              personalTouch: personalTouch,
              subject: subject,
              email: props.email,
              firm: props.firm,
              type: "initial",
            },
          });
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </Styles>
  );
};

export default BusinessEmail;
