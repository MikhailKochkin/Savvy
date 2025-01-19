import dynamic from "next/dynamic";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import {
  ActionButton,
  SecondaryButton,
  NanoButton,
  Buttons,
  Row,
} from "./lesson/styles/DevPageStyles";
import Loading from "./layout/Loading";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION(
    $id: String!
    $communication_history: CommunicationHistoryInput
  ) {
    sendBusinessClientEmail(
      id: $id
      communication_history: $communication_history
    ) {
      id
    }
  }
`;

const UPDATE_CLIENT_MUTATION2 = gql`
  mutation UPDATE_CLIENT_MUTATION2(
    $id: String!
    $comment: String
    $tags: [String]
  ) {
    updateBusinessClient(id: $id, comment: $comment, tags: $tags) {
      id
    }
  }
`;

const DELETE_CLIENT_MUTATION = gql`
  mutation DELETE_CLIENT_MUTATION($id: String!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("./editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Tag = styled.div`
  font-size: 1rem;
  margin-bottom: 2%;
  background: #f8eed7;
  padding: 2px 6px;
  margin: 2px;
  height: 22px;
  border-radius: 5px;
  display: inline-block;
`;

const Editor = styled.div`
  display: ${(props) => {
    return props.show ? "block" : "none";
  }};
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
`;

const ClientRow = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;
  form {
    input {
      width: 150px;
      background: none;
      border: none;
      outline: 0;
      box-shadow: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
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
  .personal_info {
    width: 50%;
    padding: 10px 20px;
    .name {
      font-weight: 600;
      font-size: 2rem;
    }
  }
  .comment {
    width: 50%;
    padding: 10px 20px;
    button {
      margin-bottom: 5%;
    }
    textarea {
      font-family: Montserrat;
      padding: 0 5%;
      margin: 0 5%;
      border: none;
      width: 90%;
      height: 100px;
      white-space: pre-line;
    }
    .editor {
    }
  }
  .tags {
    padding-left: 20px;
    li {
      width: 100%;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Message = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
  p {
    margin: 0px 0;
  }
`;

const DeleteClient = (props) => {
  const { t } = useTranslation("lesson");

  const { clientId } = props;
  const [deleteClient, { data, loading }] = useMutation(DELETE_CLIENT_MUTATION);
  return (
    <SecondaryButton
      onClick={() => {
        if (confirm("Sure?")) {
          deleteClient({
            variables: {
              id: props.clientId,
            },
          }).catch((error) => {
            alert(error.message);
          });
          props.updateAfterDelete(true);
        }
      }}
    >
      {loading ? t("Deleting...") : t("Delete client")}
    </SecondaryButton>
  );
};

const Client = (props) => {
  const [comment, setComment] = useState(props.comment);
  const [message, setMessage] = useState(`<p>Hi ${props.name},</p>`);
  const [subject, setSubject] = useState(
    props.communication_history?.messages?.length > 0
      ? props.communication_history.messages[
          props.communication_history.messages.length - 1
        ].subject
      : ``
  );
  const [messaging, setMessaging] = useState(null);
  const [isEmailHistoryOpen, setIsEmailHistoryOpen] = useState(false);
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();
  const [emailGoal, setEmailGoal] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [generating, setGenerating] = useState(false);

  const [sendBusinessClientEmail, { updated_data, sending, error }] =
    useMutation(UPDATE_CLIENT_MUTATION);

  const [updateBusinessClient, { updated_data2 }] = useMutation(
    UPDATE_CLIENT_MUTATION2
  );

  const myCallback = (dataFromChild) => {
    setComment(dataFromChild);
    updateBusinessClient({
      variables: {
        id: props.id,
        tags: [...tags],
        comment: dataFromChild,
      },
    });
  };

  const myCallback2 = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  const updateAfterDelete = () => {
    let el = document.getElementById(props.id);
    el.style.display = "none";
  };

  const generateEmail = async (e) => {
    e.preventDefault();

    let updated_messaging = messaging;

    let good_emails_examples = [
      `
      // Email for L&D team
      <p>Hi {{Name}}, since you work in legal L&D,</p>
      <p>You've likely developed a few training programs recently and must have thought about how to go from theory to practice in them (commercial awareness and drafting skills are useless unless used in the work).</p>
      <p>At BeSavvy, we turn existing learning materials (like PowerPoint presentations) into interactive simulators in just a few hours. These simulators help lawyers develop new skills in a safe, repeatable environment. Practice makes permanent, right?</p>
      <p>Some London law firms have already used our platform to create training activities for vac schemes. The feedback? “A unique learning experience I’ve never had before.”</p>
      <p>Would you like me to send you a quick presentaion showing how it works?</p>
      `,
      `
      // Email for Early Talent Team
      <p>Dear {{Name}},</p>
      <p>You've likely been busy lately finding and assessing candidates for {{law firm name}} next vac scheme.</p>
      <p>We at BeSavvy build AI-powered virtual job simulations to help with thay. You can use simualtions to help candidates (virally) find your law firm, go through primary assessment and learn more about {{law firm name}}.</p>
      <p>Maybe you can find such a tool useful. Could I send a product deck?</p>
      `,
    ];

    let prompt = `
      You are writing a cold email to ${props.name} ${props.surname} (${
      props.email
    }) from Mike Kochkin, 
      the founder of BeSavvy, an innovative UK company that helps empowers law firms to create AI-powered simualtors that help 
      develop essential legal hard, soft and technical skills.
      The goal of this email is to: ${emailGoal}
      This is the information you have about the addressee: ${comment}
      These are the problem_statement and value_proposition that should be used as the foundation of this email: ${JSON.stringify(
        updated_messaging || {},
        null,
        2
      )}
      The message that you should convey in this email is: ${emailMessage}
      These are your previous emails: ${
        props.communication_history &&
        props.communication_history.messages.length > 0
          ? JSON.stringify(props.communication_history.messages)
          : null
      }

      – Use these good emails examples to structure your email: ${good_emails_examples.join(
        " "
      )}
      – Make very sentence short and converstational. For example, instead of 
      "With the competition for top talent in the legal sector, I wanted to share how BeSavvy can support your efforts in developing essential legal skills."
      use "Competition for top talent in London is fiercer than ever. That’s why it’s worth knowing about tools like BeSavvy."
      – Avoid generic phrases such as "I hope this message finds you well.". 
      – Limit every paragraph to 2 sentences.

      Generate the text of the email in the following JSON format:

      {
        email: {
          subject: "",
          text: "" // text should be an html, every paragraph must be wrapped in a <p> tag, also feel free to use <b> and <i> tags
        }
      }
    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let new_email = JSON.parse(data.result.content);
        setSubject(new_email.email.subject);
        setMessage(new_email.email.text);
        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // ${JSON.stringify(
  //         exit_strategy_sample_result,
  //         null,
  //         2
  //       )}

  return (
    <ClientRow id={props.id}>
      <div className="personal_info">
        <div className="name">
          {props.name} {props.surname}
        </div>
        <div>
          <i>{props.email}</i>
        </div>
        <div>{dayjs(props.createdAt).format("DD.MM.YYYY")}</div>
        {tags &&
          tags.map((t, i) => (
            <>
              <Tag
                onClick={(e) => {
                  e.preventDefault();
                }}
                key={i}
              >
                {t}
              </Tag>
            </>
          ))}
        <form
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            let new_arr = [...tags, newTag];
            setTags(new_arr);
            setNewTag("");

            let updated_client = updateBusinessClient({
              variables: {
                id: props.id,
                tags: [...new_arr],
                comment: comment,
              },
            });
            return updated_client;
          }}
        >
          <input
            type="text"
            name=""
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="..."
          />
        </form>
        <h4>Комментарий</h4>
        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            value={props.comment}
            name="text"
          />
        </div>
        <DeleteClient
          updateAfterDelete={updateAfterDelete}
          clientId={props.id}
        />
      </div>
      <div className="comment">
        <h4>Email</h4>
        <Row>
          <div className="description">Last email</div>
          <div className="action_area">
            <div className="element_info">
              {props.communication_history?.messages?.length > 0
                ? props.communication_history.messages[
                    props.communication_history.messages.length - 1
                  ].date
                : ``}
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">Target audience</div>
          <div className="action_area">
            <select
              onChange={(e) =>
                setMessaging(
                  props.messaging.find(
                    (m) => m.target_audience == e.target.value
                  )
                )
              }
              value={messaging?.target_audience}
            >
              <option value={null}>Choose</option>
              {props.messaging.map((m) => (
                <option key={m.id} value={m.target_audience}>
                  {m.target_audience}
                </option>
              ))}
            </select>
          </div>
        </Row>
        <Row>
          <div className="description">Email goal</div>
          <div className="action_area">
            <select
              onChange={(e) => setEmailGoal(e.target.value)}
              value={emailGoal}
            >
              {/* First Email */}
              <option value={null}>Choose</option>
              <option
                value={
                  "First email to the person that we have never met before, designed to find out if our messaging resonates with them."
                }
              >
                First email
              </option>

              {/* Second Email */}
              <option
                value={
                  "Second email to follow up on our initial message, ensure they've seen it, and encourage a response."
                }
              >
                Second email (follow-up)
              </option>

              {/* Third Email */}
              <option
                value={
                  "Third email to provide additional value, such as insights, resources, or success stories, to rekindle their interest."
                }
              >
                Third email (value addition)
              </option>

              {/* Fourth Email */}
              <option
                value={
                  "Fourth email to highlight urgency, such as a time-sensitive offer or upcoming event, to nudge them toward action."
                }
              >
                Fourth email (create urgency)
              </option>

              {/* Fifth Email */}
              <option
                value={
                  "Fifth email to send a polite closure message, leaving the door open for future communication while expressing gratitude."
                }
              >
                Fifth email (closure)
              </option>
            </select>
          </div>
        </Row>
        {messaging && (
          <Row>
            <div className="description">Message</div>
            <div className="action_area">
              <select
                onChange={(e) => setEmailMessage(e.target.value)}
                value={emailMessage}
              >
                {messaging?.messages &&
                  messaging?.messages.map((m, i) => (
                    <option key={"email_message_" + i} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
            </div>
          </Row>
        )}
        {!generating ? (
          <>
            <Row>
              <div className="description">Subject</div>
              <div className="action_area">
                <input
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                />
              </div>
            </Row>
            <div className="editor">
              <DynamicLoadedEditor
                getEditorText={myCallback2}
                value={message}
                name="text"
              />
            </div>
          </>
        ) : (
          <Loading />
        )}
        <ActionButton
          onClick={async (e) => {
            e.preventDefault();
            let mess = props.communication_history
              ? [
                  ...props.communication_history.messages,
                  {
                    message: message,
                    date: new Date().toISOString(),
                    subject: subject,
                  },
                ]
              : [
                  {
                    message: message,
                    date: new Date().toISOString(),
                    subject: subject,
                  },
                ];

            const res = await sendBusinessClientEmail({
              variables: {
                id: props.id,
                communication_history: {
                  messages: mess.map((m) => ({
                    subject: m.subject,
                    message: m.message,
                    date: m.date,
                  })),
                },
              },
            });
            alert("Sent!");
          }}
        >
          {sending ? "Sending..." : "Send"}
        </ActionButton>
        {messaging && (
          <SecondaryButton
            onClick={async (e) => {
              setGenerating(true);
              await generateEmail(e);
              setGenerating(false);
            }}
          >
            Generate email
          </SecondaryButton>
        )}
        <br />
        <SecondaryButton
          onClick={(e) => {
            setIsEmailHistoryOpen(!isEmailHistoryOpen);
          }}
        >
          {isEmailHistoryOpen ? "Close history" : "Email history"}
        </SecondaryButton>
        {isEmailHistoryOpen &&
          props.communication_history &&
          props.communication_history.messages &&
          [...props.communication_history.messages].reverse().map((m) => (
            <Message>
              <div>
                <b>⏰ {dayjs(m.date).format("DD-MM-YYYY HH:mm")}</b>
              </div>

              <div>
                <b>Subject:</b> {m.subject}
              </div>
              <div>{parse(m.message)}</div>
            </Message>
          ))}
        <br />
      </div>
    </ClientRow>
  );
};

export default Client;
