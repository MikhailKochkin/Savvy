import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  .header {
    font-size: 2.6rem;
    font-weight: 500;
    width: 80%;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: flex-start;
  margin: 40px 0;
`;

const Icon = styled.div`
  height: 350px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 60px;
  margin-bottom: 20px;
  .author_name {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-top: 10px;
  }
  .author_description {
    font-size: 1.2rem;
    border-top: 1px solid black;
    margin-top: 10px;
    padding-top: 10px;
    line-height: 1.4;
  }
  .image {
    width: 160px;
    height: 200px;
    background: #c4c4c4;
  }
  @media (max-width: 800px) {
    margin-bottom: 20px;
  }
`;

const Icon2 = styled.div`
  height: 200px;
  width: 160px;
  background: #162b4b;
  margin-right: 40px;
  /* margin-bottom: 20px; */
`;

const Teachers = () => {
  const teachers = [
    {
      name: "Михаил",
      surname: "Кочкин",
      description:
        "Основатель и CTO BeSavvy. Директор программы. Модуль Legal Tech",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1587153342/%D0%BF%D0%B5%D1%80%D0%B2%D0%BE%D0%B5-%D0%BF%D0%BE%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-0485_1.png",
    },
    {
      name: "Александр",
      surname: "Трифонов",
      description: "Основатель «LegalTech директор». Модуль Legal Tech",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619085432/%D0%A2%D1%80%D0%B8%D1%84%D0%BE%D0%BD%D0%BE%D0%B2_1.png",
    },
    {
      name: "Олег",
      surname: "Волошин",
      description:
        "Генеральный директор Школы права Статут. Директор программы.",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1622110214/%D0%9E%D0%BB%D0%B5%D0%B3_1.png",
    },
    {
      name: "Анна",
      surname: "Костыра",
      description: "Управляющий партнер Legit, ex Deloitte Legal ",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619085433/%D0%9A%D0%BE%D1%81%D1%82%D1%8B%D1%80%D0%B0_1.png",
    },
    {
      name: "Дени",
      surname: "Мурдалов",
      description: `Юрист адвокатского бюро А2. Модуль "Основы работы с корпорациями"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619085434/%D0%94%D0%B5%D0%BD%D0%B8_3.png",
    },
    {
      name: "Лев",
      surname: "Толстопятов",
      description: `Помощник юриста Clifford Chance. Модуль "Soft skills и оценка рынка"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1620033245/%D0%9B%D0%B5%D0%B2-%D0%A8%D0%9C%D0%AE.png",
    },
    {
      name: "Юлия",
      surname: "Баймакова",
      description: `Юрист Noerr. Модуль "M/A сделки"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619085817/%D0%AE%D0%BB%D1%8F.png",
    },
    {
      name: "Глеб",
      surname: "Базурин",
      description: `Юрист VK Partners. Модуль "Инструменты договорной работы корпоративного юриста"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619085433/GlebSite_1.png",
    },
    {
      name: "Татьяна",
      surname: "Свиридова",
      description: `Старший юрист CMS Russia. Модуль "Как защитить интересы компании в арбитражном суде?"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1623682732/2021-06-14_16.02_1.png",
    },
    {
      name: "Мария",
      surname: "Бояринцева",
      description: `Старший юрист АБ А2. Модуль "Рассмотрение дела о банкротстве: как это работает?
"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1622109727/%D0%9C%D0%B0%D1%88%D0%B0_%D0%91.png",
    },
    {
      name: "Ксения",
      surname: "Даньшина",
      description: `Юрист CMS Russia. Модуль "Правовые вопросы создания и оборота программного обеспечения"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1622109142/%D0%9A%D1%81%D1%8E%D1%88%D0%B0.png",
    },
    {
      name: "Булат",
      surname: "Кулахметов",
      description: `Старший юрист «Зарцын и партнеры». Модуль "Вопросы регулирования данных и работы с ними"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1622109140/%D0%91%D1%83%D0%BB%D0%B0%D1%82.png",
    },
    {
      name: "Михаил",
      surname: "Cтеценко",
      description: `Ассоциированный партнер LegIT. Модуль "IP и недобросовестная конкуренция"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1620034080/Picture1_1.png",
    },
    {
      name: "Алексей",
      surname: "Зайцев",
      description: `Старший юрист LegIT. Модуль "IP и недобросовестная конкуренция"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1620034080/Picture2_1.png",
    },
    {
      name: "Анна",
      surname: "Кареева",
      description: `Старший юрист LegIT. Модуль "Legal design"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1620034080/Picture3_1.png",
    },
    {
      name: "Елизавета",
      surname: "Молдачева",
      description: `Младший юрист LegIT. Модуль "IP и недобросовестная конкуренция"`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1620034080/Picture4_1.png",
    },
    {
      name: "И другие",
      surname: "эксперты,",
      description: `которых мы представим во время программы.`,
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1623682927/toa-heftiba-O3ymvT7Wf9U-unsplash_1.png",
    },
  ];
  const experts = [
    // {
    //   name: "Анна",
    //   surname: "Костыра",
    //   description: "Ex руководитель юридического департамента Deloitte. ",
    //   img: "url",
    // },
    // {
    //   name: "Элина",
    //   surname: "Джамбинова",
    //   description:
    //     "Старший юрист компании Алруд. Специалист по юридическому сопровождению Fin tech проектов.",
    //   img: "url",
    // },
  ];
  return (
    <Styles>
      <div className="header">Эксперты и преподаватели программы:</div>
      <Group>
        {teachers.map((t) => (
          <Icon>
            {t.img == "url" ? <Icon2 /> : <img src={t.img} className="image" />}
            <div className="author_name">
              {t.name}
              <br />
              {t.surname}
            </div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group>
      {/* <div className="header">Преподаватели программы:</div>
      <Group>
        {teachers.map((t) => (
          <Icon>
            {t.img == "" ? <Icon2 /> : <img src={t.img} className="image" />}
            <div className="author_name">
              {t.name}
              <br />
              {t.surname}
            </div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group> */}
    </Styles>
  );
};

export default Teachers;
