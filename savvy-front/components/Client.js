import { useState, useEffectq } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION($id: String!, $comment: String) {
    sendBusinessClientEmail(id: $id, comment: $comment) {
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
  border: 1px solid blue;
  cursor: pointer;
  color: blue;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: center;
  align-items: center;
  transition: ease-in 0.2s;
  &:hover {
    border: 2px solid blue;
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
    .editor {
      font-size: 1.6rem;
      width: 95%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
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
        }
      }}
    >
      {loading ? t("deleting") : t("delete")}
    </button>
  );
};

const Client = (props) => {
  const [comment, setComment] = useState(props.comment);
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();

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
  };

  let number;
  if (props.number.startsWith("8")) {
    number = props.number.replace("8", "+7");
  } else {
    number = props.number;
  }

  let comment_for_wa = comment ? comment.replaceAll("</p>", "\n\n") : "";
  comment_for_wa = comment_for_wa.replaceAll("<p>", "");
  // console.log("comment_for_wa", renderHTML(comment_for_wa));
  return (
    <Row>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>{props.name}</div>
        <div>{number}</div>
        <div>{props.email}</div>
        {props.tags &&
          props.tags.map((t, i) => (
            <>
              <Tag
                onClick={(e) => {
                  e.preventDefault();
                  props.sort(t);
                }}
                key={i}
              >
                {t}
              </Tag>
            </>
          ))}
        <form>
          <select onChange={(e) => setNewTag(e.target.value)}>
            <option value="">Выберите тег</option>
            <option value="Wrong Number">Wrong Number</option>
            <option value="Reach out">Reach out</option>
            <option value="Never Respond">Never Respond</option>
            <option value="Contact">Contact</option>
            <option value="Call">Call</option>
            <option value="Refuse">Refuse</option>
            <option value="Invoice">Invoice</option>
            <option value="Sell">Sell</option>
          </select>
          <button
            onClick={async (e) => {
              e.preventDefault();
              setTags([newTag]);
            }}
          >
            Добавить тег
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();

              updateBusinessClient({
                variables: {
                  id: props.id,
                  tags: tags,
                  comment: comment,
                },
              });
              alert("Сохранили");
            }}
          >
            Сохранить
          </button>
        </form>
        <button>
          <a
            target="_blank"
            // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
            href={`https://wa.me/${number}?text=${
              comment ? comment_for_wa : ""
            }`}
          >
            Написать в whatsApp
          </a>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            textBusinessClient({
              variables: {
                id: props.id,
                comment: comment_for_wa,
              },
            });
            alert("Sent!");
          }}
        >
          Написать в WA
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            sendBusinessClientEmail({
              variables: {
                id: props.id,
                comment: comment,
              },
            });
          }}
        >
          Написать по имейл
        </button>
        <DeleteClient clientId={props.id} />
      </div>
      <div className="comment">
        {<div>{renderHTML(props.comment ? props.comment : "")}</div>}

        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            value={""}
            name="text"
          />
        </div>
        <br />
        <button
          onClick={(e) => {
            updateBusinessClient({
              variables: {
                id: props.id,
                comment: comment,
                tags: tags,
              },
            });
            alert("Изменили");
          }}
        >
          Изменить
        </button>
      </div>
      <div className="tags">
        <li>pathname: {url.pathname}</li>
        <li>id: {id}</li>
        <li>utm_source: {utm_source}</li>
        <li>utm_medium: {utm_medium}</li>
        <li>utm_campaign: {utm_campaign}</li>
        <li>utm_term: {utm_term}</li>
        <li>utm_content: {utm_content}</li>
        <li>communication_medium: {props.communication_medium}</li>
      </div>
    </Row>
  );
};

export default Client;
