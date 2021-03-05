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
  justify-content: space-between;
  margin: 40px 0;
`;

const Icon = styled.div`
  height: 350px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 40px;
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

const Teachers = () => {
  const teachers = [
    {
      name: "Михаил",
      surname: "Кочкин",
      description: "Директор программы. Модуль Legal Tech",
      img:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1587153342/%D0%BF%D0%B5%D1%80%D0%B2%D0%BE%D0%B5-%D0%BF%D0%BE%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-0485_1.png",
    },
    {
      name: "Дени",
      surname: "Мурдалов",
      description: `Юрист адвокатского бюро А2. Модуль "Основы работы с корпорациями"`,
      img:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1614774378/deni2.png",
    },
    {
      name: "Лев",
      surname: "Толстопятов",
      description: `Юрист Noerr. Модуль "Прохождение собеседований и оценка рынка"`,
      img: "url",
    },
    {
      name: "Юлия",
      surname: "Баймакова",
      description: `Юрист Noerr. Модуль "M/A сделки"`,
      img: "url",
    },
    {
      name: "Максим",
      surname: "Агибалов",
      description: `Юрист Nevsky IP lawyers. Модуль "Основы IP"`,
      img: "url",
    },
    {
      name: "Глеб",
      surname: "Базурин",
      description: `Юрист VK Partners. Модуль "Инструменты договорной работы корпоративного юриста"`,
      img: "url",
    },
  ];
  const experts = [
    {
      name: "Михаил",
      surname: "Кочкин",
      description:
        "Основатель и CTO BeSavvy. Директор программы. Модуль Legal Tech",
      img:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1587153342/%D0%BF%D0%B5%D1%80%D0%B2%D0%BE%D0%B5-%D0%BF%D0%BE%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-0485_1.png",
    },
    {
      name: "Александр",
      surname: "Трифонов",
      description:
        "Советник и со-основатель FreshDoc.ru и Legium.io, «LegalTech директор». Модуль Legal Tech",
      img: "url",
    },
    {
      name: "Олег",
      surname: "Волошин",
      description:
        "Генеральный директор Школы права Статут. Директор программы.",
      img: "url",
    },
    {
      name: "Анна",
      surname: "Костыра",
      description: "Ex руководитель юридического департамента Deloitte. ",
      img: "url",
    },
    {
      name: "Элина",
      surname: "Джамбинова",
      description:
        "Старший юрист компании Алруд. Специалист по юридическому сопровождению Fin tech проектов.",
      img: "url",
    },
  ];
  return (
    <Styles>
      <div className="header">Эксперты программы:</div>
      <Group>
        {experts.map((t) => (
          <Icon>
            <img src={t.img} className="image" />
            <div className="author_name">
              {t.name}
              <br />
              {t.surname}
            </div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group>
      <div className="header">Преподаватели программы:</div>
      <Group>
        {teachers.map((t) => (
          <Icon>
            <img src={t.img} className="image" />
            <div className="author_name">
              {t.name}
              <br />
              {t.surname}
            </div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group>
    </Styles>
  );
};

export default Teachers;
