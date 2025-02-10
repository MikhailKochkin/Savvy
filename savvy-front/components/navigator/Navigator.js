import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import Share from "./Share";
import Block from "./Block";
import ExitIntentPopup from "./ExitIntentPopup";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: String!, $tags: [String]) {
    updateUser(id: $id, tags: $tags) {
      id
    }
  }
`;

const CREATE_BOT_DIALOGUE_MUTATION = gql`
  mutation CREATE_BOT_DIALOGUE_MUTATION($journey: [String!], $source: String) {
    createBotDialogue(journey: $journey, source: $source) {
      id
    }
  }
`;

const UPDATE_BOT_DIALOGUE_MUTATION = gql`
  mutation UPDATE_BOT_DIALOGUE_MUTATION(
    $id: String
    $rating: Int
    $journey: [String!]
  ) {
    updateBotDialogue(journey: $journey, rating: $rating, id: $id) {
      id
    }
  }
`;

const USEFUL_QUERY = gql`
  query USEFUL_QUERY {
    usefuls {
      id
      name
      link
      tags
    }
  }
`;

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts {
      id
      title
      tags
      language
      summary
      lessonId
      user {
        id
        name
        surname
        image
      }
      createdAt
    }
  }
`;

const COURSES_QUERY = gql`
  query COURSES_QUERY {
    coursePages(
      where: { published: { equals: true }, courseType: { equals: FORMONEY } }
    ) {
      id
      title
      description
      result
      nextStart
      tariffs
      audience
      methods
      nextStart
      installments
      price
      courseType
      currency
      discountPrice
      tags
      createdAt
      lessons {
        id
        number
        name
        type
      }
      user {
        id
        name
        surname
        work
        description
      }
      authors {
        id
        name
        surname
        work
        description
      }
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 70px;
`;

const Container = styled.div`
  width: 570px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  .exit-intent-popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }

  .popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-width: 500px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  /* input[type="email"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
  } */

  /* button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  } */

  @media (max-width: 800px) {
    width: 95%;
    font-size: 1.6rem;
    margin-top: 40px;
  }
`;

const ButtonBox = styled.div`
  width: 550px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .comment {
    margin-left: 30px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #6a6b7c;
    font-weight: 400;
  }
  .stars {
    margin-left: 15px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 800px) {
    width: 95%;
    flex-direction: column;
    padding-left: 10px;
    font-size: 1.6rem;

    .comment {
      margin-left: 0px;
      margin-bottom: 5px;
    }
    .stars {
      margin-left: 0px;
      margin-bottom: 5px;
    }
  }
`;

