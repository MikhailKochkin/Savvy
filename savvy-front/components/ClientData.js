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

const DELETE_CLIENT_MUTATION = gql`
  mutation DELETE_CLIENT_MUTATION($id: String!) {
    deleteClient(id: $id) {
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

const DeleteClient = (props) => {
  const { clientId } = props;
  const [deleteClient, { data, loading }] = useMutation(DELETE_CLIENT_MUTATION);
  return (
    <button
      onClick={() => {
        if (
          confirm(
            "Вы точно хотите удалить эту запись? Запись исчезнет после перезагрузки страницы."
          )
        ) {
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
      {loading ? "Удаляем..." : "Удалить"}
    </button>
  );
};

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
  var utm_content = url.searchParams.get("utm_content");
  var id = url.searchParams.get("id");

  const [sendBusinessClientEmail, { updated_data }] = useMutation(
    UPDATE_CLIENT_MUTATION
  );

  const [updateBusinessClient, { updated_data2 }] = useMutation(
    UPDATE_CLIENT_MUTATION2
  );
  const copyEnglish1 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Юридический английский для профессионалов".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1GvZpUMzGTN5cWh4hsRjIl22q1aMeiDnp/view?usp=sharing 

Ждём вас на консультации с Михаилом и на наших программах. Хорошего дня!

P.S. Если вы не сможете посетить консультацию, пожалуйста, предупредите нас. 

Алена,

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copyEnglish2 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Юридический английский для профессионалов".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1GvZpUMzGTN5cWh4hsRjIl22q1aMeiDnp/view?usp=sharing

Пожалуйста, выберите время для консультации с директором программы Михаилом. Это займёт всего 15 минут. Михаил покажет, как проходит обучение, и ответит на любые ваши вопросы.

Выбрать удобное время можно по ссылке: https://calendly.com/mikhail-from-besavvy/15-min-intro

Если вам ничего не подходит, напишите, разберёмся. Хорошего дня!

Алена

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copySchool1 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Карьерная Школа Юриста".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1bZAtbPz5MrKCriPe0Bj2cG9ueVKau8kP/view?usp=sharing

Ждём вас на консультации с Михаилом и на наших программах. Хорошего дня!

P.S. Если вы не сможете посетить консультацию, пожалуйста, предупредите нас. 

Алена,

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copySchool2 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Карьерная Школа Юриста".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1bZAtbPz5MrKCriPe0Bj2cG9ueVKau8kP/view?usp=sharing

Пожалуйста, выберите время для консультации с директором программы Михаилом. Это займёт всего 15 минут. Михаил покажет, как проходит обучение, и ответит на любые ваши вопросы.

Выбрать удобное время можно по ссылке: https://calendly.com/mikhail-from-besavvy/15-min-intro

Если вам ничего не подходит, напишите, разберёмся. Хорошего дня!

Алена

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copyCorp1 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Корпоративное право".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1Ku64al8Ktj097My6jp9aFxNvQRpDwN5M/view?usp=sharing

Ждём вас на консультации с Михаилом и на наших программах. Хорошего дня!

P.S. Если вы не сможете посетить консультацию, пожалуйста, предупредите нас. 

Алена,

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copyCorp2 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Корпоративное право".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/1Ku64al8Ktj097My6jp9aFxNvQRpDwN5M/view?usp=sharing

Пожалуйста, выберите время для консультации с директором программы Михаилом. Это займёт всего 15 минут. Михаил покажет, как проходит обучение, и ответит на любые ваши вопросы.

Выбрать удобное время можно по ссылке: https://calendly.com/mikhail-from-besavvy/15-min-intro

Если вам ничего не подходит, напишите, разберёмся. Хорошего дня!

Алена

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copyLitigation1 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Арбитражный процесс".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/16uTdmv-J62pzOQFskkyKJi4v5pYg4ekg/view?usp=sharing

Ждём вас на консультации с Михаилом и на наших программах. Хорошего дня!

P.S. Если вы не сможете посетить консультацию, пожалуйста, предупредите нас. 

Алена,

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
    return navigator.clipboard.writeText(text);
  };

  const copyLitigation2 = (name) => {
    /* Copy the text inside the text field */
    let text = `Здравствуйте,

Мы получили вашу заявку на курс "Арбитражный процесс".

Как обещали, высылаем детальную программу курса. Посмотрите ее по ссылке: https://drive.google.com/file/d/16uTdmv-J62pzOQFskkyKJi4v5pYg4ekg/view?usp=sharing

Пожалуйста, выберите время для консультации с директором программы Михаилом. Это займёт всего 15 минут. Михаил покажет, как проходит обучение, и ответит на любые ваши вопросы.

Выбрать удобное время можно по ссылке: https://calendly.com/mikhail-from-besavvy/15-min-intro

Если вам ничего не подходит, напишите, разберёмся. Хорошего дня!

Алена

Менеджер по работе со студентами в онлайн-школе BeSavvy Lawyer`;
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
        <button onClick={(e) => copyEnglish1()}>
          Сopy-Английский-Есть регистрация
        </button>
        <button onClick={(e) => copyEnglish2()}>
          Сopy-Английский-Нет регистрации
        </button>
        <button onClick={(e) => copySchool1()}>
          {" "}
          Сopy-Школа-Есть регистрация
        </button>
        <button onClick={(e) => copySchool2()}>
          {" "}
          Сopy-Школа-Нет регистрации
        </button>
        <button onClick={(e) => copyCorp1()}>
          {" "}
          Сopy-Корп-Есть регистрация
        </button>
        <button onClick={(e) => copyCorp2()}>Сopy-Корп-Нет регистрации</button>
        <button onClick={(e) => copyLitigation1()}>
          {" "}
          Сopy-Арбитраж-Есть регистрация
        </button>
        <button onClick={(e) => copyLitigation2()}>
          Сopy-Арбитраж-Нет регистрации
        </button>
        <DeleteClient clientId={props.id} />
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
        <li>utm_content: {utm_content}</li>
        <li>communication_medium: {props.communication_medium}</li>
      </div>
    </Row>
  );
};

const ClientData = (props) => {
  const [clients, setClients] = useState(props.initial_clients);

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
          communication_medium={c.communication_medium}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
