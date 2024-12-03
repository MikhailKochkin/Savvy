import { useState, useEffectq } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION(
    $id: String!
    $communication_history: ClientMessages
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

const TEXT_CLIENT_MUTATION = gql`
  mutation TEXT_CLIENT_MUTATION($id: String!, $comment: String) {
    textBusinessClient(id: $id, comment: $comment) {
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
  /* flex-direction: row;
  justify-content: center;
  align-items: center; */
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

const Row = styled.div`
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
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
  input {
    width: 350px;
    background: none;
    border: 1px solid grey;
    outline: 0;
    font-family: Montserrat;
    padding: 2px 5px;
    font-size: 1.4rem;
    width: 95%;
    border: 1px solid #c4c4c4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
  }
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    width: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 23%;
  }
  .email {
    width: 20%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 60%;
    padding: 0 2%;
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
    <button
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
    </button>
  );
};

const Client = (props) => {
  console.log("props", props);
  const [comment, setComment] = useState(props.comment);
  const [message, setMessage] = useState(`<p>Hi ${props.name},</p>`);
  const [subject, setSubject] = useState(
    props.communication_history?.messages?.length > 0
      ? "Re: " +
          props.communication_history.messages[
            props.communication_history.messages.length - 1
          ].subject
      : ``
  );
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [editorText, setEditorText] = useState(null);

  // const handleGroupChange = (groupName) => {
  //   const group = emailGroups.find((group) => group.name === groupName);
  //   setSelectedGroup(group);
  //   setSelectedEmail(null); // Reset selected email when group changes
  // };

  const handleEmailChange = (subject) => {
    const email = selectedGroup?.emails.find(
      (email) => email.subject === subject
    );
    setSelectedEmail(email);
    setSubject(email.subject);
    setMessage(email.text);
  };

  moment.locale("ru");

  var url = new URL("https://besavvy.app" + props.url);
  var utm_source = url.searchParams.get("utm_source");
  var utm_medium = url.searchParams.get("utm_medium");
  var utm_campaign = url.searchParams.get("utm_campaign");
  var utm_term = url.searchParams.get("utm_term");
  var utm_content = url.searchParams.get("utm_content");
  var id = url.searchParams.get("id");

  const [sendBusinessClientEmail, { updated_data }] = useMutation(
    UPDATE_CLIENT_MUTATION
  );

  const [updateBusinessClient, { updated_data2 }] = useMutation(
    UPDATE_CLIENT_MUTATION2
  );

  const [textBusinessClient, { updated_data3 }] =
    useMutation(TEXT_CLIENT_MUTATION);

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

  let number;
  if (!props.number) {
    number = "No number";
  } else if (props.number?.startsWith("8")) {
    number = props.number.replace("8", "+7");
  } else if (
    props.number.startsWith("1") ||
    props.number.startsWith("2") ||
    props.number.startsWith("3") ||
    props.number.startsWith("4") ||
    props.number.startsWith("5") ||
    props.number.startsWith("6") ||
    props.number.startsWith("9")
  ) {
    number = "+7" + props.number;
  } else if (props.number.startsWith("7")) {
    number = "+" + props.number;
  } else {
    number = props.number;
  }

  return (
    <Row id={props.id}>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>
          {props.name} {props.surname}
        </div>
        <div>{props.email}</div>
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
        <DeleteClient
          updateAfterDelete={updateAfterDelete}
          clientId={props.id}
        />
      </div>
      <div className="comment">
        <h4>Комментарий</h4>
        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            value={props.comment}
            name="text"
          />
        </div>
        <h4>Имейл</h4>
        {props.communication_history &&
          props.communication_history.messages &&
          props.communication_history.messages.map((m) => (
            <Message>
              <div>
                <b>Subject:</b> {m.subject}
              </div>
              <div>{parse(m.message)}</div>
              <div> {moment(m.date).format("DD-MM-YYYY HH:mm")}</div>
            </Message>
          ))}
        <input
          type="text"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback2}
            value={message}
            name="text"
          />
        </div>
        <button
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
                  messages: mess,
                },
              },
            });
            alert("Sent!");
          }}
        >
          Отправить имейл
        </button>
        <br />
      </div>
    </Row>
  );
};

export default Client;
