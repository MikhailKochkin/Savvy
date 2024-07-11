import { useState, useEffect, memo } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import emailGroups from "../emailGroups";
import wa_messages from "../wa_messages";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CREATE_SUBSCRIPTION_MUTATION(
    $userId: String!
    $type: String!
    $term: String!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    createSubscription(
      userId: $userId
      type: $type
      term: $term
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;

const UPDATE_SUBSCRIPTION_MUTATION = gql`
  mutation UPDATE_SUBSCRIPTION_MUTATION(
    $id: String!
    $type: String!
    $term: String!
    $endDate: DateTime!
  ) {
    updateSubscription(id: $id, type: $type, term: $term, endDate: $endDate) {
      id
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $userId: String!
    $text: String!
    $subject: String
  ) {
    sendMessage(userId: $userId, text: $text, subject: $subject) {
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
    textUser(id: $id, comment: $comment) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($id: String!, $userId: String!) {
    updateOrderAuto(id: $id, userId: $userId) {
      id
      isPaid
    }
  }
`;

const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION($id: String!, $coursePageId: String) {
    enrollOnCourse(id: $id, coursePageId: $coursePageId) {
      id
    }
  }
`;

const UNENROLL_COURSE_MUTATION = gql`
  mutation UNENROLL_COURSE_MUTATION($id: String!, $coursePageId: String) {
    unenrollFromCourse(id: $id, coursePageId: $coursePageId) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION(
    $name: String!
    $email: String!
    $courseId: String!
  ) {
    sendWelcomeEmail(name: $name, email: $email, courseId: $courseId) {
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
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
  input {
    width: 90%;
  }
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 23%;
  }
  .email {
    width: 10%;
  }
  .comment {
    width: 50%;
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
    width: 35%;
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

const SubscriptionBlock = styled.div`
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  select {
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .miniblock {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .main {
      margin-right: 10px;
      border: 1px solid lightgrey;
      width: 85%;
    }
    .second {
      width: 15%;
      border: 1px solid lightgrey;
    }
  }
`;

const UserCard = memo((props) => {
  const [comment, setComment] = useState(props.comment);
  const [message, setMessage] = useState(
    // `<p>${props.name}, привет!</p><p>Я Михаил, директор BeSavvy. Я увидел, что вы проходили уроки на платформе по: ... И решил узнать, как у вас дела? Какие впечатления от работы на симуляторах?</p><p>Я хотел бы порекомендовать вам еще один открытый симулятор. Обратите внимание на:</p><p>На самом деле, в BeSavvy скрыта тонна бесплатных полезных материалов, но часто пользователи просто не знают, как их найти и как с ними работать. А еще не понимают, как их встроить в свой рабочий календарь.</p><p><b>Давайте я вам сделаю индивидуальную подборку? И расскажу, как создать идеальную рабочую среду, в которой ничто не потеряется?</p><p>Если интересно, просто ответьте на это письмо (чтобы я знал,  что их кто-то читает). И я пришлю.</p><p>Михаил из BeSavvy</p>`
    // `<p>${props.name}, привет!</p><p>Я Михаил, директор BeSavvy. Я увидел, что вы в феврале проходили тестовое собеседование на английском языке. И решил узнать, как у вас дела? Какие впечатления от работы на симуляторах?</p><p>На самом деле, в BeSavvy скрыта тонна бесплатных полезных материалов, но часто пользователи просто не знают, как их найти и как с ними работать.</p><p><b>Хотите я вам открою доступ к нашей системе старта изучения юр английского?</b>Она содержит не только сами симуляторы, но еще и <b>автоматические напоминания, календари, шпаргалки и советы.</b></p><p>Это поможет не бросить обучение на второй день и получить понятный результат через неделю.</p><p>Если интересно, просто ответьте на это письмо. И я вам отправлю всю информацию.</p><p>На связи,</p><p>Михаил из BeSavvy</p>`
    // `<p>${props.name}, привет!</p><p>Это Михаил, директор BeSavvy.</p><p>Я заметил, что вы смотрели наши курсы по праву, и решил написать.</p><p>А вы знаете, что мы перешли на формат подписки? И что теперь любой курс по корпе, ГП или английскому можно проходить всего <b>за 1990 рублей в месяц</b>?</p><p>Если интересно, то можете узнать больше о подписке <a href="https://besavvy.app/ru/subscription" target="_blank">по этой ссылке</a>.</p><p>На связи,</p>`
    `<p>${props.name}, здравствуйте!</p><p>Это Михаил, директор BeSavvy.</p><p>Я рад, что вы зарегистрировались на сайте и даже прошли уже несколько уроков.</p><p>Не против, если расскажу вам, как у нас все устроено? Только будет удобнее это сделать в телеграм (<a href="https://www.t.me/mikkochkin" target="_blank">ссылка</a>) или вотсап (<a href="https://wa.me/+79031624158" target="_blank">ссылка</a>).</p><p>Пишите, буду рад познакомиться и помочь с изучением английского.</p><p>На связи,</p><p>Михаил</p>`
  );
  const [wa_message, setWa_message] = useState("");
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState();
  const [showTraffic, setShowTraffic] = useState(false);
  const [show, setShow] = useState(false);
  const [showLessonResults, setShowLessonResults] = useState(false);
  const [subject, setSubject] = useState(
    // `${props.name}, для вас спец предложение от BeSavvy!`
    `Рады видеть вас в BeSavvy!`
  );
  const [editorText, setEditorText] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [term, setTerm] = useState(null);
  const [areCourseSettingsOpen, setAreCourseSettingsOpen] = useState(false);

  const [
    updateOrderAuto,
    { data: updated_data, loading: updated_loading, error: updated_error },
  ] = useMutation(UPDATE_ORDER);

  const [
    createSubscription,
    { data: data3, loading: loading3, error: error3 },
  ] = useMutation(CREATE_SUBSCRIPTION_MUTATION);

  const [
    updateSubscription,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_SUBSCRIPTION_MUTATION);

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const [sendWelcomeEmail] = useMutation(UPDATE_COURSE_VISIT_MUTATION);

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

  const [textUser, { updated_data3 }] = useMutation(TEXT_CLIENT_MUTATION);

  const [
    enrollOnCourse,
    { data: enroll_data, loading: enroll_loading, error: enroll_error },
  ] = useMutation(ENROLL_COURSE_MUTATION);

  const [
    unenrollFromCourse,
    { data: unenroll_data, loading: unenroll_loading, error: unenroll_error },
  ] = useMutation(UNENROLL_COURSE_MUTATION);

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

  const myCallback3 = (dataFromChild) => {
    setWa_message(dataFromChild);
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

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const subscriptionTypes = ["mini", "regular", "team", "business"];

  const handleSendEmail = async (name, email, courseId) => {
    await sendWelcomeEmail({
      variables: {
        name: name,
        email: email,
        courseId: courseId,
      },
    });
    alert("Email has been sent!");
  };

  return (
    <Row id={props.id}>
      <div className="index">{props.index + 1}.</div>

      <div className="name">
        <div>{props.name}</div>
        <div>{props.surname}</div>
        <div>{number ? number : "Нет номера"}</div>
        <div>{props.email}</div>
        {tags &&
          [...tags].map((t, i) => (
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
        cre: {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
        <br />
        upd: {moment(props.updatedAt).format("DD-MM-YYYY HH:mm")}
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
        <SubscriptionBlock>
          <h3>Управление подпиской</h3>
          {props.subscriptions.length > 0 && (
            <>
              <div>
                <b>Type</b>:{props.subscriptions[0].type}
              </div>
              <div>
                <b>Start Date</b>: {props.subscriptions[0].startDate}
              </div>
              <div>
                <b>End Date</b>: {props.subscriptions[0].endDate}
              </div>
            </>
          )}
          <div>
            <select onChange={(e) => setSubscriptionType(e.target.value)}>
              <option value="0">Выберите подписку</option>
              {subscriptionTypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
            <select onChange={(e) => setTerm(e.target.value)}>
              <option value="0">Выберите срок</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
            <div>
              <label htmlFor="initialDate">Start Date:</label>
              <input
                type="datetime-local"
                id="initialDate"
                value={startDate}
                onChange={handleStartDate}
              />
            </div>
            <div>
              <label htmlFor="lastDate">End Date:</label>
              <input
                type="datetime-local"
                id="lastDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <div>User ID: {props.id}</div>
            <button
              onClick={async (e) => {
                const res = await createSubscription({
                  variables: {
                    userId: props.id,
                    type: subscriptionType,
                    startDate: startDate + ":00.000Z",
                    endDate: endDate + ":00.000Z",
                    term: term,
                  },
                });
                alert("Subscription created");
              }}
            >
              Create Subscription
            </button>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const now = moment();
              let end;
              const existingSubscription = props.subscriptions[0];

              if (term === "month") {
                end = moment(existingSubscription.endDate).add(1, "month");
              } else if (term === "year") {
                end = moment(existingSubscription.endDate).add(1, "year");
              }
              const variables = {
                userId: props.id,
                type: subscriptionType,
                term: term,
                // startDate: existingSubscription.startDate,
                endDate: end.toISOString(),
              };

              await updateSubscription({
                variables: {
                  id: existingSubscription.id,
                  ...variables,
                },
              });
              // if (existingSubscription) {
              //   console.log("1");

              //   await updateSubscription({
              //     variables: {
              //       id: existingSubscription.id,
              //       ...variables,
              //     },
              //   });
              // } else {
              //   console.log("2");
              //   await createSubscription({ variables });
              // }
            }}
          >
            <div className="radio-buttons">
              {subscriptionTypes.map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    value={type}
                    checked={subscriptionType === type}
                    onChange={(e) => setSubscriptionType(e.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>
            <select onChange={(e) => setTerm(e.target.value)}>
              <option>Choose term</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <button type="submit">Обновить</button>
          </form>
        </SubscriptionBlock>
        <h4>Комментарий</h4>
        {/* <div>{comment}</div> */}
        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            value={props.comment}
            name="text"
          />
        </div>
        <h4>Имейл</h4>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        <div className="editor">
          <DynamicLoadedEditor
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
              },
            });
          }}
        >
          {loading1 ? "Sending..." : "Send"}
        </button>

        <button onClick={(e) => setShow(!show)}>Show previous emails</button>
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
                  <div className="text">{parse(mes.text)}</div>
                </div>
              ))}
          </div>
        )}
        <SubscriptionBlock>
          <h3>Управление курсами</h3>
          <button
            onClick={(e) => setAreCourseSettingsOpen(!areCourseSettingsOpen)}
          >
            Открыть настройки курсов
          </button>
          {areCourseSettingsOpen && (
            <div>
              <h4>Курсы</h4>
              {props.coursePages.map((c) => {
                const ids = props.new_subjects.map((course) => course.id);
                console.log(ids, c.id, ids.includes(c.id));
                return (
                  <div className="miniblock">
                    <div className="main">
                      {c.title}
                      <br />
                      {ids.includes(c.id) ? (
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            let unenroll = await unenrollFromCourse({
                              variables: {
                                id: props.id,
                                coursePageId: c.id,
                              },
                            });
                            alert("Закрыли доступ!");
                          }}
                        >
                          Закрыть
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={async (e) => {
                              e.preventDefault();
                              let enroll = await enrollOnCourse({
                                variables: {
                                  id: props.id,
                                  coursePageId: c.id,
                                },
                              });
                              alert("Открыли доступ!");
                            }}
                          >
                            Открыть
                          </button>
                          <button
                            onClick={() =>
                              handleSendEmail(props.name, props.email, c.id)
                            }
                          >
                            Welcome Email
                          </button>
                        </>
                      )}
                    </div>
                    <div className="second">
                      <div class="enrollment-status">
                        <input
                          checked={ids.includes(c.id)}
                          type="checkbox"
                          id="enrolled"
                          class="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SubscriptionBlock>
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
            <button
              onClick={(e) => {
                updateOrderAuto({
                  variables: {
                    id: o.id,
                    userId: props.id,
                  },
                });
              }}
            >
              Check Payment
            </button>
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
          props.lessonResults
            .slice() // Make a copy of the array to avoid mutating the original
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by newest updatedAt
            .map((l) => (
              <div key={l.lesson.id}>
                {" "}
                {/* Assuming lesson has an id */}
                <div>
                  <b>{l.lesson.name}</b>
                </div>
                <li>{l.progress}</li>
                <li>{l.updatedAt}</li>
              </div>
            ))}
        <h4>Результаты испытаний</h4>
        {props.challengeResults.length > 0 &&
          props.challengeResults.map((l) => (
            <div>
              <div>
                {l.lesson.name} - {l.lesson.coursePage.title}
              </div>
              <li>
                {l.correct} / {l.correct + l.wrong}
              </li>
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
