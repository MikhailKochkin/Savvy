import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, gql } from "@apollo/client";

import { useUser } from "../components/User";
import Useful from "../components/useful/Useful";

const USEFUL_QUERY = gql`
  query USEFUL_QUERY($id: String!) {
    useful(where: { id: $id }) {
      id
      header
      buttonText
      link
      image
      tags
    }
  }
`;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});
const useful = (props) => {
  // const { data, loading, error } = useQuery(USEFUL_QUERY, {
  //   variables: { id: props.query.id },
  // });
  // if (loading) return <p>Загрузка..</p>;
  // if (error) return console.log(error);

  const data2 = {
    post1: {
      link: "https://besavvy.app/ru/lesson?id=cl1xos6xr46971izxzt5tgxcp&type=story",
      description: [
        "⭐️   Разберем необходимые выражения из договорного, корпоративного и IP права",
        "⭐️   Поговорим про сложности юр письма: цифры, источники права и так далее",
        "⭐️   Разберем деловые темы, которые встречаются в работе юриста: нефтегаз, IT и так далее",
      ],
      image_url: "/static/eng_book.webp",
      button_text: "Скачать пособие",
      header_text: "Получите пособие по юр английскому",
      material_type: "english_student_book_main",
    },
    contracts: {
      link: "https://besavvy.app/ru/lesson?id=cl25ytyrm1966oiu9g4la3m03&type=story",
      description: [
        "⭐️   Идеально, чтобы повторить материал перед собеседованием или экзаменом",
        "⭐️   Система графиков помогает быстро запомнить разные договорные конструкции",
        "⭐️   Хорошо дополняет курс по особенной части Гражданского права",
      ],
      image_url: "/static/contracts.webp",
      button_text: "Скачать сборник",
      header_text: "Получите сборник схем договорных конструкций",
      material_type: "contracts_book_main",
    },
    conclude: {
      link: "https://besavvy.app/ru/lesson?id=cl2eqzzkr27273d5u9ot8djywz&type=story",
      description: [
        "⭐️   Разбираем практический кейс с реального собеседования",
        "⭐️   Это интересно. Вы решаете, задаете вопросы, мы только помогаем вам разобраться",
        "⭐️   Вы получите новый практический навык за 10 минут",
      ],
      image_url: "/static/case1.webp",
      button_text: "Решить кейс",
      header_text: "Решите кейс с собеседования на младшего юриста",
      material_type: "contract_conclude_case",
    },
    ip: {
      link: "https://besavvy.app/lesson?id=cl2rqcw8f151711hum7o1jrn6j&type=story",
      description: [
        "⭐️   Взяли вопросы с собеседований, в которых участвовали наши студенты",
        "⭐️   Рассказали, как отвечать на самые сложные их них",
        "⭐️   Вы сможете заранее подготовиться к сложным и неожиданным вопросам и чувствовать себя уверенно.",
      ],
      image_url: "/static/ip.png",
      button_text: "Смотреть вопросы",
      header_text: "Получите чек-лист с вопросами с собеседования по IP",
      material_type: "ip_interview",
    },
    vocabulary: {
      link: "https://besavvy.app/lesson?id=cl3bnf2de41891h2m88zkq608&type=story",
      description: [
        "⭐️   Взяли правила перевода из своего опыта",
        "⭐️   Научим работать со словарями и переводить юр лексику",
        "⭐️   Вы сможете заранее подготовиться к собеседованиям и чувствовать себя уверенно.",
      ],
      image_url:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1654077716/Group_466.webp",
      button_text: "Получить пособие",
      header_text: "Как переводить юридические тексты?",
      material_type: "vocab_book",
    },
  };
  let material;
  if (props.query.id == "post1") {
    material = data2.post1;
  } else if (props.query.id == "contracts") {
    material = data2.contracts;
  } else if (props.query.id == "conclude") {
    material = data2.conclude;
  } else if (props.query.id == "ip") {
    material = data2.ip;
  } else if (props.query.id == "vocabulary") {
    material = data2.vocabulary;
  } else {
    material = data2.post1;
  }

  const me = useUser();

  return (
    <>
      <Useful
        me={me}
        useful={data2.useful}
        id={props.query.id}
        material={material}
      />
    </>
  );
};

export default useful;
