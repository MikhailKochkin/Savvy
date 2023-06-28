import { useState, useEffect, memo } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";
import { emailTemplates } from "../letters.js";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $userId: String!
    $subject: String!
    $text: String
    $comment: String
  ) {
    sendMessage(
      userId: $userId
      subject: $subject
      text: $text
      comment: $comment
    ) {
      id
    }
  }
`;

const UPDATE_USER_MUTATION2 = gql`
  mutation UPDATE_USER_MUTATION2(
    $id: String!
    $comment: String
    $tags: [String]
  ) {
    updateUser(id: $id, comment: $comment, tags: $tags) {
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
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 15%;
  }
  .email {
    width: 20%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 45%;
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

const Message = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
  p {
    margin: 0px 0;
  }
`;

const UserCard = React.memo((props) => {
  const [comment, setComment] = useState(props.comment);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();
  const [showTraffic, setShowTraffic] = useState(false);
  const [show, setShow] = useState(false);
  const [showLessonResults, setShowLessonResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editorValue, setEditorValue] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setSubject(emailTemplates[category][0].subject);
      setMessage("");
    } else {
      setSubject("");
      setMessage("");
    }
  };

  // Function to handle template change within a category
  const handleTemplateChange = (e) => {
    const templateIndex = e.target.value;
    if (selectedCategory) {
      setSubject(emailTemplates[selectedCategory][templateIndex].subject);
      setMessage(emailTemplates[selectedCategory][templateIndex].message);
    }
  };

  function earliestObjectsByDate(objects) {
    let grouped = {};
    for (let obj of objects) {
      // Check if object or object.date is null or undefined
      if (!obj || !obj.date) {
        continue; // Skip this iteration if it is
      }

      let date = obj.date.split("T")[0]; // Extract only the date part
      // If the date is not in grouped, or if the current object is earlier than the stored one, update it
      if (!grouped[date] || new Date(obj.date) < new Date(grouped[date].date)) {
        grouped[date] = obj;
      }
    }

    // Convert grouped object to array
    let result = Object.values(grouped);

    return result;
  }

  const [sendMessage, { data, loading, error }] = useMutation(
    SEND_MESSAGE_MUTATION
  );

  let text = `
Хотел сказать, что, если будут вопросы по юр англу, можете всегда писать мне. Я помогу и подскажу)%0a %0a
Кстати мы сейчас делаем бесплатный мини-курс по contract drafting. Это будет наш первый курс полностью на английском языке.
  `;

  moment.locale("ru");

  var url = new URL("https://besavvy.app" + props.url);
  var utm_source = url.searchParams.get("utm_source");
  var utm_medium = url.searchParams.get("utm_medium");
  var utm_campaign = url.searchParams.get("utm_campaign");
  var utm_term = url.searchParams.get("utm_term");
  var utm_content = url.searchParams.get("utm_content");
  var id = url.searchParams.get("id");

  //   const [sendBusinessClientEmail, { updated_data }] =
  //     useMutation(UPDATE_USER_MUTATION);

  const [updateUser, { updated_data2 }] = useMutation(UPDATE_USER_MUTATION2);

  const [textBusinessClient, { updated_data3 }] =
    useMutation(TEXT_CLIENT_MUTATION);

  const myCallback = (dataFromChild) => {
    setComment(dataFromChild);
    updateUser({
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
  if (props.number && props.number.startsWith("8")) {
    number = props.number.replace("8", "+7");
  } else if (
    props.number &&
    (props.number.startsWith("1") ||
      props.number.startsWith("2") ||
      props.number.startsWith("3") ||
      props.number.startsWith("4") ||
      props.number.startsWith("5") ||
      props.number.startsWith("6") ||
      props.number.startsWith("9"))
  ) {
    number = "+7" + props.number;
  } else if (props.number && props.number.startsWith("7")) {
    number = "+" + props.number;
  } else {
    number = props.number;
  }
  const updateTags = (val) => {
    setNewTag(val);
  };

  const handleDoubleClick = (val) => {
    let newTags = [...tags];
    setTags(newTags.filter((nt) => nt !== val));
    let updated_client = updateUser({
      variables: {
        id: props.id,
        tags: newTags.filter((nt) => nt !== val),
        comment: comment,
      },
    });
  };

  return (
    <Row id={props.id}>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        cre: {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
        <br />
        upd: {moment(props.updatedAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>{props.name}</div>
        <div>{props.surname}</div>
        <div>{number ? number : "Нет номера"}</div>
        <div>{props.email}</div>
        {tags &&
          [...tags].slice(0, 10).map((t, i) => (
            <>
              <Tag
                onClick={(e) => {
                  e.preventDefault();
                  //   props.sort(t);
                }}
                name={t}
                onDoubleClick={(e) => handleDoubleClick(t)}
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

            let updated_client = updateUser({
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
        {number && (
          <button>
            <a target="_blank" href={`https://t.me/${number}`}>
              Написать в Telegram
            </a>
          </button>
        )}
        {number && (
          <button>
            <a target="_blank" href={`https://wa.me/${number}`}>
              Написать в whatsApp
            </a>
          </button>
        )}
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
        <div>
          <select onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {Object.keys(emailTemplates).map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <br />

          {selectedCategory && (
            <select onChange={handleTemplateChange}>
              <option value="">Select an email</option>
              {emailTemplates[selectedCategory].map((template, index) => (
                <option value={index}>{template.subject}</option>
              ))}
            </select>
          )}
        </div>
        <input onChange={(e) => setSubject(e.target.value)} value={subject} />
        <button onClick={(e) => setMessage("new text")}>Pass Message</button>
        <div className="editor">
          <DynamicLoadedEditor
            // key={editorKey}
            id={props.email}
            getEditorText={myCallback2}
            value={message}
            name="text"
          />
        </div>
        <button
          onClick={async (e) => {
            const res = await sendMessage({
              variables: {
                userId: props.id,
                text: message,
                subject: subject,
                // email: props.email,
                comment: "funnel",
              },
            });
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <br />

        <button onClick={(e) => setShow(!show)}>Show</button>
        {show && (
          <div>
            {[...props.messages]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((mes) => (
                <div className="message">
                  <div className="date">
                    <b>{moment(mes.createdAt).format("DD-MM-YYYY HH:mm")}</b>
                  </div>
                  <div className="text">{renderHTML(mes.text)}</div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="tags">
        <h4>Курсы</h4>
        <ol>
          {props.new_subjects.map((o) => (
            <li>{o.title}</li>
          ))}{" "}
        </ol>

        <h4>Заказы</h4>
        {props.orders.map((o) => (
          <div>
            <div>
              <b>{o.coursePage.title}</b>
            </div>
            <li>{o.isPaid ? "Оплачен" : "Не оплачен"}</li>
            <li>{o.price}</li>
            <li>{o.createdAt}</li>
          </div>
        ))}
        <h4>Результаты уроков</h4>
        {props.lessonResults.length > 0 && (
          <button onClick={(e) => setShowLessonResults(!showLessonResults)}>
            Открыть
          </button>
        )}
        {showLessonResults &&
          props.lessonResults.length > 0 &&
          props.lessonResults.map((l) => (
            <div>
              <div>
                <b>{l.lesson.name}</b>
              </div>
              <li>{l.progress}</li>
              <li>{l.createdAt}</li>
            </div>
          ))}
        <h4>Визиты</h4>
        {props.traffic_sources && props.traffic_sources.visitsList
          ? earliestObjectsByDate(props.traffic_sources.visitsList).map((t) => {
              return (
                <>
                  <div>
                    <div>
                      <b>{t.date}</b>
                    </div>
                    <li>
                      utm_campaign:
                      {t.utm_campaign}
                    </li>
                    <li>utm_medium: {t.utm_medium}</li>
                    <li>utm_source: {t.utm_source}</li>
                  </div>
                </>
              );
            })
          : "Нет данных по визитам"}
      </div>
    </Row>
  );
});

export default UserCard;
