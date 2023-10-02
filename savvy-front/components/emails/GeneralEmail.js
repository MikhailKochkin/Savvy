import { useState, memo } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";

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

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const GeneralEmail = (props) => {
  const [trigger, setTrigger] = useState(`<p>Dear ${props.name},</p><p></p>`);
  const [subject, setSubject] = useState("Re:");

  const myCallback2 = (dataFromChild) => {
    setTrigger(dataFromChild);
  };

  const [sendBusinessEmail, { data, loading, error }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  return (
    <Styles className="letter">
      <h4>Subject</h4>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      <h4>Email</h4>
      <Editor>
        <DynamicLoadedEditor
          getEditorText={myCallback2}
          value={trigger}
          name="text"
        />
      </Editor>
      <button
        onClick={async (e) => {
          const res = await sendBusinessEmail({
            variables: {
              name: props.name,
              connection: trigger,
              subject: subject,
              email: props.email,
              firm: props.firm,
              type: "general",
            },
          });
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </Styles>
  );
};

export default GeneralEmail;
