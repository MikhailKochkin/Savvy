import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION($id: String!, $communication_medium: String) {
    sendBusinessClientEmail(
      id: $id
      communication_medium: $communication_medium
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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f3f4f5;
  .total {
    width: 90%;
    margin: 20px 0;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

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
    width: 12%;
    textarea {
      font-family: Montserrat;
      padding: 0 5%;
      margin: 0 5%;
      border: none;
      width: 90%;
      height: 100px;
    }
  }
  .tags {
    width: 18%;
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

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      email
      number
      tags
      createdAt
      type
      comment
    }
  }
`;

const Client = (props) => {
  const [comment, setComment] = useState(props.comment);
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();

  moment.locale("ru");
  var url = new URL("https://besavvy.app" + props.url);
  var utm_source = url.searchParams.get("utm_source");
  var utm_medium = url.searchParams.get("utm_medium");
  var utm_campaign = url.searchParams.get("utm_campaign");
  var utm_term = url.searchParams.get("utm_term");

  var id = url.searchParams.get("id");

  const [sendBusinessClientEmail, { updated_data }] = useMutation(
    UPDATE_CLIENT_MUTATION
  );

  const [updateBusinessClient, { updated_data2 }] = useMutation(
    UPDATE_CLIENT_MUTATION2
  );
  const copyEnglish = (name) => {
    /* Copy the text inside the text field */
    let text = `Добрый день. 

Это Михаил из BeSavvy. Получили вашу заявку на сайте на курс юридического английского. Я с радостью проведу для вас вводное занятие и расскажу о программе.

Но, чтобы не быть голословным, хочу сразу дать вам доступ к демо-урокам нашего курса. Чтобы получить к ним доступ, надо зарегистрироваться на сайте.

Модуль 1. https://besavvy.app/coursePage?id=ck0pdit6900rt0704h6c5zmer (Уроки 1 и 5)

Уверен, вам понравятся наши уроки. А, если вы решите присоединиться уже на следующей неделе, то мы с удовольствием дадим вам скидку 10% на обучение на программе.

Скажите, у вас получится посмотреть открытый урок на этой неделе?`;
    return navigator.clipboard.writeText(text);
  };

  const copySchool = (name) => {
    /* Copy the text inside the text field */
    let text = `Добрый день. 

Это Михаил из BeSavvy. Получили вашу заявку на сайте на программу "Школа Молодого Юриста". Я с радостью проведу для вас вводное занятие и расскажу о программе.

Но, чтобы не быть голословным, хочу сразу дать вам доступ к демо-уроку нашего курса. Чтобы получить к нему доступ, надо зарегистрироваться на сайте. Это урок по преддоговорной ответственности из модуля "Основные инструменты договорной работы корпоративного юриста". Вот ссылка: https://besavvy.app/coursePage?id=ckqut60ya145911gqj58c0qo8a

Уверен, вам понравятся наши уроки. А, если вы решите присоединиться уже на следующей неделе, то мы с удовольствием дадим вам скидку 10% на обучение на программе.

Скажите, у вас получится посмотреть открытый урок на этой неделе?
    `;
    return navigator.clipboard.writeText(text);
  };

  let number;
  if (props.number.startsWith("8")) {
    number = props.number.replace("8", "+7");
  } else {
    number = props.number;
  }
  return (
    <Row>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {" "}
        {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>{props.name}</div>
        {tags &&
          tags.map((t, i) => (
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
          {/* <input onChange={(e) => setNewTag(e.target.value)} /> */}
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
                },
              });
              alert("Сохранили");
            }}
          >
            Сохранить
          </button>
        </form>
        <button onClick={(e) => copyEnglish()}>
          Сopy Демо Урок Английский
        </button>
        <button onClick={(e) => copySchool()}>Сopy Демо Урок Школа</button>
      </div>
      <div className="email">
        <div>{props.email}</div>
        <button
          onClick={(e) => {
            console.log(1);
            sendBusinessClientEmail({
              variables: {
                id: props.id,
                communication_medium: "english",
              },
            });
            alert("Отправили");
          }}
        >
          Демо Урок Английский
        </button>
        <button
          onClick={async (e) => {
            sendBusinessClientEmail({
              variables: {
                id: props.id,
                communication_medium: "school",
              },
            });
            alert("Отправили");
          }}
        >
          Демо Урок Школа
        </button>
      </div>
      <div className="number">
        <div>{number}</div>
        <button>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
          >
            Написать в whatsApp
          </a>
        </button>
        <button>Написать в Telegram</button>
      </div>
      <div className="comment">
        <textarea onChange={(e) => setComment(e.target.value)}>
          {comment}
        </textarea>
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
      </div>
    </Row>
  );
};

const ClientData = () => {
  const { loading, error, data } = useQuery(CLIENTS_QUERY);
  if (loading) return <p>Загрузка...</p>;
  let initial_clients = data.businessClients;
  const [clients, setClients] = useState(initial_clients);

  const sort = (val) => {
    console.log(val);
    const new_clients = clients.filter((c) => c.tags.includes(val));
    setClients(new_clients);
  };

  return (
    <Styles>
      <div className="total">Всего заявок: {clients.length}</div>
      <div className="total">
        <button onClick={(e) => setClients(initial_clients)}>Restart</button>
      </div>

      {clients.map((c, i) => (
        <Client
          sort={sort}
          key={i}
          index={i}
          id={c.id}
          name={c.name}
          email={c.email}
          comment={c.comment}
          tags={c.tags}
          number={c.number}
          createdAt={c.createdAt}
          url={c.type}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
