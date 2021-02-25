import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #162b4b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 2.6rem;
    font-weight: bold;
    width: 80%;
    line-height: 1.4;
    color: #f7d188;
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
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #fff;
  margin-right: 40px;
  margin-bottom: 20px;

  .author_name {
    font-size: 2rem;
    line-height: 1.4;
    margin-top: 10px;
  }
  .author_description {
    font-size: 1.6rem;
    border-top: 1px solid #fff;
    margin-top: 10px;
    padding-top: 10px;
  }
  .image {
    width: 100%;
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
      name: "Дени Мурдалов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Дени Мурдалов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Дени Мурдалов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Дени Мурдалов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Дени Мурдалов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
  ];
  const experts = [
    {
      name: "Александр Трифонов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Александр Трифонов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Александр Трифонов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Александр Трифонов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
    {
      name: "Александр Трифонов",
      description: "Data Scientist в KPMG. Блок «Аналитика. Начальный уровень»",
      img: "url",
    },
  ];
  return (
    <Styles>
      <div className="header">Преподаватели программы:</div>
      <Group>
        {teachers.map((t) => (
          <Icon>
            <div className="image"></div>
            <div className="author_name">{t.name}</div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group>
      <div className="header">Эксперты программы:</div>
      <Group>
        {experts.map((t) => (
          <Icon>
            <div className="image"></div>
            <div className="author_name">{t.name}</div>
            <div className="author_description">{t.description}</div>
          </Icon>
        ))}
      </Group>
    </Styles>
  );
};

export default Teachers;
