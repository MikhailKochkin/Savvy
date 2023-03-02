import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import renderHTML from "react-render-html";
import * as EmailValidator from "email-validator";

import AnswerOption from "./AnswerOption";
import AnswerOptionWithFeedback from "./AnswerOptionWithFeedback";

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
  a {
    /* border-bottom: 2px solid #26ba8d; */
    padding: 0;
    transition: 0.3s;
    cursor: pointer;
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
    margin-bottom: 20px;
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
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 5px 0;
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
    font-size: 1.4rem;
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

const ButtonOpen = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #283d3b;
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
  const [hidden, setHidden] = useState(
    new Array(props.options.length).fill(false)
  );

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  const updateQuestion = () => {};

  const shuffle = () => {
    setMaterialsNumber(materialsNumber + 3);
  };

  const getFeedBackData = (val) => {
    let my_course = props.sorted_courses.find((c) => c.id == props.course.id);
    if (val == "format" && my_course && my_course.methods) {
      setFeedback(my_course.methods);
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
  };

  const getTestData = (number, move, update, id) => {
    console.log("number 2", number, hidden);
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
    console.log("updated_arr", updated_arr);
    setHidden([...updated_arr]);
  };

  console.log("props.sorted_courses", props.sorted_courses);

  return (
    <Styles>
      <TextBar className="Test">
        <div className="question_box">
          <div className="question_text">
            {question && renderHTML(question)}
            {props.type == "course" && props.course && props.course.title}
            {props.type == "post" && props.post && props.post.title}
          </div>
          <IconBlock>
            <img className="icon" src="../../static/misha_new.webp" />
            <div className="name">Михаил</div>
          </IconBlock>
        </div>
        <div className="answer">
          <IconBlock>
            <img className="icon" src="../../static/flash.svg" />
            <div className="name">Вы</div>
          </IconBlock>
          <Options>
            {props.type !== "courses" &&
              props.type !== "course" &&
              options.map((o, index) => (
                <>
                  <AnswerOption
                    key={index}
                    answer={o.answer}
                    hidden={!props.hideElems ? false : hidden[index]}
                    move={o.move}
                    type={o.type}
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
                <AnswerOptionWithFeedback
                  key={22}
                  answer={"Отзывы о курсе"}
                  move={"course"}
                  type="reviews"
                  onAnswerSelected={getFeedBackData}
                />
                <AnswerOptionWithFeedback
                  key={33}
                  answer={"Формат курса"}
                  move={"course"}
                  type="format"
                  onAnswerSelected={getFeedBackData}
                />
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

            {props.type == "post" && props.post && props.post.id && (
              <>
                <AnswerOption
                  answer={"Открыть материал"}
                  type={"link"}
                  link={`https://besavvy.app/post?id=${props.post.id}&source=navigator`}
                  update={"open_post"}
                  onAnswerSelected={getTestData}
                />
              </>
            )}

            {props.type == "useful" && props.useful && props.useful.id && (
              <>
                <AnswerOption
                  answer={"Открыть материал"}
                  type={"link"}
                  link={`https://besavvy.app/useful?id=${props.useful.id}&source=navigator`}
                  update={"open_useful"}
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
                      hidden={hidden[index]}
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
                {console.log("props.sorted_blogs", props.sorted_blogs)}
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
                  .slice(0, materialsNumber)
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
      </TextBar>
      {feedback && (
        <TextBar>
          <div className="question_box">
            <div className="question_text">
              {feedback &&
                (Array.isArray(feedback)
                  ? feedback.map((f) => renderHTML(f))
                  : renderHTML(feedback))}
            </div>
            <IconBlock>
              <img className="icon" src="../../static/misha.jpg" />
              <div className="name">Михаил</div>
            </IconBlock>
          </div>
        </TextBar>
      )}
    </Styles>
  );
};

export default Block;
