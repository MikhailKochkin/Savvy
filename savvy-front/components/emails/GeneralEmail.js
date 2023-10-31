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
  div {
    width: 100%;
  }
`;

const Editor = styled.div`
  display: "block";
  font-size: 1.6rem;
  width: 700px;
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
  const [trigger, setTrigger] = useState(
    `<p>Dear ${props.name},</p><p>Following up on my previous email, I wanted to reiterate our interest in partnering with ${props.firm}. We are <b>a simulation training platform that helps law students develop practical skills</b> like legal analysis and problem-solving.</p><p>We're looking to collaborate with forward-thinking legal professionals like yourself who are open to new technologies.</p><p>To demonstrate the effectiveness of our AI-powered training simulators, I'd like to offer <b>to build a custom simulator for your law program</b>, free of charge. Rest assured, this will require minimal time investment on your part.</p><p>If you're interested, let's schedule a demo. Looking forward to your reply.</p><p>Kind regards,</p>`

    // `<p>Dear ${props.name},</p><p>I'm Mike, the CEO of BeSavvy. Our simulation training platform can <b>save your senior associates considerable time on training junior lawyers</b>.</p><p>As a former lawyer myself, I understand that senior lawyers often spend a great deal of their work time mentoring juniors—time that could be better spent on high-value tasks. This conventional "on-the-job training" is common but inefficient.</p><p>At BeSavvy, we've developed AI-powered simulations that can be created in just a few minutes. These programs not only teach practical skills but also track progress, <b>reducing the time senior lawyers spend on mentoring by up to 80%</b>.</p><p>Could you please connect me with your team member responsible for Learning and Development? <b>I will show them the demo and build a free simulator</b> so that they can see the efficiency of BeSavvy.</p><p>Kind regards,</p>`
  );
  // <p>I'm Mike, the CEO of BeSavvy Lawyer.</p><p>We specialize in:</p><ul><li>Cutting law firms' training costs by 25%;</li><li>Accelerating the time it takes for trainee lawyers / associates <b>to start billable work by 67%</b>.</li></ul><p>How do we do it?</p><ul><li>We empower law firms to provide AI-powered simulation training that collects comprehensive data on how your lawyers develop practical skills.</li><li>Your Learning and Development team can use this data to accurately determine when your lawyers can be given billable work (and what kind of billable work).</li></ul><p>Check out our demo to see how it works: <a href="https://besavvy.app/demo?lang=eng" target="_blank">BeSavvy Demo</a>.</p><p>If this aligns with your goals, I'd love to discuss how we can specifically help your firm in a brief call with your L&D team.</p><p>Best regards,</p>

  const [subject, setSubject] = useState(
    props.subject ? props.subject : "How to use AI in legal training?"
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
