import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import renderHTML from "react-render-html";
import * as EmailValidator from "email-validator";
import moment from "moment";

import Post from "../blog/Post";
import AnswerOption from "./AnswerOption";
import AnswerOptionWithFeedback from "./AnswerOptionWithFeedback";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePageId: String!
    $userId: String!
    $price: Int!
    $promocode: String
    $comment: String
  ) {
    createOrder(
      coursePageId: $coursePageId
      price: $price
      userId: $userId
      promocode: $promocode
      comment: $comment
    ) {
      order {
        id
        paymentID
      }
      url
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $comment: String
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      comment: $comment
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-bottom: 40px;
  animation-duration: 1s;
  animation-name: animate-fade;
  /* animation-delay: 0.5s; */
  animation-fill-mode: both;
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0;
    transition: 0.3s;
    color: black;
    cursor: pointer;
  }
  @keyframes animate-fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const TextBar = styled.div`
  width: 500px;
  font-size: 1.6rem;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  .video {
    /* border: 1px solid #000000;
    background: #000000;
    border-radius: 10px;
    overflow: hidden;
    z-index: 1; */
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  .question_box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .question_container {
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 40%;
    max-width: 70%;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
      margin-left: 0;
    }
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 5%;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 0px 10px;
      margin-top: 10px;
    }
    img {
      width: 100%;
    }
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-left: 0px;
    font-size: 1.6rem;
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  input {
    width: 48%;
    background: none;
    font-size: 1.6rem;
    border: 1px solid #d6d6d6;
    font-family: Montserrat;
    outline: 0;
    padding: 10px;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid #999999;
    }
    &:focus {
      border: 1px solid #1a2a81;
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    height: 55px;
    width: 55px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
`;

const Material = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  input {
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
    color: #787878;
  }
  #standard-select-currency {
    width: 90%;
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  #standard-select-currency-label {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.3;
  width: 100%;
`;

const PhoneInput = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const ButtonOpen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 2%;
  font-family: Montserrat;
  /* border: 2px solid #283d3b; */
  text-align: center;
  background: #175ffe;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  color: #fff;
  a {
    color: #fff;
  }
  &:hover {
    background-color: #0b44bf;
  }
`;

const Block = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [question, setQuestion] = useState(props.question);
  const [options, setOptions] = useState(props.options);
  const [feedback, setFeedback] = useState();
  const [materialsNumber, setMaterialsNumber] = useState(3);
  const [type, setType] = useState();

  const [hidden, setHidden] = useState(
    new Array(props.options.length).fill(false)
  );

  moment.locale("ru");
  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const updateQuestion = () => {};

  const shuffle = () => {
    setMaterialsNumber(materialsNumber + 3);
  };
  let my_course;
  if (props.course)
    my_course = props.sorted_courses.find((c) => c.id == props.course.id);

  const compareDates = (date1, date2) => {
    if (date1.getTime() > date2.getTime()) {
      return 1;
    } else if (date1.getTime() < date2.getTime()) {
      return -1;
    } else {
      return 0;
    }
  };

  const getFeedBackData = (val) => {
    if (val == "format" && my_course && my_course.methods) {
      setFeedback(my_course.methods);
    } else if (val == "discount" && my_course.discountPrice) {
      setType("discount");
      setFeedback(
        `<p>Вы можете <b>сегодня</b> приобрести этот курс со скидкой ${parseInt(
          (1 - my_course.discountPrice / my_course.price) * 100
        )}% в этом боте за ${my_course.discountPrice} вместо ${
          my_course.price
        } .</p>
        <p>Я (бот) не знаю, сколько эта скидка продержится, поэтому советую сейчас ей воспользоваться.</p>
        <p>После оплаты мы свяжемся с вами по почте, которую вы указали при проведении оплаты, и откроем доступ к курсу.</p>`
      );
    } else if (val == "payment" && my_course.price) {
      setType("payment");
      setFeedback(
        `<p>Вы можете приобрести этот курс за ${parseInt(
          my_course.price
        )} ₽ в этом боте.</p>
        <p>После оплаты мы свяжемся с вами по почте, которую вы указали при проведении оплаты, и откроем доступ к курсу.</p>`
      );
    } else if (val == "dates") {
      setType("dates");
      let text;
      let today = new Date();
      if (!my_course.nextStart) {
        text = `<p>На курс можно записаться <b>сегодня</b>. Мы индивидуально подключим вас к курсу и дадим доступ к записям уже прошедших вебинаров.</p>`;
      } else {
        let date_result = compareDates(
          new Date(my_course.nextStart),
          new Date(today.toISOString())
        );
        if (date_result == 1) {
          text = `<p>Следующий поток стартует ${moment(
            my_course.nextStart
          ).format("LL")} </p>`;
        } else {
          text = `<p>На курс можно записаться <b>сегодня</b>. Мы индивидуально подключим вас к курсу и дадим доступ к записям уже прошедших вебинаров.</p>`;
        }
      }
      setFeedback(text);
    } else if (val == "authors") {
      setType("authors");
      let text = [];
      if (my_course.authors.length > 0) {
        my_course.authors.map((auth) =>
          text.push(
            `<p> ✔️ <b>${auth.name} ${auth.surname ? auth.surname : ""}</b>${
              auth.description ? auth.description : ""
            }</p>`
          )
        );
      } else {
        text.push(
          `<p><b> ✔️ ${my_course.user.name} ${
            my_course.user.surname ? my_course.user.surname : ""
          }</b> ${
            my_course.user.description ? my_course.user.description : ""
          }</p>`
        );
      }
      setFeedback(text.join(" "));
    } else if (val == "price" && my_course.tariffs) {
      setType("price");
      setFeedback(my_course.tariffs);
    } else if (val == "audience" && my_course.audience) {
      setType("audience");
      setFeedback(my_course.audience);
    } else if (val == "reviews") {
      setType("reviews");
      setFeedback(my_course.result);
    } else if (val == "program" && my_course && my_course.lessons) {
      let uls = [];
      let sorted_lessons = my_course.lessons
        .filter((l) => l.type.toLowerCase() !== "hidden")
        .sort((a, b) => a.number - b.number);
      sorted_lessons.map((s) =>
        uls.push(`
          <div>
            ${s.number}. ${s.name}
          </div>`)
      );
      setFeedback(uls);
    } else {
      setFeedback("В боте нет такой информации. Посмотрите страницу курса.");
    }
    props.updateBotMap("", val);
  };

  const hasReachedHalf = () => {
    console.log("props, has read half of the post");
    props.updateBotMap(null, "has read half of the post");
  };

  const hasReachedBottom = () => {
    console.log("props, has read full postt");
    props.updateBotMap(null, "has read full post");
  };

  const getTestData = (number, move, update, id) => {
    props.updateBotMap(move, update, id);
    let new_arr = [...hidden];
    let updated_arr = new_arr.map((el, i) => {
      if (number !== i) {
        el = true;
        return el;
      } else {
        el = false;
        return el;
      }
    });
    setHidden([...updated_arr]);
  };

  return (
    <Styles>
      <TextBar className="Test">
        <div className="question_box">
          <div className="question_text">
            {question && renderHTML(question)}
            {props.type == "course" && props.course && props.course.title}
            {props.type == "post" && props.post && props.post.title
              ? props.post.title
              : null}
            <b>{props.type == "post" && props.name ? props.name : null}</b>
          </div>
          <IconBlock>
            <img className="icon" src="../../static/misha_new.webp" />
            <div className="name">Михаил</div>
          </IconBlock>
        </div>
        <div className="answer">
          {props.type !== "post" && (
            <IconBlock>
              <img className="icon" src="../../static/flash.svg" />
              <div className="name">Вы</div>
            </IconBlock>
          )}
          <Options>
            {props.type !== "courses" &&
              props.type !== "posts" &&
              props.type !== "usefuls" &&
              props.type !== "course" &&
              props.type !== "post" &&
              options.map((o, index) => (
                <>
                  <AnswerOption
                    key={index}
                    answer={o.answer}
                    hidden={!props.hideElems ? false : hidden[index]}
                    move={o.move}
                    type={o.type}
                    color={o.color}
                    link={o.link}
                    update={o.update}
                    number={index}
                    onAnswerSelected={getTestData}
                    lastBlock={props.lastBlock}
                  />
                </>
              ))}
            {props.type == "course" && (
              <>
                <AnswerOptionWithFeedback
                  key={11}
                  answer={"Программа курса"}
                  move={"course"}
                  type="program"
                  onAnswerSelected={getFeedBackData}
                />
                {my_course && my_course.result && (
                  <AnswerOptionWithFeedback
                    key={22}
                    answer={"Отзывы и результаты"}
                    move={"course"}
                    type="reviews"
                    onAnswerSelected={getFeedBackData}
                  />
                )}
                {my_course && my_course.audience && (
                  <AnswerOptionWithFeedback
                    key={99}
                    answer={"Для кого курс"}
                    move={"course"}
                    type="audience"
                    onAnswerSelected={getFeedBackData}
                  />
                )}
                <AnswerOptionWithFeedback
                  key={66}
                  answer={"Авторы"}
                  move={"course"}
                  type="authors"
                  onAnswerSelected={getFeedBackData}
                />
                <AnswerOptionWithFeedback
                  key={661}
                  answer={"Сроки и дата старта"}
                  move={"course"}
                  type="dates"
                  onAnswerSelected={getFeedBackData}
                />
                <AnswerOptionWithFeedback
                  key={33}
                  answer={"Формат обучения"}
                  move={"course"}
                  type="format"
                  onAnswerSelected={getFeedBackData}
                />
                {/* <AnswerOptionWithFeedback
                  key={88}
                  answer={"Цены"}
                  move={"course"}
                  type="price"
                  onAnswerSelected={getFeedBackData}
                /> */}
                {my_course && my_course.discountPrice && (
                  <AnswerOptionWithFeedback
                    key={44}
                    answer={"Получить скидку"}
                    move={"course"}
                    type="discount"
                    onAnswerSelected={getFeedBackData}
                  />
                )}
                {my_course && !my_course.discountPrice && my_course.price && (
                  <AnswerOptionWithFeedback
                    key={44}
                    answer={"Купить курс"}
                    move={"course"}
                    type="payment"
                    onAnswerSelected={getFeedBackData}
                  />
                )}

                {props.course && props.course.id && (
                  <AnswerOption
                    answer={"Перейти на страницу курса"}
                    type={"link"}
                    onAnswerSelected={getTestData}
                    update={"open_course_page"}
                    link={`https://besavvy.app/coursePage?id=${props.course.id}&form=lead&source=navigator`}
                  />
                )}
              </>
            )}
            {/* {props.type == "post" && props.post && props.post.id && (
              <>
                <AnswerOption
                  answer={"Открыть материал"}
                  type={"link"}
                  link={`https://besavvy.app/post?id=${props.post.id}&source=navigator`}
                  update={"open_post"}
                  onAnswerSelected={getTestData}
                />
              </>
            )} */}
            {props.type == "useful" &&
              ((props.useful && props.useful.id) || props.id) &&
              (!props.me ? (
                <AnswerOption
                  answer={"Создать аккаунт на сайте"}
                  type={"signup"}
                  // move={"sent"}
                  // link={`https://besavvy.app/referal?id=${props.referal.id}`}
                  update={"signup"}
                  onAnswerSelected={getTestData}
                />
              ) : (
                <AnswerOption
                  answer={`Отправить материал на почту`}
                  type={"link"}
                  link={props.useful ? props.useful.link : props.email_link}
                  move={"sent"}
                  update={"open_useful"}
                  onAnswerSelected={getTestData}
                  me={props.me}
                />
              ))}
            {props.me && props.type == "share_bot" && (
              <>
                <AnswerOption
                  answer={"Отправить ссылку себе на почту, чтобы не потерять"}
                  type={"link"}
                  move={"sent"}
                  link={`https://besavvy.app/referal?id=${props.me.id}`}
                  update={"send_referal_link"}
                  onAnswerSelected={getTestData}
                  me={props.me}
                />
              </>
            )}
            {!props.me && props.type == "share_bot" && (
              <>
                <AnswerOption
                  answer={"Создать аккаунт на сайте"}
                  type={"signup"}
                  // move={"sent"}
                  // link={`https://besavvy.app/referal?id=${props.referal.id}`}
                  update={"signup"}
                  onAnswerSelected={getTestData}
                />
              </>
            )}

            {props.type == "courses" && (
              <>
                {props.sorted_courses
                  .slice(
                    materialsNumber - 3 <= 0 ? 0 : materialsNumber - 3,
                    materialsNumber
                  )
                  .map((o, index) => (
                    <AnswerOption
                      key={index}
                      answer={o.title}
                      hidden={!props.hideElems ? false : hidden[index]}
                      move={"course"}
                      update={o.update}
                      number={index}
                      onAnswerSelected={getTestData}
                      id={o.id}
                      lastBlock={props.lastBlock}
                    />
                  ))}
                {props.sorted_courses.length > 3 &&
                  materialsNumber < props.sorted_courses.length && (
                    <AnswerOption
                      key={165435}
                      answer={"Показать другие варианты"}
                      shuffle={(e) => shuffle()}
                      type="shuffle"
                    />
                  )}
              </>
            )}
            {props.type == "posts" && (
              <>
                {props.sorted_blogs &&
                  props.sorted_blogs
                    .slice(
                      materialsNumber - 3 <= 0 ? 0 : materialsNumber - 3,
                      materialsNumber
                    )
                    .map((o, index) => (
                      <>
                        <AnswerOption
                          key={index}
                          answer={o.title}
                          hidden={hidden[index]}
                          move={"post"}
                          update={o.update}
                          number={index}
                          onAnswerSelected={getTestData}
                          id={o.id}
                          lastBlock={props.lastBlock}
                        />
                      </>
                    ))}
                {props.sorted_blogs.length > 3 &&
                  materialsNumber < props.sorted_blogs.length && (
                    <AnswerOption
                      key={165435}
                      answer={"Показать другие варианты"}
                      shuffle={(e) => shuffle()}
                      type="shuffle"
                    />
                  )}
              </>
            )}
            {props.type == "usefuls" && props.sorted_usefuls && (
              <>
                {props.sorted_usefuls
                  .slice(
                    materialsNumber - 3 <= 0 ? 0 : materialsNumber - 3,
                    materialsNumber
                  )
                  .map((o, index) => (
                    <>
                      <AnswerOption
                        key={index}
                        answer={o.name}
                        hidden={hidden[index]}
                        move={"useful"}
                        update={o.update}
                        number={index}
                        onAnswerSelected={getTestData}
                        id={o.id}
                        lastBlock={props.lastBlock}
                      />
                    </>
                  ))}
                {props.sorted_usefuls.length > 3 &&
                  materialsNumber < props.sorted_usefuls.length && (
                    <AnswerOption
                      key={165435}
                      answer={"Показать другие варианты"}
                      shuffle={(e) => shuffle()}
                      type="shuffle"
                    />
                  )}
              </>
            )}
            {props.type == "form" && (
              <>
                <Fieldset>
                  <Group>
                    <input
                      className="name"
                      type="text"
                      name="name"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="surname"
                      type="text"
                      name="surname"
                      placeholder="Фамилия"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </Group>
                  <PhoneInput
                    className="number"
                    type="tel"
                    name="number"
                    placeholder="Телефон"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    label="Number"
                  />
                  <Input
                    className="email"
                    type="email"
                    name="email"
                    placeholder="Имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Электронная почта"
                  />
                </Fieldset>

                <ButtonOpen
                  id="blog_application"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!EmailValidator.validate(email)) {
                      alert("Неправильный имейл");
                    } else if (number.length < 7) {
                      alert("Неправильный номер мобильного телефона");
                    } else {
                      const res = await createBusinessClient({
                        variables: {
                          type: asPath ? asPath : "Unknown",
                          email,
                          name,
                          surname,
                          number,
                          comment: props.userDescription.join(", "),
                        },
                      });
                      alert("Спасибо! Свяжемся с вами в течение дня!");
                    }
                  }}
                >
                  {loading ? "Готовим заявку..." : "Оставить заявку"}
                </ButtonOpen>
              </>
            )}
          </Options>
        </div>
        <Material>
          {props.type == "post" &&
            ((props.post && props.post.id) || props.id) && (
              <Post
                id={props.id ? props.id : props.post.id}
                hasReachedHalf={hasReachedHalf}
                hasReachedBottom={hasReachedBottom}
              />
            )}
        </Material>
        {props.type == "post" && (
          <>
            <div className="question_box">
              <div className="question_text">
                У меня по этой теме есть еще материалы.
              </div>
              <IconBlock>
                <img className="icon" src="../../static/misha_new.webp" />
                <div className="name">Михаил</div>
              </IconBlock>
            </div>
            <div className="answer">
              {props.type !== "post" && (
                <IconBlock>
                  <img className="icon" src="../../static/flash.svg" />
                  <div className="name">Вы</div>
                </IconBlock>
              )}
              <Options>
                {options.map((o, index) => (
                  <>
                    <AnswerOption
                      key={index}
                      answer={o.answer}
                      hidden={!props.hideElems ? false : hidden[index]}
                      move={o.move}
                      type={o.type}
                      color={o.color}
                      link={o.link}
                      update={o.update}
                      number={index}
                      onAnswerSelected={getTestData}
                      lastBlock={props.lastBlock}
                    />
                  </>
                ))}
              </Options>
            </div>
          </>
        )}
      </TextBar>
      {feedback && (
        <>
          <TextBar>
            <div className="question_box">
              <div className="question_container">
                <div className="question_text">
                  {feedback &&
                    (Array.isArray(feedback)
                      ? feedback.map((f) => renderHTML(f))
                      : renderHTML(feedback))}
                </div>
                {type == "discount" && (
                  <ButtonOpen
                    id="discount_payment"
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await createOrder({
                        variables: {
                          coursePageId: my_course.id,
                          price: my_course.discountPrice,
                          userId: props.me
                            ? props.me.id
                            : "clexttwq3134261fqwiljo29q1",
                        },
                      });
                      location.href = res.data.createOrder.url;
                    }}
                  >
                    {loading_data ? "Готовим оплату..." : "Купить со скидкой"}
                  </ButtonOpen>
                )}
                {type == "payment" && (
                  <ButtonOpen
                    id="payment"
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await createOrder({
                        variables: {
                          coursePageId: my_course.id,
                          price: my_course.price,
                          userId: props.me
                            ? props.me.id
                            : "clexttwq3134261fqwiljo29q1",
                        },
                      });
                      location.href = res.data.createOrder.url;
                    }}
                  >
                    {loading_data ? "Готовим оплату..." : "Купить курс"}
                  </ButtonOpen>
                )}
              </div>
              <IconBlock>
                <img className="icon" src="../../static/misha_new.webp" />
                <div className="name">Михаил</div>
              </IconBlock>
            </div>
          </TextBar>
        </>
      )}
    </Styles>
  );
};

export default Block;
