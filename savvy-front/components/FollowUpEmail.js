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

const DynamicLoadedEditor = dynamic(import("./editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const FollowUpEmail = (props) => {
  const [personalTouch, setPersonalTouch] = useState(props.personalTouch);
  const [trigger, setTrigger] = useState(
    // `<p>I also wanted to add, in case you are [какой-то тригер], I’d suggest [что вы «забыли» упомянуть в первом письме]. Could this be relevant to you?</p>`
    `<p>I sent you an email on September, 13 telling you about BeSavvy. It is a platform that empowers law firms to create their own training simulations to help trainees and apprentices develop practical skills (proofreading, drafting, etc.). Simulations speed up onboarding and training and save time for associates and partners.</p><p>I also wanted to add, that we have developed <b>a short M&A deal simulator specifically for ${props.firm}</b>. It teaches how to structure a deal, analyze a term sheet, and communicate with a client.</p><p>Please reply to this message, and I'll send you a link. I'd appreciate your feedback on whether our technology could enhance skill adoption among trainees and associates at ${props.firm}.</p>`
  );
  console.log("trigger", trigger);
  const [subject, setSubject] = useState(
    // `Re: ${props.firm} x BeSavvy | simulation training platform`
    "Re: Fresh view: best lawyers get trained with simulation tech"
  );

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
      <p>Dear {props.name},</p>
      <Editor>
        <DynamicLoadedEditor
          getEditorText={myCallback2}
          value={trigger}
          name="text"
        />
      </Editor>
      <p>I look forward to hearing from you!</p>
      <button
        onClick={async (e) => {
          const res = await sendBusinessEmail({
            variables: {
              name: props.name,
              connection: trigger,
              subject: subject,
              email: props.email,
              firm: props.firm,
              type: "follow_up_1",
            },
          });
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </Styles>
  );
};

export default FollowUpEmail;