const ButtonBack = styled.button`
  color: #6a6b7c;
  font-family: Montserrat;
  font-size: 1.4rem;
  border: 1px solid #f3f3f3;
  box-shadow: rgb(47 48 72 / 30%) 0px 0px 1px 0px;
  /* transition: transform 0.15s ease-in-out 0s; */
  border-radius: 4px;
  padding: 6px 24px;
  background-color: white;
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #707e9f;
  }
  @media (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const Navigator = (props) => {
  // block types: introduction, segmentation, useful, courses
  // courses:
  // topics: law_school, corp, ip, litigation, other, foundation
  // level: english, exam, upskill, foundation
  const { t } = useTranslation("navigator");

  const [botMap, setBotMap] = useState([
    {
      type: "introduction",
      question:
        "<p>Привет. Я Навигатор BeSavvy. </p><p>Я сейчас проверяю, есть ли у тебя аккаунт на сайте, чтобы дать тебе максимально персонализированные рекомендации.</p><p>Я каждый день собираю информацию о том, как юристам развивать карьеру. Поделиться, чем я знаю?</p>",
      options: [
        {
          answer: props.me ? "Давай" : "Давай",
          move:
            props.me && props.me.tags?.length > 0
              ? "next_steps_tags_uploaded"
              : "segmentation_interests",
          update: "",
        },
      ],
    },
    {
      type: "segmentation_interests",
      question: "В какой сфере работаете?",
      options: [
        {
          answer: "Пока просто учусь на юр факе",
          move: "segmentation_goals",
          update: "law_school",
        },
        {
          answer: "Корпоративное право",
          move: "segmentation_goals",
          update: "corp",
        },
        { answer: "IP/IT", move: "segmentation_goals", update: "ip" },
        {
          answer: "Судебная работа",
          move: "segmentation_goals",
          update: "litigation",
        },
        {
          answer: "Другое",
          move: "segmentation_goals",
          update: "other",
        },
      ],
    },
    {
      type: "segmentation_goals",
      question: "Какую карьерную цель перед собой ставите?",
      options: [
        {
          answer: "Освоить Legal English",
          move: "next_steps",
          update: "english",
        },
        {
          answer: "Сдать экзамен / пройти собеседование",
          move: "next_steps",
          update: "exam",
        },
        {
          answer: "Повысить квалификацию",
          move: "next_steps",
          update: "upskill",
        },
        {
          answer: "Повторить основы",
          move: "next_steps",
          update: "foundation",
        },
      ],
    },
    {
      type: "next_steps",
      question: "Отлично. Чем могу помочь?",
      options: [
        {
          answer: "Специальные предложения на курсы",
          color: "green",
          move: "courses",
          update: "courses",
        },
        {
          answer: "Бесплатные пособия",
          move: "usefuls",
          update: "usefuls",
        },
        {
          answer: "Блоги и подкасты с экспертами",
          move: "posts",
          update: "posts",
        },
        {
          answer: "Хочу пообщаться с Михаилом напрямую",
          move: "contact",
          update: "call_with_Mike",
        },
        {
          answer: "💰 Хочу заработать с BeSavvy",
          move: "share_bot",
          update: "share_bot",
        },
      ],
    },
    {
      type: "next_steps_tags_uploaded",
      question:
        "Отлично. Я вспомнил, что тебя интересует. О чем могу рассказать сегодня?",
      options: [
        {
          answer: "Специальные предложения на курсы",
          color: "green",
          move: "courses",
          update: "courses",
        },
        {
          answer: "Бесплатные пособия",
          move: "usefuls",
          update: "usefuls",
        },
        {
          answer: "Блоги и подкасты с экспертами",
          move: "posts",
          update: "posts",
        },
        {
          answer: "Хочу пообщаться с Михаилом напрямую",
          move: "contact",
          update: "call_with_Mike",
        },
        {
          answer: "Хочу выбрать другие темы",
          move: "segmentation_interests",
          update: "change_interests",
        },
        {
          answer: "💰 Хочу заработать с BeSavvy",
          move: "share_bot",
          update: "share_bot",
        },
      ],
    },
    {
      type: "more_next_steps",
      question:
        "Было полезно? Мы подобрали для вас еще полезные материалы по этой теме.",
      options: [
        {
          answer: "Курсы",
          move: "courses",
          update: "courses",
        },
        {
          answer: "Бесплатные пособия",
          move: "usefuls",
          update: "usefuls",
        },
        {
          answer: "Блоги и подкасты с экспертами",
          move: "posts",
          update: "posts",
        },
        {
          answer: "Хочу пообщаться с Михаилом напрямую",
          move: "contact",
          update: "call_with_Mike",
        },
      ],
    },
    {
      type: "courses",
      question: "Вам могут быть интересны эти курсы:",
      options: [
        {
          answer: "Загружаем ...",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
      ],
    },
    {
      type: "posts",
      question: "Вам могут быть интересны эти блоги и подкасты:",
      options: [
        {
          answer: "",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
      ],
    },
    {
      type: "usefuls",
      question: "Вам могут быть интересны эти материалы:",
      options: [
        {
          answer: "",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
        {
          answer: "",
          move: "",
          update: "",
        },
      ],
    },
    {
      type: "course",
      question: "Информация по курсу: ",
      options: [],
    },
    {
      type: "post",
      question: t("downloaded_material"),
      id: props.id ? props.id : null,
      name: props.name ? props.name : null,
      options: [
        {
          answer: "Специальные предложения на курсы",
          color: "green",
          move: "courses",
          update: "courses",
        },
        {
          answer: "Бесплатные пособия",
          move: "usefuls",
          update: "usefuls",
        },
        {
          answer: "Блоги и подкасты с экспертами",
          move: "posts",
          update: "posts",
        },
        {
          answer: "Хочу пообщаться с Михаилом напрямую",
          move: "contact",
          update: "call_with_Mike",
        },
        {
          answer: "💰 Хочу заработать с BeSavvy",
          move: "share_bot",
          update: "share_bot",
        },
      ],
    },
    {
      type: "lawrdle",
      question: `
      <p>
                  Угадайте <b>слово, связанное с правом,</b> за шесть попыток.
                </p>
                <p>
                  Каждая попытка должна быть правильным словом из заданного количества букв.
                </p>
                <p>
                  Нажмите кнопку Enter, чтобы отправить ответ. После каждой
                  попытки цвет каждой ячейки будет меняться, чтобы показать,
                  насколько близка была ваша попытка к загаданному слову.
                </p>
      `,
      id: props.id ? props.id : null,
      name: props.name ? props.name : null,
      options: [],
    },
    {
      type: "sent",
      question:
        "Отправили материал вам на почту. Но я знаю еще много всего интересного. Найдите, что будет вам полезно.",
      options: [
        {
          answer: "Специальные предложения на курсы",
          color: "green",
          move: "courses",
          update: "courses",
        },
        {
          answer: "Бесплатные пособия",
          move: "usefuls",
          update: "usefuls",
        },
        {
          answer: "Блоги и подкасты с экспертами",
          move: "posts",
          update: "posts",
        },
        {
          answer: "Хочу пообщаться с Михаилом напрямую",
          move: "contact",
          update: "call_with_Mike",
        },
        {
          answer: "💰 Хочу заработать с BeSavvy",
          move: "share_bot",
          update: "share_bot",
        },
      ],
    },
    {
      type: "useful",
      question: props.me
        ? `Вот ссылка на материал ${props.name ? props.name : null}.`
        : `Создайте аккаунт на сайте, чтобы скачать материал ${
            props.name ? `<b>"${props.name}".</b>` : null
          }`,
      options: [],
      id: props.id ? props.id : null,
      name: props.name ? props.name : null,
      email_link: props.email_link,
    },
    {
      type: "contact",
      question:
        "Отлично, я буду рад пообщаться с вами напрямую. В каком формате?",
      options: [
        // {
        //   answer: "Написать в телеграм",
        //   type: "link",
        //   link: "https://t.me/mikkochkin",
        //   move: "",
        //   update: "telegram",
        // },
        {
          answer: "Оставить заявку. Я сам вам напишу в одном из мессенджеров.",
          move: "form",
          update: "apply",
        },
        // {
        //   answer: "Написать по email",
        //   move: "email",
        //   update: "email",
        // },
      ],
    },
    {
      type: "share_bot",
      question: `<p>Заработать с BeSavvy легко. Достаточно зарегистироваться на сайте, если вы это еще не сделали. И отправить в чат своих друзей вот эту ссылку. </p>
        <p>За каждую регистрацию на сайте по этой ссылке вы получите <b>100 рублей</b> на свой счет. Если один из ваших друзей, купит курс на сайте, вы сможете вывести накопленную сумму на свой счет. Следите за балансом в личном кабинете.</p>
        ${
          props.me
            ? `<p>⭐️ Пожалуйста, отправьте эту ссылку
                <a target="_blank" href="https://besavvy.app/navigator?referal=${props.me.id}">https://besavvy.app/navigator?referal=${props.me.id}</a>
              в чат своих друзей-юристов.</p>`
            : `<p>⭐️ Сначала, пожалуйста, зарегистрируйтесь на сайте. Потом мы вам на почту отправим ссылку на бот, которой можно будет поделиться со своими друзьями и коллегами.</p>`
        }`,
      options: [],
    },
    {
      type: "form",
      question:
        "Оставьте короткую информацию о себе. Я с вами свяжусь в течение 24 часов.",
      options: [],
    },
  ]);

  const [journey, setJourney] = useState([]);
  const [dialogueId, setDialogueId] = useState();
  const [course, setCourse] = useState();
  const [post, setPost] = useState();
  const [useful, setUseful] = useState();
  const [rating, setRating] = useState(0);

  // level types: student, junior, lawyer, manager
  // interests: law_school, corporate, antitrust, english,
  // goals: exams, interviews, upskilling, new_job
  const [userDescription, setUserDescription] = useState([]);
  useEffect(() => {
    localStorage.setItem("referal", props.referal);
  }, [props.referal]);
  const { loading, error, data } = useQuery(COURSES_QUERY);
  const {
    loading: posts_loading,
    error: posts_error,
    data: posts_data,
  } = useQuery(POSTS_QUERY);
  const {
    loading: useful_loading,
    error: useful_error,
    data: useful_data,
  } = useQuery(USEFUL_QUERY);
  const [createBotDialogue, { data: BotData, loading: BotLoading }] =
    useMutation(CREATE_BOT_DIALOGUE_MUTATION);
  const [
    updateBotDialogue,
    { data: UpdateBotData, loading: UpdateBotLoading },
  ] = useMutation(UPDATE_BOT_DIALOGUE_MUTATION);
  const router = useRouter();

  const [updateUser, { data: data3, loading: loading3, error: error3 }] =
    useMutation(UPDATE_USER_MUTATION);

  useEffect(
    () => {
      let index = botMap.findIndex((x) => x.type === props.level);
      let new_tags = props.tags ? props.tags.split("-") : [];
      if (new_tags.length > 0) {
        setUserDescription([...new_tags]);
      }
      if (index === -1) {
        setJourney([botMap[0]]);
      } else {
        setJourney([botMap[index]]);
      }

      const getResult = async () => {
        const new_dialogue = await createBotDialogue({
          variables: {
            journey: [],
            source: router.asPath,
          },
        });
        setDialogueId(new_dialogue.data.createBotDialogue.id);
      };
      getResult();
    },
    // Run this hook only once when the component mounts, similar to componentDidMount
    []
  );

  useEffect(
    () => {
      if (props.me) {
        // Make sure the props.me.tags is spread into an array, if it's not an array
        setUserDescription([]);
      }
    },
    // Only re-run this hook when props.me changes, not userDescription
    [props.me]
  );

  const updateBotMap = async (val, update, id) => {
    let new_map = [...botMap];
    let newUserDescription = [...userDescription, update];
    let new_block = new_map.find((dial) => dial.type == val);
    let arr = [...journey, new_block];

    setUserDescription(newUserDescription);
    if (new_block) setJourney(arr);
    if (props.me) {
      updateUser({
        variables: {
          id: props.me.id,
          tags: newUserDescription,
        },
      });
    }
    // console.log("[...userDescription, update]", [...userDescription, update]);
    // console.log("journey", journey);

    if (dialogueId) {
      let updated_res = await updateBotDialogue({
        variables: {
          id: dialogueId,
          rating: rating,
          journey: newUserDescription,
        },
      });
    }

    if (id && val == "course") {
      setCourse(sorted_courses.find((c) => c.id == id));
    } else if (id && val == "post") {
      setPost(sorted_blogs.find((c) => c.id == id));
    } else if (id && val == "useful") {
      setUseful(sorted_usefuls.find((c) => c.id == id));
    }
  };

  const findCommonElement = (array1, array2) => {
    // Loop for array1
    for (let i = 0; i < array1.length; i++) {
      // Loop for array2
      for (let j = 0; j < array2.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (array1[i] === array2[j]) {
          // Return if common element found
          return true;
        }
      }
    }
    // Return if no common element exist
    return false;
  };

  const goBack = () => {
    let new_journey = [...journey];
    new_journey.pop();
    setJourney([...new_journey]);
  };

  let sorted_courses = [];
  if (data) {
    data.coursePages.map((c) => {
      if (findCommonElement(c.tags, userDescription)) {
        return sorted_courses.push(c);
      } else if (
        userDescription.length == 0 &&
        !findCommonElement(c.tags, userDescription)
      ) {
        return (sorted_courses = [...sorted_courses, c]);
      }
    });
  }

  let sorted_blogs = [];

  if (posts_data) {
    [...posts_data.posts]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .map((p) => {
        if (findCommonElement(p.tags, userDescription)) {
          return sorted_blogs.push(p);
        } else if (!findCommonElement(p.tags, userDescription)) {
          return (sorted_blogs = [...sorted_blogs]);
        }
      });
  }

  let sorted_usefuls = [];
  if (useful_data) {
    useful_data.usefuls.map((u) => {
      if (findCommonElement(u.tags, userDescription)) {
        return sorted_usefuls.push(u);
      } else if (!findCommonElement(u.tags, userDescription)) {
        return (sorted_usefuls = [...sorted_usefuls, u]);
      }
    });
  }

  const getLinkAction = (update) => {
    updateBotMap(null, "click_to_TG");
  };

  return (
    <Styles>
      {/* <Share /> */}
      <Container>
        {[...journey].map((b, i) => (
          <Block
            key={i}
            type={b.type}
            question={b.question}
            options={b.options}
            updateBotMap={updateBotMap}
            sorted_courses={sorted_courses}
            sorted_blogs={sorted_blogs}
            sorted_usefuls={sorted_usefuls}
            userDescription={userDescription}
            hideElems={i + 1 < journey.length}
            course={course}
            post={post}
            useful={useful}
            id={b.id}
            name={b.name}
            email_link={b.email_link}
            lastBlock={i == journey.length - 1}
            me={props.me}
          />
        ))}
        <ButtonBox>
          {journey.length > 1 && (
            <ButtonBack onClick={(e) => goBack()}>⬅ Назад</ButtonBack>
          )}
          {/* <div className="comment">Оцените полезность бота:</div> */}
          {/* <div className="stars">
            <StarRatings
              starRatedColor={"rgb(255, 178, 3)"}
              starEmptyColor={"#DADADA"}
              starHoverColor={"rgb(255, 150, 64)"}
              rating={rating}
              numberOfStars={5}
              starDimension="20px"
              starSpacing="3px"
              changeRating={async (data) => {
                const res = await setRating(data);
                let updated_res = await updateBotDialogue({
                  variables: {
                    id: dialogueId,
                    rating: data,
                    journey: [...userDescription, "rating_added"],
                  },
                });
                alert("Thanks!");
              }}
            />
          </div> */}
          <ExitIntentPopup getLinkAction={getLinkAction} />
        </ButtonBox>
      </Container>
    </Styles>
  );
};

export default Navigator;
