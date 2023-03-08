import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Block from "./Block";
import { v4 as uuidv4 } from "uuid";
import StarRatings from "react-star-ratings";

const CREATE_BOT_DIALOGUE_MUTATION = gql`
  mutation CREATE_BOT_DIALOGUE_MUTATION($journey: [String!]) {
    createBotDialogue(journey: $journey) {
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
      header
      buttonText
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
  /* justify-content: center; */
  align-items: center;
  padding: 70px 0;
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 95%;
    font-size: 1.6rem;
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
  const [botMap, setBotMap] = useState([
    {
      type: "introduction",
      question:
        "Привет. Я Навигатор BeSavvy. Я каждый день собираю информацию о том, как юристам развивать карьеру. Поделиться, чем я знаю? ",
      options: [
        { answer: "Давай", move: "segmentation_interests", update: "" },
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
      question: "Отлично. О чем теперь могу рассказать?",
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
      question: "Информация по материалу: ",
      options: [],
    },
    {
      type: "useful",
      question: "Информация по материалу: ",
      options: [],
    },
    {
      type: "contact",
      question:
        "Отлично, я буду рад пообщаться с вами напрямую. В каком формате?",
      options: [
        {
          answer: "Написать в телеграм",
          type: "link",
          link: "https://t.me/mikkochkin",
          move: "",
          update: "telegram",
        },
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

  useEffect(
    (e) => {
      let index = botMap.findIndex((x) => x.type === props.level);
      let new_tags = props.tags ? props.tags.split("-") : [];
      if (new_tags.length > 0) {
        setUserDescription([...new_tags]);
      }
      if (index == -1) {
        setJourney([botMap[0]]);
      } else {
        setJourney([botMap[index]]);
      }

      const getResult = async () => {
        const new_dialogue = await createBotDialogue({
          variables: {
            journey: [],
          },
        });
        setDialogueId(new_dialogue.data.createBotDialogue.id);
      };
      getResult();
    },
    [0]
  );

  const updateBotMap = async (val, update, id) => {
    let new_map = [...botMap];
    let new_block = new_map.find((dial) => dial.type == val);
    let arr = [...journey, new_block];
    setUserDescription([...userDescription, update]);
    if (new_block) setJourney(arr);
    if (dialogueId) {
      let updated_res = await updateBotDialogue({
        variables: {
          id: dialogueId,
          rating: rating,
          journey: [...userDescription, update],
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
    posts_data.posts.map((p) => {
      if (findCommonElement(p.tags, userDescription)) {
        return sorted_blogs.push(p);
      } else if (!findCommonElement(p.tags, userDescription)) {
        return (sorted_blogs = [...sorted_blogs, p]);
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

  return (
    <Styles>
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
            lastBlock={i == journey.length - 1}
          />
        ))}
        <ButtonBox>
          {journey.length > 1 && (
            <ButtonBack onClick={(e) => goBack()}>⬅ Назад</ButtonBack>
          )}
          <div className="comment">Оцените полезность бота:</div>

          <div className="stars">
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
          </div>
        </ButtonBox>
      </Container>
    </Styles>
  );
};

export default Navigator;
