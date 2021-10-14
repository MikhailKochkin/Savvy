import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";

const UPDATE_CLIENT_MUTATION = gql`
  mutation UPDATE_CLIENT_MUTATION($id: String!, $communication_medium: String) {
    updateBusinessClient(id: $id, communication_medium: $communication_medium) {
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
    width: 25%;
  }
  .number {
    width: 10%;
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

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      email
      number
      createdAt
      type
    }
  }
`;

const Client = (props) => {
  moment.locale("ru");
  var url = new URL("https://besavvy.app" + props.url);
  var utm_source = url.searchParams.get("utm_source");
  var utm_medium = url.searchParams.get("utm_medium");
  var utm_campaign = url.searchParams.get("utm_campaign");
  var utm_term = url.searchParams.get("utm_term");

  var id = url.searchParams.get("id");

  const [updateBusinessClient, { updated_data }] = useMutation(
    UPDATE_CLIENT_MUTATION
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
  return (
    <Row>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {" "}
        {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>{props.name}</div>
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
            updateBusinessClient({
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
            updateBusinessClient({
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
        <div>{props.number}</div>
        <button>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${props.number}?text=Hello!`}
          >
            Написать в whatsApp
          </a>
        </button>
        <button>Написать в Telegram</button>
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
  let clients = data.businessClients;

  return (
    <Styles>
      <div className="total">Всего заявок: {clients.length}</div>
      <a
        href="tg://msg?text=your MsG!"
        id="telegram_share"
        class="mobileShare"
        title="inviteFriends"
        alt="telegram_share"
      >
        Test
      </a>

      {clients.map((c, i) => (
        <Client
          key={i}
          index={i}
          id={c.id}
          name={c.name}
          email={c.email}
          number={c.number}
          createdAt={c.createdAt}
          url={c.type}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
